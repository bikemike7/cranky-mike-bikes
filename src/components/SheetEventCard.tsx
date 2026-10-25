import { MapPin, Clock, User, ExternalLink } from 'lucide-react';
import type { SheetEvent } from '@/lib/sheetEvents';

interface SheetEventCardProps {
  event: SheetEvent;
  onTagClick?: (tag: string) => void;
}

const SheetEventCard = ({ event: e, onTagClick }: SheetEventCardProps) => (
  <article className={`border p-4 flex flex-col gap-2 ${e.timing === 'Past' ? 'border-border opacity-70' : 'border-primary bg-card'}`}>
    <div className="flex items-center justify-between gap-2">
      <span className={`font-mono text-xs px-2 py-0.5 uppercase ${e.timing === 'Upcoming' ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}>
        {e.timing}
      </span>
      {e.status && <span className="font-mono text-[10px] text-muted-foreground uppercase">{e.status}</span>}
    </div>
    <h2 className="font-heading text-3xl leading-none">{e.name || 'Untitled event'}</h2>
    <div className="font-mono text-xs space-y-1 text-muted-foreground">
      {(e.date || e.time) && <p className="flex items-center gap-1"><Clock size={12} /> {e.date} {e.time}</p>}
      {e.location && <p className="flex items-center gap-1"><MapPin size={12} /> {e.location}</p>}
      {e.host && <p className="flex items-center gap-1"><User size={12} /> {e.host}</p>}
    </div>
    {e.description && <p className="text-sm">{e.description}</p>}
    {e.tags.length > 0 && (
      <div className="flex flex-wrap gap-1">
        {e.tags.map((t) => onTagClick ? (
          <button key={t} onClick={() => onTagClick(t)} className="font-mono text-[10px] uppercase border border-foreground px-2 py-0.5 hover:bg-primary">{t}</button>
        ) : (
          <span key={t} className="font-mono text-[10px] uppercase border border-foreground px-2 py-0.5">{t}</span>
        ))}
      </div>
    )}
    {/^https?:\/\//.test(e.link) && (
      <a href={e.link} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1 font-mono text-xs underline">
        MORE INFO <ExternalLink size={12} />
      </a>
    )}
  </article>
);

export default SheetEventCard;
