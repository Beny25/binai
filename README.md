# 🚀 BinAI AI Crypto Assistant

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)  
[![Vercel](https://img.shields.io/badge/deploy-vercel-blue)](https://vercel.com/new)  
[![Telegram](https://img.shields.io/badge/chat-Telegram-blue?logo=telegram)](https://t.me/binai_assistant_bot)  

**BinAI** adalah **AI Crypto Assistant Platform** yang menggabungkan data live crypto dengan kemampuan AI untuk ngobrol, memberikan rekomendasi, dan analisis pasar.  
Platform ini **siap dijalankan di web** maupun melalui **Telegram Bot**.  

---

## ⚡ Fitur Utama

- 📈 **Crypto Live Dashboard**: BTC, ETH, BNB, dan Top crypto live update  
- 🤖 **AI Chatbot**: Bisa ngobrol via Telegram atau web  
- 💬 **Hugging Face / OpenAI GPT fallback**: AI fallback untuk teks bebas  
- 🎨 **UI Modern**: Next.js + Tailwind, responsif & user-friendly  
- 🚀 **Deploy Cepat**: Siap deploy ke Vercel  

---

## 🛠️ Quick Start

### Clone Repository
```bash
git clone https://github.com/beny25/binai.git
cd binai

Install Dependencies

npm install

Setup Environment

Buat file .env.local:

TELEGRAM_BOT_TOKEN=your_telegram_bot_token
OPENAI_API_KEY=your_openai_api_key   # Optional, kalau mau pakai OpenAI GPT
HUGGINGFACE_API_KEY=your_hf_api_key # Optional, fallback gratis

Run Development Server

npm run dev

Deploy ke Vercel

1. Hubungkan repo GitHub ke Vercel


2. Set Environment Variables di Vercel sesuai .env.local


3. Deploy → bot & dashboard langsung online




---

📱 Telegram Bot

Username: @binai_assistant_bot

Perintah:

/start → Memulai bot

BTC, ETH, Top crypto → Dapat harga live

Teks bebas → AI fallback reply (Hugging Face / OpenAI)




---

🔧 Struktur Project

binai/
├─ app/
│  ├─ api/
│  │  ├─ telegram/route.ts
│  │  └─ ai/route.ts
│  ├─ dashboard/page.tsx
│  └─ page.tsx
├─ components/
│  └─ CryptoCard.tsx
├─ lib/
│  └─ ai.ts
├─ services/
│  └─ commandRouter.ts
├─ public/
│  └─ logo.svg
├─ .env.local
├─ package.json
└─ README.md


---

🎨 Screenshots / Preview

Web Dashboard


Telegram Bot Chat



---

💡 Tips

Free AI fallback: pakai Hugging Face gratis tanpa kartu kredit

OpenAI GPT-3.5 fallback: butuh API key aktif + billing

Crypto data update tiap 10 detik atau manual refresh tombol



---

📄 License

MIT License © 2026 Beny Hartanto


---

> Build your crypto AI assistant today with BinAI! 
