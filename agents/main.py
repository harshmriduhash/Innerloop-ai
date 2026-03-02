import os
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY) if OPENAI_API_KEY else None

app = FastAPI(title="InnerLoop Agents")


class MemoryContext(BaseModel):
  text: str
  category: str | None = None
  createdAt: str | None = None


class ReflectRequest(BaseModel):
  text: str
  memories: list[MemoryContext] | None = None


class ReflectResponse(BaseModel):
  reply: str
  memoryCandidate: dict | None = None


@app.post("/reflect", response_model=ReflectResponse)
def reflect(req: ReflectRequest):
  text = req.text.strip()
  memories = req.memories or []
  if not client:
    reply = (
      "I hear that this is on your mind. What feels most present about this right now, "
      "and what changed since the last time you thought about it?"
    )
    memory = {"text": text} if len(text) > 40 else None
    return ReflectResponse(reply=reply, memoryCandidate=memory)

  # Build a strictly memory-grounded prompt
  memory_section = "No approved memories yet." if not memories else "\n".join(
    f"- [{m.category or 'Uncategorized'}] {m.text}" for m in memories
  )

  prompt = f"""
You are InnerLoop, a reflective AI companion. You respond only with:
- reflections that mirror the user's thoughts
- clarifying questions
- no advice, no fixes, no external facts

You must ground everything you say only in:
- the current user text
- the approved memories listed below

Approved memories:
{memory_section}

User just said:
\"\"\"{text}\"\"\"

1. Write a short, calm reflection back.
2. If this sounds like a decision, emotion, or goal worth remembering, say so in square brackets at the end: [MEMORY_CANDIDATE].
3. If you are not sure, or there is no relevant memory, say clearly that you don't know yet instead of guessing.
"""
  completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
      {"role": "system", "content": prompt}
    ]
  )
  raw = completion.choices[0].message.content
  memory = None
  if "[MEMORY_CANDIDATE]" in raw:
    reply = raw.replace("[MEMORY_CANDIDATE]", "").strip()
    memory = {"text": text}
  else:
    reply = raw.strip()
  return ReflectResponse(reply=reply, memoryCandidate=memory)


