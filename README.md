# Srinivasulu - Ultra-Premium Portfolio Website

A state-of-the-art, high-performance personal portfolio built with React 19, Vite 8, and an Express.js backend. This project features "Computational Liquid Glass" aesthetics, physical Framer Motion interactions, and enterprise-grade backend security.

## 🌟 Key Features

### Frontend Architecture (React 19 + Vite 8)
- **Computational Liquid Glass UI:** A dynamic, multi-layered optical navigation bar with cursor-tracked specular reflections, mathematically generated fractal noise (frost), and 3D edge lighting.
- **Framer Motion Physics:** Smooth, spring-based micro-interactions, scroll-triggered reveal animations, and hardware-accelerated (`translateZ`) rendering.
- **React 19 Compiler:** Fully integrated with the React 19 compiler (`babel-plugin-react-compiler`), eliminating the need for manual `useMemo` or `useCallback` optimizations.
- **Tailwind CSS v4:** Utility-first styling for rapid, responsive design across all devices.

### Secure Backend (Express.js)
- **Strict Content Security Policy (CSP):** Configured via Helmet to strictly whitelist trusted origins, preventing XSS and clickjacking attacks.
- **Failsafe Environment Validation:** The server strictly checks for required Mailer credentials on boot, failing fast in production to prevent silent errors.
- **Strict HSTS & Rate Limiting:** Enforces secure HTTPS connections and limits form submissions (5 requests per 15 minutes) to mitigate spam.
- **Nodemailer Integration:** Secure, automated email routing for the contact form, including auto-reply functionality.

## 🚀 Deployment (Render.com)

This project is configured for a 1-click deployment on Render using Docker and `render.yaml` Blueprints.

1. **Push** this repository to your GitHub account.
2. In your Render Dashboard, click **New +** > **Blueprint**.
3. Connect your GitHub repository.
4. Render will automatically read the `render.yaml` file, build the production Docker image, and deploy your site.
5. Provide your `SMTP_EMAIL` and `SMTP_APP_PASSWORD` when prompted.

## 💻 Local Development Setup

### 1. Prerequisites
- Node.js (v18+)
- npm or yarn

### 2. Environment Variables
Create a `.env` file in the root directory and add your Gmail credentials for the contact form:
```env
PORT=5000
SMTP_EMAIL=your.email@gmail.com
SMTP_APP_PASSWORD=your-16-character-app-password
```

### 3. Installation
```bash
npm install
```

### 4. Running the Development Server
```bash
# This uses concurrently to run Vite (Frontend) and Nodemon (Backend) simultaneously
npm run dev
```
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

### 5. Production Build
```bash
npm run build
npm start
```

## 🛠 Tech Stack
- **Core:** React 19, Node.js, Express
- **Build Tool:** Vite 8, Docker
- **Styling & Motion:** Tailwind CSS v4, Framer Motion
- **Security:** Helmet, Express Rate Limit, CORS
- **Email:** Nodemailer
"# Sri-s-Portfolio" 
"# Sri-s-Portfolio" 
