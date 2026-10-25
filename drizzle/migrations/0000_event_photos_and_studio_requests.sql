CREATE TABLE public.event_photos (
 event_key text PRIMARY KEY,
 storage_path text NOT NULL,
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.event_photos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.event_photos TO authenticated;
GRANT ALL ON public.event_photos TO service_role;
ALTER TABLE public.event_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view event photos" ON public.event_photos FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Moderators manage event photos" ON public.event_photos FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'moderator')) WITH CHECK (public.has_role(auth.uid(), 'moderator'));
CREATE POLICY "Anyone can read event photo files" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'event-photos');
CREATE POLICY "Moderators upload event photo files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'event-photos' AND public.has_role(auth.uid(), 'moderator'));
CREATE POLICY "Moderators delete event photo files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'event-photos' AND public.has_role(auth.uid(), 'moderator'));
CREATE TABLE public.studio_requests (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 kind text NOT NULL,
 name text NOT NULL,
 email text NOT NULL,
 details jsonb NOT NULL DEFAULT '{}'::jsonb,
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.studio_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.studio_requests TO authenticated;
GRANT ALL ON public.studio_requests TO service_role;
ALTER TABLE public.studio_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors submit studio requests" ON public.studio_requests FOR INSERT TO anon, authenticated WITH CHECK (kind IN ('appointment', 'contact'));
CREATE POLICY "Moderators read studio requests" ON public.studio_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'moderator'));
CREATE POLICY "Moderators update studio requests" ON public.studio_requests FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'moderator')) WITH CHECK (public.has_role(auth.uid(), 'moderator'));
CREATE POLICY "Moderators delete studio requests" ON public.studio_requests FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'moderator'));
