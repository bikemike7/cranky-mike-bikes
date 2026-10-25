import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { usePublicEvents } from '@/hooks/useEvents';
import EventCard from '@/components/EventCard';

const Archive = () => {
  const { data: events, isLoading } = usePublicEvents({ past: true });

  return (
    <div className="container mx-auto px-4 py-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-xs uppercase tracking-wide mb-6"
      >
        <ArrowLeft size={14} />
        BACK TO EVENTS
      </Link>

      <h1 className="font-heading text-5xl md:text-7xl text-foreground leading-none mb-2">
        PAST <span className="text-secondary">EVENTS</span>
      </h1>
      <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-8">
        The rides that already happened
      </p>

      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      )}

      {!isLoading && events && events.length > 0 && (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {!isLoading && events && events.length === 0 && (
        <div className="text-center py-16 border border-dashed border-border">
          <p className="font-heading text-3xl text-muted-foreground">NO PAST EVENTS YET</p>
          <p className="text-sm text-muted-foreground mt-2">
            Check back after some events have rolled through.
          </p>
        </div>
      )}
    </div>
  );
};

export default Archive;
