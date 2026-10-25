import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const PageTitle = ({ lead, highlight, sub }: { lead: string; highlight: string; sub?: string }) => (
  <div className="mb-8">
    <h1 className="font-heading text-5xl md:text-7xl leading-none">
      {lead} <span className="bg-primary px-2 box-decoration-clone">{highlight}</span>
    </h1>
    {sub && (
      <p className="font-mono text-xs text-muted-foreground mt-3 uppercase tracking-widest">{sub}</p>
    )}
  </div>
);

export const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="border border-border p-5 md:p-6 mb-4">
    <h2 className="font-heading text-3xl md:text-4xl leading-none mb-3">{title}</h2>
    <div className="space-y-3 text-sm md:text-base leading-relaxed">{children}</div>
  </section>
);

export const CtaLink = ({ to, children, primary }: { to: string; children: ReactNode; primary?: boolean }) => (
  <Link
    to={to}
    className={`inline-flex items-center justify-between gap-2 font-heading text-xl px-5 py-3 tracking-wide border transition-colors ${
      primary
        ? 'bg-primary text-primary-foreground border-foreground hover:bg-foreground hover:text-background'
        : 'border-border hover:border-foreground'
    }`}
  >
    {children} <ArrowRight size={18} />
  </Link>
);

/** A photo from public/studio/. */
export const StudioPhoto = ({ file, alt, className = '' }: { file: string; alt: string; className?: string }) => (
  <img
    src={`${import.meta.env.BASE_URL}studio/${file}`}
    alt={alt}
    loading="lazy"
    className={`w-full object-cover border border-border bg-muted ${className}`}
  />
);

export const BulletList =({ items }: { items: ReactNode[] }) => (
  <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
    {items.map((item, i) => (
      <li key={i} className="flex gap-2">
        <span className="text-muted-foreground" aria-hidden>▸</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export const Steps = ({ steps }: { steps: { title: string; body: ReactNode }[] }) => (
  <ol className="space-y-3">
    {steps.map((s, i) => (
      <li key={s.title} className="flex gap-4">
        <span className="font-heading text-3xl leading-none text-foreground w-6 shrink-0">{i + 1}</span>
        <div>
          <p className="font-heading text-xl tracking-wide leading-tight">{s.title}</p>
          <p className="text-sm md:text-base text-muted-foreground">{s.body}</p>
        </div>
      </li>
    ))}
  </ol>
);
