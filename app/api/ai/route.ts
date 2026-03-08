export async function POST(req: Request) {

  const body = await req.json()
  const message = body.message.toLowerCase()

  // BTC PRICE
  if(message.includes("btc") || message.includes("bitcoin")){

    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    )

    const data = await res.json()

    const price = data.bitcoin.usd

    return Response.json({
      reply: `💰 Harga Bitcoin sekarang: $${price}`
    })
  }

  // ETH PRICE
  if(message.includes("eth") || message.includes("ethereum")){

    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    )

    const data = await res.json()

    const price = data.ethereum.usd

    return Response.json({
      reply: `💰 Harga Ethereum sekarang: $${price}`
    })
  }

  return Response.json({
    reply: "BinAI siap membantu analisis crypto 🚀"
  })

}
