import { Accordion } from '../../components/ui/Accordion.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { Section } from '../../components/ui/Section.jsx';
import { SectionHeading } from '../../components/ui/SectionHeading.jsx';
import faqs from '../../content/faqs.json';

export function FaqSection() {
  const top = faqs.filter((f) => f.top).slice(0, 5);
  return (
    <Section id="faq" containerClassName="max-w-4xl">
      <SectionHeading eyebrow="FAQ" title="Questions we hear often" />
      <Accordion
        items={top.map((f) => ({ id: f.id, title: f.question, content: <p>{f.answer}</p> }))}
      />
      <div className="mt-8 text-center">
        <Button to="/faq" variant="ghost">
          More questions →
        </Button>
      </div>
    </Section>
  );
}
