import { useState, useCallback } from 'react';
import { AppSettings, ChatSettings, UserPreferences } from '@/types/settings';
import { DEFAULT_CHAT_SETTINGS, DEFAULT_USER_PREFERENCES, DEFAULT_APPEARANCE } from '@/lib/constants';

const STORAGE_KEY = 'mindmeld-settings';

export function useSettings() {
  const [settings, setSettingsState] = useState<AppSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          chat: { ...DEFAULT_CHAT_SETTINGS, ...parsed.chat },
          user: { ...DEFAULT_USER_PREFERENCES, ...parsed.user },
          appearance: { ...DEFAULT_APPEARANCE, ...parsed.appearance },
        };
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
    
    return {
      chat: DEFAULT_CHAT_SETTINGS,
      user: DEFAULT_USER_PREFERENCES,
      appearance: DEFAULT_APPEARANCE,
    };
  });

  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    setSettingsState(prev => {
      const updated = {
        ...prev,
        ...newSettings,
        chat: { ...prev.chat, ...newSettings.chat },
        user: { ...prev.user, ...newSettings.user },
        appearance: { ...prev.appearance, ...newSettings.appearance },
      };
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save settings:', error);
      }
      
      return updated;
    });
  }, []);

  const updateChatSettings = useCallback((chatSettings: Partial<ChatSettings>) => {
    updateSettings({ chat: { ...settings.chat, ...chatSettings } });
  }, [updateSettings, settings.chat]);

  const updateUserPreferences = useCallback((userPreferences: Partial<UserPreferences>) => {
    updateSettings({ user: { ...settings.user, ...userPreferences } });
  }, [updateSettings, settings.user]);

  const resetToDefaults = useCallback(() => {
    const defaultSettings = {
      chat: DEFAULT_CHAT_SETTINGS,
      user: DEFAULT_USER_PREFERENCES,
      appearance: DEFAULT_APPEARANCE,
    };
    setSettingsState(defaultSettings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));
  }, []);

  const exportSettings = useCallback(() => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mindmeld-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  }, [settings]);

  const importSettings = useCallback((file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          updateSettings(imported);
          resolve();
        } catch (error) {
          reject(new Error('Invalid settings file'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }, [updateSettings]);

  return {
    settings,
    updateSettings,
    updateChatSettings,
    updateUserPreferences,
    resetToDefaults,
    exportSettings,
    importSettings,
  };
}