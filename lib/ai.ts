// lib/ai/ai.ts

export async function askAI(prompt: string): Promise<string> {
  const HF_API_KEY = process.env.HF_API_KEY

  if (!HF_API_KEY) {
    return "❌ HF_API_KEY belum diset"
  }

  // model yang cukup stabil untuk chat
  const MODEL = "HuggingFaceH4/zephyr-7b-beta"

  try {
    const res = await fetch(
      `https://router.huggingface.co/api/llm/predict/${MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `<|user|>\n${prompt}\n<|assistant|>`,
          parameters: {
            max_new_tokens: 120,
            temperature: 0.7,
            top_p: 0.9
          }
        }),
      }
    )

    const data = await res.json()

    // debug kalau error
    if (!res.ok) {
      console.error("HF ERROR:", data)
      return `❌ AI error`
    }

    // berbagai kemungkinan format response
    const reply =
      data?.generated_text ||
      data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.text ||
      data?.[0]?.generated_text

    if (!reply) {
      console.log("HF RAW:", data)
      return "🤖 AI belum bisa menjawab"
    }

    return reply.trim()

  } catch (err: any) {
    console.error("AI ERROR:", err)
    return "❌ AI sedang bermasalah"
  }
}
