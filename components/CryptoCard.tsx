"use client"
import React from "react"

interface CryptoCardProps {
  name: string
  symbol: string
  current_price: number
  price_change_percentage_24h?: number
}

export default function CryptoCard({
  name,
  symbol,
  current_price,
  price_change_percentage_24h,
}: CryptoCardProps) {
  const change = price_change_percentage_24h?.toFixed(2)
  const isUp = (price_change_percentage_24h || 0) >= 0
  return (
    <div className="bg-gray-800 p-4 rounded-lg w-64 text-white shadow-md">
      <h2 className="font-bold text-xl">
        {name} ({symbol.toUpperCase()})
      </h2>
      <p className="mt-2">💰 ${current_price.toLocaleString()}</p>
      <p className={isUp ? "text-green-400" : "text-red-400"}>
        24h Change: {change}%
      </p>
    </div>
  )
}
