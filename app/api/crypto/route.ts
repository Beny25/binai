export async function GET() {
  try {
    // Ambil harga multi coin dari CoinGecko
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin&vs_currencies=usd&include_24hr_change=true"
    )

    if (!res.ok) throw new Error("Failed to fetch crypto data")

    const data = await res.json()

    // Format response agar gampang dipakai di frontend
    const result = {
      bitcoin: {
        name: "Bitcoin",
        symbol: "BTC",
        price: data.bitcoin.usd,
        change: data.bitcoin.usd_24h_change
      },
      ethereum: {
        name: "Ethereum",
        symbol: "ETH",
        price: data.ethereum.usd,
        change: data.ethereum.usd_24h_change
      },
      bnb: {
        name: "Binance Coin",
        symbol: "BNB",
        price: data.binancecoin.usd,
        change: data.binancecoin.usd_24h_change
      }
    }

    return Response.json(result)

  } catch (error:any) {
    console.error(error)
    return Response.json({ error: "❌ Failed to fetch crypto data" })
  }
}
