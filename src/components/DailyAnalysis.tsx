import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DailyAnalysis as DailyAnalysisType } from '@/data/healthData';
import { cn } from '@/lib/utils';

interface DailyAnalysisProps {
  data: DailyAnalysisType[];
  className?: string;
}

export const DailyAnalysis: React.FC<DailyAnalysisProps> = ({ data, className }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return '💚';
      case 'good': return '💛';
      case 'warning': return '🧡';
      case 'danger': return '❤️';
      default: return '⚪';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'border-health-excellent bg-health-excellent/10';
      case 'good': return 'border-health-good bg-health-good/10';
      case 'warning': return 'border-health-warning bg-health-warning/10';
      case 'danger': return 'border-health-danger bg-health-danger/10';
      default: return 'border-border bg-muted/10';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card className={cn(
      "relative overflow-hidden bg-gradient-card backdrop-blur-sm border-border/50",
      className
    )}>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Daily Analysis
          </h3>
          <Button variant="outline" size="sm">
            Export Data
          </Button>
        </div>

        <div className="space-y-3">
          {data.map((day, index) => (
            <div
              key={day.date}
              className={cn(
                "p-4 rounded-lg border transition-smooth hover:scale-[1.02]",
                getStatusColor(day.overallStatus)
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getStatusIcon(day.overallStatus)}</span>
                  <div>
                    <div className="font-medium">{formatDate(day.date)}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {day.overallStatus} condition
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div className="font-medium">{day.ticFrequency} tics/day</div>
                  <div className="text-xs text-muted-foreground">
                    {day.stressEpisodes} stress episodes
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-vitals-heart font-medium">
                    {day.averageHeartRate}
                  </div>
                  <div className="text-xs text-muted-foreground">BPM</div>
                </div>
                <div className="text-center">
                  <div className="text-vitals-temperature font-medium">
                    {day.averageTemperature}°F
                  </div>
                  <div className="text-xs text-muted-foreground">Temp</div>
                </div>
                <div className="text-center">
                  <div className="text-vitals-pressure font-medium">
                    {day.averagePressure.systolic}/{day.averagePressure.diastolic}
                  </div>
                  <div className="text-xs text-muted-foreground">BP</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border/30">
          <div className="text-center text-sm text-muted-foreground">
            Showing last {data.length} days • Auto-updated daily
          </div>
        </div>
      </div>
    </Card>
  );
};