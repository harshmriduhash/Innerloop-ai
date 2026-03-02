import { Link } from "react-router-dom";
import { ArrowRight, Mic, Sparkles, ShieldCheck, Brain } from "lucide-react";

export function LandingPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-10 md:py-16">
      <section className="grid gap-10 md:grid-cols-[3fr,2fr] md:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200">
            Voice-first · Private · With memory
          </div>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-50 md:text-5xl lg:text-6xl">
            Your thoughts deserve <span className="text-cyan-300">memory</span>.
          </h1>
          <p className="max-w-xl text-balance text-sm text-slate-300 md:text-base">
            InnerLoop is a private, voice-first AI companion that remembers what matters and helps
            you think clearly—every day. No feeds, no dopamine loops. Just depth, reflection, and
            continuity.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/40 hover:bg-cyan-300"
            >
              Start talking
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/features"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-200 hover:text-cyan-300"
            >
              See how it works
            </Link>
          </div>
          <p className="text-xs text-slate-500">
            Built for overthinkers, founders, and knowledge workers who want clarity, not noise.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-10 -z-10 bg-cyan-500/10 blur-3xl" />
          <div className="glass-panel relative h-full w-full p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/80">
                  <Mic size={18} className="text-cyan-300" />
                </div>
                <div className="text-xs">
                  <p className="font-medium text-slate-200">Today&apos;s inner loop</p>
                  <p className="text-slate-500">Voice session · 12:04 PM</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                Private by design
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="rounded-2xl bg-slate-900/70 px-3 py-2 text-slate-200">
                <p className="text-xs uppercase tracking-wide text-slate-500">You</p>
                <p>
                  I keep circling the same decisions and I&apos;m not sure what actually changed in
                  the last month.
                </p>
              </div>
              <div className="rounded-2xl bg-cyan-500/10 px-3 py-2 text-slate-100">
                <p className="text-xs uppercase tracking-wide text-cyan-300">InnerLoop</p>
                <p>
                  Let&apos;s slow this down. What decision feels the heaviest right now—and what
                  have you already tried that didn&apos;t move it forward?
                </p>
              </div>
              <div className="rounded-xl border border-cyan-500/30 bg-slate-950/70 px-3 py-2 text-xs text-cyan-100">
                <p className="font-medium">Memory candidate detected</p>
                <p className="text-slate-300">
                  &ldquo;Decision about changing teams at work.&rdquo;
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-[11px] text-slate-500">Category: Decisions · Confidence: 0.86</p>
                  <button className="rounded-full bg-cyan-400/90 px-3 py-1 text-[11px] font-semibold text-slate-950">
                    Remember this
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <FeatureCard
          icon={<Sparkles size={18} />}
          title="Voice-first, every day"
          description="Push-to-talk sessions designed for daily reflection, not endless chatting. Built for 5–15 minute thinking loops."
        />
        <FeatureCard
          icon={<Brain size={18} />}
          title="Memory that earns trust"
          description="InnerLoop only remembers what you confirm. Memories are organized into decisions, emotions, and goals over time."
        />
        <FeatureCard
          icon={<ShieldCheck size={18} />}
          title="No hallucinations"
          description="Responses are grounded only in your conversations and approved memories. If InnerLoop doesn’t know, it says so."
        />
      </section>
    </div>
  );
}

function FeatureCard(props: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="glass-panel flex flex-col gap-3 p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-100">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-300">
          {props.icon}
        </div>
        <span>{props.title}</span>
      </div>
      <p className="text-xs text-slate-400">{props.description}</p>
    </div>
  );
}

