import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppSettings, ChatSettings } from "@/types/settings";

interface AdvancedSettingsProps {
  settings: AppSettings;
  updateChatSettings: (settings: Partial<ChatSettings>) => void;
}

export function AdvancedSettings({ settings, updateChatSettings }: AdvancedSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-chat-text-primary mb-2">Advanced Configuration</h3>
        <p className="text-sm text-chat-text-muted">Fine-tune advanced AI parameters and experimental features.</p>
      </div>

      <Card className="bg-chat-ai-message border-chat-border">
        <CardHeader>
          <CardTitle className="text-chat-text-primary">Advanced AI Parameters</CardTitle>
          <CardDescription className="text-chat-text-secondary">
            Configure advanced generation parameters for expert users
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="frequencyPenalty" className="text-chat-text-primary">Frequency Penalty</Label>
              <span className="text-sm text-chat-text-muted">{settings.chat.frequencyPenalty}</span>
            </div>
            <Slider
              id="frequencyPenalty"
              min={-2}
              max={2}
              step={0.1}
              value={[settings.chat.frequencyPenalty]}
              onValueChange={([value]) => updateChatSettings({ frequencyPenalty: value })}
              className="w-full"
            />
            <p className="text-xs text-chat-text-muted">
              Reduces repetition by penalizing tokens based on their frequency in the text so far.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="presencePenalty" className="text-chat-text-primary">Presence Penalty</Label>
              <span className="text-sm text-chat-text-muted">{settings.chat.presencePenalty}</span>
            </div>
            <Slider
              id="presencePenalty"
              min={-2}
              max={2}
              step={0.1}
              value={[settings.chat.presencePenalty]}
              onValueChange={([value]) => updateChatSettings({ presencePenalty: value })}
              className="w-full"
            />
            <p className="text-xs text-chat-text-muted">
              Encourages the model to talk about new topics by penalizing tokens that have appeared.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-chat-ai-message border-chat-border">
        <CardHeader>
          <CardTitle className="text-chat-text-primary">Response Behavior</CardTitle>
          <CardDescription className="text-chat-text-secondary">
            Control how responses are generated and displayed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Label htmlFor="streamResponse" className="text-chat-text-primary">Stream responses</Label>
                <Badge variant="outline" className="text-xs">Recommended</Badge>
              </div>
              <p className="text-sm text-chat-text-muted">Show responses as they're being generated</p>
            </div>
            <Switch 
              id="streamResponse"
              checked={settings.chat.streamResponse}
              onCheckedChange={(checked) => updateChatSettings({ streamResponse: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="codeHighlighting" className="text-chat-text-primary">Code syntax highlighting</Label>
              <p className="text-sm text-chat-text-muted">Apply syntax highlighting to code blocks</p>
            </div>
            <Switch 
              id="codeHighlighting"
              checked={settings.chat.codeHighlighting}
              onCheckedChange={(checked) => updateChatSettings({ codeHighlighting: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="mathRendering" className="text-chat-text-primary">Math rendering</Label>
              <p className="text-sm text-chat-text-muted">Render LaTeX math expressions in messages</p>
            </div>
            <Switch 
              id="mathRendering"
              checked={settings.chat.mathRendering}
              onCheckedChange={(checked) => updateChatSettings({ mathRendering: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-chat-ai-message border-chat-border">
        <CardHeader>
          <CardTitle className="text-chat-text-primary">Experimental Features</CardTitle>
          <CardDescription className="text-chat-text-secondary">
            Try out new features that are still in development
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Label className="text-chat-text-primary">Function calling</Label>
                <Badge variant="secondary" className="text-xs">Beta</Badge>
              </div>
              <p className="text-sm text-chat-text-muted">Allow AI to call external functions and APIs</p>
            </div>
            <Switch defaultChecked={false} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Label className="text-chat-text-primary">Vision capabilities</Label>
                <Badge variant="secondary" className="text-xs">Beta</Badge>
              </div>
              <p className="text-sm text-chat-text-muted">Enable image understanding and analysis</p>
            </div>
            <Switch defaultChecked={false} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Label className="text-chat-text-primary">Web browsing</Label>
                <Badge variant="secondary" className="text-xs">Alpha</Badge>
              </div>
              <p className="text-sm text-chat-text-muted">Allow AI to browse the web for current information</p>
            </div>
            <Switch defaultChecked={false} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}