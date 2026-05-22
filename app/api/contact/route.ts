import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const Schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.enum(['coproduction', 'service', 'presse', 'autre']),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || 'hello@akhamfilms.dz';

  // If no API key configured, accept silently (dev mode) and log.
  if (!apiKey) {
    console.info('[contact] (dev) Message reçu:', data);
    return NextResponse.json({ ok: true, mode: 'dev' });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: 'Akham Site <site@akhamfilms.dz>',
      to,
      replyTo: data.email,
      subject: `[Contact · ${data.subject}] ${data.name}`,
      text: `De: ${data.name} <${data.email}>\nSujet: ${data.subject}\n\n${data.message}`,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[contact] resend error', e);
    return NextResponse.json({ error: 'Send failed' }, { status: 500 });
  }
}
