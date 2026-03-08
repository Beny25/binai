"use client"
import { useEffect, useState } from "react"
import CryptoCard from "../components/CryptoCard"

export default function Home() {
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

  useEffect(() => {
    fetchCrypto()
    const interval = setInterval(fetchCrypto, 10000) // refresh tiap 10 detik
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">

      <h1 className="text-3xl font-bold mb-4 text-center">BinAI</h1>
      <p className="text-center mb-6">AI Crypto Assistant Platform</p>

      {/* Dashboard */}
      <div className="flex justify-center gap-6 flex-wrap">
        {coins.bitcoin && <CryptoCard {...coins.bitcoin} />}
        {coins.ethereum && <CryptoCard {...coins.ethereum} />}
        {coins.bnb && <CryptoCard {...coins.bnb} />}
      </div>

    </div>
  )
}
