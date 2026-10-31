import { Star } from 'lucide-react';
import { cn } from '../../lib/cn.js';

export function RatingStars({ rating, max = 5, className }) {
  return (
    <div
      role="img"
      aria-label={`${rating} out of ${max}`}
      className={cn('flex gap-0.5', className)}
    >
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn('h-4 w-4', i < rating ? 'fill-gold-500 text-gold-500' : 'text-cream-200')}
        />
      ))}
    </div>
  );
}
