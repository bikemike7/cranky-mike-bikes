import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield, LogOut, Loader2, Check, X, Trash2, Plus, Phone, User,
  Calendar, Clock, MapPin, ChevronDown, ChevronUp,
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useAuth } from '@/hooks/useAuth';
import {
  useAdminEvents, useApproveEvent, useRejectEvent, useDeleteEvent, useCreateEvent,
} from '@/hooks/useEvents';
import type { EventRow } from '@/hooks/useEvents';
import { EVENT_TAGS, type EventTag } from '@/types/event';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import TagBadge from '@/components/TagBadge';
import { useToast } from '@/hooks/use-toast';

type TabFilter = 'pending' | 'approved' | 'all';

const Admin = () => {
  const { user, loading: authLoading, isModerator, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabFilter>('pending');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const statusFilter = activeTab === 'all' ? undefined : activeTab;
  const { data: events, isLoading } = useAdminEvents(statusFilter);
  const approveEvent = useApproveEvent();
  const rejectEvent = useRejectEvent();
  const deleteEvent = useDeleteEvent();

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Shield className="mx-auto text-muted-foreground mb-4" size={48} />
        <h1 className="font-heading text-4xl text-foreground mb-4">NOT LOGGED IN</h1>
        <Link
          to="/admin/login"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading text-lg px-6 py-3 tracking-wide hover:bg-primary/90 transition-colors"
        >
          GO TO LOGIN
        </Link>
      </div>
    );
  }

  if (!isModerator) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Shield className="mx-auto text-destructive mb-4" size={48} />
        <h1 className="font-heading text-4xl text-foreground mb-4">UNAUTHORIZED</h1>
        <p className="text-muted-foreground mb-6">Your account does not have moderator access.</p>
        <Button variant="outline" onClick={() => signOut().then(() => navigate('/'))}>
          SIGN OUT
        </Button>
      </div>
    );
  }

  const handleApprove = async (id: string) => {
    await approveEvent.mutateAsync(id);
    toast({ title: 'Event approved', description: 'The event is now live.' });
  };

  const handleReject = async (id: string) => {
    await rejectEvent.mutateAsync(id);
    toast({ title: 'Event rejected' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this event? This cannot be undone.')) return;
    await deleteEvent.mutateAsync(id);
    toast({ title: 'Event deleted' });
  };

  const tabs: { key: TabFilter; label: string }[] = [
    { key: 'pending', label: 'PENDING' },
    { key: 'approved', label: 'APPROVED' },
    { key: 'all', label: 'ALL' },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Shield className="text-primary" size={24} />
          <h1 className="font-heading text-4xl text-foreground">MOD PANEL</h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => signOut().then(() => navigate('/'))}
          className="text-muted-foreground hover:text-foreground"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline ml-1">SIGN OUT</span>
        </Button>
      </div>

      {/* Create event toggle */}
      <Button
        variant="outline"
        className="mb-6 font-heading tracking-wide"
        onClick={() => setShowCreateForm(!showCreateForm)}
      >
        {showCreateForm ? <ChevronUp size={16} /> : <Plus size={16} />}
        {showCreateForm ? 'HIDE FORM' : 'CREATE EVENT'}
      </Button>

      {showCreateForm && (
        <CreateEventForm onClose={() => setShowCreateForm(false)} />
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`font-heading text-lg tracking-wide px-4 py-2 transition-colors ${
              activeTab === tab.key
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Events list */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : events && events.length > 0 ? (
        <div className="space-y-3">
          {events.map((event) => (
            <AdminEventCard
              key={event.id}
              event={event}
              onApprove={() => handleApprove(event.id)}
              onReject={() => handleReject(event.id)}
              onDelete={() => handleDelete(event.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-border">
          <p className="font-heading text-2xl text-muted-foreground">NO EVENTS HERE</p>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Admin Event Card
// ─────────────────────────────────────────────

const AdminEventCard = ({
  event,
  onApprove,
  onReject,
  onDelete,
}: {
  event: EventRow;
  onApprove: () => void;
  onReject: () => void;
  onDelete: () => void;
}) => {
  const [expanded, setExpanded] = useState(false);

  const formatTime = (time: string) => {
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };

  const statusColors: Record<string, string> = {
    pending: 'text-tag-alleycat',
    approved: 'text-primary',
    rejected: 'text-destructive',
  };

  return (
    <div className="border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`font-mono text-xs uppercase ${statusColors[event.status]}`}>
              [{event.status}]
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {event.source === 'submitted' ? 'USER SUBMITTED' : 'ADMIN CREATED'}
            </span>
          </div>
          <h3
            className="font-heading text-xl text-foreground cursor-pointer hover:text-primary transition-colors"
            onClick={() => setExpanded(!expanded)}
          >
            {event.name}
          </h3>
          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
            <span className="font-mono text-xs">
              {format(parseISO(event.date), 'MMM d, yyyy')}
            </span>
            <span className="font-mono text-xs">
              {formatTime(event.start_time)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {event.status === 'pending' && (
            <>
              <Button size="icon" variant="ghost" onClick={onApprove} title="Approve" className="text-primary hover:text-primary hover:bg-primary/10">
                <Check size={18} />
              </Button>
              <Button size="icon" variant="ghost" onClick={onReject} title="Reject" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                <X size={18} />
              </Button>
            </>
          )}
          <Button size="icon" variant="ghost" onClick={onDelete} title="Delete" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mt-2">
        {event.tags.map((tag) => (
          <TagBadge key={tag} tag={tag as EventTag} className="text-[10px] px-1.5 py-0.5" />
        ))}
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={14} /> {event.location}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock size={14} /> {formatTime(event.start_time)} — {formatTime(event.finish_time)}
          </div>
          <p className="text-foreground mt-2">{event.description}</p>

          {/* Contact info */}
          <div className="mt-3 pt-3 border-t border-border space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User size={14} />
              <span>Host: {event.host_name}</span>
              {event.host_phone && (
                <span className="flex items-center gap-1">
                  <Phone size={12} /> {event.host_phone}
                </span>
              )}
            </div>
            {event.submitter_name && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <User size={14} />
                <span>Submitted by: {event.submitter_name}</span>
                {event.submitter_phone && (
                  <span className="flex items-center gap-1">
                    <Phone size={12} /> {event.submitter_phone}
                  </span>
                )}
              </div>
            )}
          </div>

          {event.external_link && (
            <a
              href={event.external_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-xs font-mono block mt-2"
            >
              {event.external_link}
            </a>
          )}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Create Event Form (inline)
// ─────────────────────────────────────────────

const CreateEventForm = ({ onClose }: { onClose: () => void }) => {
  const createEvent = useCreateEvent();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '', date: '', start_time: '', finish_time: '',
    location: '', description: '', external_link: '',
    host_name: '', host_phone: '', tags: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEvent.mutateAsync({
        name: formData.name,
        date: formData.date,
        start_time: formData.start_time,
        finish_time: formData.finish_time,
        location: formData.location,
        description: formData.description,
        external_link: formData.external_link || null,
        host_name: formData.host_name,
        host_phone: formData.host_phone || null,
        tags: formData.tags,
      });
      toast({ title: 'Event created', description: 'Published immediately.' });
      onClose();
    } catch {
      toast({ title: 'Error', description: 'Failed to create event.', variant: 'destructive' });
    }
  };

  const toggleTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  return (
    <div className="border border-primary bg-card p-4 mb-6">
      <h2 className="font-heading text-2xl text-foreground mb-4">CREATE EVENT</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input placeholder="Event name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-muted border-border" required />
        <div className="grid grid-cols-3 gap-2">
          <Input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="bg-muted border-border" required />
          <Input type="time" value={formData.start_time} onChange={(e) => setFormData({ ...formData, start_time: e.target.value })} className="bg-muted border-border" required />
          <Input type="time" value={formData.finish_time} onChange={(e) => setFormData({ ...formData, finish_time: e.target.value })} className="bg-muted border-border" required />
        </div>
        <Input placeholder="Location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="bg-muted border-border" required />
        <Textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="bg-muted border-border resize-none" rows={3} required />
        <Input placeholder="External link (optional)" value={formData.external_link} onChange={(e) => setFormData({ ...formData, external_link: e.target.value })} className="bg-muted border-border" />
        <Input placeholder="Host name" value={formData.host_name} onChange={(e) => setFormData({ ...formData, host_name: e.target.value })} className="bg-muted border-border" required />
        <Input placeholder="Host phone (optional)" value={formData.host_phone} onChange={(e) => setFormData({ ...formData, host_phone: e.target.value })} className="bg-muted border-border" />

        <div>
          <p className="text-xs text-muted-foreground mb-2 font-mono">TAGS</p>
          <div className="flex flex-wrap gap-1.5">
            {EVENT_TAGS.map((tag) => (
              <TagBadge
                key={tag}
                tag={tag}
                active={formData.tags.includes(tag)}
                onClick={() => toggleTag(tag)}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button type="submit" className="font-heading tracking-wide" disabled={createEvent.isPending}>
            {createEvent.isPending ? 'CREATING...' : 'PUBLISH'}
          </Button>
          <Button type="button" variant="outline" onClick={onClose} className="font-heading tracking-wide">
            CANCEL
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Admin;
