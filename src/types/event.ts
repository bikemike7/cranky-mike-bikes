export const EVENT_TAGS = [
  'Race',
  'Alleycat',
  'Group Ride',
  'Show',
  'Protest',
  'Party',
  'WTF',
  'ABC',
] as const;

export type EventTag = (typeof EVENT_TAGS)[number];

export type EventStatus = 'pending' | 'approved' | 'rejected';
export type EventSource = 'submitted' | 'admin';

export interface BikeEvent {
  id: string;
  name: string;
  date: string;
  start_time: string;
  finish_time: string;
  location: string;
  description: string;
  external_link?: string | null;
  tags: EventTag[];
  host_name: string;
  host_phone?: string | null;
  submitter_name?: string | null;
  submitter_phone?: string | null;
  status: EventStatus;
  source: EventSource;
  city?: string;
  created_at: string;
}
