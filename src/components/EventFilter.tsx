import { EVENT_TAGS, type EventTag } from '@/types/event';
import TagBadge from './TagBadge';

interface EventFilterProps {
  activeTags: EventTag[];
  onToggleTag: (tag: EventTag) => void;
  onClearTags: () => void;
}

const EventFilter = ({ activeTags, onToggleTag, onClearTags }: EventFilterProps) => {
  return (
    <div className="sticky top-14 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          <button
            onClick={onClearTags}
            className={`shrink-0 font-mono text-xs uppercase tracking-wider px-3 py-1.5 border transition-all ${
              activeTags.length === 0
                ? 'border-primary text-primary'
                : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground'
            }`}
          >
            ALL
          </button>
          {EVENT_TAGS.map((tag) => (
            <TagBadge
              key={tag}
              tag={tag}
              onClick={() => onToggleTag(tag)}
              active={activeTags.includes(tag)}
              className="shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventFilter;
