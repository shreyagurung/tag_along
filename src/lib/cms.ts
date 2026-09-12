import { supabase } from "@/integrations/supabase/client";

export const CMS_BUCKET = "cms-media";

export const CMS_PAGES = [
  "gather",
  "journal",
  "gallery",
  "stay",
  "cafe",
  "explore",
  "people",
  "about",
  "index",
] as const;


export type CmsStatus = "draft" | "published";

export type CmsEntry<T = Record<string, string>> = {
  id: string;
  page: string;
  section: string;
  position: number;
  data: T;
  slug?: string | null;
  status?: CmsStatus;
  published_at?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  image_url?: string | null;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
};

const PUBLIC_COLUMNS =
  "id, page, section, position, data, slug, status, published_at, seo_title, seo_description, image_url";

const ADMIN_COLUMNS = `${PUBLIC_COLUMNS}, is_published, created_at, updated_at`;

/* ---------------------------------- public --------------------------------- */

export async function fetchCmsSection<T = Record<string, string>>(
  page: string,
  section: string,
): Promise<CmsEntry<T>[]> {
  const { data, error } = await supabase
    .from("cms_entries")
    .select(PUBLIC_COLUMNS)
    .eq("page", page)
    .eq("section", section)
    .eq("is_published", true)
    .order("position", { ascending: true });
  if (error) throw error;
  return (data ?? []) as unknown as CmsEntry<T>[];
}

export async function fetchCmsEntryBySlug<T = Record<string, string>>(
  page: string,
  slug: string,
): Promise<CmsEntry<T> | null> {
  const { data, error } = await supabase
    .from("cms_entries")
    .select(PUBLIC_COLUMNS)
    .eq("page", page)
    .eq("slug", slug)
    .eq("is_published", true)
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return (data ?? null) as unknown as CmsEntry<T> | null;
}

export async function fetchCmsPage(page: string) {

  const { data, error } = await supabase
    .from("cms_entries")
    .select(PUBLIC_COLUMNS)
    .eq("page", page)
    .eq("is_published", true)
    .order("section", { ascending: true })
    .order("position", { ascending: true });
  if (error) throw error;
  const grouped: Record<string, CmsEntry[]> = {};
  for (const row of (data ?? []) as unknown as CmsEntry[]) {
    (grouped[row.section] ||= []).push(row);
  }
  return grouped;
}

/* ---------------------------------- admin ---------------------------------- */

export async function fetchAllCmsEntries(): Promise<CmsEntry[]> {
  const { data, error } = await supabase
    .from("cms_entries")
    .select(ADMIN_COLUMNS)
    .order("page", { ascending: true })
    .order("section", { ascending: true })
    .order("position", { ascending: true });
  if (error) throw error;
  return (data ?? []) as unknown as CmsEntry[];
}

export type CmsEntryInput = {
  id?: string;
  page: string;
  section: string;
  position: number;
  data: Record<string, unknown>;
  slug: string | null;
  status: CmsStatus;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  image_url: string | null;
};

export const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function isSlugTaken(page: string, slug: string, ignoreId?: string) {
  let query = supabase
    .from("cms_entries")
    .select("id")
    .eq("page", page)
    .eq("slug", slug)
    .limit(1);
  if (ignoreId) query = query.neq("id", ignoreId);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).length > 0;
}

export async function saveCmsEntry(input: CmsEntryInput) {
  const payload = {
    page: input.page,
    section: input.section,
    position: input.position,
    data: input.data as never,
    slug: input.slug,
    status: input.status,
    published_at: input.published_at,
    seo_title: input.seo_title,
    seo_description: input.seo_description,
    image_url: input.image_url,
  };

  if (input.id) {
    const { error } = await supabase
      .from("cms_entries")
      .update(payload)
      .eq("id", input.id);
    if (error) throw error;
    return input.id;
  }

  const { data, error } = await supabase
    .from("cms_entries")
    .insert(payload)
    .select("id")
    .single();
  if (error) throw error;
  return data.id as string;
}

export async function deleteCmsEntry(id: string) {
  const { error } = await supabase.from("cms_entries").delete().eq("id", id);
  if (error) throw error;
}

export async function setCmsEntryStatus(id: string, status: CmsStatus) {
  const { error } = await supabase
    .from("cms_entries")
    .update({ status, ...(status === "draft" ? { published_at: null } : {}) })
    .eq("id", id);
  if (error) throw error;
}

/* ---------------------------------- media ---------------------------------- */

export async function uploadCmsImage(file: File) {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from(CMS_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;
  return path;
}

const signedCache = new Map<string, string>();

/**
 * Resolves a stored image reference to a displayable URL.
 * Absolute URLs pass through; storage paths are signed (works for public and
 * private buckets alike, so no bucket-visibility configuration is required).
 */
export async function resolveCmsImage(ref?: string | null) {
  if (!ref) return null;
  if (/^https?:\/\//.test(ref)) return ref;
  const cached = signedCache.get(ref);
  if (cached) return cached;
  const { data, error } = await supabase.storage
    .from(CMS_BUCKET)
    .createSignedUrl(ref, 60 * 60 * 24 * 7);
  if (error || !data) return null;
  signedCache.set(ref, data.signedUrl);
  return data.signedUrl;
}

/* ---------------------------------- roles ---------------------------------- */

export async function fetchIsAdmin(userId: string) {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .limit(1);
  if (error) throw error;
  return (data ?? []).length > 0;
}
