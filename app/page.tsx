export default function Home() {
  return (
    <main style={{textAlign:"center",padding:"80px"}}>

      <h1>BinAI</h1>
      <p>AI Crypto Assistant Platform</p>

      <div style={{marginTop:40}}>

        {/* Web Chat */}
        <a href="/chat">
          <button style={{
            padding:"12px 24px",
            marginRight:20,
            fontSize:16
          }}>
            💬 Chat on Website
          </button>
        </a>

        {/* Telegram Chat */}
        <a 
          href="https://t.me/binai_assistant_bot"
          target="_blank"
        >
          <button style={{
            padding:"12px 24px",
            fontSize:16
          }}>
            🤖 Chat via Telegram
          </button>
        </a>

      </div>

    </main>
  )
}
