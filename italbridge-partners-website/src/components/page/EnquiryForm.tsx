"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { buttonInk } from "../ui";

type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  options?: string[];
  autoComplete?: string;
  // Shown after the label in a lighter weight, e.g. "(optional)".
  labelNote?: string;
  hint?: string;
  // How the value is checked on submit; `error` is the message shown if it fails.
  check?: "required" | "email" | "message";
  error?: string;
  full?: boolean;
};

// Who is writing: switches the recipient, the message hint and a line in the email.
type Audience = {
  legend: string;
  options: { label: string; to: string; hint: string; who: string }[];
};

const control =
  "w-full rounded-md border border-field bg-card px-3.5 py-3 text-ink aria-invalid:border-error";

function isValid(check: Field["check"], value: string) {
  if (check === "required") return value !== "";
  if (check === "email") return /^\S+@\S+\.\S+$/.test(value);
  if (check === "message") return value.length >= 10;
  return true;
}

// Until the site has a mail service, submitting opens the visitor's email
// app with the form contents addressed to `to`.
export default function EnquiryForm({
  id,
  fields,
  to,
  subject,
  subjectField,
  audience,
  submitLabel,
  sentTitle,
  fallback,
  againLabel,
  consent,
  privacyLabel,
  privacyHref,
}: {
  id: string;
  fields: Field[];
  to: string;
  subject: string;
  // Value of this field is appended to the subject ("Equipment requirement — Acme").
  subjectField?: string;
  audience?: Audience;
  submitLabel: string;
  sentTitle: string;
  fallback: string;
  againLabel: string;
  consent: string;
  privacyLabel: string;
  privacyHref: string;
}) {
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [sentTo, setSentTo] = useState<string | null>(null);
  const sentRef = useRef<HTMLDivElement>(null);
  // The submit button disappears with the form: move focus to the confirmation
  // so keyboard and screen reader users are not left at the top of the page.
  useEffect(() => {
    if (sentTo) sentRef.current?.focus();
  }, [sentTo]);
  const [who, setWho] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const picked = audience?.options[who];
  const recipient = picked?.to ?? to;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();

    const failed: Record<string, boolean> = {};
    for (const f of fields) if (!isValid(f.check, value(f.name))) failed[f.name] = true;
    setErrors(failed);
    const first = fields.find((f) => failed[f.name]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#${id}-${first.name}`)?.focus();
      return;
    }

    const lines = fields.map((f) => `${f.label}: ${value(f.name) || "-"}`);
    if (picked && audience) lines.unshift(`${audience.legend}: ${picked.who}`);
    const extra = subjectField ? value(subjectField) : "";
    const fullSubject = [subject, picked?.who, extra].filter(Boolean).join(" — ");
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(lines.join("\n\n"))}`;
    setSentTo(recipient);
  }

  if (sentTo) {
    return (
      <div ref={sentRef} tabIndex={-1} role="status" className="fade flex flex-col items-start gap-3.5 outline-none">
        <p className="m-0 text-[26px] leading-tight font-semibold">{sentTitle}</p>
        <p className="m-0 leading-relaxed text-body">
          {fallback}{" "}
          <a href={`mailto:${sentTo}`} className="font-medium underline">
            {sentTo}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setSentTo(null)}
          className="btn cursor-pointer rounded-md border border-field bg-card px-5 py-3 font-medium text-ink"
        >
          {againLabel}
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-5"
    >
      {audience && (
        <fieldset className="col-span-full m-0 border-0 p-0">
          <legend className="mb-2.5 font-medium">{audience.legend}</legend>
          <div className="inline-flex flex-wrap gap-1 rounded-lg bg-toggle p-1">
            {audience.options.map((o, i) => (
              <button
                key={o.who}
                type="button"
                aria-pressed={i === who}
                onClick={() => setWho(i)}
                className={`cursor-pointer rounded-md border-0 px-4 py-2.5 text-sm font-medium ${
                  i === who ? "bg-pill text-ink shadow-[0_2px_6px_-2px_rgba(21,27,38,0.18)]" : "bg-transparent text-sub"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </fieldset>
      )}
      {fields.map((f) => {
        const fieldId = `${id}-${f.name}`;
        const invalid = errors[f.name];
        const hint = f.type === "textarea" && picked ? picked.hint : f.hint;
        const describedBy = [hint && `${fieldId}-hint`, invalid && `${fieldId}-error`].filter(Boolean).join(" ");
        const common = {
          id: fieldId,
          name: f.name,
          autoComplete: f.autoComplete,
          "aria-invalid": invalid || undefined,
          "aria-describedby": describedBy || undefined,
        };
        return (
          <div key={f.name} className={`flex flex-col gap-2 ${f.full || f.type === "textarea" ? "col-span-full" : ""}`}>
            <label htmlFor={fieldId} className="font-medium">
              {f.label}
              {f.labelNote && <span className="font-normal text-faint"> {f.labelNote}</span>}
            </label>
            {f.type === "textarea" ? (
              <textarea {...common} rows={5} className={`${control} resize-y`} />
            ) : f.type === "select" ? (
              <select {...common} className={control}>
                {f.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input {...common} type={f.type ?? "text"} className={control} />
            )}
            {hint && (
              <span id={`${fieldId}-hint`} className="text-sm text-faint">
                {hint}
              </span>
            )}
            {invalid && (
              <span id={`${fieldId}-error`} className="text-sm text-error">
                {f.error}
              </span>
            )}
          </div>
        );
      })}
      <div className="col-span-full flex flex-wrap items-center gap-x-5 gap-y-3">
        <button type="submit" className={`${buttonInk} cursor-pointer border-0 px-6 py-3.5 font-medium`}>
          {submitLabel}
        </button>
        <span className="text-sm text-faint">
          {consent}{" "}
          <Link href={privacyHref} className="underline">
            {privacyLabel}
          </Link>
          .
        </span>
      </div>
    </form>
  );
}
