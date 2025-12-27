# 🚀 SETUP INSTRUCTIONS

Complete step-by-step guide to get your Multi-AI Chat application running.

---

## ⚡ Quick Start (5 minutes)

### Option 1: Automated Setup (Recommended)

1. **Run the setup script:**
   ```powershell
   .\setup.ps1
   ```
   
2. **Follow the prompts** to add your API keys

3. **Start the app:**
   ```bash
   npm run dev
   ```

### Option 2: Manual Setup

1. **Copy environment file:**
   ```bash
   copy .env.example .env
   ```

2. **Edit .env file** and add your API keys

3. **Start the app:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   ```
   http://localhost:5173
   ```

---

## 📝 Detailed Setup Instructions

### Step 1: Install Dependencies

The dependencies should already be installed. If not:

```bash
npm install
```

This installs:
- React 18.3
- Tailwind CSS
- Framer Motion (animations)
- Axios (HTTP client)
- react-markdown (markdown rendering)
- lucide-react (icons)

### Step 2: Configure API Keys

You need at least ONE API key to use the application.

#### Recommended for Beginners: Start with Gemini (FREE!)

1. Go to https://aistudio.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key (starts with `AIza...`)
5. Add to `.env`:
   ```
   VITE_GOOGLE_API_KEY=AIzaYourKeyHere
   ```

#### For All API Keys:

See `API_KEYS_GUIDE.md` for detailed instructions for each provider.

**Quick Links:**
- OpenAI: https://platform.openai.com/api-keys
- Anthropic: https://console.anthropic.com/settings/keys
- Google: https://aistudio.google.com/app/apikey
- Ollama: https://ollama.ai/

### Step 3: Start Development Server

```bash
npm run dev
```

You should see:
```
VITE v7.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 4: Open in Browser

Navigate to: http://localhost:5173

You should see the Multi-AI Chat interface!

---

## 🧪 Testing Your Setup

### Test Each Model:

1. **Select a model** from the sidebar (left panel)
2. **Check for warnings** - if you see "API Key Required", that model isn't configured
3. **Send a test message** like "Hello, how are you?"
4. **Wait for response** - you should see a typing indicator, then the AI's response

### Troubleshooting Tests:

#### Test 1: Check .env File
```powershell
# View your .env file (Windows)
type .env

# It should show your API keys (not "your_openai_api_key_here")
```

#### Test 2: Verify API Keys Format
- OpenAI: `sk-proj-...` or `sk-...`
- Anthropic: `sk-ant-...`
- Google: `AIza...`

#### Test 3: Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Send a message
4. Look for errors (red text)

---

## 🎨 Customization

### Change Theme Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      dark: {
        bg: '#0f0f0f',      // Main background
        card: '#1a1a1a',    // Card background
        hover: '#252525',   // Hover state
        border: '#2a2a2a',  // Border color
      },
    },
  },
},
```

### Add Custom Model

1. Edit `src/config/apiConfig.js`
2. Add your model to the `MODELS` object
3. Implement API handler in `src/services/aiService.js`

---

## 📦 Building for Production

### Create Production Build

```bash
npm run build
```

This creates a `dist` folder with optimized files.

### Preview Production Build

```bash
npm run preview
```

### Deploy

You can deploy the `dist` folder to:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `dist` folder
- **GitHub Pages**: Push `dist` to `gh-pages` branch

⚠️ **IMPORTANT**: For production, use a backend to hide API keys!

---

## 🔧 Common Issues & Solutions

### Issue: "API Key Required" Warning

**Solution:**
1. Check `.env` file exists (not `.env.example`)
2. Verify key format is correct
3. No extra spaces or quotes around keys
4. Restart dev server: `Ctrl+C` then `npm run dev`

### Issue: CORS Error

**Solution:**
- Some providers may block browser requests
- Use a backend proxy in production
- For development, keys should work directly

### Issue: "Failed to get response"

**Possible causes:**
1. Invalid API key
2. No billing/credits on account
3. Rate limit exceeded
4. Network connectivity issue

**Solution:**
1. Verify key in provider dashboard
2. Check billing/credits
3. Wait a few minutes and try again
4. Check internet connection

### Issue: Local LLM Not Working

**Solution:**
1. Install Ollama: https://ollama.ai/
2. Download model: `ollama pull llama2`
3. Verify Ollama is running: `ollama list`
4. Check URL in `.env`: `http://localhost:11434`

### Issue: Blank Screen

**Solution:**
1. Check browser console (F12) for errors
2. Clear browser cache
3. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Issue: Styling Not Working

**Solution:**
1. Verify Tailwind is installed: `npm list tailwindcss`
2. Check `tailwind.config.js` exists
3. Restart dev server
4. Clear browser cache

---

## 📚 Project Structure

```
Multi-Agent-AI-Model/
├── src/
│   ├── components/          # React components
│   │   ├── Sidebar.jsx      # Model selection
│   │   ├── ChatContainer.jsx # Main chat logic
│   │   ├── ChatHeader.jsx   # Header with actions
│   │   ├── ChatMessage.jsx  # Message display
│   │   ├── ChatInput.jsx    # Input field
│   │   ├── TypingIndicator.jsx # Loading animation
│   │   └── EmptyState.jsx   # Welcome screen
│   ├── context/
│   │   └── ChatContext.jsx  # State management
│   ├── services/
│   │   └── aiService.js     # API calls
│   ├── config/
│   │   └── apiConfig.js     # Configuration
│   ├── App.jsx              # Main component
│   ├── main.jsx             # Entry point
│   └── index.css            # Styles
├── .env                     # Your API keys (create this!)
├── .env.example             # Template
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind config
├── vite.config.js           # Vite config
├── README.md                # Main documentation
├── API_KEYS_GUIDE.md        # API setup guide
└── SETUP_INSTRUCTIONS.md    # This file
```

---

## 🎯 Next Steps

After setup:

1. **Explore the UI** - Try different models
2. **Compare responses** - Ask the same question to different models
3. **Test features** - Try markdown, code blocks, regeneration
4. **Read the docs** - Check `README.md` and `API_KEYS_GUIDE.md`
5. **Customize** - Change colors, add features

---

## 💡 Usage Tips

### Cost Optimization
- Use **Gemini** for free tier
- Use **GPT-3.5** for cheap, fast responses
- Use **GPT-4** only for complex tasks
- Use **Local LLM** for privacy/offline use

### Best Practices
- Start conversations with clear context
- Use markdown for better formatting
- Regenerate if response isn't satisfactory
- Clear old conversations to save storage

### Keyboard Shortcuts
- `Enter` - Send message
- `Shift + Enter` - New line
- `Ctrl + C` (in terminal) - Stop dev server

---

## 📞 Getting Help

If you're stuck:

1. **Check this guide** - Most issues are covered here
2. **Read API_KEYS_GUIDE.md** - Detailed API setup
3. **Check browser console** - Look for error messages
4. **Verify API keys** - Test them in provider dashboards
5. **Restart everything** - Server, browser, even computer!

---

## ✅ Verification Checklist

Before asking for help, verify:

- [ ] Node.js is installed (`node --version`)
- [ ] Dependencies are installed (`npm install` completed)
- [ ] `.env` file exists (not `.env.example`)
- [ ] At least one API key is added to `.env`
- [ ] API key format is correct (no quotes, no spaces)
- [ ] Dev server is running (`npm run dev`)
- [ ] Browser is open to `http://localhost:5173`
- [ ] No errors in browser console (F12)
- [ ] Internet connection is working

---

## 🎉 You're Ready!

If you've followed all steps, you should now have a working Multi-AI Chat application!

**Enjoy chatting with multiple AI models!** 🚀

---

**Need more help?** Check:
- `README.md` - Overview and features
- `API_KEYS_GUIDE.md` - Detailed API setup
- Provider documentation (OpenAI, Anthropic, Google, Ollama)
