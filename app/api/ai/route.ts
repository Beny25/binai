// app/api/ai/route.ts
import { askAI } from "@/lib/ai"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    const reply = await askAI(message)
    return Response.json({ reply })
  } catch {
    return Response.json({ reply: "❌ Maaf, ada error saat memproses pesanmu." })
  }
}
