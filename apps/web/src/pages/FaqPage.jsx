import { Accordion } from '../components/ui/Accordion.jsx';
import { Section } from '../components/ui/Section.jsx';
import faqs from '../content/faqs.json';
import { faqJsonLd } from '../lib/seo.js';
import { routeByPage } from '../app/routes.js';
import { InnerPage } from './InnerPage.jsx';

const categories = [...new Set(faqs.map((f) => f.category))];
const route = routeByPage('faq');

export default function FaqPage() {
  return (
    <InnerPage
      page="faq"
      subtitle="Everything you need to know before you book. Can’t find your answer? Just ask us."
      seo={{
        title: route.title,
        description: route.description,
        path: route.path,
        jsonLd: faqJsonLd(faqs),
      }}
    >
      <Section containerClassName="max-w-4xl space-y-12">
        {categories.map((cat) => (
          <div key={cat}>
            <h2 className="mb-4 text-2xl font-semibold text-clay-600">{cat}</h2>
            <Accordion
              multiple
              items={faqs
                .filter((f) => f.category === cat)
                .map((f) => ({ id: f.id, title: f.question, content: <p>{f.answer}</p> }))}
            />
          </div>
        ))}
      </Section>
    </InnerPage>
  );
}
