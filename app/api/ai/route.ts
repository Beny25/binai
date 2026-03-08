// app/api/ai/route.ts
import { askAI } from "@/lib/openai"

interface Coin {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h?: number
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    const lower = message.toLowerCase()
    let reply = ""

    try {
      // BTC
      if (lower.includes("btc")) {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"
        )
        const data = await res.json()
        reply = `💰 Bitcoin: $${data.bitcoin.usd}\n24h Change: ${data.bitcoin.usd_24h_change?.toFixed(
          2
        )}%`
      }
      // ETH
      else if (lower.includes("eth")) {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true"
        )
        const data = await res.json()
        reply = `💰 Ethereum: $${data.ethereum.usd}\n24h Change: ${data.ethereum.usd_24h_change?.toFixed(
          2
        )}%`
      }
      // BNB
      else if (lower.includes("bnb")) {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd&include_24hr_change=true"
        )
        const data = await res.json()
        reply = `💰 BNB: $${data.binancecoin.usd}\n24h Change: ${data.binancecoin.usd_24h_change?.toFixed(
          2
        )}%`
      }
      // Top crypto
      else if (lower.includes("top crypto")) {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false"
        )
        const data: Coin[] = await res.json()
        reply =
          "🔥 Top 5 Crypto:\n" +
          data
            .map(
              (c: Coin, i: number) =>
                `${i + 1}. ${c.name} (${c.symbol.toUpperCase()}): $${c.current_price} (${c.price_change_percentage_24h?.toFixed(2)}%)`
            )
            .join("\n")
      }
      // Fallback AI
      else {
        reply = await askAI(message)
      }
    } catch (err) {
      console.error(err)
      reply = "❌ Maaf, tidak bisa ambil data saat ini."
    }

    return Response.json({ reply })
  } catch {
    return Response.json({ reply: "❌ Maaf, ada error saat memproses pesanmu." })
  }
    }
