// app/api/ai/route.ts
import { runAIAgent } from "@/lib/ai"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    const reply = await runAIAgent(message)
    return Response.json({ reply })
  } catch {
    return Response.json({ reply: "❌ Maaf, ada error saat memproses pesanmu." })
  }
}
