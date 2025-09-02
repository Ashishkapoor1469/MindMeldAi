export interface ModelConfig {
  id: string;
  name: string;
  description: string;
  maxTokens: number;
  inputCost: number;
  outputCost: number;
  provider: 'OpenAI' | 'Anthropic' | 'Google' | 'Local';
}

export interface ChatSettings {
  model: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  systemPrompt: string;
  autoSave: boolean;
  showTimestamps: boolean;
  soundEnabled: boolean;
  streamResponse: boolean;
  codeHighlighting: boolean;
  mathRendering: boolean;
}

export interface UserPreferences {
  language: string;
  timezone: string;
  dateFormat: string;
  exportFormat: 'json' | 'markdown' | 'txt';
  defaultModel: string;
  apiKeys: {
    openai?: string;
    anthropic?: string;
    google?: string;
  };
}

export interface AppSettings {
  chat: ChatSettings;
  user: UserPreferences;
  appearance: {
    fontSize: 'small' | 'medium' | 'large';
    messageSpacing: 'compact' | 'normal' | 'spacious';
    codeTheme: string;
    accentColor: string;
  };
}