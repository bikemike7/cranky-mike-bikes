import type { EventTag } from '@/types/event';
import { cn } from '@/lib/utils';

const TAG_STYLES: Record<EventTag, string> = {
  Race: 'bg-tag-race/20 text-tag-race border-tag-race/40',
  Alleycat: 'bg-tag-alleycat/20 text-tag-alleycat border-tag-alleycat/40',
  'Group Ride': 'bg-tag-group-ride/20 text-tag-group-ride border-tag-group-ride/40',
  Show: 'bg-tag-show/20 text-tag-show border-tag-show/40',
  Protest: 'bg-tag-protest/20 text-tag-protest border-tag-protest/40',
  Party: 'bg-tag-party/20 text-tag-party border-tag-party/40',
  WTF: 'bg-tag-wtf/20 text-tag-wtf border-tag-wtf/40',
  ABC: 'bg-tag-abc/20 text-tag-abc border-tag-abc/40',
};

interface TagBadgeProps {
  tag: EventTag;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

const TagBadge = ({ tag, onClick, active, className }: TagBadgeProps) => {
  const baseStyles = TAG_STYLES[tag];
  const Component = onClick ? 'button' : 'span';

  return (
    <Component
      onClick={onClick}
      className={cn(
        'inline-flex items-center border px-2.5 py-1 text-xs font-bold uppercase tracking-wider transition-all',
        baseStyles,
        onClick && 'cursor-pointer hover:scale-105',
        active && 'ring-1 ring-current scale-105',
        !active && onClick && 'opacity-60 hover:opacity-100',
        className,
      )}
    >
      {tag}
    </Component>
  );
};

export default TagBadge;
