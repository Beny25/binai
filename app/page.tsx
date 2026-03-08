"use client"
import { useEffect, useState } from "react"
import CryptoCard from "../components/CryptoCard"

export default function Home() {
  const [coins, setCoins] = useState<any>({})
  const [loading, setLoading] = useState(false)

  const fetchCrypto = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/crypto")
      const data = await res.json()
      setCoins(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // fetch pertama kali
  useEffect(() => {
    fetchCrypto()
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">

      <h1 className="text-3xl font-bold mb-2 text-center">BinAI</h1>
      <p className="text-center mb-6">AI Crypto Assistant Platform</p>

      {/* Tombol Chat */}
      <div className="flex justify-center gap-4 mb-6">
        <a href="/chat">
          <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">💬 Chat on Website</button>
        </a>
        <a href="https://t.me/binai_assistant_bot" target="_blank">
          <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">🤖 Chat via Telegram</button>
        </a>
        <button
          onClick={fetchCrypto}
          className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition"
        >
          🔄 Refresh Prices
        </button>
      </div>

      {/* Loading */}
      {loading && <p className="text-center text-gray-400 mb-4">Fetching latest prices...</p>}

      {/* Dashboard */}
      <div className="flex justify-center gap-6 flex-wrap">
        {coins.bitcoin && <CryptoCard {...coins.bitcoin} />}
        {coins.ethereum && <CryptoCard {...coins.ethereum} />}
        {coins.bnb && <CryptoCard {...coins.bnb} />}
      </div>

    </div>
  )
}
