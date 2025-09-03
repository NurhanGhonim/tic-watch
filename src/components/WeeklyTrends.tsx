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
      case 'improving': return '📈';
      case 'declining': return '📉';
      case 'stable': return '➡️';
      default: return '📊';
    }
  };

  const getTrendColor = (trend: 'improving' | 'stable' | 'declining') => {
    switch (trend) {
      case 'improving': return 'text-health-excellent';
      case 'declining': return 'text-health-danger';
      case 'stable': return 'text-health-good';
      default: return 'text-foreground';
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
    <Card className={cn(
      "relative overflow-hidden bg-gradient-card backdrop-blur-sm border-border/50",
      className
    )}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Weekly Trends
          </h3>
          <div className="text-sm text-muted-foreground">
            {formatDate(data.weekStart)} - {formatDate(data.weekEnd)}
          </div>
        </div>

        {/* Weekly Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-secondary/30">
            <div className="text-2xl font-bold text-vitals-heart">
              {weeklyAvg.heartRate}
            </div>
            <div className="text-xs text-muted-foreground">Avg BPM</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-secondary/30">
            <div className="text-2xl font-bold text-vitals-temperature">
              {weeklyAvg.stressEpisodes}
            </div>
            <div className="text-xs text-muted-foreground">Stress Episodes</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-secondary/30">
            <div className="text-2xl font-bold text-vitals-pressure">
              {weeklyAvg.ticFrequency}
            </div>
            <div className="text-xs text-muted-foreground">Avg Tics/Day</div>
          </div>
        </div>

        {/* Trend Analysis */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Trend Analysis</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
              <div className="flex items-center space-x-3">
                <span className="text-lg">{getTrendIcon(data.trends.heartRateTrend)}</span>
                <span className="text-sm">Heart Rate</span>
              </div>
              <span className={cn("text-sm font-medium capitalize", getTrendColor(data.trends.heartRateTrend))}>
                {data.trends.heartRateTrend}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
              <div className="flex items-center space-x-3">
                <span className="text-lg">{getTrendIcon(data.trends.stressTrend)}</span>
                <span className="text-sm">Stress Levels</span>
              </div>
              <span className={cn("text-sm font-medium capitalize", getTrendColor(data.trends.stressTrend))}>
                {data.trends.stressTrend}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
              <div className="flex items-center space-x-3">
                <span className="text-lg">{getTrendIcon(data.trends.ticTrend)}</span>
                <span className="text-sm">Tic Frequency</span>
              </div>
              <span className={cn("text-sm font-medium capitalize", getTrendColor(data.trends.ticTrend))}>
                {data.trends.ticTrend}
              </span>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Recommendations</h4>
          <div className="space-y-2">
            {data.recommendations.map((recommendation, index) => (
              <div 
                key={index}
                className="flex items-start space-x-3 p-3 rounded-lg bg-primary/10 border border-primary/20"
              >
                <span className="text-primary mt-1">💡</span>
                <span className="text-sm text-foreground">{recommendation}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            Share Report
          </Button>
          <Button variant="default" size="sm" className="flex-1">
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};