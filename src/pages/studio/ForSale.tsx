import { useMemo, useState } from 'react';
import { CtaLink, PageTitle } from '@/components/studio/StudioUI';
import ListingCard from '@/components/studio/ListingCard';
import { CATEGORY_LABELS, INVENTORY, type InventoryCategory } from '@/data/inventory';

const ForSale = () => {
  const [category, setCategory] = useState<InventoryCategory | 'all'>('all');

  // Only offer filters for categories that actually have items
  const categories = useMemo(
    () => (Object.keys(CATEGORY_LABELS) as InventoryCategory[]).filter((c) => INVENTORY.some((i) => i.category === c)),
    [],
  );
  // Available items first, sold ones at the end
  const shown = INVENTORY
    .filter((i) => category === 'all' || i.category === category)
    .sort((a, b) => Number(!!a.sold) - Number(!!b.sold));

  const btn = (active: boolean) =>
    `font-heading text-lg px-4 py-1 border tracking-wide transition-colors ${
      active ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground hover:border-foreground'
    }`;

  return (
    <>
      <PageTitle lead="FOR" highlight="SALE" sub="Used, refurbished & custom bikes · Parts & accessories" />

      {INVENTORY.length === 0 ? (
        <div className="border border-dashed border-border p-8 text-center mb-6">
          <p className="font-heading text-4xl">THE RACK IS EMPTY</p>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            Nothing for sale at the moment. Bikes and parts get listed here as they're ready, so check
            back soon.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <CtaLink to="/repair-studio/custom-builds">OR BUILD ONE WITH ME</CtaLink>
          </div>
        </div>
      ) : (
        <>
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-4">
              <button onClick={() => setCategory('all')} className={btn(category === 'all')}>ALL</button>
              {categories.map((c) => (
                <button key={c} onClick={() => setCategory(c)} className={btn(category === c)}>
                  {CATEGORY_LABELS[c].toUpperCase()}
                </button>
              ))}
            </div>
          )}
          <div className="grid gap-3 sm:grid-cols-2 mb-6">
            {shown.map((item) => <ListingCard key={item.id} item={item} />)}
          </div>
          <p className="text-sm text-muted-foreground">
            See something you like? Text me about it. And same rule as always: I won't sell you
            something you don't need.
          </p>
        </>
      )}
    </>
  );
};

export default ForSale;
