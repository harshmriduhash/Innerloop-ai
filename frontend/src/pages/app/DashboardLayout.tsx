import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth, UserButton } from "@clerk/clerk-react";
import { MOCK_DAILY } from "../../mockData";

const nav = [
  { to: "voice", label: "Voice" },
  { to: "memory", label: "Memory" },
  { to: "summary", label: "Summary" },
  { to: "settings", label: "Settings" }
];

export function DashboardLayout({ isDemo }: { isDemo?: boolean }) {
  const navigate = useNavigate();
  const { isLoaded, userId, signOut } = useAuth();

  const [daily, setDaily] = useState<{
    date: string;
    morningText: string;
    eveningText: string;
    sessionsCount: number;
  } | null>(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (isDemo) {
      setDaily(MOCK_DAILY);
      setStreak(3);
      return;
    }

    if (isLoaded && !userId) {
      navigate("/login");
      return;
    }

    async function load() {
      try {
        const res = await axios.get("/api/daily");
        setDaily(res.data);
        setStreak(res.data.sessionsCount > 0 ? 1 : 0);
      } catch (err: any) {
        console.error("Failed to load daily data", err);
      }
    }

    if (userId) {
      load();
    }
  }, [isDemo, isLoaded, userId, navigate]);

  const handleExit = () => {
    if (isDemo) {
      navigate("/");
    } else {
      signOut();
      navigate("/");
    }
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:py-10">
      {isDemo && (
        <div className="rounded-xl bg-cyan-400/10 border border-cyan-400/20 p-3 text-center">
          <p className="text-xs font-medium text-cyan-300">
            🌟 You are in **Demo Mode**. Explore all pro features freely. No data is saved.
          </p>
        </div>
      )}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50">InnerLoop</h2>
          <p className="text-xs text-slate-400">
            Your private space to think out loud and remember what matters.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          {daily && (
            <div className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-200">
              Today: {daily.sessionsCount} session{daily.sessionsCount === 1 ? "" : "s"} · Streak:{" "}
              {streak} day{streak === 1 ? "" : "s"}
            </div>
          )}
          {!isDemo ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <button
              onClick={handleExit}
              className="rounded-full border border-slate-700 px-4 py-1.5 text-slate-300 hover:border-red-500/50 hover:text-red-300 transition-colors"
            >
              Exit Demo
            </button>
          )}
        </div>
      </div>

      <div className="glass-panel flex flex-col gap-4 p-3 md:flex-row md:items-center md:justify-between">
        <nav className="flex flex-wrap gap-2 text-xs">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 transition-colors ${isActive
                  ? "bg-cyan-400 text-slate-950"
                  : "bg-slate-900/70 text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <Outlet context={{ isDemo }} />
    </div>
  );
}

