import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { claimFirstAdmin } from "@/lib/admin.functions";
import {
  CMS_PAGES,
  SLUG_PATTERN,
  deleteCmsEntry,
  fetchAllCmsEntries,
  fetchIsAdmin,
  isSlugTaken,
  resolveCmsImage,
  saveCmsEntry,
  setCmsEntryStatus,
  slugify,
  uploadCmsImage,
  type CmsEntry,
  type CmsStatus,
} from "@/lib/cms";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Content studio · Tag Along" },
      {
        name: "description",
        content: "Manage Tag Along pages, stories and events.",
      },
      { property: "og:title", content: "Content studio · Tag Along" },
      {
        property: "og:description",
        content: "Manage Tag Along pages, stories and events.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

type Draft = {
  id?: string;
  page: string;
  section: string;
  position: number;
  slug: string;
  status: CmsStatus;
  published_at: string;
  seo_title: string;
  seo_description: string;
  image_url: string;
  fields: { key: string; value: string }[];
};

const emptyDraft = (page: string): Draft => ({
  page,
  section: "",
  position: 0,
  slug: "",
  status: "draft",
  published_at: "",
  seo_title: "",
  seo_description: "",
  image_url: "",
  fields: [{ key: "", value: "" }],
});

const toDraft = (e: CmsEntry): Draft => ({
  id: e.id,
  page: e.page,
  section: e.section,
  position: e.position,
  slug: e.slug ?? "",
  status: (e.status as CmsStatus) ?? "draft",
  published_at: e.published_at ? e.published_at.slice(0, 16) : "",
  seo_title: e.seo_title ?? "",
  seo_description: e.seo_description ?? "",
  image_url: e.image_url ?? "",
  fields: Object.entries(e.data ?? {}).map(([key, value]) => ({
    key,
    value: typeof value === "string" ? value : JSON.stringify(value),
  })),
});

const input =
  "w-full border border-ink/15 bg-paper rounded-sm px-3 py-2 text-sm outline-none focus:border-ink";
const label = "text-[11px] uppercase tracking-widest text-ink/60";

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const session = useQuery({
    queryKey: ["admin-session"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (!user) return { user: null, isAdmin: false };
      let isAdmin = await fetchIsAdmin(user.id);
      if (!isAdmin) {
        // First-run bootstrap: grants admin only if no admin exists yet.
        const res = await claimFirstAdmin().catch(() => null);
        if (res?.granted) isAdmin = true;
      }
      return { user, isAdmin };
    },
  });

  const entries = useQuery({
    queryKey: ["cms-entries"],
    queryFn: fetchAllCmsEntries,
    enabled: session.data?.isAdmin === true,
  });

  const [pageFilter, setPageFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [draft, setDraft] = useState<Draft | null>(null);

  const filtered = useMemo(() => {
    return (entries.data ?? []).filter(
      (e) =>
        (pageFilter === "all" || e.page === pageFilter) &&
        (statusFilter === "all" || (e.status ?? "draft") === statusFilter),
    );
  }, [entries.data, pageFilter, statusFilter]);

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["cms-entries"] });

  const save = useMutation({
    mutationFn: async (d: Draft) => {
      if (!d.page.trim() || !d.section.trim())
        throw new Error("Page and section are required.");
      const slug = d.slug.trim() ? slugify(d.slug) : null;
      if (slug && !SLUG_PATTERN.test(slug))
        throw new Error("Slug must be lowercase words separated by hyphens.");
      if (slug && (await isSlugTaken(d.page, slug, d.id)))
        throw new Error(`The slug “${slug}” is already used on this page.`);
      const data: Record<string, string> = {};
      for (const f of d.fields) if (f.key.trim()) data[f.key.trim()] = f.value;
      return saveCmsEntry({
        id: d.id,
        page: d.page.trim(),
        section: d.section.trim(),
        position: Number(d.position) || 0,
        data,
        slug,
        status: d.status,
        published_at: d.published_at
          ? new Date(d.published_at).toISOString()
          : null,
        seo_title: d.seo_title.trim() || null,
        seo_description: d.seo_description.trim() || null,
        image_url: d.image_url.trim() || null,
      });
    },
    onSuccess: () => {
      toast.success("Entry saved");
      setDraft(null);
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: deleteCmsEntry,
    onSuccess: () => {
      toast.success("Entry deleted");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const toggle = useMutation({
    mutationFn: ({ id, status }: { id: string; status: CmsStatus }) =>
      setCmsEntryStatus(id, status),
    onSuccess: () => invalidate(),
    onError: (e: Error) => toast.error(e.message),
  });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (session.isLoading) {
    return <Shell><p className="text-sm text-ink/60">Loading…</p></Shell>;
  }

  if (!session.data?.isAdmin) {
    return (
      <Shell>
        <h1 className="font-display text-3xl font-black mb-3">
          No admin access
        </h1>
        <p className="text-sm text-ink/70 max-w-md mb-6">
          Your account ({session.data?.user?.email}) isn’t an admin yet. An
          existing admin needs to add your account to the roles table.
        </p>
        <button onClick={signOut} className="text-xs underline underline-offset-4">
          Sign out
        </button>
      </Shell>
    );
  }

  return (
    <Shell>
      <Toaster />
      <header className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-ink/50 mb-1">
            Content studio
          </p>
          <h1 className="font-display text-4xl font-black">Entries</h1>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <Link to="/" className="underline underline-offset-4">
            View site
          </Link>
          <button onClick={signOut} className="underline underline-offset-4">
            Sign out
          </button>
          <button
            onClick={() => setDraft(emptyDraft(pageFilter === "all" ? "journal" : pageFilter))}
            className="bg-ink text-paper rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest hover:bg-terracotta transition-colors"
          >
            New entry
          </button>
        </div>
      </header>

      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={pageFilter}
          onChange={(e) => setPageFilter(e.target.value)}
          className={`${input} w-auto`}
        >
          <option value="all">All pages</option>
          {CMS_PAGES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`${input} w-auto`}
        >
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {entries.isLoading ? (
        <p className="text-sm text-ink/60">Loading entries…</p>
      ) : (
        <div className="border border-ink/10 rounded-sm divide-y divide-ink/10">
          {filtered.map((e) => (
            <div
              key={e.id}
              className="flex flex-wrap items-center gap-3 px-4 py-3 text-sm"
            >
              <span className="text-[11px] uppercase tracking-widest text-ink/50 w-20 shrink-0">
                {e.page}
              </span>
              <span className="font-medium min-w-[10rem]">{e.section}</span>
              <span className="text-ink/50 text-xs truncate max-w-[18rem]">
                {String(
                  (e.data as Record<string, string>)?.title ??
                    (e.data as Record<string, string>)?.name ??
                    e.slug ??
                    "",
                )}
              </span>
              <span className="text-xs text-ink/40">#{e.position}</span>
              <span
                className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${
                  e.status === "published"
                    ? "bg-forest/15 text-forest"
                    : "bg-ink/10 text-ink/60"
                }`}
              >
                {e.status ?? "draft"}
              </span>
              <div className="ml-auto flex items-center gap-3 text-xs">
                <button
                  onClick={() =>
                    toggle.mutate({
                      id: e.id,
                      status: e.status === "published" ? "draft" : "published",
                    })
                  }
                  className="underline underline-offset-4"
                >
                  {e.status === "published" ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => setDraft(toDraft(e))}
                  className="underline underline-offset-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm("Delete this entry?")) remove.mutate(e.id);
                  }}
                  className="underline underline-offset-4 text-terracotta"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="px-4 py-6 text-sm text-ink/50">No entries here yet.</p>
          )}
        </div>
      )}

      {draft && (
        <EntryEditor
          draft={draft}
          setDraft={setDraft}
          onSave={() => save.mutate(draft)}
          saving={save.isPending}
        />
      )}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-paper text-ink px-6 py-12">
      <div className="max-w-5xl mx-auto">{children}</div>
    </main>
  );
}

function EntryEditor({
  draft,
  setDraft,
  onSave,
  saving,
}: {
  draft: Draft;
  setDraft: (d: Draft | null) => void;
  onSave: () => void;
  saving: boolean;
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const set = (patch: Partial<Draft>) => setDraft({ ...draft, ...patch });

  async function onUpload(file: File) {
    setUploading(true);
    try {
      const path = await uploadCmsImage(file);
      set({ image_url: path });
      setPreview(await resolveCmsImage(path));
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-ink/40 overflow-y-auto p-4 md:p-10">
      <div className="max-w-2xl mx-auto bg-paper border border-ink/15 rounded-sm p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-black">
            {draft.id ? "Edit entry" : "New entry"}
          </h2>
          <button
            onClick={() => setDraft(null)}
            className="text-xs underline underline-offset-4"
          >
            Close
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={label}>Page</label>
            <input
              list="cms-pages"
              value={draft.page}
              onChange={(e) => set({ page: e.target.value })}
              className={input}
            />
            <datalist id="cms-pages">
              {CMS_PAGES.map((p) => (
                <option key={p} value={p} />
              ))}
            </datalist>
          </div>
          <div>
            <label className={label}>Section</label>
            <input
              value={draft.section}
              onChange={(e) => set({ section: e.target.value })}
              className={input}
            />
          </div>
          <div>
            <label className={label}>Slug (optional, unique per page)</label>
            <input
              value={draft.slug}
              onChange={(e) => set({ slug: e.target.value })}
              onBlur={(e) =>
                set({ slug: e.target.value ? slugify(e.target.value) : "" })
              }
              className={input}
            />
          </div>
          <div>
            <label className={label}>Order</label>
            <input
              type="number"
              value={draft.position}
              onChange={(e) => set({ position: Number(e.target.value) })}
              className={input}
            />
          </div>
          <div>
            <label className={label}>Status</label>
            <select
              value={draft.status}
              onChange={(e) => set({ status: e.target.value as CmsStatus })}
              className={input}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div>
            <label className={label}>Publish date</label>
            <input
              type="datetime-local"
              value={draft.published_at}
              onChange={(e) => set({ published_at: e.target.value })}
              className={input}
            />
          </div>
          <div className="md:col-span-2">
            <label className={label}>SEO title</label>
            <input
              value={draft.seo_title}
              onChange={(e) => set({ seo_title: e.target.value })}
              className={input}
            />
          </div>
          <div className="md:col-span-2">
            <label className={label}>Meta description</label>
            <textarea
              rows={2}
              value={draft.seo_description}
              onChange={(e) => set({ seo_description: e.target.value })}
              className={input}
            />
          </div>
          <div className="md:col-span-2">
            <label className={label}>Image</label>
            <div className="flex items-center gap-3 mt-1">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void onUpload(f);
                }}
                className="text-xs"
              />
              {uploading && <span className="text-xs text-ink/50">Uploading…</span>}
            </div>
            <input
              value={draft.image_url}
              onChange={(e) => set({ image_url: e.target.value })}
              placeholder="storage path or absolute URL"
              className={`${input} mt-2`}
            />
            {preview && (
              <img
                src={preview}
                alt="Uploaded preview"
                className="mt-3 h-28 w-auto rounded-sm object-cover"
              />
            )}
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-2">
            <label className={label}>Content fields</label>
            <button
              onClick={() =>
                set({ fields: [...draft.fields, { key: "", value: "" }] })
              }
              className="text-xs underline underline-offset-4"
            >
              Add field
            </button>
          </div>
          <div className="space-y-2">
            {draft.fields.map((f, i) => (
              <div key={i} className="flex gap-2 items-start">
                <input
                  value={f.key}
                  placeholder="key"
                  onChange={(e) => {
                    const fields = [...draft.fields];
                    fields[i] = { ...f, key: e.target.value };
                    set({ fields });
                  }}
                  className={`${input} w-40 shrink-0`}
                />
                <textarea
                  rows={1}
                  value={f.value}
                  placeholder="value"
                  onChange={(e) => {
                    const fields = [...draft.fields];
                    fields[i] = { ...f, value: e.target.value };
                    set({ fields });
                  }}
                  className={input}
                />
                <button
                  onClick={() =>
                    set({ fields: draft.fields.filter((_, j) => j !== i) })
                  }
                  className="text-xs text-terracotta underline underline-offset-4 mt-2"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onSave}
            disabled={saving}
            className="bg-ink text-paper rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest hover:bg-terracotta transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save entry"}
          </button>
          <button
            onClick={() => setDraft(null)}
            className="text-xs underline underline-offset-4"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
