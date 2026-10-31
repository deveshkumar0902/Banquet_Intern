import { useId, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '../../lib/cn.js';

/**
 * Accessible disclosure list. Each header is a <button> with aria-expanded / aria-controls.
 * @param {{ items: { id: string, title: React.ReactNode, content: React.ReactNode }[],
 *   multiple?: boolean, defaultOpen?: string[], headingLevel?: 2|3|4 }} props
 */
export function Accordion({
  items,
  multiple = false,
  defaultOpen = [],
  headingLevel = 3,
  className,
}) {
  const [open, setOpen] = useState(() => new Set(defaultOpen));
  const baseId = useId();
  const Heading = `h${headingLevel}`;

  const toggle = (id) =>
    setOpen((prev) => {
      const next = new Set(multiple ? prev : []);
      if (!prev.has(id)) next.add(id);
      return next;
    });

  return (
    <div className={cn('divide-y divide-cream-200 border-y border-cream-200', className)}>
      {items.map((item) => {
        const isOpen = open.has(item.id);
        const btnId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;
        return (
          <div key={item.id}>
            <Heading className="font-sans text-base font-medium">
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-ink-900 hover:text-clay-600"
              >
                <span>{item.title}</span>
                {isOpen ? (
                  <Minus aria-hidden="true" className="h-5 w-5 shrink-0 text-clay-600" />
                ) : (
                  <Plus aria-hidden="true" className="h-5 w-5 shrink-0 text-clay-600" />
                )}
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="pr-10 pb-5 text-ink-600"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
