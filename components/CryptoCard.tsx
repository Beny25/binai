interface Props {
  name: string
  price: number
}

export default function CryptoCard({ name, price }: Props) {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md w-48 text-center">
      <h2 className="font-bold text-lg">{name}</h2>
      <p className="mt-2 text-2xl">${price}</p>
    </div>
  )
}
