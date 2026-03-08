"use client"

import { useState, useEffect } from "react"

export default function HomePage() {
  const [crypto, setCrypto] = useState<{ bitcoin?: any; ethereum?: any }>({})
  const [activeTab, setActiveTab] = useState<string>("spot")

  const fetchCrypto = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true"
      )
      const data = await res.json()
      setCrypto(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchCrypto()
  }, [])

  const products = [
    {
      id: "spot",
      title: "Spot & Futures",
      desc: "Trading crypto langsung atau kontrak derivatif. Cocok untuk short-term & long-term strategi.",
      faqs: [
        "Apa itu Spot Trading?",
        "Bagaimana cara membuka posisi Futures?",
        "Apa risiko trading Futures?",
      ],
    },
    {
      id: "staking",
      title: "Staking & Savings",
      desc: "Simpan aset crypto untuk mendapatkan bunga pasif. Aman & fleksibel.",
      faqs: ["Bagaimana cara staking BNB?", "Apa itu Flexible Savings?", "Bagaimana bunga dihitung?"],
    },
    {
      id: "pay",
      title: "Binance Pay",
      desc: "Bayar online dengan crypto, scan QR atau transfer antar akun. Cepat & tanpa biaya tambahan.",
      faqs: ["Bagaimana cara pakai Binance Pay?", "Apakah ada biaya?", "Coin apa saja yang didukung?"],
    },
    {
      id: "nft",
      title: "Binance NFT",
      desc: "Marketplace NFT untuk beli/jual karya digital dengan crypto.",
      faqs: ["Bagaimana cara membeli NFT?", "Bagaimana cara menjual NFT?", "Coin apa yang bisa digunakan?"],
    },
    {
      id: "security",
      title: "Tips Aman",
      desc: "Aktifkan 2FA, jangan share private key, gunakan akun resmi Binance.",
      faqs: ["Apa itu 2FA?", "Bagaimana melindungi akun saya?", "Apakah Binance aman?"],
    },
  ]

  const telegramBotLink = (question: string) =>
    `https://t.me/binai_assistant_bot?start=${encodeURIComponent(question)}`

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">BinAI</h1>
        <p className="text-lg">AI Crypto Assistant Platform + Binance Edu</p>
      </header>

      {/* Quick Crypto Info */}
      <section className="flex justify-center gap-6 flex-wrap mb-8">
        {crypto.bitcoin && (
          <div className="bg-gray-800 p-4 rounded w-64 text-center shadow-md">
            <h2 className="font-bold text-xl">Bitcoin (BTC)</h2>
            <p className="mt-2">💰 ${crypto.bitcoin.usd.toLocaleString()}</p>
            <p className={crypto.bitcoin.usd_24h_change >= 0 ? "text-green-400" : "text-red-400"}>
              24h Change: {crypto.bitcoin.usd_24h_change?.toFixed(2)}%
            </p>
          </div>
        )}
        {crypto.ethereum && (
          <div className="bg-gray-800 p-4 rounded w-64 text-center shadow-md">
            <h2 className="font-bold text-xl">Ethereum (ETH)</h2>
            <p className="mt-2">💰 ${crypto.ethereum.usd.toLocaleString()}</p>
            <p className={crypto.ethereum.usd_24h_change >= 0 ? "text-green-400" : "text-red-400"}>
              24h Change: {crypto.ethereum.usd_24h_change?.toFixed(2)}%
            </p>
          </div>
        )}
      </section>

      {/* Telegram Chat CTA */}
      <section className="text-center mb-8">
        <a
          href="https://t.me/binai_assistant_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white font-semibold inline-block"
        >
          💬 Chat with BinAI on Telegram
        </a>
      </section>

      {/* Interactive Product Tabs */}
      <section className="max-w-3xl mx-auto bg-gray-800 p-6 rounded shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Learn About Binance</h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {products.map((p) => (
            <button
              key={p.id}
              className={`px-4 py-2 rounded ${
                activeTab === p.id ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"
              }`}
              onClick={() => setActiveTab(p.id)}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Description */}
        <div className="bg-gray-900 p-4 rounded text-gray-200 mb-4">
          {products.find((p) => p.id === activeTab)?.desc}
        </div>

        {/* FAQ Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          {products
            .find((p) => p.id === activeTab)
            ?.faqs.map((q, idx) => (
              <a
                key={idx}
                href={telegramBotLink(q)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm text-white"
              >
                {q}
              </a>
            ))}
        </div>
      </section>

      {/* Optional: quick tips */}
      <section className="text-center mt-8 text-gray-400 text-sm">
        Klik tab produk di atas untuk info edukasi. Klik FAQ untuk langsung bertanya ke BinAI Telegram Bot.
      </section>
    </div>
  )
                       }
