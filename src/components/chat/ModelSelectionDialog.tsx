import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Sparkles, 
  Brain, 
  Zap, 
  Shield, 
  Code, 
  Globe, 
  Mic, 
  Camera,
  MessageSquare,
  BarChart3,
  Users,
  Star,
  Crown
} from "lucide-react";

interface ModelCardProps {
  name: string;
  provider: string;
  description: string;
  features: string[];
  badge?: string;
  badgeColor?: string;
  icon: React.ReactNode;
  onClick: () => void;
  isSelected?: boolean;
}

function ModelCard({ name, provider, description, features, badge, badgeColor, icon, onClick, isSelected }: ModelCardProps) {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'border-chat-accent bg-chat-accent/10 scale-[1.02]' 
          : 'border-chat-border hover:border-chat-accent/50 hover:bg-chat-surface-hover'
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-chat-accent/20 text-chat-accent">
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg text-chat-text-primary">{name}</CardTitle>
              <p className="text-sm text-chat-text-muted">{provider}</p>
            </div>
          </div>
          {badge && (
            <Badge 
              variant="outline" 
              className={`text-xs ${badgeColor || 'text-chat-accent border-chat-accent'}`}
            >
              {badge}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-chat-text-secondary mb-3">{description}</p>
        <div className="flex flex-wrap gap-1">
          {features.map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs bg-chat-surface text-chat-text-muted">
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ModelSelectionDialog() {
  const [selectedModel, setSelectedModel] = useState('gpt-4-turbo');
  const [open, setOpen] = useState(false);

  const models = [
    {
      id: 'gpt-4-turbo',
      name: 'GPT-4 Turbo',
      provider: 'OpenAI',
      description: 'Most advanced model with superior reasoning and complex task handling',
      features: ['128K context', 'Code generation', 'Multimodal', 'Function calling'],
      badge: 'Recommended',
      badgeColor: 'text-green-400 border-green-400',
      icon: <Crown className="h-5 w-5" />
    },
    {
      id: 'claude-3-opus',
      name: 'Claude 3 Opus',
      provider: 'Anthropic',
      description: 'Exceptional performance on highly complex tasks with nuanced understanding',
      features: ['200K context', 'Advanced reasoning', 'Code analysis', 'Creative writing'],
      badge: 'Premium',
      badgeColor: 'text-purple-400 border-purple-400',
      icon: <Brain className="h-5 w-5" />
    },
    {
      id: 'gemini-pro',
      name: 'Gemini Pro',
      provider: 'Google',
      description: 'Powerful multimodal capabilities with integrated Google services',
      features: ['32K context', 'Multimodal', 'Real-time data', 'Google integration'],
      badge: 'New',
      badgeColor: 'text-blue-400 border-blue-400',
      icon: <Sparkles className="h-5 w-5" />
    },
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      provider: 'OpenAI',
      description: 'Fast and efficient for everyday conversations and tasks',
      features: ['16K context', 'Fast responses', 'Cost effective', 'Reliable'],
      badge: 'Popular',
      icon: <Zap className="h-5 w-5" />
    }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button variant="outline" className="border-chat-border hover:bg-chat-surface-hover">
      <Brain className="h-4 w-4 mr-2" />
      Switch Model
    </Button>
  </DialogTrigger>
  <DialogContent className="max-w-6xl h-screen bg-chat-surface border-chat-border">
    <DialogHeader className="border-b border-chat-border pb-3 sm:pb-4">
      <DialogTitle className="text-lg sm:text-xl text-chat-text-primary">Choose AI Model</DialogTitle>
    </DialogHeader>

    <Tabs defaultValue="models" className="flex-1 flex flex-col">
      {/* Tabs List - Responsive */}
      <TabsList className="w-full h-full bg-chat-sidebar border-b border-chat-border flex flex-col sm:flex-row">
        <TabsTrigger value="models" className="flex-1">AI Models</TabsTrigger>
        <TabsTrigger value="comparison" className="flex-1">Comparison</TabsTrigger>
        <TabsTrigger value="pricing" className="flex-1">Pricing</TabsTrigger>
      </TabsList>

      {/* Models Tab */}
     <TabsContent value="models" className="flex-1 mt-0">
  <ScrollArea className="h-full">
    <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {models.map((model) => (
        <ModelCard
          key={model.id}
          {...model}
          onClick={() => setSelectedModel(model.id)}
          isSelected={selectedModel === model.id}
        />
      ))}
    </div>
  </ScrollArea>
</TabsContent>


      {/* Comparison Table */}
      <TabsContent value="comparison" className="flex-1 mt-0">
        <ScrollArea className="h-full">
          <div className="md:p-4 overflow-x-auto">
            <table className="md:min-w-[600px] w-full border-collapse text-[9px] md:text-sm sm:text-base">
              <thead>
                <tr className="border-b border-chat-border">
                  <th className="text-left p-2 sm:p-3 text-chat-text-primary">Feature</th>
                  <th className="text-center p-2 sm:p-3 text-chat-text-primary">GPT-4 Turbo</th>
                  <th className="text-center p-2 sm:p-3 text-chat-text-primary">Claude 3 Opus</th>
                  <th className="text-center p-2 sm:p-3 text-chat-text-primary">Gemini Pro</th>
                  <th className="text-center p-2 sm:p-3 text-chat-text-primary">GPT-3.5 Turbo</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Context Length', '128K', '200K', '32K', '16K'],
                  ['Reasoning', '★★★★★', '★★★★★', '★★★★☆', '★★★☆☆'],
                  ['Code Generation', '★★★★★', '★★★★☆', '★★★★☆', '★★★☆☆'],
                  ['Creative Writing', '★★★★☆', '★★★★★', '★★★★☆', '★★★☆☆'],
                  ['Speed', '★★★☆☆', '★★★☆☆', '★★★★☆', '★★★★★'],
                  ['Cost', '$$$$', '$$$$$', '$$$', '$$'],
                ].map(([feature, ...values], index) => (
                  <tr key={index} className="border-b border-chat-border/50">
                    <td className="p-2 sm:p-3 font-medium text-chat-text-primary">{feature}</td>
                    {values.map((value, i) => (
                      <td key={i} className="p-2 sm:p-3 text-center text-chat-text-secondary">{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </TabsContent>

      {/* Pricing */}
      <TabsContent value="pricing" className="flex-1 mt-0">
        <ScrollArea className="h-full">
          <div className="p-4 sm:p-6 space-y-4">
            {/* Pricing Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {models.map((model) => (
                <Card key={model.id} className="bg-chat-ai-message border-chat-border">
                  <CardHeader className="pb-2 sm:pb-3">
                    <CardTitle className="text-base text-chat-text-primary">{model.name}</CardTitle>
                    <p className="text-xs sm:text-sm text-chat-text-muted">{model.provider}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between">
                        <span className="text-chat-text-secondary">Input</span>
                        <span className="text-chat-text-primary">$0.01/1K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-chat-text-secondary">Output</span>
                        <span className="text-chat-text-primary">$0.03/1K</span>
                      </div>
                      <Separator className="bg-chat-border" />
                      <div className="flex justify-between font-medium">
                        <span className="text-chat-text-secondary">Est. per message</span>
                        <span className="text-chat-text-primary">$0.005</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Usage Calculator */}
            <Card className="bg-chat-ai-message border-chat-border">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg text-chat-text-primary">Usage Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-chat-text-primary text-sm sm:text-base">Messages per day</Label>
                    <Input 
                      type="number" 
                      defaultValue="50" 
                      className="bg-chat-input border-chat-input-border"
                    />
                  </div>
                  <div>
                    <Label className="text-chat-text-primary text-sm sm:text-base">Selected model</Label>
                    <Select defaultValue="gpt-4-turbo">
                      <SelectTrigger className="bg-chat-input border-chat-input-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-chat-surface border-chat-border">
                        {models.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="p-3 bg-chat-surface border border-chat-border rounded-lg">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-chat-text-primary">$7.50</div>
                    <div className="text-xs sm:text-sm text-chat-text-muted">Estimated monthly cost</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>

    {/* Footer */}
    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 pt-3 sm:pt-4 border-t border-chat-border">
      <div className="text-xs sm:text-sm text-chat-text-muted">
        Currently using: <span className="text-chat-text-primary font-medium">GPT-4 Turbo</span>
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
        <Button variant="outline" onClick={() => setOpen(false)} className="w-full sm:w-auto border-chat-border">
          Cancel
        </Button>
        <Button onClick={() => setOpen(false)} className="w-full sm:w-auto bg-chat-accent hover:bg-chat-accent-hover">
          Switch Model
        </Button>
      </div>
    </div>
  </DialogContent>
</Dialog>

  );
}