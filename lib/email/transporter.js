import nodemailer from 'nodemailer';

let transporter = null;

export function getTransporter() {
  if (transporter) return transporter;

  const { EMAIL, PASSKEY } = process.env;
  if (!EMAIL || !PASSKEY) {
    // don't throw here — callers should return an HTTP error if needed
    return null;
  }

  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: EMAIL,
      pass: PASSKEY,
    },
  });

  return transporter;
}
