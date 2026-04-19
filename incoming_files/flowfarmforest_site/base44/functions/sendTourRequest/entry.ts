import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { name, email, phone, message } = await req.json();

    if (!name || !email) {
      return Response.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const body = [
      `<h2>Private Tour Request — 107 Linden Trail</h2>`,
      `<p><strong>Name:</strong> ${name}</p>`,
      `<p><strong>Email:</strong> ${email}</p>`,
      phone ? `<p><strong>Phone:</strong> ${phone}</p>` : '',
      message ? `<p><strong>Message:</strong><br/>${message}</p>` : '',
    ].filter(Boolean).join('');

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: 'rachelhernandezrealtor@gmail.com',
      subject: `Private Tour Request from ${name}`,
      body,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});