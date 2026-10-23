import { notFound } from "next/navigation";
import { getDictionary, getPage } from "@/dictionaries";
import { hasLocale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { contact, href } from "@/site";
import EnquiryForm from "@/components/page/EnquiryForm";
import FormSection from "@/components/page/FormSection";
import RequirementChecklist from "@/components/page/RequirementChecklist";
import SplitHero from "@/components/page/SplitHero";
import { container, h2, stagger } from "@/components/ui";
import { images } from "@/images";

export const generateMetadata = ({ params }: PageProps<"/[lang]/buyers">) =>
  pageMetadata(params, "buyers");

export default async function Buyers({ params }: PageProps<"/[lang]/buyers">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [{ nav, form }, { hero, reasons, checklist, form: copy }] = await Promise.all([
    getDictionary(lang),
    getPage(lang, "buyers"),
  ]);
  const sales = contact.emails[1];

  return (
    <>
      <SplitHero
        lang={lang}
        nav={nav}
        crumb={nav.buyers}
        title={hero.title}
        text={hero.text}
        primary={{ href: "#request", label: hero.primary }}
        secondary={{ href: href(lang, "industries"), label: hero.secondary }}
        image={images.bottlingLine}
        imageAlt={hero.imageAlt}
      />

      <section className="bg-night text-cream">
        <div className={`${container} flex flex-wrap gap-14 py-28`}>
          <h2 className={`${h2} reveal flex-[1_1_320px]`}>{reasons.title}</h2>
          <div className="grid flex-[2_1_min(640px,100%)] grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-x-12 gap-y-9">
            {reasons.items.map((item, i) => (
              <div
                key={item.title}
                style={stagger(i % 2)}
                className={`reveal pt-4.5 ${i < 2 ? "draw border-t-2 border-cream [--draw:var(--color-cream)]" : "border-t border-rule-night"}`}
              >
                <h3 className="m-0 mb-2 text-[19px] font-semibold">{item.title}</h3>
                <p className="m-0 leading-relaxed text-mist">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${container} flex flex-wrap gap-14 py-28`}>
        <RequirementChecklist {...checklist} />
      </section>

      <FormSection id="request" tinted title={copy.title} text={copy.text} preferEmail={form.preferEmail} email={sales}>
        <EnquiryForm
          id="requirement"
          fields={[
            { name: "company", label: form.company, autoComplete: "organization", check: "required", error: form.errors.company },
            { name: "email", label: form.email, type: "email", autoComplete: "email", check: "email", error: form.errors.email },
            { name: "industry", label: form.industry, type: "select", options: form.industries },
            { name: "country", label: form.country, autoComplete: "country-name", hint: copy.countryHint },
            { name: "message", label: copy.message, type: "textarea", hint: copy.messageHint, check: "message", error: copy.messageError },
          ]}
          to={sales}
          subject={copy.subject}
          subjectField="company"
          submitLabel={copy.submit}
          sentTitle={copy.sent}
          fallback={form.fallback}
          againLabel={form.again}
          consent={form.consent}
          privacyLabel={form.privacy}
          privacyHref={href(lang, "privacy")}
        />
      </FormSection>
    </>
  );
}
