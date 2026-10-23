import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, getPage } from "@/dictionaries";
import { hasLocale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { contact, href } from "@/site";
import CountUp from "@/components/CountUp";
import EnquiryForm from "@/components/page/EnquiryForm";
import FormSection from "@/components/page/FormSection";
import SplitHero from "@/components/page/SplitHero";
import { ArrowLabel } from "@/components/page/icons";
import { container, h2, stat, textLink } from "@/components/ui";
import { images } from "@/images";

export const generateMetadata = ({ params }: PageProps<"/[lang]/manufacturers">) =>
  pageMetadata(params, "manufacturers");

export default async function Manufacturers({ params }: PageProps<"/[lang]/manufacturers">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [{ nav, form }, { hero, benefits, numbers, steps, form: copy }] = await Promise.all([
    getDictionary(lang),
    getPage(lang, "manufacturers"),
  ]);
  const [info] = contact.emails;

  return (
    <>
      <SplitHero
        lang={lang}
        nav={nav}
        crumb={
          <>
            {nav.manufacturers}
            {hero.crumbNote && (
              <>
                {" · "}
                <span lang="it">{hero.crumbNote}</span>
              </>
            )}
          </>
        }
        title={hero.title}
        text={hero.text}
        primary={{ href: "#partner", label: hero.primary }}
        secondary={{ href: href(lang, "marketInsight"), label: hero.secondary }}
        image={images.cncMachining}
        imageAlt={hero.imageAlt}
      />

      <section className="bg-paper">
        <div className={`${container} flex flex-wrap gap-14 py-28`}>
          <h2 className={`${h2} reveal flex-[1_1_320px]`}>{benefits.title}</h2>
          <div className="grid flex-[2_1_min(640px,100%)] grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-x-12 gap-y-9">
            {benefits.items.map((item, i) => (
              <div
                key={item.title}
                className={`reveal pt-4.5 ${i < 2 ? "draw border-t-2 border-ink" : "border-t border-rule"}`}
              >
                <h3 className="m-0 mb-2 text-[19px] font-semibold">{item.title}</h3>
                <p className="m-0 leading-relaxed text-body">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${container} flex flex-wrap items-center gap-14 py-28`}>
        <div className="reveal flex-[1_1_min(380px,100%)]">
          <h2 className={`${h2} mb-4`}>{numbers.title}</h2>
          <p className="m-0 mb-5 max-w-[46ch] leading-relaxed text-body">{numbers.text}</p>
          <Link href={href(lang, "marketInsight")} className={textLink}>
            <ArrowLabel text={numbers.link} />
          </Link>
        </div>
        <div className="grid flex-[1.2_1_min(460px,100%)] grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
          {numbers.items.map((item, i) => (
            <div
              key={item.text}
              className={`reveal rounded-[10px] p-7 ${i === 0 ? "bg-night text-cream" : "bg-paper"}`}
            >
              <div className={stat}>
                <CountUp value={item.value} />
              </div>
              <p className={`mt-1.5 mb-0 text-[15px] ${i === 0 ? "text-mist" : "text-body"}`}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper">
        <div className={`${container} py-28`}>
          <h2 className={`${h2} reveal mb-12 max-w-[700px]`}>{steps.title}</h2>
          <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 p-0">
            {steps.items.map((item, i) => {
              const last = i === steps.items.length - 1;
              return (
                <li
                  key={item.title}
                  className={`reveal lift rounded-[10px] p-7 ${last ? "bg-night text-white" : "bg-card"}`}
                >
                  <span className={`text-sm font-semibold ${last ? "text-steel" : "text-sub"}`}>
                    {steps.label} {i + 1}
                  </span>
                  <h3 className="mt-2.5 mb-1.5 text-[19px] font-semibold">{item.title}</h3>
                  <p className={`m-0 leading-[1.55] ${last ? "text-mist" : "text-body"}`}>{item.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <FormSection id="partner" title={copy.title} text={copy.text} preferEmail={form.preferEmail} email={info}>
        <EnquiryForm
          id="partner"
          fields={[
            { name: "company", label: form.company, autoComplete: "organization", check: "required", error: form.errors.company },
            { name: "name", label: form.name, autoComplete: "name", check: "required", error: form.errors.name },
            { name: "email", label: form.email, type: "email", autoComplete: "email", check: "email", error: form.errors.email },
            { name: "category", label: copy.category, type: "select", options: copy.categories },
            { name: "message", label: copy.message, type: "textarea", hint: copy.messageHint, check: "message", error: copy.messageError },
          ]}
          to={info}
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
