# GymBro AI 💪

AI-powered gym routine generator with personalized weekly workout plans. Available in **two versions**: Streamlit (Python) and Next.js (Web App).

---

## 🚀 Choose Your Version

### 🌐 **Next.js Web App** (Recommended for Deployment)
**Modern web application ready for Vercel deployment**

- ✅ Production-ready for cloud deployment
- ✅ Serverless architecture with Vercel
- ✅ PostgreSQL database (Vercel Postgres)
- ✅ Beautiful, responsive UI with Tailwind CSS
- ✅ TypeScript for type safety

**👉 [Go to Web App Documentation](./web-app/README.md)**

**Quick Deploy to Vercel:**
```bash
cd web-app
npx vercel --prod
```

---

### 🐍 **Streamlit App** (For Local Development)
**Python-based application for rapid prototyping**

- ✅ Quick local setup
- ✅ SQLite database (no setup needed)
- ✅ Simple Python environment
- ✅ Great for testing and development

**👉 Continue below for Streamlit setup**

---

## Streamlit Version Setup

### Prerequisites
- Python 3.8 or higher
- Anthropic or OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/frazakram/GYM_BRO.git
   cd GYM_BRO
   ```

2. **Create virtual environment**
   ```bash
   python -m venv myenv
   source myenv/bin/activate  # Windows: myenv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the app**
   ```bash
   streamlit run app.py
   ```

### Usage
1. Register/Login with your credentials
2. Complete your fitness profile
3. Enter API key in sidebar (Anthropic or OpenAI)
4. Generate your personalized routine!

---

## 🎯 Features (Both Versions)

- 🤖 AI-powered routines using Claude or GPT-4
- 👤 User authentication and profiles
- 📊 Track age, weight, height, experience level
- 📋 Detailed exercises with YouTube tutorials
- 📖 Form guides for proper technique
- 🎨 Modern, dark-themed UI

---

## 📁 Repository Structure

```
GYM_BRO/
├── web-app/              # Next.js web application (Vercel-ready)
│   ├── app/              # Next.js pages and API routes
│   ├── lib/              # Database, auth, AI agent logic
│   ├── types/            # TypeScript definitions
│   ├── README.md         # Web app documentation
│   └── VERCEL_DEPLOYMENT.md  # Deployment guide
│
├── app.py                # Streamlit main app
├── agent.py              # AI agent logic (Python)
├── database.py           # SQLite database (Python)
├── requirements.txt      # Python dependencies
└── README.md            # This file
```

---

## 🛠️ Technology Stack

### Next.js Web App
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (Serverless)
- **Database**: Vercel Postgres
- **Auth**: JWT with jose
- **AI**: LangChain.js (Anthropic & OpenAI)

### Streamlit App
- **Framework**: Streamlit
- **AI**: LangChain + LangGraph (Python)
- **Database**: SQLite
- **Auth**: bcrypt

---

## 🚀 Deployment

### Web App → Vercel
```bash
cd web-app
vercel --prod
```
**[Full Deployment Guide](./web-app/VERCEL_DEPLOYMENT.md)**

### Streamlit → Streamlit Cloud
1. Push to GitHub
2. Go to [share.streamlit.io](https://share.streamlit.io)
3. Deploy from repository

---

## 🔐 Security

- ✅ Passwords hashed with bcrypt
- ✅ API keys entered via UI (not stored)
- ✅ JWT sessions (web app)
- ✅ Environment variables for secrets
- ✅ Sensitive files in `.gitignore`

---

## 📝 License

MIT License - see [LICENSE](./LICENSE)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 💬 Support

- **Issues**: [GitHub Issues](https://github.com/frazakram/GYM_BRO/issues)
- **Web App Docs**: [web-app/README.md](./web-app/README.md)
- **Deployment Guide**: [web-app/VERCEL_DEPLOYMENT.md](./web-app/VERCEL_DEPLOYMENT.md)

---

**Built with ❤️ using AI, Python, and TypeScript**
