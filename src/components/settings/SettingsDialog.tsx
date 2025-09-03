import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { GeneralSettings } from "./GeneralSettings";
import { ModelSettings } from "./ModelSettings";
import { AppearanceSettings } from "./AppearanceSettings";
import { AdvancedSettings } from "./AdvancedSettings";
import { AccountSettings } from "./AccountSettings";
import { DataSettings } from "./DataSettings";
import { useSettings } from "@/hooks/useSettings";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [activeTab, setActiveTab] = useState("general");
  const { settings, updateSettings, updateChatSettings, updateUserPreferences, resetToDefaults } = useSettings();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[80vh] bg-chat-surface border-chat-border">
        <DialogHeader className="flex flex-row items-center justify-between p-6 border-b border-chat-border">
          <DialogTitle className="text-xl font-semibold text-chat-text-primary">Settings</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="hover:bg-chat-surface-hover"
          >
            <X className="h-5 w-5" />
          </Button>
        </DialogHeader>

        <div className="flex flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="flex flex-col md:flex-row w-full h-full">
            <TabsList className="md:w-48 md:h-full h-10 bg-chat-sidebar border-r border-chat-border p-2 md:flex-col flex-row justify-start">
              <TabsTrigger value="general" className="w-full min-[600px]:text-xl text-[9px] justify-start text-left">
                General
              </TabsTrigger>
              <TabsTrigger value="models" className="w-full min-[600px]:text-xl text-[9px] justify-start text-left">
                Models & AI
              </TabsTrigger>
              <TabsTrigger value="appearance" className="w-full min-[600px]:text-xl text-[9px] justify-start text-left">
                Appearance
              </TabsTrigger>
              <TabsTrigger value="advanced" className="w-full min-[600px]:text-xl text-[9px] justify-start text-left">
                Advanced
              </TabsTrigger>
              <TabsTrigger value="account" className="w-full min-[600px]:text-xl text-[9px] justify-start text-left">
                Account
              </TabsTrigger>
              <TabsTrigger value="data" className="w-full min-[600px]:text-xl text-[9px] justify-start text-left">
                Data & Privacy
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-6">
                  <TabsContent value="general" className="space-y-6 mt-0">
                    <GeneralSettings 
                      settings={settings} 
                      updateUserPreferences={updateUserPreferences}
                    />
                  </TabsContent>

                  <TabsContent value="models" className="space-y-6 mt-0">
                    <ModelSettings 
                      settings={settings} 
                      updateChatSettings={updateChatSettings}
                    />
                  </TabsContent>

                  <TabsContent value="appearance" className="space-y-6 mt-0">
                    <AppearanceSettings 
                      settings={settings} 
                      updateSettings={updateSettings}
                    />
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-6 mt-0">
                    <AdvancedSettings 
                      settings={settings} 
                      updateChatSettings={updateChatSettings}
                    />
                  </TabsContent>

                  <TabsContent value="account" className="space-y-6 mt-0">
                    <AccountSettings 
                      settings={settings} 
                      updateUserPreferences={updateUserPreferences}
                    />
                  </TabsContent>

                  <TabsContent value="data" className="space-y-6 mt-0">
                    <DataSettings 
                      settings={settings}
                      resetToDefaults={resetToDefaults}
                    />
                  </TabsContent>
                </div>
              </ScrollArea>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}