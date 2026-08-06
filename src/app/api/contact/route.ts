import { z } from "zod";
import { NextResponse } from "next/server";
import { siteConfig } from "@/content/site";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  message: z.string().trim().min(10).max(4000),
});

type ContactPayload = z.infer<typeof contactSchema>;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function sendBrevoEmail(input: {
  apiKey: string;
  to: { email: string; name?: string }[];
  subject: string;
  text: string;
  html?: string;
  replyTo?: { email: string; name?: string };
}) {
  const senderEmail = process.env.BREVO_SENDER_EMAIL?.trim();
  if (!senderEmail) {
    throw new Error("BREVO_SENDER_EMAIL is not configured");
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": input.apiKey,
    },
    body: JSON.stringify({
      sender: {
        email: senderEmail,
        name: process.env.BREVO_SENDER_NAME?.trim() || siteConfig.name,
      },
      to: input.to,
      subject: input.subject,
      textContent: input.text,
      htmlContent: input.html ?? `<pre style="font-family:sans-serif;white-space:pre-wrap">${input.text}</pre>`,
      ...(input.replyTo ? { replyTo: input.replyTo } : {}),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Brevo error ${response.status}: ${detail}`);
  }
}

async function sendViaBrevo(payload: ContactPayload) {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  if (!apiKey) return null;

  const { name, email, message } = payload;
  const contactTo = process.env.CONTACT_TO?.trim() || siteConfig.email;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  await sendBrevoEmail({
    apiKey,
    to: [{ email: contactTo, name: siteConfig.name }],
    replyTo: { email, name },
    subject: `Portfolio contact from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `
      <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#111">
        <p><strong>From:</strong> ${safeName} &lt;${safeEmail}&gt;</p>
        <p style="white-space:pre-wrap">${safeMessage}</p>
      </div>
    `,
  });

  // Auto-reply: best-effort — don't fail the request if this errors
  try {
    await sendBrevoEmail({
      apiKey,
      to: [{ email, name }],
      subject: `Thanks for reaching out, ${name}`,
      text: [
        `Hi ${name},`,
        "",
        "Thanks for contacting me through my portfolio. I received your message and will get back to you soon.",
        "",
        "— Anurag Arya",
        siteConfig.email,
      ].join("\n"),
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#111">
          <p>Hi ${safeName},</p>
          <p>Thanks for contacting me through my portfolio. I received your message and will get back to you soon.</p>
          <p>— Anurag Arya<br/><a href="mailto:${siteConfig.email}">${siteConfig.email}</a></p>
        </div>
      `,
    });
  } catch (err) {
    console.error("[contact] Brevo auto-reply failed", err);
  }

  return NextResponse.json({ ok: true });
}

async function sendViaResend(payload: ContactPayload) {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (!resendKey) return null;

  const { name, email, message } = payload;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO ?? siteConfig.email],
      reply_to: email,
      subject: `Portfolio contact from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: `Could not send right now. Email me at ${siteConfig.email}`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Please check your name, email, and message." },
        { status: 400 },
      );
    }

    const { name, message } = parsed.data;

    try {
      const brevoResult = await sendViaBrevo(parsed.data);
      if (brevoResult) return brevoResult;
    } catch (err) {
      console.error("[contact] Brevo notify failed", err);
      return NextResponse.json(
        {
          ok: false,
          error: `Could not send right now. Email me at ${siteConfig.email}`,
        },
        { status: 502 },
      );
    }

    const resendResult = await sendViaResend(parsed.data);
    if (resendResult) return resendResult;

    // No email provider configured — accept and instruct client to use mailto fallback
    return NextResponse.json({
      ok: true,
      fallback: true,
      mailto: `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Portfolio inquiry from ${name}`)}&body=${encodeURIComponent(message)}`,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: `Something went wrong. Email me at ${siteConfig.email}`,
      },
      { status: 500 },
    );
  }
}
