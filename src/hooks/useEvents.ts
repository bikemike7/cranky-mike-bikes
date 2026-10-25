import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

export type EventRow = Tables<'events'>;
export type EventPublicRow = Tables<'events_public'>;
export type EventInsert = TablesInsert<'events'>;
export type EventUpdate = TablesUpdate<'events'>;

// Public events — uses the view (no phone numbers exposed)
export const usePublicEvents = (options?: { tags?: string[]; upcoming?: boolean; past?: boolean }) => {
  return useQuery({
    queryKey: ['events-public', options],
    queryFn: async () => {
      let query = supabase
        .from('events_public')
        .select('*')
        .eq('status', 'approved');

      const today = new Date().toISOString().split('T')[0];

      if (options?.upcoming) {
        query = query.gte('date', today);
      }
      if (options?.past) {
        query = query.lt('date', today);
      }

      if (options?.tags && options.tags.length > 0) {
        query = query.overlaps('tags', options.tags);
      }

      query = query.order('date', { ascending: options?.past ? false : true });

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
};

// Single public event by ID
export const usePublicEvent = (id: string) => {
  return useQuery({
    queryKey: ['event-public', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events_public')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

// Admin: all events (with sensitive fields, requires moderator role)
export const useAdminEvents = (status?: 'pending' | 'approved' | 'rejected') => {
  return useQuery({
    queryKey: ['events-admin', status],
    queryFn: async () => {
      let query = supabase.from('events').select('*');

      if (status) {
        query = query.eq('status', status);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
};

// Submit event (public — no auth needed)
export const useSubmitEvent = () => {
  return useMutation({
    mutationFn: async (event: Omit<EventInsert, 'status' | 'source'>) => {
      const { data, error } = await supabase
        .from('events')
        .insert({
          ...event,
          status: 'pending',
          source: 'submitted',
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
  });
};

// Admin: create event (auto-approved)
export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (event: Omit<EventInsert, 'status' | 'source'>) => {
      const { data, error } = await supabase
        .from('events')
        .insert({
          ...event,
          status: 'approved',
          source: 'admin',
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events-admin'] });
      queryClient.invalidateQueries({ queryKey: ['events-public'] });
    },
  });
};

// Admin: update event
export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: EventUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('events')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events-admin'] });
      queryClient.invalidateQueries({ queryKey: ['events-public'] });
    },
  });
};

// Admin: delete event
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events-admin'] });
      queryClient.invalidateQueries({ queryKey: ['events-public'] });
    },
  });
};

// Admin: approve event
export const useApproveEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('events')
        .update({ status: 'approved' })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events-admin'] });
      queryClient.invalidateQueries({ queryKey: ['events-public'] });
    },
  });
};

// Admin: reject event
export const useRejectEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('events')
        .update({ status: 'rejected' })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events-admin'] });
      queryClient.invalidateQueries({ queryKey: ['events-public'] });
    },
  });
};
