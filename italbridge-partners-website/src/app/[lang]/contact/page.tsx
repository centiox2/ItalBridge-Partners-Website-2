import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, getPage } from "@/dictionaries";
import { hasLocale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { contact, href } from "@/site";
import EnquiryForm from "@/components/page/EnquiryForm";
import { Breadcrumb } from "@/components/page/PageHeader";
import { container } from "@/components/ui";
import { images } from "@/images";

export const generateMetadata = ({ params }: PageProps<"/[lang]/contact">) =>
  pageMetadata(params, "contact");

export default async function Contact({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [{ nav, form }, { hero, details, form: copy }] = await Promise.all([
    getDictionary(lang),
    getPage(lang, "contact"),
  ]);
  const [info, sales] = contact.emails;

  const cards = [
    { label: details.general, value: info, href: `mailto:${info}` },
    { label: details.sales, value: sales, href: `mailto:${sales}` },
    ...contact.phones.flatMap((p) => [
      { label: details.phone, value: p.display, href: `tel:${p.tel}` },
      { label: details.whatsapp, value: p.display, href: p.whatsapp, external: true },
    ]),
  ];

  return (
    <section className={`${container} flex flex-wrap gap-10 sm:gap-16 pt-10 sm:pt-18 pb-18 sm:pb-30`}>
      <div className="min-w-0 flex-[1_1_min(380px,100%)]">
        <Breadcrumb lang={lang} nav={nav}>
          {nav.contact}
        </Breadcrumb>
        <h1 className="enter m-0 mb-5 text-[clamp(40px,4.4vw,60px)] leading-[1.03] font-semibold tracking-[-0.04em]">
          {hero.title}
        </h1>
        <p className="enter m-0 mb-10 max-w-[46ch] text-lg leading-[1.65] text-body">{hero.text}</p>
        <div className="enter grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-3">
          {cards.map((c) => (
            <a
              key={c.href}
              href={c.href}
              {...("external" in c && { target: "_blank", rel: "noopener noreferrer" })}
              className="lift block min-w-0 rounded-[10px] bg-paper p-5.5 hover:bg-chip-hover"
            >
              <span className="block text-sm text-sub">{c.label}</span>
              <strong className="mt-1.5 block font-medium [overflow-wrap:anywhere]">{c.value}</strong>
            </a>
          ))}
        </div>
        <figure className="reveal-img relative mt-6 overflow-hidden rounded-[10px]">
          <Image
            src={images.nairobi}
            alt={details.imageAlt}
            placeholder="blur"
            sizes="(min-width: 1400px) 570px, (min-width: 1000px) 43vw, 100vw"
            className="block aspect-[16/8] w-full object-cover"
          />
          <figcaption className="absolute bottom-4 left-4 rounded-lg bg-card px-3.5 py-2.5 font-medium shadow-[0_10px_24px_-12px_rgba(21,27,38,0.4)]">
            {details.caption}
          </figcaption>
        </figure>
      </div>
      <div className="min-w-0 flex-[1.2_1_min(480px,100%)] self-start rounded-xl bg-paper p-6 sm:p-10">
        <EnquiryForm
          id="consultation"
          audience={{
            legend: copy.audience,
            options: [
              { label: copy.manufacturer, who: copy.manufacturer, to: info, hint: copy.manufacturerHint },
              { label: copy.buyer, who: copy.buyer, to: sales, hint: copy.buyerHint },
            ],
          }}
          fields={[
            { name: "name", label: form.fullName, autoComplete: "name", check: "required", error: form.errors.name },
            { name: "company", label: form.company, autoComplete: "organization" },
            { name: "email", label: form.email, type: "email", autoComplete: "email", check: "email", error: form.errors.email },
            { name: "phone", label: form.phone, labelNote: form.optional, type: "tel", autoComplete: "tel" },
            { name: "industry", label: form.industry, type: "select", options: [...form.industries, copy.other], full: true },
            { name: "message", label: copy.message, type: "textarea", check: "message", error: copy.messageError },
          ]}
          to={info}
          subject={copy.subject}
          subjectField="name"
          submitLabel={copy.submit}
          sentTitle={copy.sent}
          fallback={form.fallback}
          againLabel={form.again}
          consent={form.consent}
          privacyLabel={form.privacy}
          privacyHref={href(lang, "privacy")}
        />
      </div>
    </section>
  );
}
