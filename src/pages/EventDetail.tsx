import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, ExternalLink, User, Loader2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { usePublicEvent } from '@/hooks/useEvents';
import TagBadge from '@/components/TagBadge';
import type { EventTag } from '@/types/event';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: event, isLoading, error } = usePublicEvent(id || '');

  const formatTime = (time: string) => {
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-heading text-4xl text-foreground mb-4">EVENT NOT FOUND</h1>
        <p className="text-muted-foreground mb-6">This event doesn't exist or has been removed.</p>
        <Link to="/" className="text-primary hover:underline font-mono text-sm">
          ← BACK TO EVENTS
        </Link>
      </div>
    );
  }

  const formattedDate = event.date ? format(parseISO(event.date), 'EEEE, MMMM d, yyyy') : '';

  return (
    <article className="container mx-auto px-4 py-6 max-w-2xl">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-xs uppercase tracking-wide mb-6"
      >
        <ArrowLeft size={14} />
        BACK TO EVENTS
      </Link>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {(event.tags || []).map((tag) => (
          <TagBadge key={tag} tag={tag as EventTag} />
        ))}
      </div>

      {/* Event name */}
      <h1 className="font-heading text-5xl md:text-6xl text-foreground leading-none mb-6">
        {event.name}
      </h1>

      {/* Details */}
      <div className="border border-border p-4 mb-6 space-y-3">
        <div className="flex items-center gap-3">
          <Calendar size={16} className="text-primary shrink-0" />
          <span className="font-mono text-sm">{formattedDate}</span>
        </div>
        {event.start_time && event.finish_time && (
          <div className="flex items-center gap-3">
            <Clock size={16} className="text-primary shrink-0" />
            <span className="font-mono text-sm">
              {formatTime(event.start_time)} — {formatTime(event.finish_time)}
            </span>
          </div>
        )}
        <div className="flex items-center gap-3">
          <MapPin size={16} className="text-primary shrink-0" />
          <span className="text-sm">{event.location}</span>
        </div>
        <div className="flex items-center gap-3">
          <User size={16} className="text-primary shrink-0" />
          <span className="text-sm">Hosted by {event.host_name}</span>
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <p className="text-foreground leading-relaxed whitespace-pre-line">
          {event.description}
        </p>
      </div>

      {/* External link */}
      {event.external_link && (
        <a
          href={event.external_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading text-lg px-6 py-3 tracking-wide hover:bg-primary/90 transition-colors"
        >
          <ExternalLink size={18} />
          MORE INFO
        </a>
      )}

      {/* Social share placeholder */}
      <div className="mt-12 border border-dashed border-border p-4 text-center">
        <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
          SHARE — COMING SOON
        </p>
      </div>
    </article>
  );
};

export default EventDetail;
