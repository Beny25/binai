// app/api/telegram/route.ts
import { askAI } from "@/lib/ai"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const message = body.message?.text || ""
    const chatId = body.message?.chat?.id

    if (!chatId || !message) return new Response("ok") // no-op

    const reply = await askAI(message)
    // kirim balik ke Telegram
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: reply,
      }),
    })

    return new Response("ok")
  } catch (err) {
    console.error("Telegram webhook error:", err)
    return new Response("error")
  }
}
