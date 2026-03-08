"use client"

import { useState, useRef, useEffect } from "react"

export default function ChatPage(){

  const [message,setMessage] = useState("")
  const [chat,setChat] = useState<any[]>([])
  const [loading,setLoading] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    bottomRef.current?.scrollIntoView({behavior:"smooth"})
  },[chat])

  const sendMessage = async (text?:string) => {

    const msg = text || message
    if(!msg) return

    setChat(prev=>[...prev,{role:"user",text:msg}])
    setMessage("")
    setLoading(true)

    const res = await fetch("/api/ai",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ message: msg })
    })

    const data = await res.json()

    setChat(prev=>[...prev,{role:"ai",text:data.reply}])
    setLoading(false)
  }

  return(

    <div className="flex flex-col h-screen bg-gray-950 text-white">

      {/* Header */}

      <div className="p-4 border-b border-gray-800 flex justify-between items-center">

        <h1 className="font-bold text-lg">
          🤖 BinAI Assistant
        </h1>

        <a
          href="https://t.me/binai_assistant_bot"
          target="_blank"
          className="text-sm bg-blue-600 px-3 py-1 rounded"
        >
          Telegram Bot
        </a>

      </div>

      {/* Chat area */}

      <div className="flex-1 overflow-y-auto p-6 space-y-4">

        {chat.map((c,i)=>(

          <div
            key={i}
            className={`flex ${c.role==="user"?"justify-end":"justify-start"}`}
          >

            <div
              className={`
              px-4 py-2 rounded-xl max-w-md
              ${c.role==="user"
                ? "bg-blue-600"
                : "bg-gray-800"}
              `}
            >
              {c.text}
            </div>

          </div>

        ))}

        {loading && (
          <div className="text-gray-400 text-sm">
            BinAI sedang berpikir...
          </div>
        )}

        <div ref={bottomRef}></div>

      </div>

      {/* Quick prompts */}

      <div className="px-6 pb-2 flex gap-2 flex-wrap text-sm">

        <button
          onClick={()=>sendMessage("BTC price today")}
          className="bg-gray-800 px-3 py-1 rounded"
        >
          BTC price
        </button>

        <button
          onClick={()=>sendMessage("ETH market analysis")}
          className="bg-gray-800 px-3 py-1 rounded"
        >
          ETH analysis
        </button>

        <button
          onClick={()=>sendMessage("Top crypto today")}
          className="bg-gray-800 px-3 py-1 rounded"
        >
          Top crypto
        </button>

      </div>

      {/* Input */}

      <div className="p-4 border-t border-gray-800 flex gap-2">

        <input
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key==="Enter") sendMessage()
          }}
          placeholder="Tanya crypto..."
          className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 outline-none"
        />

        <button
          onClick={()=>sendMessage()}
          className="bg-blue-600 px-4 py-2 rounded-lg"
        >
          Send
        </button>

      </div>

    </div>
  )
}
