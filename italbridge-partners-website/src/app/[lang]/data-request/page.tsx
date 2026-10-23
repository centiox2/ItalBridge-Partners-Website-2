import { notFound } from "next/navigation";
import { getDictionary, getPage } from "@/dictionaries";
import { hasLocale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { contact, href } from "@/site";
import EnquiryForm from "@/components/page/EnquiryForm";
import FormSection from "@/components/page/FormSection";
import PageHeader from "@/components/page/PageHeader";
import { container, h2, stagger } from "@/components/ui";

export const generateMetadata = ({ params }: PageProps<"/[lang]/data-request">) =>
  pageMetadata(params, "dataRequest");

export default async function DataRequest({ params }: PageProps<"/[lang]/data-request">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [{ nav, form, footer }, page] = await Promise.all([getDictionary(lang), getPage(lang, "dataRequest")]);
  const { rights, form: request } = page;
  const [info] = contact.emails;

  return (
    <>
      <PageHeader lang={lang} nav={nav} crumb={footer.dataRequest} title={page.title} text={page.intro} />

      <section className="bg-paper">
        <div className={`${container} flex flex-wrap gap-14 py-28`}>
          <div className="reveal flex-[1_1_min(360px,100%)]">
            <h2 className={`${h2} mb-4`}>{rights.title}</h2>
            <p className="m-0 max-w-[48ch] leading-relaxed text-body">{rights.text}</p>
          </div>
          <ul aria-label={rights.label} className="m-0 grid flex-[1.6_1_min(560px,100%)] list-none grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-0">
            {rights.items.map((item, i) => (
              <li key={item.title} className="reveal draw border-t-2 border-ink pt-4.5" style={stagger(i)}>
                <h3 className="m-0 mb-2 text-[19px] font-semibold">{item.title}</h3>
                <p className="m-0 leading-relaxed text-body">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FormSection id="request" title={request.title} text={request.note} preferEmail={form.preferEmail} email={info}>
        <EnquiryForm
          id="data-request"
          fields={[
            { name: "name", label: form.fullName, autoComplete: "name", check: "required", error: form.errors.name },
            { name: "email", label: form.email, type: "email", autoComplete: "email", check: "email", error: form.errors.email },
            { name: "type", label: request.requestType, type: "select", options: request.options, full: true },
            { name: "details", label: request.details, labelNote: form.optional, type: "textarea" },
          ]}
          to={info}
          subject={request.subject}
          subjectField="type"
          submitLabel={request.submit}
          sentTitle={request.sent}
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
