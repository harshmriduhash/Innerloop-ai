import { Link, NavLink, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" }
];

export function Navbar() {
  const location = useLocation();
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  const isAuthRoute =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/signup") ||
    location.pathname.startsWith("/app");

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center">
            <span className="text-cyan-300 text-sm font-semibold">IL</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold tracking-tight">InnerLoop</span>
            <span className="text-xs text-slate-400">Your thoughts deserve memory</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition-colors hover:text-cyan-300 ${
                  isActive ? "text-cyan-300" : "text-slate-300"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <button
            onClick={() => setDark((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-900/60 text-slate-300 hover:bg-slate-800/70"
            aria-label="Toggle dark mode"
          >
            {dark ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {!isAuthRoute && (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-slate-300 hover:text-cyan-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-300"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

