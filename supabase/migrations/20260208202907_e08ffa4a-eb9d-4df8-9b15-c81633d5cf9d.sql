
-- Create enum for event status
CREATE TYPE public.event_status AS ENUM ('pending', 'approved', 'rejected');

-- Create enum for event source
CREATE TYPE public.event_source AS ENUM ('submitted', 'admin');

-- Create enum for app roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  finish_time TIME NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  external_link TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  host_name TEXT NOT NULL,
  host_phone TEXT,
  submitter_name TEXT,
  submitter_phone TEXT,
  status public.event_status NOT NULL DEFAULT 'pending',
  source public.event_source NOT NULL DEFAULT 'submitted',
  city TEXT NOT NULL DEFAULT 'seattle',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_roles table for moderator access
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS on both tables
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger for automatic timestamp updates on events
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- RLS POLICIES FOR EVENTS
-- ============================================================

-- Public: anyone can read approved events (no sensitive fields exposed via view)
CREATE POLICY "Anyone can read approved events"
ON public.events
FOR SELECT
USING (status = 'approved');

-- Moderators can read ALL events (including pending, with contact info)
CREATE POLICY "Moderators can read all events"
ON public.events
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'moderator'));

-- Anyone can insert events (public submission) — always as 'pending' + 'submitted'
CREATE POLICY "Anyone can submit events"
ON public.events
FOR INSERT
WITH CHECK (status = 'pending' AND source = 'submitted');

-- Moderators can insert events (admin-created, any status/source)
CREATE POLICY "Moderators can create events"
ON public.events
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'moderator'));

-- Moderators can update events
CREATE POLICY "Moderators can update events"
ON public.events
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'moderator'));

-- Moderators can delete events
CREATE POLICY "Moderators can delete events"
ON public.events
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'moderator'));

-- ============================================================
-- RLS POLICIES FOR USER_ROLES
-- ============================================================

-- Moderators can view roles
CREATE POLICY "Moderators can view roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'moderator'));

-- Create a public view for events that hides sensitive fields
CREATE VIEW public.events_public
WITH (security_invoker = on) AS
SELECT
  id, name, date, start_time, finish_time, location, description,
  external_link, tags, host_name, status, source, city, created_at
FROM public.events;
