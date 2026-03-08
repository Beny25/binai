// app/api/ai/route.ts
import { askAI } from "@/lib/openai"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    const lowerMsg = message.toLowerCase()
    let reply = ""

    // =========================
    // Crypto queries
    // =========================
    if (lowerMsg.includes("btc") || lowerMsg.includes("bitcoin")) {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"
      )
      const data = await res.json()
      const price = data.bitcoin.usd
      const change = data.bitcoin.usd_24h_change
      reply = `💰 Bitcoin: $${price}\n24h Change: ${change?.toFixed(2)}%`
    } 
    else if (lowerMsg.includes("eth") || lowerMsg.includes("ethereum")) {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true"
      )
      const data = await res.json()
      const price = data.ethereum.usd
      const change = data.ethereum.usd_24h_change
      reply = `💰 Ethereum: $${price}\n24h Change: ${change?.toFixed(2)}%`
    } 
    else if (lowerMsg.includes("bnb") || lowerMsg.includes("binance")) {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd&include_24hr_change=true"
      )
      const data = await res.json()
      const price = data.binancecoin.usd
      const change = data.binancecoin.usd_24h_change
      reply = `💰 BNB: $${price}\n24h Change: ${change?.toFixed(2)}%`
    } 
    // =========================
    // Fallback ke AI
    // =========================
    else {
      reply = await askAI(message)
    }

    return Response.json({ reply })

  } catch (err:any) {
    console.error(err)
    return Response.json({ reply: "❌ Maaf, ada error saat memproses pesanmu." })
  }
}
