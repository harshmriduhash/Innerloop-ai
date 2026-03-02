import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth, UserButton } from "@clerk/clerk-react";

const nav = [
  { to: "voice", label: "Voice" },
  { to: "memory", label: "Memory" },
  { to: "summary", label: "Summary" },
  { to: "settings", label: "Settings" }
];

export function DashboardLayout() {
  const navigate = useNavigate();
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/login");
      return;
    }
  }, [isLoaded, userId, navigate]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:py-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 dark:text-slate-50">InnerLoop</h2>
          <p className="text-xs text-slate-400">
            Your private space to think out loud and remember what matters.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <UserButton afterSignOutUrl="/" />
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

