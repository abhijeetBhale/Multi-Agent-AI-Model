# 🤖 Multi-AI Chat Application

A modern, feature-rich chat application that lets you interact with multiple AI models from a single, beautiful interface. Built with React, Tailwind CSS, and Framer Motion.

![Multi-AI Chat](https://img.shields.io/badge/React-18.3-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🎯 Core Features
- **Multiple AI Models**: Switch between GPT-4, GPT-3.5, Claude 3.5 Sonnet, Gemini Pro, and Local LLM
- **Persistent Conversations**: Each model maintains its own chat history using localStorage
- **Beautiful UI**: Modern dark theme with smooth animations and transitions
- **Markdown Support**: Full markdown rendering with syntax highlighting for code blocks
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### 💬 Chat Features
- Auto-resizing input field
- Typing indicators while AI responds
- Copy-to-clipboard for messages and code blocks
- Regenerate last response
- Clear individual or all conversations
- Message timestamps
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)

### 🎨 UI/UX
- Clean, modern dashboard layout
- Dark mode by default
- Smooth hover and transition effects
- Model-specific color coding
- Empty state with prompt suggestions
- Real-time API configuration warnings

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- API keys for the models you want to use (see API Setup below)

### Installation

1. **Clone or download this repository**
```bash
cd Multi-Agent-AI-Model
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure API Keys**
```bash
# Copy the example env file
copy .env.example .env

# Edit .env and add your API keys
notepad .env
```

4. **Start the development server**
```bash
npm run dev
```

5. **Open your browser**
```
http://localhost:5173
```

## 🔑 API Setup Guide

### 1. OpenAI (GPT-4, GPT-3.5)

**Get API Key:**
1. Go to [OpenAI Platform](https://platform.openai.com/signup)
2. Create an account or sign in
3. Navigate to [API Keys](https://platform.openai.com/api-keys)
4. Click "Create new secret key"
5. Copy the key and add to `.env`:
   ```
   VITE_OPENAI_API_KEY=sk-...
   ```

**Pricing:**
- GPT-4: ~$0.03/1K input tokens, ~$0.06/1K output tokens
- GPT-3.5 Turbo: ~$0.0015/1K input tokens, ~$0.002/1K output tokens

**Note:** Requires billing information

---

### 2. Anthropic (Claude)

**Get API Key:**
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up for an account
3. Navigate to Settings > [API Keys](https://console.anthropic.com/settings/keys)
4. Click "Create Key"
5. Copy the key and add to `.env`:
   ```
   VITE_ANTHROPIC_API_KEY=sk-ant-...
   ```

**Pricing:**
- Claude 3.5 Sonnet: ~$3/1M input tokens, ~$15/1M output tokens

**Note:** May require API access request

---

### 3. Google (Gemini)

**Get API Key:**
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Select or create a Google Cloud project
5. Copy the key and add to `.env`:
   ```
   VITE_GOOGLE_API_KEY=AIza...
   ```

**Pricing:**
- Gemini Pro: **FREE tier available!** (60 requests/minute)
- Paid: ~$0.00025/1K characters input, ~$0.0005/1K characters output

**Best for beginners:** Generous free tier!

---

### 4. Local LLM (Ollama) - FREE!

**Setup:**
1. Download [Ollama](https://ollama.ai/)
2. Install Ollama on your machine
3. Open terminal and run:
   ```bash
   ollama pull llama2
   ```
4. Ollama runs on `http://localhost:11434` by default
5. No API key needed!

**Advantages:**
- ✅ Completely FREE
- ✅ No rate limits
- ✅ Privacy (runs locally)
- ✅ Works offline

**Other models you can try:**
```bash
ollama pull mistral
ollama pull codellama
ollama pull llama3
```

## 📁 Project Structure

```
Multi-Agent-AI-Model/
├── src/
│   ├── components/          # React components
│   │   ├── Sidebar.jsx      # Model selection sidebar
│   │   ├── ChatContainer.jsx # Main chat logic
│   │   ├── ChatHeader.jsx   # Chat header with actions
│   │   ├── ChatMessage.jsx  # Individual message component
│   │   ├── ChatInput.jsx    # Message input field
│   │   ├── TypingIndicator.jsx # Loading animation
│   │   └── EmptyState.jsx   # Welcome screen
│   ├── context/
│   │   └── ChatContext.jsx  # Global state management
│   ├── services/
│   │   └── aiService.js     # API integration layer
│   ├── config/
│   │   └── apiConfig.js     # API configuration
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── .env.example             # Environment variables template
├── tailwind.config.js       # Tailwind configuration
├── package.json             # Dependencies
└── README.md                # This file
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3 with Vite
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion
- **Markdown**: react-markdown
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **State Management**: React Context API

## 🎨 Customization

### Adding a New AI Model

1. **Update `src/config/apiConfig.js`:**
```javascript
export const MODELS = {
  // ... existing models
  NEWMODEL: {
    id: 'model-id',
    name: 'Model Name',
    provider: 'provider-name',
    description: 'Model description',
    color: '#hexcolor',
    icon: '🤖',
    maxTokens: 4000,
  },
};
```

2. **Add API handler in `src/services/aiService.js`:**
```javascript
async sendToNewProvider(messages, modelId) {
  // Implementation
}
```

3. **Update the routing in `sendMessage` method**

### Changing Theme Colors

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      dark: {
        bg: '#your-color',
        card: '#your-color',
        // ...
      },
    },
  },
},
```

## 📝 Usage Tips

1. **Start with Gemini**: It has a generous free tier, perfect for testing
2. **Use Local LLM**: For privacy-sensitive conversations or offline use
3. **Compare Responses**: Switch between models to see different perspectives
4. **Save Costs**: Use GPT-3.5 for simple tasks, GPT-4 for complex ones
5. **Regenerate**: Click the regenerate button if you're not satisfied with a response

## 🔒 Security Notes

- ⚠️ **Never commit your `.env` file** to version control
- ⚠️ API keys in `.env` are exposed in the browser (client-side)
- ✅ For production, use a backend proxy to hide API keys
- ✅ Set up rate limiting to prevent abuse
- ✅ Monitor your API usage regularly

## 🚧 Production Deployment

For production, it's recommended to:

1. **Create a backend API** to proxy requests and hide API keys
2. **Add authentication** to prevent unauthorized access
3. **Implement rate limiting** per user
4. **Add error tracking** (e.g., Sentry)
5. **Set up monitoring** for API usage and costs

## 🐛 Troubleshooting

### "API Key Required" Warning
- Make sure you've created a `.env` file (not `.env.example`)
- Check that your API key is correctly formatted
- Restart the dev server after adding keys

### CORS Errors
- Some APIs may require a backend proxy
- Check your API key permissions

### Local LLM Not Working
- Make sure Ollama is installed and running
- Verify the model is downloaded: `ollama list`
- Check the URL in `.env` matches Ollama's address

### Build Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 🙏 Acknowledgments

- OpenAI for GPT models
- Anthropic for Claude
- Google for Gemini
- Ollama for local LLM support
- The React and Tailwind CSS communities

## 📧 Support

If you encounter any issues or have questions:
1. Check the Troubleshooting section above
2. Review the API provider's documentation
3. Open an issue on GitHub

---

**Built with ❤️ using React and Tailwind CSS**

Happy chatting! 🚀
