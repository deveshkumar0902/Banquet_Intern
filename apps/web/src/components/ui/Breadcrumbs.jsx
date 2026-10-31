import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

/** @param {{ items: { label: string, to?: string }[] }} props  last item is the current page */
export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-cream-100">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1">
              {last || !item.to ? (
                <span aria-current={last ? 'page' : undefined}>{item.label}</span>
              ) : (
                <Link to={item.to} className="underline-offset-4 hover:text-white hover:underline">
                  {item.label}
                </Link>
              )}
              {!last && <ChevronRight aria-hidden="true" className="h-4 w-4 opacity-70" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
