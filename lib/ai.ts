// lib/ai.ts
export async function askAI(prompt: string): Promise<string> {
  if (!process.env.HF_API_KEY) throw new Error("Missing HF_API_KEY")

  const MODEL = "tiiuae/falcon-7b-instruct" // bisa diganti model LLM lain di HF Router

  try {
    const res = await fetch(`https://router.huggingface.co/api/llm/predict/${MODEL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: { max_new_tokens: 256 },
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      return `❌ AI tidak merespon: ${text}`
    }

    const data = await res.json()
    // biasanya hasil di data.generated_text
    return data.generated_text ?? "❌ AI tidak merespon"
  } catch (err) {
    console.error(err)
    return `❌ AI error: ${(err as any).message ?? err}`
  }
}
