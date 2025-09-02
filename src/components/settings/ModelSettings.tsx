import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppSettings, ChatSettings } from "@/types/settings";
import { AVAILABLE_MODELS } from "@/lib/constants";

interface ModelSettingsProps {
  settings: AppSettings;
  updateChatSettings: (settings: Partial<ChatSettings>) => void;
}

export function ModelSettings({ settings, updateChatSettings }: ModelSettingsProps) {
  const selectedModel = AVAILABLE_MODELS.find(m => m.id === settings.chat.model);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-chat-text-primary mb-2">AI Model Configuration</h3>
        <p className="text-sm text-chat-text-muted">Choose your AI model and configure generation parameters.</p>
      </div>

      <Card className="bg-chat-ai-message border-chat-border">
        <CardHeader>
          <CardTitle className="text-chat-text-primary">Model Selection</CardTitle>
          <CardDescription className="text-chat-text-secondary">
            Choose the AI model that best fits your needs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {AVAILABLE_MODELS.map((model) => (
              <div
                key={model.id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  settings.chat.model === model.id
                    ? 'border-chat-accent bg-chat-accent/10'
                    : 'border-chat-border hover:border-chat-accent/50 hover:bg-chat-surface-hover'
                }`}
                onClick={() => updateChatSettings({ model: model.id })}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-chat-text-primary">{model.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {model.provider}
                    </Badge>
                  </div>
                  <div className="text-xs text-chat-text-muted">
                    ${model.inputCost}/1K tokens
                  </div>
                </div>
                <p className="text-sm text-chat-text-secondary mb-2">{model.description}</p>
                <div className="flex items-center gap-4 text-xs text-chat-text-muted">
                  <span>Max tokens: {model.maxTokens.toLocaleString()}</span>
                  <span>Input: ${model.inputCost}/1K</span>
                  <span>Output: ${model.outputCost}/1K</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-chat-ai-message border-chat-border">
        <CardHeader>
          <CardTitle className="text-chat-text-primary">Generation Parameters</CardTitle>
          <CardDescription className="text-chat-text-secondary">
            Fine-tune how the AI generates responses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="temperature" className="text-chat-text-primary">Temperature</Label>
              <span className="text-sm text-chat-text-muted">{settings.chat.temperature}</span>
            </div>
            <Slider
              id="temperature"
              min={0}
              max={2}
              step={0.1}
              value={[settings.chat.temperature]}
              onValueChange={([value]) => updateChatSettings({ temperature: value })}
              className="w-full"
            />
            <p className="text-xs text-chat-text-muted">
              Lower values make output more focused and deterministic, higher values more creative and random.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="maxTokens" className="text-chat-text-primary">Max Tokens</Label>
              <span className="text-sm text-chat-text-muted">{settings.chat.maxTokens}</span>
            </div>
            <Slider
              id="maxTokens"
              min={64}
              max={selectedModel?.maxTokens || 4096}
              step={64}
              value={[settings.chat.maxTokens]}
              onValueChange={([value]) => updateChatSettings({ maxTokens: value })}
              className="w-full"
            />
            <p className="text-xs text-chat-text-muted">
              Maximum number of tokens to generate in the response.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="topP" className="text-chat-text-primary">Top-p (Nucleus sampling)</Label>
              <span className="text-sm text-chat-text-muted">{settings.chat.topP}</span>
            </div>
            <Slider
              id="topP"
              min={0}
              max={1}
              step={0.05}
              value={[settings.chat.topP]}
              onValueChange={([value]) => updateChatSettings({ topP: value })}
              className="w-full"
            />
            <p className="text-xs text-chat-text-muted">
              Controls diversity via nucleus sampling. Lower values focus on higher probability tokens.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-chat-ai-message border-chat-border">
        <CardHeader>
          <CardTitle className="text-chat-text-primary">System Prompt</CardTitle>
          <CardDescription className="text-chat-text-secondary">
            Set the initial instructions for the AI assistant
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={settings.chat.systemPrompt}
            onChange={(e) => updateChatSettings({ systemPrompt: e.target.value })}
            placeholder="Enter system prompt..."
            className="min-h-[120px] bg-chat-input border-chat-input-border text-chat-text-primary"
          />
          <p className="text-xs text-chat-text-muted mt-2">
            This prompt is sent at the beginning of every conversation to establish the AI's role and behavior.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}