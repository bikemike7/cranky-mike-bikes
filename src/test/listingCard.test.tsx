import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ListingCard from '@/components/studio/ListingCard';
import type { InventoryItem } from '@/data/inventory';

// Test-only fixture; never shown on the site.
const item: InventoryItem = {
  id: 'test-bike',
  name: 'Test Bike',
  category: 'refurbished',
  price: '$100',
  description: 'A bike for testing.',
  photos: ['a.jpg', 'b.jpg'],
  condition: 'Good',
  specs: { 'Frame size': '56 cm' },
};

const renderCard = (i: InventoryItem) =>
  render(<MemoryRouter><ListingCard item={i} /></MemoryRouter>);

describe('ListingCard', () => {
  it('shows the listing details', () => {
    renderCard(item);
    expect(screen.getByRole('heading', { name: 'Test Bike' })).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('Refurbished bike')).toBeInTheDocument();
    expect(screen.getByText('Good')).toBeInTheDocument();
    expect(screen.getByText('56 cm')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /show photo/i })).toHaveLength(2);
  });

  it('opens a pre-filled text about the item', () => {
    renderCard(item);
    const href = screen.getByRole('link', { name: 'TEXT ABOUT THIS' }).getAttribute('href') ?? '';
    expect(href).toMatch(/^sms:\d+\?&body=/);
    expect(decodeURIComponent(href)).toContain('Test Bike ($100)');
  });

  it('marks sold items and hides the inquiry button', () => {
    renderCard({ ...item, sold: true });
    expect(screen.getByText('Sold')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /about this/i })).toBeNull();
  });
});
