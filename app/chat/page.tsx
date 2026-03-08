"use client"

import { useState } from "react"

interface ChatMessage {
  sender: "user" | "ai"
  text: string
}

export default function ChatPage() {
  const [chat, setChat] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMsg = input
    setChat([...chat, { sender: "user", text: userMsg }])
    setInput("")

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      })
      const data = await res.json()
      setChat(prev => [...prev, { sender: "ai", text: data.reply }])
    } catch (err) {
      console.error(err)
      setChat(prev => [...prev, { sender: "ai", text: "❌ AI tidak merespon" }])
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 flex flex-col">
      <h1 className="text-3xl font-bold text-center mb-4">🤖 BinAI Chat</h1>

      <div className="flex-1 overflow-y-auto mb-4 space-y-3 border rounded p-4 bg-gray-900">
        {chat.map((m, i) => (
          <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`px-4 py-2 rounded-lg ${m.sender === "user" ? "bg-blue-600" : "bg-gray-700"}`}>
              {m.text.split("\n").map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 rounded bg-gray-800 text-white outline-none"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Tanya crypto atau AI..."
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-blue-600 px-4 rounded hover:bg-blue-500">
          Send
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        Tips: ketik "BTC", "ETH", "BNB" atau "Top Crypto" untuk harga realtime.
      </div>
    </div>
  )
        }
