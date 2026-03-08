export async function GET() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
    )
    const data = await res.json()

    return Response.json(data)
  } catch (error) {
    return Response.json({ error: "Failed to fetch crypto data" })
  }
}
