import { Container } from '../../components/ui/Container.jsx';
import { StatCounter } from '../../components/ui/StatCounter.jsx';
import stats from '../../content/stats.json';
import { visibleItems } from '../../lib/content.js';

export function StatsStrip() {
  const items = visibleItems(stats);
  if (!items.length) return null;
  return (
    <section
      aria-label="Our numbers"
      className="on-dark border-t border-white/10 bg-clay-900 py-12"
    >
      <Container>
        {items.some((s) => !s.verified) && (
          <p className="mb-6 text-center text-xs text-gold-400">
            Sample figures: awaiting owner confirmation
          </p>
        )}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {items.map((s) => (
            <StatCounter key={s.id} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </Container>
    </section>
  );
}
