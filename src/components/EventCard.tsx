import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import type { EventPublicRow } from '@/hooks/useEvents';
import type { EventTag } from '@/types/event';
import TagBadge from './TagBadge';

interface EventCardProps {
  event: EventPublicRow;
}

const EventCard = ({ event }: EventCardProps) => {
  if (!event.id || !event.date || !event.name) return null;

  const formattedDate = format(parseISO(event.date), 'EEE, MMM d');

  const formatTime = (time: string) => {
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };

  return (
    <Link
      to={`/events/${event.id}`}
      className="group block border border-border bg-card hover:border-primary/50 transition-all duration-200"
    >
      <div className="p-4 md:p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {(event.tags || []).map((tag) => (
            <TagBadge key={tag} tag={tag as EventTag} />
          ))}
        </div>

        {/* Event name */}
        <h3 className="font-heading text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors leading-tight mb-3">
          {event.name}
        </h3>

        {/* Details row */}
        <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-primary shrink-0" />
            <span className="font-mono text-xs">{formattedDate}</span>
          </div>
          {event.start_time && event.finish_time && (
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-primary shrink-0" />
              <span className="font-mono text-xs">
                {formatTime(event.start_time)} — {formatTime(event.finish_time)}
              </span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-primary shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          )}
        </div>

        {/* External link hint */}
        {event.external_link && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <ExternalLink size={12} />
            <span className="truncate opacity-60">
              {(() => {
                try { return new URL(event.external_link).hostname; } catch { return 'link'; }
              })()}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default EventCard;
