import { useEffect, useState } from "react";
import axios from "axios";

interface MemoryItem {
  id: string;
  text: string;
  category: string;
  createdAt: string;
}

export function MemoryPage() {
  const [items, setItems] = useState<MemoryItem[]>([]);

  async function load() {
    const res = await axios.get("/api/memories");
    setItems(res.data.memories);
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id: string) {
    await axios.delete(`/api/memories/${id}`);
    setItems((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div className="glass-panel p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-100">Memory timeline</h3>
          <p className="text-xs text-slate-400">
            Everything InnerLoop remembers—with your explicit consent.
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-3 text-xs">
        {items.length === 0 && (
          <p className="rounded-xl bg-slate-950/60 px-3 py-2 text-slate-500">
            No memories yet. As you talk, InnerLoop will suggest moments that might be worth
            keeping.
          </p>
        )}
        {items.map((m) => (
          <div
            key={m.id}
            className="flex items-start justify-between gap-3 rounded-xl bg-slate-950/60 px-3 py-2"
          >
            <div>
              <p className="text-slate-200">{m.text}</p>
              <p className="mt-1 text-[11px] text-slate-500">
                {m.category} · {new Date(m.createdAt).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => remove(m.id)}
              className="rounded-full border border-slate-700 px-2 py-1 text-[11px] text-slate-300 hover:border-red-400 hover:text-red-300"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

