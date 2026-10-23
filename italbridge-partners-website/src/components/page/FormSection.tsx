import type { ReactNode } from "react";
import { container, h2 } from "../ui";

// Heading, intro and an email fallback beside a form card.
export default function FormSection({
  id,
  title,
  text,
  preferEmail,
  email,
  tinted = false,
  children,
}: {
  id: string;
  title: string;
  text: string;
  preferEmail: string;
  email: string;
  // Tinted section with a white card, or a white section with a tinted card.
  tinted?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-4 ${tinted ? "bg-paper" : ""}`}>
      <div className={`${container} flex flex-wrap gap-16 py-30`}>
        <div className="reveal flex-[1_1_min(340px,100%)]">
          <h2 className={`${h2} mb-4`}>{title}</h2>
          <p className="m-0 mb-6 max-w-[42ch] leading-relaxed text-body">{text}</p>
          <p className="m-0 text-body">
            {preferEmail}{" "}
            <a href={`mailto:${email}`} className="break-all underline hover:text-hover">
              {email}
            </a>
          </p>
        </div>
        <div className={`reveal min-w-0 flex-[1.4_1_min(480px,100%)] rounded-xl p-6 sm:p-10 ${tinted ? "bg-card" : "bg-paper"}`}>
          {children}
        </div>
      </div>
    </section>
  );
}
