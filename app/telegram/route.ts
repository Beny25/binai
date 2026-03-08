// app/api/telegram/route.ts
import { askAI } from "@/lib/ai"

export async function POST(req: Request) {
  const body = await req.json()
  const message = body.message?.text
  const chatId = body.message?.chat?.id

  if (!message || !chatId) return new Response("No message", { status: 400 })

  let reply: string
  const lower = message.toLowerCase()

  try {
    if (lower.includes("btc")) {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"
      )
      const data = await res.json()
      reply = `💰 Bitcoin: $${data.bitcoin.usd} 24h Change: ${data.bitcoin.usd_24h_change?.toFixed(2)}%`
    } else if (lower.includes("eth")) {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true"
      )
      const data = await res.json()
      reply = `💰 Ethereum: $${data.ethereum.usd} 24h Change: ${data.ethereum.usd_24h_change?.toFixed(2)}%`
    } else if (lower.includes("top crypto")) {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false"
      )
      const data = await res.json()
      reply =
        "🔥 Top 5 Crypto:\n" +
        data
          .map(
            (c: any, i: number) =>
              `${i + 1}. ${c.name} (${c.symbol.toUpperCase()}): $${c.current_price.toLocaleString()} (${c.price_change_percentage_24h?.toFixed(2)}%)`
          )
          .join("\n")
    } else {
      // fallback AI
      reply = await askAI(message)
    }

    // Kirim reply ke Telegram
    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: reply,
        }),
      }
    )

    return new Response(JSON.stringify({ ok: true }))
  } catch (err) {
    console.error(err)
    return new Response("Error processing message", { status: 500 })
  }
    }
