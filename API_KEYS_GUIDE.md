# 🔑 API KEYS SETUP GUIDE

This document provides detailed, step-by-step instructions for obtaining API keys from all supported AI providers.

---

## 📋 Table of Contents
1. [OpenAI (GPT-4, GPT-3.5)](#1-openai-gpt-4-gpt-35)
2. [Anthropic (Claude)](#2-anthropic-claude)
3. [Google (Gemini)](#3-google-gemini)
4. [Local LLM (Ollama)](#4-local-llm-ollama)
5. [Quick Reference](#quick-reference)

---

## 1. OpenAI (GPT-4, GPT-3.5)

### Step-by-Step Setup:

1. **Create an Account**
   - Visit: https://platform.openai.com/signup
   - Sign up with email or Google/Microsoft account
   - Verify your email address

2. **Add Billing Information**
   - Go to: https://platform.openai.com/account/billing
   - Click "Add payment method"
   - Enter credit card details
   - Set up billing limits (recommended: $10-20/month for testing)

3. **Generate API Key**
   - Navigate to: https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Give it a name (e.g., "Multi-AI Chat App")
   - **IMPORTANT**: Copy the key immediately - you won't see it again!
   - Format: `sk-proj-...` or `sk-...`

4. **Add to .env File**
   ```
   VITE_OPENAI_API_KEY=sk-proj-your-actual-key-here
   ```

### Pricing:
- **GPT-3.5 Turbo**: $0.0015 per 1K input tokens, $0.002 per 1K output tokens
- **GPT-4**: $0.03 per 1K input tokens, $0.06 per 1K output tokens
- **Estimated cost**: ~$0.01-0.05 per conversation for GPT-3.5

### Tips:
- Start with GPT-3.5 for testing (much cheaper)
- Set usage limits in your OpenAI dashboard
- Monitor usage at: https://platform.openai.com/usage

---

## 2. Anthropic (Claude)

### Step-by-Step Setup:

1. **Create an Account**
   - Visit: https://console.anthropic.com/
   - Click "Sign Up"
   - Use email or Google account
   - Verify your email

2. **Request API Access** (if needed)
   - Some accounts need to request access
   - Fill out the form if prompted
   - Wait for approval (usually instant to 24 hours)

3. **Add Payment Method**
   - Go to: https://console.anthropic.com/settings/billing
   - Add credit card information
   - Set up billing alerts

4. **Generate API Key**
   - Navigate to: https://console.anthropic.com/settings/keys
   - Click "Create Key"
   - Name it (e.g., "Multi-AI Chat")
   - Copy the key immediately
   - Format: `sk-ant-...`

5. **Add to .env File**
   ```
   VITE_ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
   ```

### Pricing:
- **Claude 3.5 Sonnet**: $3 per 1M input tokens, $15 per 1M output tokens
- **Estimated cost**: ~$0.02-0.10 per conversation

### Tips:
- Claude excels at long-form content and analysis
- Great for coding tasks
- More expensive than GPT-3.5 but often higher quality

---

## 3. Google (Gemini)

### Step-by-Step Setup:

1. **Access Google AI Studio**
   - Visit: https://aistudio.google.com/app/apikey
   - Or: https://makersuite.google.com/app/apikey
   - Sign in with your Google account

2. **Create API Key**
   - Click "Create API Key" button
   - Select "Create API key in new project" or choose existing project
   - The key will be generated instantly
   - Format: `AIza...`

3. **Copy the Key**
   - Click the copy button
   - Store it safely

4. **Add to .env File**
   ```
   VITE_GOOGLE_API_KEY=AIzaYour-Actual-Key-Here
   ```

### Pricing:
- **FREE TIER**: 60 requests per minute (very generous!)
- **Paid**: $0.00025 per 1K characters input, $0.0005 per 1K characters output
- **Estimated cost**: FREE for most personal use!

### Tips:
- **BEST FOR BEGINNERS** - Free tier is very generous
- No credit card required for free tier
- Great for testing and learning
- Excellent for multimodal tasks (text + images)

---

## 4. Local LLM (Ollama)

### Step-by-Step Setup:

1. **Download Ollama**
   - Visit: https://ollama.ai/
   - Click "Download" for your OS (Windows/Mac/Linux)
   - Run the installer

2. **Install Ollama**
   - Windows: Run the `.exe` installer
   - Mac: Drag to Applications folder
   - Linux: Follow terminal instructions

3. **Download a Model**
   Open terminal/command prompt and run:
   ```bash
   # Recommended for beginners (smaller, faster)
   ollama pull llama2

   # Other options:
   ollama pull mistral        # Fast and capable
   ollama pull codellama      # Best for coding
   ollama pull llama3         # Latest Llama model
   ollama pull phi            # Tiny but smart
   ```

4. **Verify Installation**
   ```bash
   ollama list
   ```
   You should see your downloaded models.

5. **Update .env File** (optional)
   ```
   VITE_LOCAL_LLM_URL=http://localhost:11434
   ```
   (This is the default, usually no need to change)

### Pricing:
- **100% FREE!**
- No API costs
- No rate limits
- Runs on your own hardware

### System Requirements:
- **Minimum**: 8GB RAM
- **Recommended**: 16GB RAM, GPU optional but helpful
- **Storage**: 4-10GB per model

### Tips:
- Start with `llama2` (good balance of size/quality)
- Use `mistral` for faster responses
- Use `codellama` for programming tasks
- Models run faster with a GPU
- Completely private - data never leaves your machine

---

## Quick Reference

### Environment Variables Summary

Create a `.env` file in the project root with:

```bash
# OpenAI (Required for GPT models)
VITE_OPENAI_API_KEY=sk-proj-...

# Anthropic (Required for Claude)
VITE_ANTHROPIC_API_KEY=sk-ant-...

# Google (Required for Gemini)
VITE_GOOGLE_API_KEY=AIza...

# Local LLM (Optional, default shown)
VITE_LOCAL_LLM_URL=http://localhost:11434
```

### Cost Comparison (per 1000 messages)

| Model | Estimated Cost | Speed | Quality |
|-------|---------------|-------|---------|
| GPT-3.5 Turbo | $1-5 | ⚡⚡⚡ | ⭐⭐⭐ |
| GPT-4 | $20-50 | ⚡⚡ | ⭐⭐⭐⭐⭐ |
| Claude 3.5 | $10-30 | ⚡⚡ | ⭐⭐⭐⭐⭐ |
| Gemini Pro | FREE | ⚡⚡⚡ | ⭐⭐⭐⭐ |
| Local LLM | FREE | ⚡⚡ | ⭐⭐⭐ |

### Recommended Setup for Beginners

1. **Start with Gemini** (FREE, no credit card needed)
2. **Add Local LLM** (FREE, works offline)
3. **Try OpenAI GPT-3.5** (cheap, widely used)
4. **Upgrade to GPT-4 or Claude** when needed

### Testing Your Setup

After adding keys to `.env`:

1. Restart the dev server:
   ```bash
   npm run dev
   ```

2. Open the app in your browser

3. Try sending a message to each model

4. If you see "API Key Required" warning:
   - Check your `.env` file exists (not `.env.example`)
   - Verify the key format is correct
   - Make sure there are no extra spaces
   - Restart the dev server

---

## 🔒 Security Best Practices

1. **Never commit `.env` to Git**
   - Already in `.gitignore`
   - Double-check before pushing code

2. **Rotate keys regularly**
   - Change keys every few months
   - Delete old keys from provider dashboards

3. **Set spending limits**
   - Configure in each provider's dashboard
   - Start with low limits ($5-10)

4. **Monitor usage**
   - Check dashboards weekly
   - Set up billing alerts

5. **For production apps**
   - Use a backend proxy
   - Never expose keys in frontend
   - Implement rate limiting

---

## 🆘 Troubleshooting

### "Invalid API Key" Error

**OpenAI:**
- Key should start with `sk-proj-` or `sk-`
- Check for extra spaces or quotes
- Verify key at: https://platform.openai.com/api-keys

**Anthropic:**
- Key should start with `sk-ant-`
- Ensure API access is approved
- Check at: https://console.anthropic.com/settings/keys

**Google:**
- Key should start with `AIza`
- Enable the Generative Language API
- Check at: https://console.cloud.google.com/apis

### "Insufficient Quota" Error
- Add billing information to your account
- Check spending limits
- Verify credit card is valid

### Local LLM Not Connecting
- Ensure Ollama is running
- Check if model is downloaded: `ollama list`
- Verify URL: `http://localhost:11434`
- Try: `ollama serve` in terminal

---

## 📞 Support Links

- **OpenAI**: https://help.openai.com/
- **Anthropic**: https://support.anthropic.com/
- **Google**: https://ai.google.dev/docs
- **Ollama**: https://github.com/ollama/ollama/issues

---

**Last Updated**: December 2024

Need help? Check the main README.md or open an issue on GitHub!
