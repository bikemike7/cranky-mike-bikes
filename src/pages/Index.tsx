import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Loader2 } from 'lucide-react';
import { fetchSheetEvents, SUBMIT_FORM_URL, type SheetEvent } from '@/lib/sheetEvents';
import SheetEventCard from '@/components/SheetEventCard';

type TimingFilter = 'All' | 'Upcoming' | 'Past';
type SortKey = 'date-asc' | 'date-desc' | 'name' | 'submitted';

const sorters: Record<SortKey, (a: SheetEvent, b: SheetEvent) => number> = {
  'date-asc': (a, b) => (a.dateValue?.getTime() ?? Infinity) - (b.dateValue?.getTime() ?? Infinity),
  'date-desc': (a, b) => (b.dateValue?.getTime() ?? -Infinity) - (a.dateValue?.getTime() ?? -Infinity),
  name: (a, b) => a.name.localeCompare(b.name),
  submitted: (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
};

const Index = () => {
  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ['sheet-events'],
    queryFn: fetchSheetEvents,
    staleTime: 60_000,
  });
  const [timing, setTiming] = useState<TimingFilter>('All');
  const [tag, setTag] = useState<string>('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortKey>('date-asc');

  const allTags = useMemo(
    () => Array.from(new Set(events.flatMap((e) => e.tags))).sort(),
    [events],
  );

  const shown = useMemo(() => {
    const q = search.toLowerCase();
    return events
      .filter((e) => timing === 'All' || e.timing === timing)
      .filter((e) => !tag || e.tags.includes(tag))
      .filter((e) =>
        !q || [e.name, e.location, e.host, e.description].some((f) => f.toLowerCase().includes(q)),
      )
      .sort(sorters[sort]);
  }, [events, timing, tag, search, sort]);

  const btn = (active: boolean) =>
    `font-heading text-lg px-4 py-1 border tracking-wide transition-colors ${
      active ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground hover:border-foreground'
    }`;

  return (
    <section className="container mx-auto px-4 py-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="font-heading text-5xl md:text-7xl leading-none">
            WHAT'S <span className="bg-primary px-2">ROLLING</span>
          </h1>
          <p className="font-mono text-xs text-muted-foreground mt-2 uppercase tracking-widest">
            Seattle bike events — races, rides, chaos
          </p>
        </div>
        <a href={SUBMIT_FORM_URL} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading text-lg px-6 py-3 tracking-wide border border-foreground hover:bg-foreground hover:text-background transition-colors self-start">
          <Plus size={18} /> SUBMIT EVENT
        </a>
      </div>

      <div className="space-y-3 mb-6 border border-border p-4">
        <div className="flex flex-wrap gap-2">
          {(['All', 'Upcoming', 'Past'] as TimingFilter[]).map((t) => (
            <button key={t} onClick={() => setTiming(t)} className={btn(timing === t)}>{t.toUpperCase()}</button>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, location, host…"
            className="flex-1 bg-background border border-border px-3 py-2 font-mono text-sm focus:outline-none focus:border-foreground" />
          <select value={tag} onChange={(e) => setTag(e.target.value)}
            className="bg-background border border-border px-3 py-2 font-mono text-sm" aria-label="Filter by tag">
            <option value="">All tags</option>
            {allTags.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}
            className="bg-background border border-border px-3 py-2 font-mono text-sm" aria-label="Sort">
            <option value="date-asc">Date: soonest first</option>
            <option value="date-desc">Date: latest first</option>
            <option value="name">Name A–Z</option>
            <option value="submitted">Recently submitted</option>
          </select>
        </div>
        <p className="font-mono text-xs text-muted-foreground">{shown.length} of {events.length} events</p>
      </div>

      {isLoading && (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin" size={32} /></div>
      )}
      {error && (
        <div className="text-center py-16 border border-foreground p-6">
          <p className="font-heading text-2xl">SOMETHING BROKE</p>
          <p className="text-sm text-muted-foreground mt-2">Couldn't load events. Try refreshing.</p>
        </div>
      )}
      {!isLoading && !error && shown.length === 0 && (
        <p className="text-center py-16 font-heading text-3xl text-muted-foreground">NO EVENTS FOUND</p>
      )}

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((e, i) => (
          <SheetEventCard key={e.uid || i} event={e} onTagClick={setTag} />
        ))}
      </div>
    </section>
  );
};

export default Index;
