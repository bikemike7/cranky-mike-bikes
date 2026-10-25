import { MessageSquare } from 'lucide-react';
import { STUDIO_PHONE, smsHref } from '@/lib/studio';

/**
 * "Text Mike" button. Until STUDIO_PHONE is set it renders nothing on the live
 * site, and a dashed reminder box during local development.
 */
const TextMike = ({ label = 'TEXT MIKE', body, showNumber = true }: { label?: string; body?: string; showNumber?: boolean }) => {
  const href = smsHref(body);
  if (!href) {
    return import.meta.env.DEV ? (
      <span className="inline-flex items-center gap-2 border border-dashed border-foreground font-mono text-xs uppercase px-4 py-3">
        <MessageSquare size={16} /> [Set STUDIO_PHONE in src/lib/studio.ts]
      </span>
    ) : null;
  }
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading text-xl px-5 py-3 tracking-wide border border-foreground hover:bg-foreground hover:text-background transition-colors"
    >
      <MessageSquare size={18} /> {label}{showNumber && `: ${STUDIO_PHONE}`}
    </a>
  );
};

export default TextMike;
