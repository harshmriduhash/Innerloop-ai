import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="font-medium text-slate-300">InnerLoop.ai</p>
          <p className="text-xs text-slate-500">
            A private, voice-first AI companion that remembers what matters.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link to="/privacy" className="hover:text-cyan-300">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-cyan-300">
            Terms
          </Link>
          <Link to="/contact" className="hover:text-cyan-300">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

