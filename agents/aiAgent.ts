import { askAI } from "@/lib/openai"

export async function runAIAgent(prompt: string) {

  const response = await askAI(prompt)

  return response
}
