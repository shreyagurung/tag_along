import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Sign in · Tag Along" },
      {
        name: "description",
        content:
          "Sign in to the Tag Along content studio to update stories, events and pages.",
      },
      { property: "og:title", content: "Sign in · Tag Along" },
      {
        property: "og:description",
        content: "Sign in to the Tag Along content studio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate({ to: "/admin", replace: true });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        if (data.session) navigate({ to: "/admin", replace: true });
        else setMessage("Check your inbox to confirm your email, then sign in.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-paper text-ink flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className="font-display text-xl font-black tracking-tight flex items-center gap-2 mb-10"
        >
          <span className="bg-terracotta text-paper size-8 flex items-center justify-center rounded-sm rotate-3">
            T
          </span>
          <span>Tag Along</span>
        </Link>

        <p className="text-[11px] uppercase tracking-widest text-ink/50 mb-2">
          Content studio
        </p>
        <h1 className="font-display text-4xl font-black mb-8">
          {mode === "signin" ? "Sign in" : "Create an account"}
        </h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] uppercase tracking-widest text-ink/60">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-ink/15 bg-transparent rounded-sm px-3 py-2 text-sm outline-none focus:border-ink"
            />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-widest text-ink/60">
              Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-ink/15 bg-transparent rounded-sm px-3 py-2 text-sm outline-none focus:border-ink"
            />
          </div>

          {error && <p className="text-sm text-terracotta">{error}</p>}
          {message && <p className="text-sm text-forest">{message}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-ink text-paper rounded-full py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-terracotta transition-colors disabled:opacity-50"
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Sign up"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError(null);
            setMessage(null);
          }}
          className="mt-6 text-xs text-ink/60 underline underline-offset-4 hover:text-ink"
        >
          {mode === "signin"
            ? "Need an account? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </main>
  );
}
