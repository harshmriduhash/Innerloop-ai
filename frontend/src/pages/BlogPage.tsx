export function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <h2 className="text-3xl font-semibold tracking-tight text-slate-50">Blog</h2>
      <p className="mt-3 text-sm text-slate-300">
        Essays on thinking, reflection, and building a calmer relationship with your own attention.
      </p>

      <div className="mt-8 space-y-4">
        <article className="glass-panel p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Product · InnerLoop
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-50">
            Why your thoughts deserve memory
          </h3>
          <p className="mt-2 text-xs text-slate-400">
            Most of our important thinking happens in the gaps—between meetings, on walks, in the
            shower. InnerLoop is designed to catch the threads worth keeping...
          </p>
        </article>
      </div>
    </div>
  );
}

