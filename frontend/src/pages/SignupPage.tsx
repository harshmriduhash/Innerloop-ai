import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import axios from "axios";

export function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/signup", { email, password });
      const { token } = res.data;
      localStorage.setItem("innerloop_token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigate("/app");
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Unable to sign up.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-10">
      <h2 className="text-3xl font-semibold tracking-tight text-slate-50">Create your loop</h2>
      <p className="mt-2 text-sm text-slate-300">
        Sign up to start building a memory of your own thoughts.
      </p>

      <form onSubmit={handleSubmit} className="glass-panel mt-6 space-y-4 p-5">
        {error && (
          <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            {error}
          </p>
        )}
        <div className="space-y-1 text-sm">
          <label className="text-slate-200">Email</label>
          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-slate-100 outline-none focus:border-cyan-400"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1 text-sm">
          <label className="text-slate-200">Password</label>
          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-slate-100 outline-none focus:border-cyan-400"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-full bg-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-cyan-500/40 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-slate-400">
        Already have an account?{" "}
        <Link to="/login" className="text-cyan-300 hover:text-cyan-200">
          Sign in
        </Link>
        .
      </p>
    </div>
  );
}

