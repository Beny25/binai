// lib/ai.ts
export async function askAI(prompt: string) {
  if (!process.env.HUGGINGFACE_API_KEY)
    return "❌ AI tidak tersedia. Set HUGGINGFACE_API_KEY di ENV."

  try {
    const contextPrompt = `
Kamu adalah asisten edukasi crypto bernama BinAI.
Berikan jawaban yang jelas, singkat, dan edukatif.
Tambahkan informasi tentang produk Binance jika relevan:
- Binance Spot & Futures
- Staking & Savings
- Binance Pay & NFT
- Tips aman trading crypto
Jangan memberikan saran finansial pribadi.
`

    const fullPrompt = contextPrompt + "\n\nUser: " + prompt

    const res = await fetch(
      "https://api-inference.huggingface.co/models/gpt2", // bisa ganti model lain
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: fullPrompt,
          parameters: { max_new_tokens: 200 },
        }),
      }
    )

    const data = await res.json()
    if (Array.isArray(data) && data[0]?.generated_text)
      return data[0].generated_text

    if (data?.error) return "❌ AI tidak merespon: " + data.error

    return "❌ AI tidak merespon"
  } catch (err) {
    console.error(err)
    return "❌ AI gagal dijalankan"
  }
}
