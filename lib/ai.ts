// lib/ai.ts

// OpenAI helper
export async function askAI(prompt: string) {
  if (!process.env.OPENAI_API_KEY) throw new Error("Missing OpenAI API Key")
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 250,
    }),
  })
  const data = await res.json()
  return data?.choices?.[0]?.message?.content || "❌ AI tidak merespon"
}

// CoinGecko tipe
interface Coin {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h?: number
}

// Main AI agent
export async function runAIAgent(message: string) {
  const lower = message.toLowerCase()
  let reply = ""

  try {
    if (lower.includes("btc")) {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"
      )
      const data = await res.json()
      reply = `💰 Bitcoin: $${data.bitcoin.usd}\n24h Change: ${data.bitcoin.usd_24h_change?.toFixed(2)}%`
    } else if (lower.includes("eth")) {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true"
      )
      const data = await res.json()
      reply = `💰 Ethereum: $${data.ethereum.usd}\n24h Change: ${data.ethereum.usd_24h_change?.toFixed(2)}%`
    } else if (lower.includes("bnb")) {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd&include_24hr_change=true"
      )
      const data = await res.json()
      reply = `💰 BNB: $${data.binancecoin.usd}\n24h Change: ${data.binancecoin.usd_24h_change?.toFixed(2)}%`
    } else if (lower.includes("top crypto")) {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false"
      )
      const data: Coin[] = await res.json()
      reply =
        "🔥 Top 5 Crypto:\n" +
        data
          .map(
            (c: Coin, i: number) =>
              `${i + 1}. ${c.name} (${c.symbol.toUpperCase()}): $${c.current_price} (${c.price_change_percentage_24h?.toFixed(
                2
              )}%)`
          )
          .join("\n")
    } else {
      // fallback AI
      reply = await askAI(message)
    }
  } catch (err) {
    console.error(err)
    reply = "❌ Maaf, tidak bisa ambil data saat ini."
  }

  return reply
}
