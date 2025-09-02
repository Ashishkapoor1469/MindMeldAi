import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AppSettings } from "@/types/settings";

interface AppearanceSettingsProps {
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

export function AppearanceSettings({ settings, updateSettings }: AppearanceSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-chat-text-primary mb-2">Appearance & Display</h3>
        <p className="text-sm text-chat-text-muted">Customize how the interface looks and feels.</p>
      </div>

      <Card className="bg-chat-ai-message border-chat-border">
        <CardHeader>
          <CardTitle className="text-chat-text-primary">Typography</CardTitle>
          <CardDescription className="text-chat-text-secondary">
            Adjust text size and readability settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fontSize" className="text-chat-text-primary">Font Size</Label>
            <Select 
              value={settings.appearance.fontSize} 
              onValueChange={(value: 'small' | 'medium' | 'large') => 
                updateSettings({ appearance: { ...settings.appearance, fontSize: value } })
              }
            >
              <SelectTrigger className="bg-chat-input border-chat-input-border">
                <SelectValue placeholder="Select font size" />
              </SelectTrigger>
              <SelectContent className="bg-chat-surface border-chat-border">
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="messageSpacing" className="text-chat-text-primary">Message Spacing</Label>
            <Select 
              value={settings.appearance.messageSpacing} 
              onValueChange={(value: 'compact' | 'normal' | 'spacious') => 
                updateSettings({ appearance: { ...settings.appearance, messageSpacing: value } })
              }
            >
              <SelectTrigger className="bg-chat-input border-chat-input-border">
                <SelectValue placeholder="Select spacing" />
              </SelectTrigger>
              <SelectContent className="bg-chat-surface border-chat-border">
                <SelectItem value="compact">Compact</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="spacious">Spacious</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-chat-ai-message border-chat-border">
        <CardHeader>
          <CardTitle className="text-chat-text-primary">Code & Syntax</CardTitle>
          <CardDescription className="text-chat-text-secondary">
            Configure how code blocks are displayed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="codeTheme" className="text-chat-text-primary">Code Theme</Label>
            <Select 
              value={settings.appearance.codeTheme} 
              onValueChange={(value) => 
                updateSettings({ appearance: { ...settings.appearance, codeTheme: value } })
              }
            >
              <SelectTrigger className="bg-chat-input border-chat-input-border">
                <SelectValue placeholder="Select code theme" />
              </SelectTrigger>
              <SelectContent className="bg-chat-surface border-chat-border">
                <SelectItem value="github-dark">GitHub Dark</SelectItem>
                <SelectItem value="github-light">GitHub Light</SelectItem>
                <SelectItem value="monokai">Monokai</SelectItem>
                <SelectItem value="dracula">Dracula</SelectItem>
                <SelectItem value="nord">Nord</SelectItem>
                <SelectItem value="one-dark">One Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-chat-ai-message border-chat-border">
        <CardHeader>
          <CardTitle className="text-chat-text-primary">Colors & Accent</CardTitle>
          <CardDescription className="text-chat-text-secondary">
            Customize the color scheme and accent colors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accentColor" className="text-chat-text-primary">Accent Color</Label>
            <div className="grid grid-cols-6 gap-2">
              {[
                { name: 'Green', value: 'hsl(142 71% 45%)' },
                { name: 'Blue', value: 'hsl(217 91% 60%)' },
                { name: 'Purple', value: 'hsl(262 83% 58%)' },
                { name: 'Pink', value: 'hsl(322 87% 55%)' },
                { name: 'Orange', value: 'hsl(25 95% 53%)' },
                { name: 'Red', value: 'hsl(0 84% 60%)' },
              ].map((color) => (
                <button
                  key={color.name}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${
                    settings.appearance.accentColor === color.value
                      ? 'border-white scale-110'
                      : 'border-chat-border hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => 
                    updateSettings({ appearance: { ...settings.appearance, accentColor: color.value } })
                  }
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}