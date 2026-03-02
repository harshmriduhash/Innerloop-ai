import { FormEvent, useEffect, useRef, useState } from "react";
import axios from "axios";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function VoicePage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [memoryPrompt, setMemoryPrompt] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [morning, setMorning] = useState("");
  const [evening, setEvening] = useState("");

  // Set up browser speech recognition if available
  useEffect(() => {
    if (typeof window === "undefined") return;
    const AnyWindow = window as any;
    const SpeechRecognitionCtor =
      AnyWindow.SpeechRecognition || AnyWindow.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) return;

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i += 1) {
        transcript += event.results[i][0].transcript;
      }
      setInput(transcript);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  useEffect(() => {
    axios
      .get("/api/daily")
      .then((res) => {
        setMorning(res.data.morning_text || "");
        setEvening(res.data.evening_text || "");
      })
      .catch(() => undefined);
  }, []);

  function toggleListening() {
    const recognition = recognitionRef.current;
    if (!recognition) return;
    if (!listening) {
      setInput("");
      recognition.start();
      setListening(true);
    } else {
      recognition.stop();
      setListening(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      const res = await axios.post("/api/voice", { text });
      const { reply, memoryCandidate } = res.data;
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      if (memoryCandidate) {
        setMemoryPrompt(memoryCandidate.text);
      }
    } catch (err: any) {
      if (err.response?.data?.code === "LIMIT_REACHED") {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "You've reached your daily limit for the free tier. Upgrade to Pro for unlimited sessions."
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, I'm having trouble reflecting right now." }
        ]);
      }
    } finally {
      setLoading(false);
    }
  }

  async function confirmMemory(remember: boolean) {
    if (remember && memoryPrompt) {
      await axios.post("/api/memories", {
        text: memoryPrompt,
        category: "Decision"
      });
    }
    setMemoryPrompt(null);
  }

  return (
    <div className="grid gap-6 md:grid-cols-[3fr,2fr] dark:text-slate-100">
      <section className="glass-panel flex flex-col p-4">
        <h3 className="text-sm font-semibold text-slate-100 dark:text-slate-100">Today&apos;s session</h3>
        <div className="mt-3 flex-1 space-y-3 overflow-y-auto rounded-xl bg-slate-950/60 p-3 text-xs">
          {messages.length === 0 && (
            <p className="text-slate-500">
              Press record or type to start a session. InnerLoop will reflect back and notice
              memory-worthy moments.
            </p>
          )}
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`max-w-xs rounded-2xl px-3 py-2 ${m.role === "user"
                ? "ml-auto bg-cyan-500/20 text-cyan-100"
                : "mr-auto bg-slate-900/80 text-slate-100"
                }`}
            >
              {m.content}
            </div>
          ))}
          {loading && (
            <div className="mr-auto flex items-center gap-2 text-slate-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-500" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-500 delay-150" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-500 delay-300" />
              <span className="text-[11px]">Thinking…</span>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
          <input
            className="flex-1 rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-slate-100 outline-none focus:border-cyan-400"
            placeholder="Talk about what’s on your mind..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="button"
            onClick={toggleListening}
            className={`rounded-xl border px-3 py-2 text-xs font-semibold ${listening
              ? "border-red-400 bg-red-500/20 text-red-200"
              : "border-cyan-500 bg-cyan-500/10 text-cyan-200"
              }`}
          >
            {listening ? "Stop" : "Talk"}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-cyan-500/40 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Send
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <form
          className="glass-panel space-y-3 p-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h3 className="text-sm font-semibold text-slate-100 dark:text-slate-100">Daily flow</h3>
          <p className="mt-1 text-[11px] text-slate-400">
            Start with a quick check-in in the morning and close your day with a short reflection.
          </p>
          <div className="space-y-1 text-xs">
            <label className="text-slate-300">Morning prompt</label>
            <textarea
              className="min-h-[60px] w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-[11px] text-slate-100 outline-none focus:border-cyan-400"
              placeholder="What feels most present as you start today?"
              value={morning}
              onChange={async (e) => {
                const value = e.target.value;
                setMorning(value);
                await axios.post("/api/daily/morning", { text: value });
              }}
            />
          </div>
          <div className="space-y-1 text-xs">
            <label className="text-slate-300">End-of-day reflection</label>
            <textarea
              className="min-h-[60px] w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-[11px] text-slate-100 outline-none focus:border-cyan-400"
              placeholder="What stayed with you from today?"
              value={evening}
              onChange={async (e) => {
                const value = e.target.value;
                setEvening(value);
                await axios.post("/api/daily/evening", { text: value });
              }}
            />
          </div>
        </form>

        {memoryPrompt && (
          <div className="glass-panel space-y-3 p-4">
            <p className="text-xs font-semibold text-slate-100">Remember this?</p>
            <p className="text-xs text-slate-300">{memoryPrompt}</p>
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => confirmMemory(true)}
                className="rounded-full bg-cyan-400 px-3 py-1.5 font-semibold text-slate-950 hover:bg-cyan-300"
              >
                Yes, remember
              </button>
              <button
                onClick={() => confirmMemory(false)}
                className="rounded-full border border-slate-700 px-3 py-1.5 text-slate-300 hover:border-slate-500"
              >
                Not this
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

