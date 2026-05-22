import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { sendLovableEmail } from 'npm:@lovable.dev/email-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const TO_EMAIL = 'hello@pizzadao.org';
const FROM_EMAIL = 'PizzaDAO <hello@pizzadao.org>';
const SENDER_DOMAIN = 'notify.pizzadao.org';

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

interface Body {
  name?: string;
  organization?: string;
  email?: string;
  message?: string;
  intents?: string[];
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as Body;
    const name = (body.name ?? '').trim();
    const organization = (body.organization ?? '').trim();
    const email = (body.email ?? '').trim();
    const message = (body.message ?? '').trim();
    const intents = Array.isArray(body.intents)
      ? body.intents.filter((i) => typeof i === 'string').slice(0, 12)
      : [];

    if (!name || name.length > 200) {
      return new Response(JSON.stringify({ error: 'Invalid name' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (!email || !isEmail(email) || email.length > 320) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (!message || message.length > 5000) {
      return new Response(JSON.stringify({ error: 'Invalid message' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (organization.length > 200) {
      return new Response(JSON.stringify({ error: 'Invalid organization' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: row, error: insertError } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        organization: organization || null,
        email,
        message,
        intents,
      })
      .select('id')
      .single();

    if (insertError) {
      console.error('insert error', insertError);
      return new Response(JSON.stringify({ error: 'Could not save message' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Attempt to email the PizzaDAO team. If email isn't configured yet,
    // the submission is still safely stored in the database.
    let emailed = false;
    try {
      const tagsHtml = intents.length
        ? `<p style="margin:0 0 16px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#9b6b00">${intents
            .map((t) => escapeHtml(t))
            .join(' &nbsp;·&nbsp; ')}</p>`
        : '';

      const html = `
        <div style="font-family:Georgia,serif;color:#1a1a1a;max-width:560px;margin:0 auto;padding:24px">
          ${tagsHtml}
          <h1 style="font-size:22px;margin:0 0 16px">New note from ${escapeHtml(name)}</h1>
          <table style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#333;border-collapse:collapse;margin:0 0 20px">
            <tr><td style="padding:4px 12px 4px 0;color:#888">Name</td><td>${escapeHtml(name)}</td></tr>
            ${organization ? `<tr><td style="padding:4px 12px 4px 0;color:#888">Organization</td><td>${escapeHtml(organization)}</td></tr>` : ''}
            <tr><td style="padding:4px 12px 4px 0;color:#888">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          </table>
          <div style="font-family:Georgia,serif;font-size:15px;line-height:1.7;color:#1a1a1a;white-space:pre-wrap;border-left:3px solid #F83A3A;padding:4px 0 4px 16px">${escapeHtml(message)}</div>
          <p style="margin-top:32px;font-size:11px;color:#999">Submission id: ${row.id}</p>
        </div>
      `;

      const text =
        (intents.length ? `Tags: ${intents.join(', ')}\n\n` : '') +
        `Name: ${name}\n` +
        (organization ? `Organization: ${organization}\n` : '') +
        `Email: ${email}\n\n` +
        `Message:\n${message}\n`;

      const apiKey = Deno.env.get('LOVABLE_API_KEY');
      if (!apiKey) {
        throw new Error('Missing email API key');
      }

      await sendLovableEmail({
        to: TO_EMAIL,
        from: FROM_EMAIL,
        reply_to: email,
        sender_domain: SENDER_DOMAIN,
        subject: `New PizzaDAO note from ${name}${intents.length ? ` (${intents[0]})` : ''}`,
        html,
        text,
        purpose: 'transactional',
        label: 'contact-form-notification',
        idempotency_key: `contact-${row.id}-team-notification`,
        unsubscribe_token: `contact-notification-${row.id}`,
        message_id: `contact-${row.id}-team-notification`,
      }, { apiKey });
      emailed = true;
    } catch (e) {
      console.error('email send failed (submission still stored):', e);
    }

    return new Response(JSON.stringify({ ok: true, emailed }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('unhandled', e);
    return new Response(JSON.stringify({ error: 'Bad request' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
