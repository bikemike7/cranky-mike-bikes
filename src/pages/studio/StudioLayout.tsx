import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { STUDIO_PAGES } from '@/lib/studio';

const StudioLayout = () => {
  const { pathname } = useLocation();
  const onAbout = pathname.replace(/\/$/, '') === '/repair-studio';

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <nav aria-label="Repair studio" className="mb-6 border-b border-border">
        <ul className="flex flex-wrap gap-x-1">
          {STUDIO_PAGES.map((p) => (
            <li key={p.to}>
              <NavLink
                to={p.to}
                end={p.end}
                className={({ isActive }) =>
                  `block font-heading text-lg tracking-wide px-3 py-2 border-b-4 transition-colors ${
                    isActive ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`
                }
              >
                {p.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {!onAbout && (
        <Link
          to="/repair-studio"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-mono text-xs uppercase tracking-wide mb-6"
        >
          <ArrowLeft size={14} />
          Back to About
        </Link>
      )}

      <Outlet />
    </div>
  );
};

export default StudioLayout;
