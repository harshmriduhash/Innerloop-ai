import { Link } from "react-router-dom";
import { ArrowRight, Mic, Sparkles, ShieldCheck, Brain } from "lucide-react";

export function LandingPage() {
  return (
    <div className="page-fade-in mx-auto flex max-w-6xl flex-col gap-16 px-4 py-10 md:py-16">
      <section className="grid gap-10 md:grid-cols-[3fr,2fr] md:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-cyan-200 uppercase">
            <Sparkles size={12} />
            Voice-first · Private · Memory
          </div>
          <h1 className="text-balance text-5xl font-extrabold tracking-tighter text-slate-50 md:text-6xl lg:text-7xl leading-tight">
            Your thoughts deserve <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">memory</span>.
          </h1>
          <p className="max-w-xl text-balance text-lg leading-relaxed text-slate-400">
            InnerLoop is a private, voice-first AI companion that remembers what matters and helps
            you think clearly—every day. No feeds, no dopamine loops. Just depth, reflection, and
            continuity.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              to="/signup"
              className="btn-premium flex items-center gap-2 px-8"
            >
              Start talking
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/features"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-cyan-300 transition-colors"
            >
              See how it works
            </Link>
          </div>
          <p className="text-sm font-medium text-slate-500 italic">
            "Built for overthinkers, founders, and knowledge workers."
          </p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-10 -z-10 bg-cyan-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="glass-panel relative h-full w-full p-8 overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Brain size={120} />
            </div>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/80 border border-white/5 shadow-inner">
                  <Mic size={20} className="text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-200">Today&apos;s inner loop</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">12:04 PM</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                Private
              </span>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-950/40 p-4 border border-white/5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">Human</p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  I keep circling the same decisions and I&apos;m not sure what actually changed in
                  the last month.
                </p>
              </div>
              <div className="rounded-2xl bg-cyan-500/5 p-4 border border-cyan-500/10">
                <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-500 mb-1">InnerLoop</p>
                <p className="text-sm text-slate-100 leading-relaxed">
                  Let&apos;s slow this down. What decision feels the heaviest right now—and what
                  have you already tried that didn&apos;t move it forward?
                </p>
              </div>
              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-4 shadow-lg shadow-cyan-500/5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-1">Memory Detected</p>
                <p className="text-xs text-slate-300 italic">
                  &ldquo;Decision about changing teams at work.&rdquo;
                </p>
                <div className="mt-4 flex items-center justify-between pt-2 border-t border-cyan-500/10">
                  <p className="text-[10px] text-slate-500 font-medium">Category: Decisions</p>
                  <button className="rounded-full bg-cyan-400 px-4 py-1.5 text-[10px] font-bold text-slate-950 hover:bg-cyan-300 transition-colors">
                    Confirm
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

