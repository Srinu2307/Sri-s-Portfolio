import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { contactSchema, sanitizeInput } from './server/validation.js';
import { sendAdminNotification, sendAutoReply } from './server/mailer.js';

dotenv.config();

// Strict Environment Pre-flight Check
if (process.env.NODE_ENV === 'production') {
  const requiredEnvVars = ['SMTP_EMAIL', 'SMTP_APP_PASSWORD'];
  const missing = requiredEnvVars.filter(key => !process.env[key]);
  if (missing.length > 0) {
    console.error(`[CRITICAL ERROR] Missing required environment variables in production: ${missing.join(', ')}`);
    console.error('Server will not start. Please configure these variables in your hosting environment.');
    process.exit(1);
  }
}

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Security Middleware with Strict CSP
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"], // unsafe-inline required for some React/Vite development plugins, ideally strictly hash-based in pure prod
      styleSrc: ["'self'", "'unsafe-inline'"], // Tailwind/Framer motion often require inline styles
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  }
}));
// Strict CORS Configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.ALLOWED_ORIGIN || false // In prod, we serve static files same-origin, so external CORS isn't needed unless specified
    : ['http://localhost:5173', 'http://127.0.0.1:5173'], // Allow Vite dev server
  methods: ['GET', 'POST'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Rate Limiter for Contact Form to prevent spam
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { success: false, message: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Serve static files from Vite's build directory (dist)
app.use(express.static(path.join(__dirname, 'dist')));

// Secure API Endpoint for Contact Form
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    // 1. Validate Input using Zod
    const validatedData = contactSchema.parse(req.body);

    // 2. Sanitize Inputs against HTML Injection
    const sanitizedData = {
      name: sanitizeInput(validatedData.name),
      email: sanitizeInput(validatedData.email),
      subject: sanitizeInput(validatedData.subject),
      message: sanitizeInput(validatedData.message),
    };

    // Extract basic request info
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown IP';
    const userAgent = req.headers['user-agent'] || 'Unknown Browser';

    // 3. Send Primary Email to Admin Inbox
    await sendAdminNotification({
      ...sanitizedData,
      ip,
      userAgent,
    });

    // 4. Send Auto-Reply to the User
    await sendAutoReply({
      name: sanitizedData.name,
      email: sanitizedData.email,
    });

    return res.status(200).json({ success: true, message: 'Your message has been sent successfully.' });
  } catch (error) {
    console.error('[Contact API Error]:', error);

    // Handle Zod Validation Errors
    if (error.name === 'ZodError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid input data', 
        errors: error.errors 
      });
    }

    // Handle SMTP or general errors
    return res.status(500).json({ success: false, message: 'Unable to send your message. Please try again.' });
  }
});

// API Endpoint to check server sanity/status
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

// Fallback to index.html for single page application routing
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[Express Backend] Service compiled and listening on port ${PORT}`);
});
