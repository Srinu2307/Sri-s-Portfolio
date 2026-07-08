import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_APP_PASSWORD,
  },
});

/**
 * Sends the primary notification email to the inbox.
 * Uses a premium dark cybersecurity-themed HTML template.
 */
export const sendAdminNotification = async ({ name, email, subject, message, ip, userAgent }) => {
  const timestamp = new Date().toUTCString();
  const sessionId = Math.random().toString(36).substring(2, 10).toUpperCase();

  const mailOptions = {
    from: `"${name}" <${process.env.SMTP_EMAIL}>`,
    replyTo: email,
    to: process.env.SMTP_EMAIL,
    subject: `⚡ [INCOMING] New Contact — ${subject}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#050816;font-family:'Courier New',Courier,monospace;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#050816;padding:30px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#0a0f1e 0%,#0d1a2e 100%);border:1px solid #10b981;border-radius:12px 12px 0 0;padding:28px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:4px;color:#10b981;text-transform:uppercase;">[ SECURE CHANNEL ACTIVE ]</p>
                    <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:1px;">&#9889; Incoming Portfolio Contact</h1>
                    <p style="margin:8px 0 0 0;font-size:11px;color:#4ade80;letter-spacing:2px;">SESSION // ${sessionId}</p>
                  </td>
                  <td align="right" valign="top">
                    <span style="display:inline-block;background:#10b981;border-radius:50%;width:10px;height:10px;"></span>
                    <span style="font-size:10px;color:#10b981;margin-left:6px;vertical-align:middle;">LIVE</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SENDER INTEL -->
          <tr>
            <td style="background:#0a0f1e;border-left:1px solid #1e2a3a;border-right:1px solid #1e2a3a;padding:24px 32px 0 32px;">
              <p style="margin:0 0 14px 0;font-size:9px;letter-spacing:3px;color:#10b981;text-transform:uppercase;border-bottom:1px solid #1e2a3a;padding-bottom:8px;">&#9656; SENDER INTELLIGENCE REPORT</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #0f172a;width:120px;vertical-align:top;">
                    <span style="font-size:9px;letter-spacing:2px;color:#4ade80;text-transform:uppercase;">NAME</span>
                  </td>
                  <td style="padding:10px 0;border-bottom:1px solid #0f172a;vertical-align:top;">
                    <span style="font-size:14px;color:#f1f5f9;font-weight:600;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #0f172a;width:120px;vertical-align:top;">
                    <span style="font-size:9px;letter-spacing:2px;color:#4ade80;text-transform:uppercase;">EMAIL</span>
                  </td>
                  <td style="padding:10px 0;border-bottom:1px solid #0f172a;vertical-align:top;">
                    <a href="mailto:${email}" style="font-size:14px;color:#10b981;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;width:120px;vertical-align:top;">
                    <span style="font-size:9px;letter-spacing:2px;color:#4ade80;text-transform:uppercase;">SUBJECT</span>
                  </td>
                  <td style="padding:10px 0;vertical-align:top;">
                    <span style="font-size:14px;color:#f1f5f9;font-weight:600;">${subject}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- MESSAGE BODY -->
          <tr>
            <td style="background:#0a0f1e;border-left:1px solid #1e2a3a;border-right:1px solid #1e2a3a;padding:24px 32px;">
              <p style="margin:0 0 12px 0;font-size:9px;letter-spacing:3px;color:#10b981;text-transform:uppercase;">&#9656; DECRYPTED MESSAGE PAYLOAD</p>
              <div style="background:#060c1a;border:1px solid #1e2a3a;border-left:3px solid #10b981;border-radius:6px;padding:18px 20px;">
                <p style="margin:0;font-size:14px;color:#cbd5e1;line-height:1.8;white-space:pre-wrap;">${message}</p>
              </div>
            </td>
          </tr>

          <!-- METADATA / FORENSICS -->
          <tr>
            <td style="background:#060c1a;border:1px solid #1e2a3a;border-top:1px dashed #1e2a3a;border-radius:0 0 12px 12px;padding:20px 32px;">
              <p style="margin:0 0 12px 0;font-size:9px;letter-spacing:3px;color:#4ade80;text-transform:uppercase;">&#9656; NETWORK FORENSICS</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:3px 0;font-size:10px;color:#475569;width:120px;">TIMESTAMP</td>
                  <td style="padding:3px 0;font-size:10px;color:#10b981;">${timestamp}</td>
                </tr>
                <tr>
                  <td style="padding:3px 0;font-size:10px;color:#475569;">SOURCE IP</td>
                  <td style="padding:3px 0;font-size:10px;color:#10b981;">${ip}</td>
                </tr>
                <tr>
                  <td style="padding:3px 0;font-size:10px;color:#475569;">USER AGENT</td>
                  <td style="padding:3px 0;font-size:10px;color:#64748b;">${userAgent.substring(0, 70)}...</td>
                </tr>
                <tr>
                  <td style="padding:3px 0;font-size:10px;color:#475569;">TRANSPORT</td>
                  <td style="padding:3px 0;font-size:10px;color:#10b981;">TLS 1.3 / SMTP / PORT 465 / ENCRYPTED</td>
                </tr>
              </table>
              <p style="margin:16px 0 0 0;font-size:8px;color:#1e2a3a;letter-spacing:1px;text-align:center;">END OF SECURE TRANSMISSION // SESSION ${sessionId}</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };

  return transporter.sendMail(mailOptions);
};

/**
 * Sends an automated confirmation reply to the user.
 * Premium dark cybersecurity-themed auto-reply template.
 */
export const sendAutoReply = async ({ name, email }) => {
  const timestamp = new Date().toUTCString();
  const ticketId = 'TKT-' + Date.now().toString(36).toUpperCase();

  const mailOptions = {
    from: `"Srinivasulu K. | Cybersecurity Engineer" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: `[${ticketId}] Message Received — Srinivasulu K.`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#050816;font-family:'Courier New',Courier,monospace;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#050816;padding:30px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#0a0f1e 0%,#0d1a2e 100%);border:1px solid #10b981;border-radius:12px 12px 0 0;padding:32px;">
              <p style="margin:0 0 6px 0;font-size:9px;letter-spacing:4px;color:#10b981;text-transform:uppercase;">[ AUTOMATED SECURE RESPONSE ]</p>
              <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:1px;">
                Transmission Acknowledged &#10003;
              </h1>
              <p style="margin:10px 0 0 0;font-size:11px;color:#4ade80;letter-spacing:1px;">
                TICKET // ${ticketId}
              </p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background:#0a0f1e;border-left:1px solid #1e2a3a;border-right:1px solid #1e2a3a;padding:32px;">
              <p style="margin:0 0 20px 0;font-size:14px;color:#94a3b8;line-height:1.4;">
                <span style="color:#10b981;">root@srinivasulu.dev:~$</span> echo "Hello, ${name}."
              </p>

              <p style="margin:0 0 16px 0;font-size:14px;color:#cbd5e1;line-height:1.8;">
                Your message has been <strong style="color:#10b981;">received and logged</strong> in my secure communications queue. The payload has been decrypted, verified, and is queued for a priority review.
              </p>

              <p style="margin:0 0 16px 0;font-size:14px;color:#cbd5e1;line-height:1.8;">
                Expected response time: <span style="color:#4ade80;font-weight:700;">24 &ndash; 48 hours</span>, subject to current active security engagements.
              </p>

              <!-- STATUS BOX -->
              <div style="background:#060c1a;border:1px solid #1e2a3a;border-left:3px solid #10b981;border-radius:6px;padding:16px 20px;margin:24px 0;">
                <p style="margin:0 0 10px 0;font-size:9px;letter-spacing:3px;color:#10b981;">TICKET STATUS</p>
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:3px 0;font-size:11px;color:#4ade80;width:160px;">STATUS</td>
                    <td style="font-size:11px;color:#f1f5f9;">OPEN &mdash; AWAITING OPERATOR RESPONSE</td>
                  </tr>
                  <tr>
                    <td style="padding:3px 0;font-size:11px;color:#4ade80;">RECEIVED AT</td>
                    <td style="font-size:11px;color:#f1f5f9;">${timestamp}</td>
                  </tr>
                  <tr>
                    <td style="padding:3px 0;font-size:11px;color:#4ade80;">CHANNEL</td>
                    <td style="font-size:11px;color:#f1f5f9;">TLS-ENCRYPTED / PORTFOLIO CONTACT</td>
                  </tr>
                  <tr>
                    <td style="padding:3px 0;font-size:11px;color:#4ade80;">PRIORITY</td>
                    <td style="font-size:11px;color:#4ade80;font-weight:700;">HIGH</td>
                  </tr>
                </table>
              </div>

              <p style="margin:0;font-size:12px;color:#475569;line-height:1.6;">
                If this message was not initiated by you, please disregard. No action is required on your end.
              </p>
            </td>
          </tr>

          <!-- SIGNATURE -->
          <tr>
            <td style="background:#060c1a;border:1px solid #1e2a3a;border-top:1px dashed #1e2a3a;border-radius:0 0 12px 12px;padding:24px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;font-size:15px;font-weight:700;color:#f1f5f9;font-family:Arial,sans-serif;">Srinivasulu Kamarthi</p>
                    <p style="margin:4px 0 0 0;font-size:11px;color:#10b981;letter-spacing:1px;font-family:Arial,sans-serif;">Cybersecurity Engineer &bull; Offensive Security &bull; DevSecOps</p>
                    <p style="margin:8px 0 0 0;font-size:10px;">
                      <a href="mailto:srinivasulu.projects@gmail.com" style="color:#4ade80;text-decoration:none;">srinivasulu.projects@gmail.com</a>
                    </p>
                  </td>
                  <td align="right" valign="middle">
                    <div style="border:1px solid #10b981;border-radius:6px;padding:8px 14px;text-align:center;min-width:80px;">
                      <p style="margin:0;font-size:9px;color:#10b981;letter-spacing:2px;">ENCRYPTED</p>
                      <p style="margin:2px 0 0 0;font-size:8px;color:#334155;">END-TO-END</p>
                    </div>
                  </td>
                </tr>
              </table>
              <p style="margin:14px 0 0 0;font-size:8px;color:#1e2a3a;letter-spacing:1px;text-align:center;">THIS IS AN AUTOMATED RESPONSE &mdash; DO NOT REPLY DIRECTLY TO THIS EMAIL</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };

  return transporter.sendMail(mailOptions);
};
