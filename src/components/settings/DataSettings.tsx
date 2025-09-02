import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Download, Upload, Trash2, Shield, Database } from "lucide-react";
import { AppSettings } from "@/types/settings";
import { useToast } from "@/hooks/use-toast";
import { useSettings } from "@/hooks/useSettings";

interface DataSettingsProps {
  settings: AppSettings;
  resetToDefaults: () => void;
}

export function DataSettings({ settings, resetToDefaults }: DataSettingsProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const { exportSettings, importSettings } = useSettings();

  const handleExport = () => {
    exportSettings();
    toast({
      title: "Settings exported",
      description: "Your settings have been downloaded as a JSON file.",
    });
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    try {
      await importSettings(selectedFile);
      toast({
        title: "Settings imported",
        description: "Your settings have been imported successfully.",
      });
      setSelectedFile(null);
    } catch (error) {
      toast({
        title: "Import failed",
        description: "Failed to import settings. Please check the file format.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    resetToDefaults();
    toast({
      title: "Settings reset",
      description: "All settings have been reset to their default values.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-chat-text-primary mb-2">Data & Privacy</h3>
        <p className="text-sm text-chat-text-muted">Manage your data, privacy settings, and export options.</p>
      </div>

      <Card className="bg-chat-ai-message border-chat-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-chat-text-primary">
            <Database className="h-5 w-5" />
            Data Export & Import
          </CardTitle>
          <CardDescription className="text-chat-text-secondary">
            Backup and restore your settings and conversation data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-chat-text-primary">Export Format</Label>
            <Select value={settings.user.exportFormat}>
              <SelectTrigger className="bg-chat-input border-chat-input-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-chat-surface border-chat-border">
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="markdown">Markdown</SelectItem>
                <SelectItem value="txt">Plain Text</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleExport}
              className="bg-chat-accent hover:bg-chat-accent-hover flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Settings
            </Button>
            <Button
              variant="outline"
              disabled
              className="border-chat-border flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Conversations
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="importFile" className="text-chat-text-primary">Import Settings</Label>
            <div className="flex gap-2">
              <Input
                id="importFile"
                type="file"
                accept=".json"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="bg-chat-input border-chat-input-border flex-1"
              />
              <Button
                onClick={handleImport}
                disabled={!selectedFile}
                variant="outline"
                className="border-chat-border"
              >
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-chat-ai-message border-chat-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-chat-text-primary">
            <Shield className="h-5 w-5" />
            Privacy & Security
          </CardTitle>
          <CardDescription className="text-chat-text-secondary">
            Control how your data is stored and processed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="p-4 border border-chat-border rounded-lg">
              <h4 className="font-medium text-chat-text-primary mb-2">Local Storage</h4>
              <p className="text-sm text-chat-text-secondary mb-3">
                All your conversations and settings are stored locally in your browser. 
                No data is sent to external servers except when communicating with AI providers.
              </p>
              <div className="text-xs text-chat-text-muted">
                Storage used: ~2.3 MB • Last backup: Never
              </div>
            </div>

            <div className="p-4 border border-chat-border rounded-lg">
              <h4 className="font-medium text-chat-text-primary mb-2">Data Retention</h4>
              <p className="text-sm text-chat-text-secondary mb-3">
                Conversations are kept until you manually delete them. 
                You can clear all data at any time using the reset option below.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-chat-ai-message border-chat-border border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription className="text-chat-text-secondary">
            Irreversible actions that will permanently delete your data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                  Reset All Settings
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-chat-surface border-chat-border">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-chat-text-primary">Reset All Settings</AlertDialogTitle>
                  <AlertDialogDescription className="text-chat-text-secondary">
                    This will reset all your settings to their default values. 
                    Your conversations will not be affected. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-chat-input border-chat-border text-chat-text-primary hover:bg-chat-surface-hover">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleReset}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Reset Settings
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  Clear All Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-chat-surface border-chat-border">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-chat-text-primary">Clear All Data</AlertDialogTitle>
                  <AlertDialogDescription className="text-chat-text-secondary">
                    This will permanently delete all your conversations, settings, and stored data. 
                    This action cannot be undone. Make sure to export your data first if you want to keep it.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-chat-input border-chat-border text-chat-text-primary hover:bg-chat-surface-hover">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                    }}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Clear All Data
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}