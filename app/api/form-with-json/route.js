import { NextResponse } from 'next/server';
import { getTransporter } from '@/lib/email/transporter';
import { sanitize, safeJsonStringifyForHtml } from '@/lib/email/sanitize';

export async function POST(request) {
  const required = ['EMAIL', 'PASSKEY', 'RECIEVER_EMAIL'];
  for (const k of required) {
    if (!process.env[k]) {
      return NextResponse.json({ msg: `Missing env ${k}` }, { status: 500 });
    }
  }

  const body = await request.json();

  const { title } = body || {};
  const safeTitle = sanitize(title || 'Unknown');

  // Accept either: an object in `json` key, or a base64 `jsonFile` string, or `jsonString`.
  let jsonContent = null;
  let rawJsonString = '';

  if (body?.json) {
    jsonContent = body.json;
    rawJsonString = JSON.stringify(jsonContent);
  } else if (body?.jsonString) {
    try {
      rawJsonString = body.jsonString;
      jsonContent = JSON.parse(body.jsonString);
    } catch (e) {
      return NextResponse.json({ msg: 'jsonString is not valid JSON' }, { status: 400 });
    }
  } else if (body?.jsonFile) {
    // expect base64 encoded file content
    try {
      const buf = Buffer.from(body.jsonFile, 'base64');
      rawJsonString = buf.toString('utf8');
      jsonContent = JSON.parse(rawJsonString);
    } catch (e) {
      return NextResponse.json({ msg: 'jsonFile is not valid base64 JSON' }, { status: 400 });
    }
  }

  const effectiveJsonString =
    rawJsonString && rawJsonString.trim().length > 0
      ? rawJsonString
      : JSON.stringify(jsonContent || {}, null, 2);

  const jsonHtml = safeJsonStringifyForHtml(jsonContent || {});

  const mailContent = `
    <p>New message with JSON file received:</p>
    <p><strong>Title:</strong> ${safeTitle}</p>
    <pre><code>${jsonHtml}</code></pre>
  `;

  const transporter = getTransporter();
  if (!transporter) {
    return NextResponse.json({ msg: 'Email transporter not configured' }, { status: 500 });
  }

  const attachmentBaseName =
    safeTitle.replace(/[^a-z0-9_\-]+/gi, '_').replace(/^_+|_+$/g, '') || 'submission';

  let attachment;
  if (body?.jsonFile) {
    attachment = {
      filename: `${attachmentBaseName}.json`,
      content: body.jsonFile,
      encoding: 'base64',
      contentType: 'application/json',
    };
  } else {
    attachment = {
      filename: `${attachmentBaseName}.json`,
      content: effectiveJsonString,
      contentType: 'application/json',
    };
  }

  const mail = {
    from: process.env.EMAIL,
    to: process.env.RECIEVER_EMAIL,
    subject: `Submission - ${safeTitle}`,
    html: mailContent,
    attachments: [attachment],
  };

  try {
    await transporter.sendMail(mail);
    return NextResponse.json({ msg: 'Message with JSON sent' }, { status: 201 });
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
