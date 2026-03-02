export function SettingsPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <section className="glass-panel p-4">
        <h3 className="text-sm font-semibold text-slate-100">Account</h3>
        <p className="mt-2 text-xs text-slate-400">
          Manage your plan and basic account information.
        </p>
        <div className="mt-4 space-y-2 text-xs text-slate-300">
          <p>Email: your@email</p>
          <p>Plan: Free (upgrade from Pricing)</p>
        </div>
      </section>

      <section className="glass-panel p-4">
        <h3 className="text-sm font-semibold text-slate-100">Memory & privacy</h3>
        <p className="mt-2 text-xs text-slate-400">
          Export or delete your memories at any time. InnerLoop exists to support your thinking, not
          own it.
        </p>
      </section>
    </div>
  );
}

