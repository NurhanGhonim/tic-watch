import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WeeklyAnalysis } from '@/data/healthData';
import { cn } from '@/lib/utils';

interface WeeklyTrendsProps {
  data: WeeklyAnalysis;
  className?: string;
}

export const WeeklyTrends: React.FC<WeeklyTrendsProps> = ({ data, className }) => {
  const getTrendIcon = (trend: 'improving' | 'stable' | 'declining') => {
    switch (trend) {
      case 'improving': return '🚀';
      case 'declining': return '⚠️';
      case 'stable': return '📊';
      default: return '📈';
    }
  };

  const getTrendColor = (trend: 'improving' | 'stable' | 'declining') => {
    switch (trend) {
      case 'improving': return 'text-trend-improving';
      case 'declining': return 'text-trend-declining';
      case 'stable': return 'text-trend-stable';
      default: return 'text-foreground';
    }
  };

  const getTrendBackground = (trend: 'improving' | 'stable' | 'declining') => {
    switch (trend) {
      case 'improving': return 'bg-trend-improving/20 border-trend-improving/30';
      case 'declining': return 'bg-trend-declining/20 border-trend-declining/30';
      case 'stable': return 'bg-trend-stable/20 border-trend-stable/30';
      default: return 'bg-secondary/20';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Calculate weekly averages
  const weeklyAvg = {
    heartRate: Math.round(
      data.dailyData.reduce((sum, day) => sum + day.averageHeartRate, 0) / data.dailyData.length
    ),
    stressEpisodes: data.dailyData.reduce((sum, day) => sum + day.stressEpisodes, 0),
    ticFrequency: Math.round(
      data.dailyData.reduce((sum, day) => sum + day.ticFrequency, 0) / data.dailyData.length
    )
  };

  return (
    <div className="space-y-6">
      {/* Colorful Header */}
      <Card className={cn(
        "relative overflow-hidden bg-gradient-weekly backdrop-blur-sm border-border/50",
        "shadow-glow hover:shadow-vital transition-smooth",
        className
      )}>
        <div className="absolute inset-0 bg-gradient-rainbow opacity-10" />
        <div className="relative p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-health flex items-center justify-center shadow-glow">
              <span className="text-2xl">📅</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Weekly Analysis
              </h3>
              <p className="text-sm text-muted-foreground">Last 7 days health trends</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-primary">
              {formatDate(data.weekStart)} - {formatDate(data.weekEnd)}
            </div>
            <div className="text-xs text-muted-foreground">Week Summary</div>
          </div>
        </div>

        {/* Colorful Weekly Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-analysis-purple/20 to-analysis-blue/20 border border-analysis-purple/30">
            <div className="absolute top-2 right-2 text-2xl opacity-50">💓</div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-analysis-purple">
                {weeklyAvg.heartRate}
              </div>
              <div className="text-sm text-foreground font-medium">Average BPM</div>
              <div className="text-xs text-muted-foreground">Heart Rate</div>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-analysis-orange/20 to-analysis-red/20 border border-analysis-orange/30">
            <div className="absolute top-2 right-2 text-2xl opacity-50">😰</div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-analysis-orange">
                {weeklyAvg.stressEpisodes}
              </div>
              <div className="text-sm text-foreground font-medium">Total Episodes</div>
              <div className="text-xs text-muted-foreground">Stress Events</div>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-analysis-cyan/20 to-analysis-green/20 border border-analysis-cyan/30">
            <div className="absolute top-2 right-2 text-2xl opacity-50">🎯</div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-analysis-cyan">
                {weeklyAvg.ticFrequency}
              </div>
              <div className="text-sm text-foreground font-medium">Avg Per Day</div>
              <div className="text-xs text-muted-foreground">Tic Frequency</div>
            </div>
          </div>
        </div>

        {/* Colorful Trend Analysis */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-rainbow flex items-center justify-center">
              <span className="text-white font-bold text-sm">📊</span>
            </div>
            <h4 className="text-lg font-bold text-foreground">Trend Analysis</h4>
          </div>
          
          <div className="grid gap-4">
            <div className={cn(
              "flex items-center justify-between p-4 rounded-xl border transition-smooth hover:scale-105",
              getTrendBackground(data.trends.heartRateTrend)
            )}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-analysis-purple/20 flex items-center justify-center border border-analysis-purple/30">
                  <span className="text-2xl">{getTrendIcon(data.trends.heartRateTrend)}</span>
                </div>
                <div>
                  <span className="font-medium text-foreground">Heart Rate Trend</span>
                  <div className="text-sm text-muted-foreground">Cardiovascular health</div>
                </div>
              </div>
              <div className="text-right">
                <span className={cn("text-lg font-bold capitalize", getTrendColor(data.trends.heartRateTrend))}>
                  {data.trends.heartRateTrend}
                </span>
                <div className="text-xs text-muted-foreground">This week</div>
              </div>
            </div>

            <div className={cn(
              "flex items-center justify-between p-4 rounded-xl border transition-smooth hover:scale-105",
              getTrendBackground(data.trends.stressTrend)
            )}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-analysis-orange/20 flex items-center justify-center border border-analysis-orange/30">
                  <span className="text-2xl">{getTrendIcon(data.trends.stressTrend)}</span>
                </div>
                <div>
                  <span className="font-medium text-foreground">Stress Management</span>
                  <div className="text-sm text-muted-foreground">Emotional wellness</div>
                </div>
              </div>
              <div className="text-right">
                <span className={cn("text-lg font-bold capitalize", getTrendColor(data.trends.stressTrend))}>
                  {data.trends.stressTrend}
                </span>
                <div className="text-xs text-muted-foreground">This week</div>
              </div>
            </div>

            <div className={cn(
              "flex items-center justify-between p-4 rounded-xl border transition-smooth hover:scale-105",
              getTrendBackground(data.trends.ticTrend)
            )}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-analysis-cyan/20 flex items-center justify-center border border-analysis-cyan/30">
                  <span className="text-2xl">{getTrendIcon(data.trends.ticTrend)}</span>
                </div>
                <div>
                  <span className="font-medium text-foreground">Tic Frequency</span>
                  <div className="text-sm text-muted-foreground">Symptom management</div>
                </div>
              </div>
              <div className="text-right">
                <span className={cn("text-lg font-bold capitalize", getTrendColor(data.trends.ticTrend))}>
                  {data.trends.ticTrend}
                </span>
                <div className="text-xs text-muted-foreground">This week</div>
              </div>
            </div>
          </div>
        </div>

        {/* Vibrant Recommendations */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-health flex items-center justify-center">
              <span className="text-white font-bold text-sm">💡</span>
            </div>
            <h4 className="text-lg font-bold text-foreground">Smart Recommendations</h4>
          </div>
          <div className="grid gap-3">
            {data.recommendations.map((recommendation, index) => {
              const colors = ['analysis-purple', 'analysis-blue', 'analysis-green'];
              const icons = ['🧘', '💪', '🌙'];
              const currentColor = colors[index % colors.length];
              const currentIcon = icons[index % icons.length];
              
              return (
                <div 
                  key={index}
                  className={cn(
                    "flex items-start space-x-4 p-4 rounded-xl border transition-smooth hover:scale-105",
                    `bg-${currentColor}/10 border-${currentColor}/20`
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                    `bg-${currentColor}/20 border border-${currentColor}/30`
                  )}>
                    <span className="text-lg">{currentIcon}</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground">{recommendation}</span>
                    <div className="text-xs text-muted-foreground mt-1">
                      Personalized for your health pattern
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex space-x-3">
          <Button variant="outline" size="sm" className="flex-1 border-analysis-blue/30 hover:bg-analysis-blue/10">
            <span className="mr-2">📤</span>
            Share Report
          </Button>
          <Button variant="default" size="sm" className="flex-1 bg-gradient-health border-0">
            <span className="mr-2">🔍</span>
            View Details
          </Button>
        </div>
        </div>
      </Card>
    </div>
  );
};