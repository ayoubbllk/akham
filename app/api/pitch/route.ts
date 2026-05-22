import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const Schema = z.object({
  pitch: z.string().min(20),
  format: z.enum(['fiction', 'documentaire', 'pub']),
  stage: z.enum(['idee', 'scenario', 'financement', 'tournage']),
  budget: z.enum(['<500k', '500k-2M', '2M-10M', '+10M']),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  company: z.string().optional(),
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
  const to = process.env.PITCH_TO_EMAIL || process.env.CONTACT_TO_EMAIL || 'pitch@akhamfilms.dz';

  if (!apiKey) {
    console.info('[pitch] (dev) Pitch reçu:', data);
    return NextResponse.json({ ok: true, mode: 'dev' });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: 'Akham Pitch <pitch@akhamfilms.dz>',
      to,
      replyTo: data.email,
      subject: `[Pitch · ${data.format}] ${data.name}`,
      text: `De: ${data.name} <${data.email}> · ${data.phone}${data.company ? ' · ' + data.company : ''}
Format: ${data.format}
Étape: ${data.stage}
Budget: ${data.budget}

Pitch:
${data.pitch}`,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[pitch] resend error', e);
    return NextResponse.json({ error: 'Send failed' }, { status: 500 });
  }
}
