import { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { MOCK_SUMMARIES } from "../../mockData";

interface WeeklySummary {
  id: string;
  weekStart: string;
  text: string;
  score: number;
}

export function SummaryPage() {
  const { isDemo } = useOutletContext<{ isDemo?: boolean }>();
  const [summaries, setSummaries] = useState<WeeklySummary[]>([]);

  useEffect(() => {
    if (isDemo) {
      setSummaries(MOCK_SUMMARIES);
      return;
    }
    axios.get("/api/summaries").then((res) => setSummaries(res.data.summaries)).catch(() => undefined);
  }, [isDemo]);

  const latest = summaries[0];
  const progress = latest ? Math.min(100, Math.max(0, latest.score)) : 0;

  return (
    <div className="glass-panel space-y-4 p-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-slate-100">Weekly summary</h3>
          <p className="text-xs text-slate-400">
            A gentle reflection on what has been emotionally and cognitively present for you.
          </p>
        </div>
      </div>

      {latest ? (
        <>
          <div className="space-y-2 rounded-xl bg-slate-950/60 p-3 text-xs">
            <p className="text-[11px] text-slate-500">
              Week of {new Date(latest.weekStart).toLocaleDateString()}
            </p>
            <p className="text-slate-200">{latest.text}</p>
          </div>
          <div className="space-y-1 text-xs">
            <p className="text-slate-400">Consistency this week</p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-900">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </>
      ) : (
        <p className="rounded-xl bg-slate-950/60 px-3 py-2 text-xs text-slate-500">
          Your first weekly summary will appear after a few days of sessions and memories.
        </p>
      )}
    </div>
  );
}

