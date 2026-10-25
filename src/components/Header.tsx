import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { SUBMIT_FORM_URL } from '@/lib/sheetEvents';

const NAV_LINKS = [
  { to: '/', label: 'EVENTS' },
  { to: '/archive', label: 'ARCHIVE' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <Link to="/" className="font-heading text-2xl tracking-wider text-foreground">
            SEATTLE BIKE EVENTS
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-heading text-lg tracking-wide transition-colors hover:underline ${
                  location.pathname === link.to ? 'text-foreground underline decoration-primary decoration-4' : 'text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a href={SUBMIT_FORM_URL} target="_blank" rel="noopener noreferrer" className="font-heading text-lg tracking-wide bg-primary text-primary-foreground px-3 hover:bg-foreground hover:text-background transition-colors">SUBMIT</a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-foreground hover:underline transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-1 border-t border-border pt-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`font-heading text-2xl tracking-wide py-2 transition-colors hover:underline ${
                  location.pathname === link.to ? 'text-foreground underline decoration-primary decoration-4' : 'text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a href={SUBMIT_FORM_URL} target="_blank" rel="noopener noreferrer" className="font-heading text-2xl tracking-wide py-2">SUBMIT</a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
