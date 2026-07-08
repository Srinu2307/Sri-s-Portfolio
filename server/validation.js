import { z } from 'zod';
import sanitizeHtml from 'sanitize-html';

// Zod schema matching the frontend to ensure robust validation
export const contactSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  subject: z.string().min(1, { message: 'Subject is required' }),
  message: z.string().min(20, { message: 'Message must be at least 20 characters' }),
});

/**
 * Sanitizes input strings to prevent Cross-Site Scripting (XSS)
 * and HTML injection attacks.
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return sanitizeHtml(input, {
    allowedTags: [], // Strip completely
    allowedAttributes: {},
  }).trim();
};
