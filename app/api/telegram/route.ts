// app/api/telegram/route.ts
import { askAI } from "@/lib/ai"

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
if (!TELEGRAM_BOT_TOKEN) throw new Error("Missing TELEGRAM_BOT_TOKEN")

const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`

type TgUpdate = {
  message?: { text?: string; chat: { id: number } }
}

async function fetchTopCrypto() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false"
    )
    const data = await res.json()
    // Rapiin string
    return (
      "🔥 Top 5 Crypto:\n" +
      data
        .map(
          (c: any, i: number) =>
            `${i + 1}. ${c.name} (${c.symbol.toUpperCase()}): $${c.current_price.toLocaleString()} (${c.price_change_percentage_24h?.toFixed(2)}%)`
        )
        .join("\n")
    )
  } catch (err) {
    console.error(err)
    return "❌ Gagal fetch Top Crypto"
  }
}

async function fetchCrypto(symbol: string) {
  try {
    const id = symbol.toLowerCase()
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_24hr_change=true`
    )
    const data = await res.json()
    if (!data[id]) return null
    return `💰 ${symbol.toUpperCase()}: $${data[id].usd.toLocaleString()}\n24h Change: ${data[id].usd_24h_change?.toFixed(2)}%`
  } catch (err) {
    console.error(err)
    return null
  }
}

async function sendMessage(chat_id: number, text: string) {
  try {
    await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id, text }),
    })
  } catch (err) {
    console.error(err)
  }
}

export async function POST(req: Request) {
  try {
    const update: TgUpdate = await req.json()
    const chat_id = update.message?.chat.id
    const message = update.message?.text?.trim()

    if (!chat_id || !message) return new Response("ok")

    let reply = ""

    const msgLower = message.toLowerCase()

    if (msgLower === "btc") {
      reply = (await fetchCrypto("bitcoin")) ?? "❌ Gagal fetch BTC"
    } else if (msgLower === "eth") {
      reply = (await fetchCrypto("ethereum")) ?? "❌ Gagal fetch ETH"
    } else if (msgLower.includes("top crypto")) {
      reply = await fetchTopCrypto()
    } else {
      // fallback ke AI
      reply = await askAI(message)
    }

    await sendMessage(chat_id, reply)
    return new Response("ok")
  } catch (err) {
    console.error(err)
    return new Response("error", { status: 500 })
  }
  }
