"use client"

import { useEffect, useState } from "react"
import CryptoCard from "../components/CryptoCard"

export default function Home() {

  const [data,setData] = useState<{bitcoin:number,ethereum:number}>({bitcoin:0,ethereum:0})

  const fetchCrypto = async () => {
    try {
      const res = await fetch("/api/crypto")
      const json = await res.json()
      setData({ bitcoin: json.bitcoin.usd, ethereum: json.ethereum.usd })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(()=>{
    fetchCrypto()
    const interval = setInterval(fetchCrypto,10000) // refresh tiap 10 detik
    return ()=>clearInterval(interval)
  },[])

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">

      <h1 className="text-3xl font-bold mb-6 text-center">BinAI</h1>
      <p className="text-center mb-8">AI Crypto Assistant Platform</p>

      {/* Tombol Chat */}
      <div className="flex justify-center gap-4 mb-8">
        <a href="/chat">
          <button className="bg-blue-600 px-4 py-2 rounded-lg">💬 Chat on Website</button>
        </a>
        <a href="https://t.me/binai_assistant_bot" target="_blank">
          <button className="bg-blue-600 px-4 py-2 rounded-lg">🤖 Chat via Telegram</button>
        </a>
      </div>

      {/* Dashboard */}
      <div className="flex justify-center gap-6 flex-wrap">
        <CryptoCard name="Bitcoin" price={data.bitcoin}/>
        <CryptoCard name="Ethereum" price={data.ethereum}/>
      </div>

    </div>
  )
}
