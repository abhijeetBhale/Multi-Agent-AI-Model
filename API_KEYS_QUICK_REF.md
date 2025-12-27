# 🔑 API KEYS QUICK REFERENCE

## Where to Get API Keys

| Provider | URL | Free Tier | Best For |
|----------|-----|-----------|----------|
| **Google Gemini** ⭐ | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) | ✅ YES (60 req/min) | **Beginners** |
| **OpenAI** | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) | ❌ Pay-per-use | Production |
| **Anthropic** | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) | ❌ Pay-per-use | Analysis |
| **Ollama** 🏠 | [ollama.ai](https://ollama.ai/) | ✅ FREE (local) | Privacy |

## Quick Setup

### 1. Create `.env` file
```bash
copy .env.example .env
```

### 2. Add Keys to `.env`
```bash
# Google Gemini (RECOMMENDED - FREE!)
VITE_GOOGLE_API_KEY=AIzaYourKeyHere

# OpenAI (Optional)
VITE_OPENAI_API_KEY=sk-proj-YourKeyHere

# Anthropic (Optional)
VITE_ANTHROPIC_API_KEY=sk-ant-YourKeyHere

# Local LLM (Optional - no key needed)
VITE_LOCAL_LLM_URL=http://localhost:11434
```

### 3. Start App
```bash
npm run dev
```

## Key Formats

- **OpenAI**: `sk-proj-...` or `sk-...`
- **Anthropic**: `sk-ant-...`
- **Google**: `AIza...`
- **Ollama**: No key needed

## Cost Comparison

| Model | Cost per 1K messages | Speed | Quality |
|-------|---------------------|-------|---------|
| Gemini Pro | **FREE** | ⚡⚡⚡ | ⭐⭐⭐⭐ |
| GPT-3.5 | $1-5 | ⚡⚡⚡ | ⭐⭐⭐ |
| GPT-4 | $20-50 | ⚡⚡ | ⭐⭐⭐⭐⭐ |
| Claude 3.5 | $10-30 | ⚡⚡ | ⭐⭐⭐⭐⭐ |
| Local LLM | **FREE** | ⚡⚡ | ⭐⭐⭐ |

## Recommended Setup

### For Beginners 🎓
1. Start with **Gemini** (FREE)
2. Add **Ollama** (FREE, local)

### For Developers 💻
1. **Gemini** (FREE tier)
2. **GPT-3.5** (cheap, fast)
3. **Ollama** (offline backup)

### For Production 🚀
1. **GPT-4** (best quality)
2. **Claude 3.5** (alternative)
3. **GPT-3.5** (fallback)

## Troubleshooting

### "API Key Required" Warning
- Check `.env` file exists
- Verify key format is correct
- Restart dev server

### "Invalid API Key" Error
- Check for typos
- Verify key is active in provider dashboard
- Check for extra spaces or quotes

### Local LLM Not Working
1. Install Ollama: `https://ollama.ai/`
2. Download model: `ollama pull llama2`
3. Verify: `ollama list`

## Security Tips

✅ **DO:**
- Keep `.env` file private
- Add `.env` to `.gitignore`
- Rotate keys regularly
- Set spending limits

❌ **DON'T:**
- Commit `.env` to Git
- Share keys publicly
- Use production keys in development
- Ignore billing alerts

## Need More Help?

📖 **Detailed Guides:**
- `API_KEYS_GUIDE.md` - Full setup instructions
- `SETUP_INSTRUCTIONS.md` - Troubleshooting
- `README.md` - Project overview

🔗 **Provider Docs:**
- OpenAI: https://platform.openai.com/docs
- Anthropic: https://docs.anthropic.com/
- Google: https://ai.google.dev/docs
- Ollama: https://github.com/ollama/ollama

---

**Quick Start:** Get a FREE Gemini key in 2 minutes!
1. Go to https://aistudio.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy and paste into `.env`
5. Run `npm run dev`
6. Start chatting! 🎉
