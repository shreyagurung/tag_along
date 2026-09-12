
-- CMS entries table: flexible content store keyed by (page, section)
CREATE TABLE public.cms_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page TEXT NOT NULL,
  section TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX cms_entries_page_section_idx ON public.cms_entries (page, section, position);

-- Data API grants
GRANT SELECT ON public.cms_entries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cms_entries TO authenticated;
GRANT ALL ON public.cms_entries TO service_role;

-- RLS
ALTER TABLE public.cms_entries ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) may read published entries
CREATE POLICY "Public can view published entries"
  ON public.cms_entries FOR SELECT
  USING (is_published = true);

-- Signed-in users can read all entries (including drafts) for editing
CREATE POLICY "Authenticated can view all entries"
  ON public.cms_entries FOR SELECT
  TO authenticated
  USING (true);

-- Signed-in users can add, edit, and delete entries
CREATE POLICY "Authenticated can insert entries"
  ON public.cms_entries FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update entries"
  ON public.cms_entries FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete entries"
  ON public.cms_entries FOR DELETE
  TO authenticated
  USING (true);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER cms_entries_set_updated_at
  BEFORE UPDATE ON public.cms_entries
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ===== Seed default content =====

-- Gather: week (7 items)
INSERT INTO public.cms_entries (page, section, position, data) VALUES
('gather','week',1,'{"day":"Mon","title":"Vinyl Night","note":"Side B is a stranger''s turn.","color":"bg-butter"}'),
('gather','week',2,'{"day":"Tue","title":"Open Mic","note":"Guitars, poems, or just ears.","color":"bg-blush"}'),
('gather','week',3,'{"day":"Wed","title":"Community Dinner","note":"Sikkimese thali, sixteen dishes.","color":"bg-forest text-paper"}'),
('gather','week',4,'{"day":"Thu","title":"Live Set","note":"Chöling brothers, folk.","color":"bg-mint"}'),
('gather','week',5,'{"day":"Fri","title":"Movie in the Attic","note":"Wong Kar-wai, again.","color":"bg-lavender"}'),
('gather','week',6,'{"day":"Sat","title":"Sketchwalk","note":"Meet at 10 with a pencil.","color":"bg-terracotta text-paper"}'),
('gather','week',7,'{"day":"Sun","title":"Slow Sunday","note":"Nothing planned. That''s the plan.","color":"bg-seafoam"}');

-- Gather: upcoming events
INSERT INTO public.cms_entries (page, section, position, data) VALUES
('gather','upcoming',1,'{"title":"The Long Table — Full Moon Edition","when":"Sat 27 Aug · 19:30","where":"On the terrace"}'),
('gather','upcoming',2,'{"title":"Analog Photo Lab & Prints","when":"Sun 21 Aug · 14:00","where":"Studio corner"}'),
('gather','upcoming',3,'{"title":"Field Recording Walk","when":"Tue 2 Aug · 06:00","where":"Meet at the gate"}');

-- Gather: workshops
INSERT INTO public.cms_entries (page, section, position, data) VALUES
('gather','workshops',1,'{"name":"Sourdough & wild yeast","by":"Sonam","price":"₹1,200"}'),
('gather','workshops',2,'{"name":"Bookbinding, single signature","by":"Léa, in residence","price":"₹900"}'),
('gather','workshops',3,'{"name":"Momo folding for beginners","by":"Aunty Rinzin","price":"₹600"}'),
('gather','workshops',4,'{"name":"Watercolour valley studies","by":"Adi","price":"₹1,000"}');

-- Gather: movies
INSERT INTO public.cms_entries (page, section, position, data) VALUES
('gather','movies',1,'{"date":"05 Aug","title":"In the Mood for Love"}'),
('gather','movies',2,'{"date":"12 Aug","title":"Paterson"}'),
('gather','movies',3,'{"date":"19 Aug","title":"The Salt of the Earth"}'),
('gather','movies',4,'{"date":"26 Aug","title":"Guest programmer''s pick"}');

-- Gather: monthly calendar
INSERT INTO public.cms_entries (page, section, position, data) VALUES
('gather','calendar',1,'{"date":"02","month":"AUG","title":"Field recording walk","who":"with Kavi P."}'),
('gather','calendar',2,'{"date":"08","month":"AUG","title":"Sourdough workshop","who":"with our baker, Sonam"}'),
('gather','calendar',3,'{"date":"14","month":"AUG","title":"Poetry in translation","who":"open evening"}'),
('gather','calendar',4,'{"date":"21","month":"AUG","title":"Analog photo lab","who":"bring your rolls"}'),
('gather','calendar',5,'{"date":"27","month":"AUG","title":"Full moon dinner","who":"on the terrace"}');

-- Journal: featured (single item)
INSERT INTO public.cms_entries (page, section, position, data) VALUES
('journal','featured',1,'{"kicker":"A long read · 12 min","title":"The year we almost gave up, and what the neighbours cooked instead.","excerpt":"In the monsoon of 2022, the roof leaked, the bookings vanished and the kitchen ran on borrowed rice. This is what we learned from the people who kept turning up anyway.","link":"#"}');

-- Journal: field notes
INSERT INTO public.cms_entries (page, section, position, data) VALUES
('journal','notes',1,'{"date":"18 Jul","title":"On the smell of monsoon on old wood","by":"Neha","read":"3 min"}'),
('journal','notes',2,'{"date":"11 Jul","title":"Six things Aunty Rinzin says most mornings","by":"Sonam","read":"2 min"}'),
('journal','notes',3,'{"date":"04 Jul","title":"A short defence of doing nothing on Sundays","by":"Adi","read":"4 min"}'),
('journal','notes',4,'{"date":"27 Jun","title":"The map we redraw every season","by":"Karma","read":"5 min"}');

-- Journal: photo essays (img is a key like 'hero-window' or 'postcard-polaroid')
INSERT INTO public.cms_entries (page, section, position, data) VALUES
('journal','photo_essays',1,'{"title":"Sixteen mornings in Room 4","by":"Tenzin","img":"hero-window"}'),
('journal','photo_essays',2,'{"title":"Hands in the kitchen","by":"Léa","img":"postcard-polaroid"}'),
('journal','photo_essays',3,'{"title":"The garden, in three summers","by":"Karma","img":"hero-window"}');

-- Journal: local voices
INSERT INTO public.cms_entries (page, section, position, data) VALUES
('journal','local_voices',1,'{"title":"Fermentation, and the woman who taught the valley","by":"Aunty Rinzin (as told to Sonam)"}'),
('journal','local_voices',2,'{"title":"What Nathula sounds like at dawn","by":"Kavi P."}'),
('journal','local_voices',3,'{"title":"Weaving in Dzongu, twenty years later","by":"Ongden Lepcha"}'),
('journal','local_voices',4,'{"title":"The old baker of Development Area","by":"Karma"}');
