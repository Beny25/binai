interface Props {
  name: string
  price: number
  change?: number
  symbol?: string
}

export default function CryptoCard({ name, price, change, symbol }: Props) {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md w-52 text-center hover:scale-105 transition-transform">
      
      <h2 className="font-bold text-lg flex justify-center items-center gap-2">
        {symbol && <span className="uppercase">{symbol}</span>} {name}
      </h2>
      
      <p className="mt-2 text-2xl font-mono">${price}</p>
      
      {change !== undefined && (
        <p className={`mt-1 font-semibold ${change >= 0 ? "text-green-400" : "text-red-400"}`}>
          {change >= 0 ? "▲" : "▼"} {change.toFixed(2)}%
        </p>
      )}

    </div>
  )
}
