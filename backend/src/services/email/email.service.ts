/*
 * SQL Migration — add this to schema.sql or run in Supabase SQL editor:
 *
 *   CREATE TABLE IF NOT EXISTS public.email_log (
 *     id uuid primary key default gen_random_uuid(),
 *     recipient text not null,
 *     subject text not null,
 *     template text not null,
 *     sent_at timestamptz not null default now()
 *   );
 */

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  template: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  console.log(
    `[EMAIL] To: ${options.to} | Subject: ${options.subject} | Template: ${options.template}`,
  );

  try {
    const { supabaseAdmin } = await import("../../config/supabase.js");
    if (supabaseAdmin) {
      await supabaseAdmin.from("email_log").insert({
        recipient: options.to,
        subject: options.subject,
        template: options.template,
        sent_at: new Date().toISOString(),
      });
    }
  } catch {
    // Non-blocking — email logging failure shouldn't break the app
  }

  return true;
}
