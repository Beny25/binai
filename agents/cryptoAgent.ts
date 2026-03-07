export async function runCryptoAgent(symbol: string) {

  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`
  )

  const data = await res.json()

  if (!data[symbol]) {
    return "Crypto not found"
  }

  return `${symbol.toUpperCase()} price: $${data[symbol].usd}`
}
