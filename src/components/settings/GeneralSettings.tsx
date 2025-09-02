import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AppSettings, UserPreferences } from "@/types/settings";

interface GeneralSettingsProps {
  settings: AppSettings;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
}

export function GeneralSettings({ settings, updateUserPreferences }: GeneralSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-chat-text-primary mb-2">General Preferences</h3>
        <p className="text-sm text-chat-text-muted">Configure your basic preferences and regional settings.</p>
      </div>

      <Card className="bg-chat-ai-message border-chat-border">
        <CardHeader>
          <CardTitle className="text-chat-text-primary">Language & Region</CardTitle>
          <CardDescription className="text-chat-text-secondary">
            Set your preferred language and regional formats
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language" className="text-chat-text-primary">Language</Label>
              <Select 
                value={settings.user.language} 
                onValueChange={(value) => updateUserPreferences({ language: value })}
              >
                <SelectTrigger className="bg-chat-input border-chat-input-border">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-chat-surface border-chat-border">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-chat-text-primary">Timezone</Label>
              <Select 
                value={settings.user.timezone} 
                onValueChange={(value) => updateUserPreferences({ timezone: value })}
              >
                <SelectTrigger className="bg-chat-input border-chat-input-border">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent className="bg-chat-surface border-chat-border">
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="America/New_York">Eastern Time</SelectItem>
                  <SelectItem value="America/Chicago">Central Time</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                  <SelectItem value="Europe/London">London</SelectItem>
                  <SelectItem value="Europe/Paris">Paris</SelectItem>
                  <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateFormat" className="text-chat-text-primary">Date Format</Label>
            <Select 
              value={settings.user.dateFormat} 
              onValueChange={(value) => updateUserPreferences({ dateFormat: value })}
            >
              <SelectTrigger className="bg-chat-input border-chat-input-border">
                <SelectValue placeholder="Select date format" />
              </SelectTrigger>
              <SelectContent className="bg-chat-surface border-chat-border">
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-chat-ai-message border-chat-border">
        <CardHeader>
          <CardTitle className="text-chat-text-primary">Chat Preferences</CardTitle>
          <CardDescription className="text-chat-text-secondary">
            Configure how you interact with conversations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="autoSave" className="text-chat-text-primary">Auto-save conversations</Label>
              <p className="text-sm text-chat-text-muted">Automatically save your conversations as you chat</p>
            </div>
            <Switch 
              id="autoSave"
              checked={settings.chat.autoSave}
              onCheckedChange={(checked) => updateUserPreferences({ autoSave: checked } as any)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="showTimestamps" className="text-chat-text-primary">Show message timestamps</Label>
              <p className="text-sm text-chat-text-muted">Display when each message was sent</p>
            </div>
            <Switch 
              id="showTimestamps"
              checked={settings.chat.showTimestamps}
              onCheckedChange={(checked) => updateUserPreferences({ showTimestamps: checked } as any)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="soundEnabled" className="text-chat-text-primary">Sound notifications</Label>
              <p className="text-sm text-chat-text-muted">Play sounds for new messages and events</p>
            </div>
            <Switch 
              id="soundEnabled"
              checked={settings.chat.soundEnabled}
              onCheckedChange={(checked) => updateUserPreferences({ soundEnabled: checked } as any)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}