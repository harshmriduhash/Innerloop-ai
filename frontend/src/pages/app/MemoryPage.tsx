import { Trash2, History } from "lucide-react";

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
    if (!confirm("Are you sure you want to delete this memory?")) return;
    await axios.delete(`/api/memories/${id}`);
    setItems((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div className="page-fade-in space-y-6">
      <div className="glass-panel p-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-6 opacity-5">
          <History size={80} />
        </div>
        <div className="relative z-10">
          <h3 className="text-lg font-bold text-slate-100 italic tracking-tight">Memory timeline</h3>
          <p className="mt-1 text-sm text-slate-400">
            Everything InnerLoop remembers—with your explicit consent.
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {items.length === 0 && (
          <div className="glass-panel p-10 text-center">
            <p className="text-sm font-medium text-slate-500 italic">
              No memories yet. InnerLoop only remembers what you approve during voice sessions.
            </p>
          </div>
        )}
        {items.map((m) => (
          <div
            key={m.id}
            className="glass-panel flex items-center justify-between gap-6 p-5 hover:bg-slate-900/60"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                  {m.category}
                </span>
                <span className="text-[10px] font-medium text-slate-600">
                  {new Date(m.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-200">{m.text}</p>
            </div>
            <button
              onClick={() => remove(m.id)}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 hover:border-red-500/50 hover:bg-red-500/10 transition-all"
              title="Delete memory"
            >
              <Trash2 size={16} className="text-slate-600 group-hover:text-red-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

