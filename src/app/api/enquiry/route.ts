import { contact } from "@/site";

// Receives the site's forms (EnquiryForm) and emails them to the team via
// Resend. Needs the RESEND_API_KEY secret on the Worker; without it the route
// answers 503 and the form falls back to opening the visitor's email app.

const FROM = "ItalBridge Partners website <website@italbridgepartners.co.ke>";
const MAX_LINES = 20;
const MAX_LINE = 5000;

type Body = {
  to?: unknown;
  subject?: unknown;
  lines?: unknown;
  replyTo?: unknown;
  page?: unknown;
  // Honeypot: a hidden field people never see or fill in; bots usually do.
  website?: unknown;
};

const isEmail = (v: string) => /^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/.test(v);
// No line breaks in headers, and keep them short.
const oneLine = (v: string, max: number) => v.replace(/[\r\n]+/g, " ").trim().slice(0, max);

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return Response.json({ error: "not_configured" }, { status: 503 });

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  // Pretend success to bots so they do not retry.
  if (typeof body.website === "string" && body.website !== "") return Response.json({ ok: true });

  // Only the site's own addresses can receive mail, so the route cannot be
  // used to send email anywhere else.
  const to = typeof body.to === "string" ? body.to : "";
  if (!contact.emails.includes(to)) return Response.json({ error: "bad_recipient" }, { status: 400 });

  const subject = typeof body.subject === "string" ? oneLine(body.subject, 200) : "";
  const lines = Array.isArray(body.lines)
    ? body.lines.filter((l): l is string => typeof l === "string").slice(0, MAX_LINES).map((l) => l.slice(0, MAX_LINE))
    : [];
  if (!subject || lines.length === 0) return Response.json({ error: "bad_request" }, { status: 400 });

  const replyTo = typeof body.replyTo === "string" ? oneLine(body.replyTo, 254) : "";
  const page = typeof body.page === "string" ? oneLine(body.page, 200) : "";
  const text = [...lines, page && `Sent from: ${page}`].filter(Boolean).join("\n\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [to],
      subject,
      text,
      // Replying to the email answers the visitor directly.
      ...(isEmail(replyTo) ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
