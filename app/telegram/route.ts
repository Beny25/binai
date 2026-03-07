import { NextResponse } from "next/server"
import { routeCommand } from "@/services/commandRouter"

export async function POST(req: Request) {

  const data = await req.json()

  const text = data.message?.text
  const chatId = data.message?.chat?.id

  if (!text) {
    return NextResponse.json({ ok: true })
  }

  const reply = await routeCommand(text)

  const token = process.env.TELEGRAM_BOT_TOKEN

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: reply
    })
  })

  return NextResponse.json({ ok: true })
}
