
DROP POLICY IF EXISTS "Authenticated can insert entries" ON public.cms_entries;
DROP POLICY IF EXISTS "Authenticated can update entries" ON public.cms_entries;
DROP POLICY IF EXISTS "Authenticated can delete entries" ON public.cms_entries;
DROP POLICY IF EXISTS "Authenticated can view all entries" ON public.cms_entries;
REVOKE INSERT, UPDATE, DELETE ON public.cms_entries FROM authenticated;
