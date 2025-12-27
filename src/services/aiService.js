import axios from 'axios';
import { API_CONFIG, MODELS } from '../config/apiConfig';

/**
 * AI Service - Handles all AI model API calls
 * Routes requests to appropriate AI providers
 */

class AIService {
  /**
   * Send message to OpenAI (GPT-4 or GPT-3.5)
   */
  async sendToOpenAI(messages, modelId = 'gpt-3.5-turbo') {
    try {
      const response = await axios.post(
        `${API_CONFIG.OPENAI_BASE_URL}/chat/completions`,
        {
          model: modelId,
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
          temperature: 0.7,
          max_tokens: 2000,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_CONFIG.OPENAI_API_KEY}`,
          },
        }
      );

      return {
        success: true,
        message: response.data.choices[0].message.content,
        usage: response.data.usage,
      };
    } catch (error) {
      console.error('OpenAI Error:', error);
      return {
        success: false,
        error: error.response?.data?.error?.message || error.message || 'Failed to get response from OpenAI',
      };
    }
  }

  /**
   * Send message to Anthropic (Claude)
   */
  async sendToAnthropic(messages, modelId = 'claude-3-5-sonnet-20241022') {
    try {
      // Claude expects a different format - separate system message
      const systemMessage = messages.find(m => m.role === 'system')?.content || '';
      const conversationMessages = messages
        .filter(m => m.role !== 'system')
        .map(msg => ({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content,
        }));

      const response = await axios.post(
        `${API_CONFIG.ANTHROPIC_BASE_URL}/messages`,
        {
          model: modelId,
          max_tokens: 4096,
          system: systemMessage,
          messages: conversationMessages,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_CONFIG.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
          },
        }
      );

      return {
        success: true,
        message: response.data.content[0].text,
        usage: response.data.usage,
      };
    } catch (error) {
      console.error('Anthropic Error:', error);
      return {
        success: false,
        error: error.response?.data?.error?.message || error.message || 'Failed to get response from Claude',
      };
    }
  }

  /**
   * Send message to Google (Gemini)
   */
  async sendToGoogle(messages, modelId = 'gemini-1.5-pro') {
    try {
      // Convert messages to Gemini format
      const contents = messages
        .filter(m => m.role !== 'system')
        .map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        }));

      const response = await axios.post(
        `${API_CONFIG.GOOGLE_BASE_URL}/models/${modelId}:generateContent?key=${API_CONFIG.GOOGLE_API_KEY}`,
        {
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        success: true,
        message: response.data.candidates[0].content.parts[0].text,
        usage: response.data.usageMetadata,
      };
    } catch (error) {
      console.error('Google Error:', error);
      return {
        success: false,
        error: error.response?.data?.error?.message || error.message || 'Failed to get response from Gemini',
      };
    }
  }

  /**
   * Send message to Local LLM (Ollama)
   */
  async sendToLocal(messages, modelId = 'llama2') {
    try {
      // Convert to Ollama format
      const prompt = messages
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n') + '\nAssistant:';

      const response = await axios.post(
        `${API_CONFIG.LOCAL_LLM_BASE_URL}/api/generate`,
        {
          model: modelId,
          prompt,
          stream: false,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        success: true,
        message: response.data.response,
        usage: null,
      };
    } catch (error) {
      console.error('Local LLM Error:', error);
      return {
        success: false,
        error: error.message || 'Failed to connect to local LLM. Make sure Ollama is running.',
      };
    }
  }

  /**
   * Main method to send message - routes to appropriate provider
   */
  async sendMessage(messages, modelId) {
    // Find model configuration
    const model = Object.values(MODELS).find(m => m.id === modelId);
    
    if (!model) {
      return {
        success: false,
        error: 'Invalid model selected',
      };
    }

    // Route to appropriate provider
    switch (model.provider) {
      case 'openai':
        return await this.sendToOpenAI(messages, modelId);
      case 'anthropic':
        return await this.sendToAnthropic(messages, modelId);
      case 'google':
        return await this.sendToGoogle(messages, modelId);
      case 'ollama':
        return await this.sendToLocal(messages, modelId);
      default:
        return {
          success: false,
          error: 'Unknown provider',
        };
    }
  }

  /**
   * Check if API key is configured for a model
   */
  isModelConfigured(modelId) {
    const model = Object.values(MODELS).find(m => m.id === modelId);
    if (!model) return false;

    switch (model.provider) {
      case 'openai':
        return !!API_CONFIG.OPENAI_API_KEY;
      case 'anthropic':
        return !!API_CONFIG.ANTHROPIC_API_KEY;
      case 'google':
        return !!API_CONFIG.GOOGLE_API_KEY;
      case 'ollama':
        return true; // Local doesn't need API key
      default:
        return false;
    }
  }
}

export default new AIService();
