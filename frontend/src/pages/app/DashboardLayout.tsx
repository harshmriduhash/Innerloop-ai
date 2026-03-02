import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const nav = [
  { to: "voice", label: "Voice" },
  { to: "memory", label: "Memory" },
  { to: "summary", label: "Summary" },
  { to: "settings", label: "Settings" }
];

export function DashboardLayout() {
  const navigate = useNavigate();
  const [daily, setDaily] = useState<{
    date: string;
    morningText: string;
    eveningText: string;
    sessionsCount: number;
  } | null>(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("innerloop_token");
    if (!token) {
      navigate("/login");
      return;
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    async function load() {
      try {
        const res = await axios.get("/api/daily");
        setDaily(res.data);
        setStreak(res.data.sessionsCount > 0 ? 1 : 0);
      } catch (err: any) {
        if (err.response?.status === 401) {
          localStorage.removeItem("innerloop_token");
          navigate("/login");
        }
      }
    }
    load();
  }, [navigate]);

  async function handleLogout() {
    await axios.post("/api/auth/logout").catch(() => undefined);
    localStorage.removeItem("innerloop_token");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/login");
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:py-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50">InnerLoop</h2>
          <p className="text-xs text-slate-400">
            Your private space to think out loud and remember what matters.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          {daily && (
            <div className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-200">
              Today: {daily.sessionsCount} session{daily.sessionsCount === 1 ? "" : "s"} · Streak:{" "}
              {streak} day{streak === 1 ? "" : "s"}
            </div>
          )}
          <button
            onClick={handleLogout}
            className="rounded-full border border-slate-700 px-3 py-1.5 text-slate-300 hover:border-cyan-400 hover:text-cyan-200"
          >
            Log out
          </button>
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

      <Outlet />
    </div>
  );
}

