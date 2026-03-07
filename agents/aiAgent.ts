import { askAI } from "@/lib/ai"

export async function runAIAgent(prompt: string) {

  const response = await askAI(prompt)

  return response
}
