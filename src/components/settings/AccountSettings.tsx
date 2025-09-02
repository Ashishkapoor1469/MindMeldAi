import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Key, AlertTriangle } from "lucide-react";
import { AppSettings, UserPreferences } from "@/types/settings";
import { useToast } from "@/hooks/use-toast";

interface AccountSettingsProps {
  settings: AppSettings;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
}

export function AccountSettings({ settings, updateUserPreferences }: AccountSettingsProps) {
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({});
  const [apiKeys, setApiKeys] = useState(settings.user.apiKeys || {});
  const { toast } = useToast();

  const toggleShowKey = (provider: string) => {
    setShowApiKeys(prev => ({ ...prev, [provider]: !prev[provider] }));
  };

  const handleSaveApiKey = (provider: string, key: string) => {
    const updatedKeys = { ...apiKeys, [provider]: key };
    setApiKeys(updatedKeys);
    updateUserPreferences({ apiKeys: updatedKeys });
    toast({
      title: "API Key saved",
      description: `Your ${provider} API key has been saved securely.`,
    });
  };

  const handleRemoveApiKey = (provider: string) => {
    const updatedKeys = { ...apiKeys };
    delete updatedKeys[provider as keyof typeof updatedKeys];
    setApiKeys(updatedKeys);
    updateUserPreferences({ apiKeys: updatedKeys });
    toast({
      title: "API Key removed",
      description: `Your ${provider} API key has been removed.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-chat-text-primary mb-2">Account & API Keys</h3>
        <p className="text-sm text-chat-text-muted">Manage your account settings and API keys for AI providers.</p>
      </div>

      <Card className="bg-chat-ai-message border-chat-border">
        <CardHeader>
          <CardTitle className="text-chat-text-primary">Profile Information</CardTitle>
          <CardDescription className="text-chat-text-secondary">
            Your basic profile and account information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-chat-text-primary">Email</Label>
            <Input 
              id="email"
              type="email"
              placeholder="your.email@example.com"
              className="bg-chat-input border-chat-input-border"
              disabled
            />
            <p className="text-xs text-chat-text-muted">
              Email management is currently not available in this demo version.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-chat-text-primary">Display Name</Label>
            <Input 
              id="name"
              placeholder="Your Name"
              className="bg-chat-input border-chat-input-border"
              disabled
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-chat-ai-message border-chat-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-chat-text-primary">
            <Key className="h-5 w-5" />
            API Keys
          </CardTitle>
          <CardDescription className="text-chat-text-secondary">
            Configure API keys for different AI providers to access their models
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-amber-300 font-medium">Security Notice</p>
              <p className="text-amber-200">
                API keys are stored locally in your browser. Never share your API keys with others.
              </p>
            </div>
          </div>

          {[
            { provider: 'OpenAI', key: 'openai', placeholder: 'sk-...' },
            { provider: 'Anthropic', key: 'anthropic', placeholder: 'sk-ant-...' },
            { provider: 'Google', key: 'google', placeholder: 'AIza...' },
          ].map(({ provider, key, placeholder }) => (
            <div key={provider} className="space-y-3 p-4 border border-chat-border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label className="text-chat-text-primary">{provider} API Key</Label>
                  {apiKeys[key as keyof typeof apiKeys] && (
                    <Badge variant="outline" className="text-xs text-green-400 border-green-400">
                      Configured
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleShowKey(key)}
                  className="text-chat-text-muted hover:text-chat-text-primary"
                >
                  {showApiKeys[key] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Input
                  type={showApiKeys[key] ? "text" : "password"}
                  placeholder={placeholder}
                  value={apiKeys[key as keyof typeof apiKeys] || ''}
                  onChange={(e) => setApiKeys(prev => ({ ...prev, [key]: e.target.value }))}
                  className="bg-chat-input border-chat-input-border flex-1"
                />
                <Button
                  onClick={() => handleSaveApiKey(key, apiKeys[key as keyof typeof apiKeys] || '')}
                  disabled={!apiKeys[key as keyof typeof apiKeys]}
                  className="bg-chat-accent hover:bg-chat-accent-hover"
                >
                  Save
                </Button>
                {apiKeys[key as keyof typeof apiKeys] && (
                  <Button
                    variant="outline"
                    onClick={() => handleRemoveApiKey(key)}
                    className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-chat-ai-message border-chat-border">
        <CardHeader>
          <CardTitle className="text-chat-text-primary">Usage & Billing</CardTitle>
          <CardDescription className="text-chat-text-secondary">
            Monitor your API usage and costs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 border border-chat-border rounded-lg">
              <div className="text-2xl font-bold text-chat-text-primary">1,247</div>
              <div className="text-sm text-chat-text-muted">Messages this month</div>
            </div>
            <div className="text-center p-3 border border-chat-border rounded-lg">
              <div className="text-2xl font-bold text-chat-text-primary">$12.45</div>
              <div className="text-sm text-chat-text-muted">Estimated cost</div>
            </div>
            <div className="text-center p-3 border border-chat-border rounded-lg">
              <div className="text-2xl font-bold text-chat-text-primary">45K</div>
              <div className="text-sm text-chat-text-muted">Tokens used</div>
            </div>
          </div>
          <p className="text-xs text-chat-text-muted">
            Usage tracking is simulated in this demo version.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}