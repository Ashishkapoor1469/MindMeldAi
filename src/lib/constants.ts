import { ModelConfig } from '@/types/settings';

export const AVAILABLE_MODELS: ModelConfig[] = [
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    description: 'Most capable model for complex tasks',
    maxTokens: 128000,
    inputCost: 0.01,
    outputCost: 0.03,
    provider: 'OpenAI'
  },
  {
    id: 'gpt-4',
    name: 'GPT-4',
    description: 'High-quality responses for detailed tasks',
    maxTokens: 8192,
    inputCost: 0.03,
    outputCost: 0.06,
    provider: 'OpenAI'
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    description: 'Fast and efficient for most conversations',
    maxTokens: 4096,
    inputCost: 0.0015,
    outputCost: 0.002,
    provider: 'OpenAI'
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    description: 'Superior performance on highly complex tasks',
    maxTokens: 200000,
    inputCost: 0.015,
    outputCost: 0.075,
    provider: 'Anthropic'
  },
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    description: 'Balanced performance and speed',
    maxTokens: 200000,
    inputCost: 0.003,
    outputCost: 0.015,
    provider: 'Anthropic'
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    description: 'Google\'s most capable multimodal model',
    maxTokens: 32768,
    inputCost: 0.00025,
    outputCost: 0.0005,
    provider: 'Google'
  }
];

export const DEFAULT_CHAT_SETTINGS = {
  model: 'gpt-4-turbo',
  temperature: 0.7,
  maxTokens: 2048,
  topP: 1,
  frequencyPenalty: 0,
  presencePenalty: 0,
  systemPrompt: 'You are a helpful AI assistant. Provide accurate, helpful, and engaging responses.',
  autoSave: true,
  showTimestamps: false,
  soundEnabled: true,
  streamResponse: true,
  codeHighlighting: true,
  mathRendering: true,
};

export const DEFAULT_USER_PREFERENCES = {
  language: 'en',
  timezone: 'UTC',
  dateFormat: 'DD/MM/YYYY',
  exportFormat: 'markdown' as const,
  defaultModel: 'gpt-4-turbo',
  apiKeys: {},
};

export const DEFAULT_APPEARANCE = {
  fontSize: 'medium' as const,
  messageSpacing: 'normal' as const,
  codeTheme: 'github-dark',
  accentColor: 'hsl(142 71% 45%)',
};