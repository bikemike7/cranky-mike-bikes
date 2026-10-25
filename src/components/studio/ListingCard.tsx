import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORY_LABELS, type InventoryItem } from '@/data/inventory';
import { smsHref } from '@/lib/studio';

const photoUrl = (file: string) => `${import.meta.env.BASE_URL}inventory/${file}`;

const ListingCard = ({ item }: { item: InventoryItem }) => {
  const [photo, setPhoto] = useState(0);
  const inquire = smsHref(`Hi Mike, is the ${item.name} (${item.price}) still available?`);
  const specs = Object.entries(item.specs ?? {});

  return (
    <article className={`border flex flex-col ${item.sold ? 'border-border opacity-70' : 'border-primary bg-card'}`}>
      {item.photos.length > 0 && (
        <div>
          <img
            src={photoUrl(item.photos[photo])}
            alt={`${item.name}${item.photos.length > 1 ? `, photo ${photo + 1} of ${item.photos.length}` : ''}`}
            className="w-full aspect-[4/3] object-cover bg-muted"
            loading="lazy"
          />
          {item.photos.length > 1 && (
            <div className="flex gap-1 p-1 overflow-x-auto">
              {item.photos.map((p, i) => (
                <button
                  key={p}
                  onClick={() => setPhoto(i)}
                  aria-label={`Show photo ${i + 1}`}
                  aria-pressed={i === photo}
                  className={`shrink-0 border-2 ${i === photo ? 'border-foreground' : 'border-transparent'}`}
                >
                  <img src={photoUrl(p)} alt="" className="w-14 h-14 object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase border border-border px-2 py-0.5 text-muted-foreground">
            {CATEGORY_LABELS[item.category]}
          </span>
          {item.sold && <span className="font-mono text-xs uppercase bg-foreground text-background px-2 py-0.5">Sold</span>}
        </div>
        <h2 className="font-heading text-3xl leading-none">{item.name}</h2>
        <p className="font-heading text-2xl text-primary-foreground">
          <span className="bg-primary px-2">{item.price}</span>
        </p>
        {item.condition && (
          <p className="font-mono text-xs"><span className="text-muted-foreground uppercase">Condition:</span> {item.condition}</p>
        )}
        <p className="text-sm">{item.description}</p>
        {specs.length > 0 && (
          <dl className="font-mono text-xs grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 border-t border-border pt-2">
            {specs.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-muted-foreground uppercase">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        )}
        {!item.sold && (
          <div className="mt-auto pt-2">
            {inquire ? (
              <a href={inquire} className="inline-block font-heading text-lg tracking-wide border border-foreground px-4 py-1 hover:bg-foreground hover:text-background transition-colors">
                TEXT ABOUT THIS
              </a>
            ) : (
              <Link to="/repair-studio/contact" className="inline-block font-heading text-lg tracking-wide border border-foreground px-4 py-1 hover:bg-foreground hover:text-background transition-colors">
                ASK ABOUT THIS
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default ListingCard;
