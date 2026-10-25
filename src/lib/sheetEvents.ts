export const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1mxP2-lY1-fhWoHr_LOBLFw4OXnEHmhC8yuqZraPCGdM/gviz/tq?tqx=out:csv&gid=391523453';
export const SUBMIT_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSecytwjFuGMaSWyyzpgxYQOCyYYVcOgmP_1-E0CmfXWss3YKw/viewform';

export type Timing = 'Upcoming' | 'Past' | 'Unknown';

export interface SheetEvent {
  uid: string;
  timestamp: string;
  date: string;
  time: string;
  location: string;
  name: string;
  description: string;
  link: string;
  tags: string[];
  host: string;
  status: string;
  dateValue: Date | null;
  timing: Timing;
}

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

export function parseDate(s: string): Date | null {
  const m = s.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (!m) return null;
  return new Date(Number(m[3]), Number(m[1]) - 1, Number(m[2]));
}

/** Upcoming = today or later. Past = earlier than today. */
export function getTiming(date: Date | null, now = new Date()): Timing {
  if (!date) return 'Unknown';
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return date.getTime() >= today.getTime() ? 'Upcoming' : 'Past';
}

export function rowsToEvents(rows: string[][], now = new Date()): SheetEvent[] {
  if (rows.length < 2) return [];
  const head = rows[0].map((h) => h.trim().toLowerCase());
  const col = (r: string[], k: string) => (r[head.indexOf(k)] ?? '').trim();
  return rows.slice(1)
    .filter((r) => r.some((c) => c.trim()))
    .map((r) => {
      const dateValue = parseDate(col(r, 'date'));
      return {
        uid: col(r, 'uid'),
        timestamp: col(r, 'timestamp'),
        date: col(r, 'date'),
        time: col(r, 'time'),
        location: col(r, 'location'),
        name: col(r, 'name'),
        description: col(r, 'description'),
        link: col(r, 'link'),
        tags: col(r, 'tags').split(/[,;]/).map((t) => t.trim()).filter(Boolean),
        host: col(r, 'host'),
        status: col(r, 'pending'),
        dateValue,
        timing: getTiming(dateValue, now),
      };
    });
}

export async function fetchSheetEvents(): Promise<SheetEvent[]> {
  const res = await fetch(SHEET_CSV_URL);
  if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
  return rowsToEvents(parseCsv(await res.text()));
}
