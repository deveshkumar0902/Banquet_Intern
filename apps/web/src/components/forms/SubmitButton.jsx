import { Loader2 } from 'lucide-react';
import { Button } from '../ui/Button.jsx';

export function SubmitButton({ pending, children, pendingText = 'Sending…', className }) {
  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      aria-disabled={pending}
      className={className}
    >
      {pending && <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" />}
      {pending ? pendingText : children}
    </Button>
  );
}
