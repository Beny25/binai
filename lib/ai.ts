export async function askAI(prompt: string): Promise<string> {
  const HF_API_KEY = process.env.HF_API_KEY

  if (!HF_API_KEY) {
    return "❌ HF_API_KEY tidak ditemukan"
  }

  try {
    const res = await fetch(
      "https://router.huggingface.co/hf-inference/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `<s>[INST] ${prompt} [/INST]`,
          parameters: {
            max_new_tokens: 120,
            temperature: 0.7
          }
        }),
      }
    )

    const text = await res.text()

    if (!text) {
      return "❌ AI tidak merespon"
    }

    let data

    try {
      data = JSON.parse(text)
    } catch {
      console.error("RAW HF:", text)
      return "❌ Response bukan JSON"
    }

    if (!res.ok) {
      console.error(data)
      return "❌ AI server error"
    }

    if (Array.isArray(data) && data[0]?.generated_text) {
      return data[0].generated_text.trim()
    }

    return "🤖 AI tidak memberi jawaban"

  } catch (err) {
    console.error("AI ERROR:", err)
    return "❌ AI gagal dipanggil"
  }
}
