"use client"
import { useEffect, useState } from "react"
import CryptoCard from "@/components/CryptoCard"

export default function DashboardPage() {
  const [coins, setCoins] = useState<any>({})

  const fetchCrypto = async () => {
    try {
      const res = await fetch("/api/crypto")
      const data = await res.json()
      setCoins(data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">BinAI Dashboard</h1>
      <p className="text-center mb-6">AI Crypto Assistant Platform</p>

      <div className="flex justify-center gap-6 flex-wrap mb-6">
        {coins.bitcoin && <CryptoCard {...coins.bitcoin} />}
        {coins.ethereum && <CryptoCard {...coins.ethereum} />}
        {coins.bnb && <CryptoCard {...coins.bnb} />}
      </div>

      <button
        onClick={fetchCrypto}
        className="mx-auto block bg-blue-600 hover:bg-blue-700 p-2 rounded"
      >
        🔄 Refresh Prices
      </button>
    </div>
  )
}
