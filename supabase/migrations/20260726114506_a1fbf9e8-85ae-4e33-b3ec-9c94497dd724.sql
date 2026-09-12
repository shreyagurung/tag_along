-- 1. Roles
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, anon, service_role;

DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 2. cms_entries extensions
ALTER TABLE public.cms_entries
  ADD COLUMN IF NOT EXISTS slug text,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS published_at timestamptz,
  ADD COLUMN IF NOT EXISTS seo_title text,
  ADD COLUMN IF NOT EXISTS seo_description text,
  ADD COLUMN IF NOT EXISTS image_url text;

DO $$ BEGIN
  ALTER TABLE public.cms_entries
    ADD CONSTRAINT cms_entries_status_check CHECK (status IN ('draft', 'published'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE public.cms_entries
    ADD CONSTRAINT cms_entries_slug_format CHECK (slug IS NULL OR slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE UNIQUE INDEX IF NOT EXISTS cms_entries_page_slug_key
  ON public.cms_entries (page, slug) WHERE slug IS NOT NULL;

CREATE INDEX IF NOT EXISTS cms_entries_page_section_idx
  ON public.cms_entries (page, section, position);

UPDATE public.cms_entries
  SET status = 'published',
      published_at = COALESCE(published_at, created_at)
  WHERE is_published = true AND status <> 'published';

CREATE OR REPLACE FUNCTION public.cms_entries_sync_published()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.status = 'published' AND NEW.published_at IS NULL THEN
    NEW.published_at := now();
  END IF;
  NEW.is_published := (NEW.status = 'published' AND COALESCE(NEW.published_at, now()) <= now());
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS cms_entries_sync_published_trg ON public.cms_entries;
CREATE TRIGGER cms_entries_sync_published_trg
  BEFORE INSERT OR UPDATE ON public.cms_entries
  FOR EACH ROW EXECUTE FUNCTION public.cms_entries_sync_published();

DROP TRIGGER IF EXISTS cms_entries_set_updated_at ON public.cms_entries;
CREATE TRIGGER cms_entries_set_updated_at
  BEFORE UPDATE ON public.cms_entries
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3. Grants + policies
GRANT SELECT ON public.cms_entries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cms_entries TO authenticated;
GRANT ALL ON public.cms_entries TO service_role;

ALTER TABLE public.cms_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published entries" ON public.cms_entries;
CREATE POLICY "Public can view published entries"
  ON public.cms_entries FOR SELECT TO anon, authenticated
  USING (status = 'published' AND COALESCE(published_at, created_at) <= now());

DROP POLICY IF EXISTS "Admins can view all entries" ON public.cms_entries;
CREATE POLICY "Admins can view all entries"
  ON public.cms_entries FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can insert entries" ON public.cms_entries;
CREATE POLICY "Admins can insert entries"
  ON public.cms_entries FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update entries" ON public.cms_entries;
CREATE POLICY "Admins can update entries"
  ON public.cms_entries FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete entries" ON public.cms_entries;
CREATE POLICY "Admins can delete entries"
  ON public.cms_entries FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 4. Storage object policies for the cms-media bucket
DROP POLICY IF EXISTS "Public can read cms media" ON storage.objects;
CREATE POLICY "Public can read cms media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'cms-media');

DROP POLICY IF EXISTS "Admins can upload cms media" ON storage.objects;
CREATE POLICY "Admins can upload cms media"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'cms-media' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update cms media" ON storage.objects;
CREATE POLICY "Admins can update cms media"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'cms-media' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'cms-media' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete cms media" ON storage.objects;
CREATE POLICY "Admins can delete cms media"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'cms-media' AND public.has_role(auth.uid(), 'admin'));