import { Button } from '../components/ui/Button.jsx';
import { Section } from '../components/ui/Section.jsx';
import { InnerPage } from './InnerPage.jsx';

export default function NotFoundPage() {
  return (
    <InnerPage
      page="notFound"
      title="Page not found"
      subtitle="Sorry, we couldn’t find that page. It may have moved."
      seo={{
        title: 'Page Not Found',
        description: 'This page could not be found.',
        path: '/404',
        noindex: true,
      }}
      cta={false}
    >
      <Section containerClassName="flex flex-col items-center gap-4 text-center">
        <p className="text-lg text-ink-600">Here are some places to start:</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/">Go to the home page</Button>
          <Button to="/contact" variant="outline">
            Contact us
          </Button>
        </div>
      </Section>
    </InnerPage>
  );
}
