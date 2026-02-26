export function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-10 md:py-16">
      <h2 className="text-3xl font-semibold tracking-tight text-slate-50">Contact</h2>
      <p className="mt-3 text-sm text-slate-300">
        For product questions, feedback, or partnership requests, reach out and we&apos;ll get back
        to you soon.
      </p>

      <form className="glass-panel mt-8 space-y-4 p-5">
        <div className="space-y-1 text-sm">
          <label className="text-slate-200">Email</label>
          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-slate-100 outline-none focus:border-cyan-400"
            type="email"
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-1 text-sm">
          <label className="text-slate-200">Message</label>
          <textarea
            className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-slate-100 outline-none focus:border-cyan-400"
            rows={5}
            placeholder="Tell us what you have in mind..."
          />
        </div>
        <button
          type="button"
          className="rounded-full bg-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-cyan-500/40 hover:bg-cyan-300"
        >
          Send message
        </button>
      </form>
    </div>
  );
}

