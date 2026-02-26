export function FeaturesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-16">
      <h2 className="text-3xl font-semibold tracking-tight text-slate-50">Features</h2>
      <p className="mt-3 text-sm text-slate-300">
        InnerLoop is designed as a calm, voice-first AI companion that remembers what matters about
        you—without turning your life into content.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="glass-panel p-4">
          <h3 className="text-sm font-semibold text-slate-100">Voice conversations</h3>
          <ul className="mt-3 space-y-2 text-xs text-slate-400">
            <li>Push-to-talk interface for fast sessions.</li>
            <li>Real-time transcription and streaming-style responses.</li>
            <li>Sessions remember context within a conversation.</li>
            <li>Built for clarity, not small talk.</li>
          </ul>
        </section>

        <section className="glass-panel p-4">
          <h3 className="text-sm font-semibold text-slate-100">Long-term memory</h3>
          <ul className="mt-3 space-y-2 text-xs text-slate-400">
            <li>InnerLoop detects memory-worthy moments while you talk.</li>
            <li>You explicitly approve what gets remembered.</li>
            <li>Memories are categorized into decisions, emotions, and goals.</li>
            <li>Full edit/delete controls and a clean timeline.</li>
          </ul>
        </section>

        <section className="glass-panel p-4">
          <h3 className="text-sm font-semibold text-slate-100">Reflection, not advice</h3>
          <ul className="mt-3 space-y-2 text-xs text-slate-400">
            <li>Responses mirror your thinking instead of prescribing fixes.</li>
            <li>Clarifying questions push you toward slower, deeper thought.</li>
            <li>No productivity hacks or empty motivational quotes.</li>
          </ul>
        </section>

        <section className="glass-panel p-4">
          <h3 className="text-sm font-semibold text-slate-100">Weekly summaries</h3>
          <ul className="mt-3 space-y-2 text-xs text-slate-400">
            <li>Automatic weekly summaries of your emotional and decision patterns.</li>
            <li>Progress bar and themes that evolve with you over time.</li>
            <li>Delivered inside the app, grounded in your actual conversations.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

