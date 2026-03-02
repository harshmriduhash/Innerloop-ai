export function PricingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-16">
      <h2 className="text-3xl font-semibold tracking-tight text-slate-50">Pricing</h2>
      <p className="mt-3 text-sm text-slate-300">
        Start free, upgrade when InnerLoop becomes part of your daily thinking.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="glass-panel flex flex-col p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Free
          </p>
          <p className="mt-1 text-3xl font-semibold text-slate-50">$0</p>
          <p className="text-xs text-slate-400">Ideal for trying InnerLoop for the first time.</p>
          <ul className="mt-4 flex-1 space-y-2 text-xs text-slate-300">
            <li>• Limited daily voice sessions</li>
            <li>• Basic memory timeline</li>
            <li>• Weekly summary preview</li>
          </ul>
          <button className="mt-6 rounded-full border border-slate-600 px-4 py-2 text-xs font-semibold text-slate-100 hover:border-cyan-400 hover:text-cyan-200">
            Get started
          </button>
        </div>

        <div className="glass-panel flex flex-col border border-cyan-400/50 bg-slate-900/80 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">
            Pro
          </p>
          <p className="mt-1 text-3xl font-semibold text-slate-50">$12</p>
          <p className="text-xs text-slate-400">Per month, billed monthly. Cancel anytime.</p>
          <ul className="mt-4 flex-1 space-y-2 text-xs text-slate-300">
            <li>• Longer and more frequent voice sessions</li>
            <li>• Full memory history with advanced filters</li>
            <li>• Rich weekly summaries and trends</li>
            <li>• Priority access to new capabilities</li>
          </ul>
          <button className="mt-6 rounded-full bg-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-cyan-500/40 hover:bg-cyan-300">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </div>
  );
}

