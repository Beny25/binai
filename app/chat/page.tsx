"use client"

import { useState } from "react"

export default function ChatPage() {

  const [message,setMessage] = useState("")
  const [chat,setChat] = useState<string[]>([])

  const sendMessage = async () => {

    if(!message) return

    const res = await fetch("/api/ai",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ message })
    })

    const data = await res.json()

    setChat([...chat,"You: "+message,"BinAI: "+data.reply])
    setMessage("")
  }

  return (
    <div style={{maxWidth:600,margin:"auto",padding:20}}>

      <h1>BinAI Chat</h1>

      <div style={{minHeight:300}}>
        {chat.map((c,i)=>(
          <p key={i}>{c}</p>
        ))}
      </div>

      <input
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        placeholder="Tanya crypto..."
      />

      <button onClick={sendMessage}>Send</button>

    </div>
  )
}
