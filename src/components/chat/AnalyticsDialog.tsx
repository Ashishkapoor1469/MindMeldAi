import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  MessageSquare, 
  Clock, 
  TrendingUp, 
  DollarSign,
  Calendar,
  Zap,
  Target
} from "lucide-react";

export function AnalyticsDialog() {
  const [open, setOpen] = useState(false);

  const stats = [
    {
      title: "Total Messages",
      value: "2,847",
      change: "+23%",
      trend: "up",
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      title: "Active Days",
      value: "45",
      change: "+12%",
      trend: "up",
      icon: <Calendar className="h-5 w-5" />
    },
    {
      title: "Avg Session",
      value: "24min",
      change: "+8%",
      trend: "up",
      icon: <Clock className="h-5 w-5" />
    },
    {
      title: "Est. Cost",
      value: "$127.43",
      change: "+15%",
      trend: "up",
      icon: <DollarSign className="h-5 w-5" />
    }
  ];

  const modelUsage = [
    { name: "GPT-4 Turbo", usage: 65, messages: 1847, cost: "$78.32" },
    { name: "Claude 3 Opus", usage: 25, messages: 711, cost: "$35.67" },
    { name: "GPT-3.5 Turbo", usage: 10, messages: 289, cost: "$13.44" }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-chat-border hover:bg-chat-surface-hover">
          <BarChart3 className="h-4 w-4 mr-2" />
          Analytics
        </Button>
      </DialogTrigger>
     <DialogContent className="w-full max-w-4xl h-[80vh] bg-chat-surface border-chat-border">
  <DialogHeader className="border-b border-chat-border pb-4">
    <DialogTitle className="text-xl text-chat-text-primary">Usage Analytics</DialogTitle>
  </DialogHeader>

  <ScrollArea className="flex-1">
    <div className="p-4 sm:p-6 space-y-6">
      
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-chat-ai-message border-chat-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-chat-text-muted">{stat.icon}</div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    stat.trend === 'up' 
                      ? 'text-green-400 border-green-400' 
                      : 'text-red-400 border-red-400'
                  }`}
                >
                  {stat.change}
                </Badge>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-chat-text-primary">{stat.value}</div>
                <div className="text-sm text-chat-text-muted">{stat.title}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Model Usage */}
      <Card className="bg-chat-ai-message border-chat-border">
        <CardHeader>
          <CardTitle className="text-chat-text-primary">Model Usage Distribution</CardTitle>
          <CardDescription className="text-chat-text-secondary">
            Your AI model usage over the last 30 days
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {modelUsage.map((model, index) => (
            <div key={index} className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="font-medium text-chat-text-primary">{model.name}</div>
                  <Badge variant="secondary" className="text-xs">{model.messages} msgs</Badge>
                </div>
                <div className="text-sm text-chat-text-muted">{model.cost}</div>
              </div>
              <Progress value={model.usage} className="h-2" />
              <div className="text-xs text-chat-text-muted">{model.usage}% of total usage</div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Activity Heatmap */}
      <Card className="bg-chat-ai-message border-chat-border">
        <CardHeader>
          <CardTitle className="text-chat-text-primary">Activity Heatmap</CardTitle>
          <CardDescription className="text-chat-text-secondary">
            Your chat activity patterns over the last 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 sm:grid-cols-14 md:grid-cols-24 gap-1">
            {Array.from({ length: 168 }, (_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-sm ${
                  Math.random() > 0.7
                    ? 'bg-chat-accent'
                    : Math.random() > 0.4
                    ? 'bg-chat-accent/60'
                    : Math.random() > 0.2
                    ? 'bg-chat-accent/30'
                    : 'bg-chat-border'
                }`}
                title={`Hour ${i % 24}, Day ${Math.floor(i / 24) + 1}`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-chat-text-muted">
            <span>Less active</span>
            <span>More active</span>
          </div>
        </CardContent>
      </Card>

      {/* Popular Topics & Response Quality */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Popular Topics */}
        <Card className="bg-chat-ai-message border-chat-border">
          <CardHeader>
            <CardTitle className="text-chat-text-primary">Popular Topics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { topic: "Code Generation", count: 234, percentage: 85 },
              { topic: "Writing & Content", count: 189, percentage: 68 },
              { topic: "Data Analysis", count: 156, percentage: 56 },
              { topic: "Problem Solving", count: 134, percentage: 48 },
              { topic: "Learning & Education", count: 98, percentage: 35 }
            ].map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-chat-text-primary">{item.topic}</span>
                  <span className="text-chat-text-muted">{item.count}</span>
                </div>
                <Progress value={item.percentage} className="h-1" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Response Quality */}
        <Card className="bg-chat-ai-message border-chat-border">
          <CardHeader>
            <CardTitle className="text-chat-text-primary">Response Quality</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-chat-text-secondary">Average Rating</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div
                    key={star}
                    className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400' : 'text-chat-border'}`}
                  >
                    ★
                  </div>
                ))}
                <span className="text-chat-text-primary ml-2">4.2</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-chat-text-secondary">Helpful responses</span>
                <span className="text-chat-text-primary">94%</span>
              </div>
              <Progress value={94} className="h-1" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-chat-text-secondary">Response time</span>
                <span className="text-chat-text-primary">1.2s avg</span>
              </div>
              <Progress value={78} className="h-1" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </ScrollArea>
</DialogContent>

    </Dialog>
  );
}