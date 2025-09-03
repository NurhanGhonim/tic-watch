import React from 'react';
import { Card } from '@/components/ui/card';
import { CircularProgress } from './CircularProgress';
import { cn } from '@/lib/utils';

interface StressIndicatorProps {
  level: 'low' | 'medium' | 'high';
  percentage: number;
  className?: string;
}

export const StressIndicator: React.FC<StressIndicatorProps> = ({
  level,
  percentage,
  className
}) => {
  const getStressConfig = (level: string) => {
    switch (level) {
      case 'low':
        return {
          color: 'hsl(var(--stress-low))',
          bgColor: 'bg-stress-low/10',
          textColor: 'text-stress-low',
          label: 'Relaxed',
          icon: '😌'
        };
      case 'medium':
        return {
          color: 'hsl(var(--stress-medium))',
          bgColor: 'bg-stress-medium/10',
          textColor: 'text-stress-medium',
          label: 'Moderate',
          icon: '😐'
        };
      case 'high':
        return {
          color: 'hsl(var(--stress-high))',
          bgColor: 'bg-stress-high/10',
          textColor: 'text-stress-high',
          label: 'Elevated',
          icon: '😰'
        };
      default:
        return {
          color: 'hsl(var(--stress-low))',
          bgColor: 'bg-stress-low/10',
          textColor: 'text-stress-low',
          label: 'Unknown',
          icon: '🤔'
        };
    }
  };

  const config = getStressConfig(level);

  return (
    <Card className={cn(
      "relative overflow-hidden bg-gradient-card backdrop-blur-sm border-border/50",
      "hover:shadow-glow transition-smooth",
      className
    )}>
      <div className={cn("absolute inset-0 opacity-20", config.bgColor)} />
      <div className="relative p-6 flex flex-col items-center space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Stress Level
        </h3>
        
        <CircularProgress
          percentage={percentage}
          size={140}
          strokeWidth={12}
          color={config.color}
          backgroundColor="hsl(var(--muted))"
        >
          <div className="text-center">
            <div className="text-3xl mb-1">{config.icon}</div>
            <div className={cn("text-sm font-medium", config.textColor)}>
              {config.label}
            </div>
            <div className="text-xs text-muted-foreground">
              {percentage}%
            </div>
          </div>
        </CircularProgress>
        
        <div className="text-center space-y-1">
          <p className="text-sm text-muted-foreground">
            Based on heart rate variability and blood pressure
          </p>
          {level === 'high' && (
            <p className="text-xs text-health-warning">
              Consider relaxation techniques
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};