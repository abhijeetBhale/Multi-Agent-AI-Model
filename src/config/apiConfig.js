// API Configuration
// IMPORTANT: Never commit this file with real API keys
// Use environment variables in production

export const API_CONFIG = {
  // OpenAI Configuration
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY || '',
  OPENAI_BASE_URL: 'https://api.openai.com/v1',
  
  // Anthropic (Claude) Configuration
  ANTHROPIC_API_KEY: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
  ANTHROPIC_BASE_URL: 'https://api.anthropic.com/v1',
  
  // Google (Gemini) Configuration
  GOOGLE_API_KEY: import.meta.env.VITE_GOOGLE_API_KEY || '',
  GOOGLE_BASE_URL: 'https://generativelanguage.googleapis.com/v1beta',
  
  // Local LLM Configuration (Ollama)
  LOCAL_LLM_BASE_URL: import.meta.env.VITE_LOCAL_LLM_URL || 'http://localhost:11434',
};

// Model Configurations
export const MODELS = {
  GPT4: {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'openai',
    description: 'Most capable OpenAI model for complex tasks',
    maxTokens: 8000,
  },
  GPT35: {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'openai',
    description: 'Fast and efficient for most tasks',
    maxTokens: 4000,
  },
  CLAUDE: {
    id: 'claude-3-5-sonnet-20241022',
    name: 'Claude 3.5 Sonnet',
    provider: 'anthropic',
    description: 'Anthropic\'s most intelligent model',
    maxTokens: 8000,
  },
  GEMINI: {
    id: 'gemini-1.5-pro',
    name: 'Gemini Pro',
    provider: 'google',
    description: 'Google\'s advanced AI model',
    maxTokens: 8000,
  },
  LOCAL: {
    id: 'llama2',
    name: 'Local LLM',
    provider: 'ollama',
    description: 'Run AI models locally with Ollama',
    maxTokens: 4000,
  },
};

export const DEFAULT_MODEL = MODELS.GPT35.id;
