import { runAIAgent } from "@/agents/aiAgent"
import { runCryptoAgent } from "@/agents/cryptoAgent"

export async function routeCommand(text: string) {

  if (text === "/start") {
    return "🤖 Welcome to BinAI\nAI Crypto Assistant"
  }

  if (text === "/help") {
    return `
Commands

/start
/help
/ask
/crypto
`
  }

  if (text.startsWith("/ask")) {

    const prompt = text.replace("/ask ", "")

    return await runAIAgent(prompt)
  }

  if (text.startsWith("/crypto")) {

    const coin = text.replace("/crypto ", "")

    return await runCryptoAgent(coin)
  }

  return "Unknown command"
}
