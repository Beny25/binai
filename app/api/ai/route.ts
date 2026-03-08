export async function POST(req:Request){

  const body = await req.json()

  const message = body.message

  const reply = "BinAI menjawab: " + message

  return Response.json({
    reply
  })
}
