import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface VitalCardProps {
  title: string;
  value: string | number;
  unit: string;
  status: 'excellent' | 'good' | 'warning' | 'danger';
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  className?: string;
}

export const VitalCard: React.FC<VitalCardProps> = ({
  title,
  value,
  unit,
  status,
  icon,
  trend,
  className
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-health-excellent';
      case 'good': return 'text-health-good';
      case 'warning': return 'text-health-warning';
      case 'danger': return 'text-health-danger';
      default: return 'text-foreground';
    }
  };

  const getTrendIcon = (trend?: string) => {
    if (!trend) return null;
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      case 'stable': return '→';
      default: return null;
    }
  };

  return (
    <Card className={cn(
      "relative overflow-hidden bg-gradient-card backdrop-blur-sm border-border/50",
      "hover:shadow-vital transition-smooth hover:scale-105",
      className
    )}>
      <div className="absolute inset-0 bg-gradient-vital opacity-50" />
      <div className="relative p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={cn("text-lg", getStatusColor(status))}>
              {icon}
            </div>
            <span className="text-sm text-muted-foreground font-medium">
              {title}
            </span>
          </div>
          {trend && (
            <span className={cn("text-sm", getStatusColor(status))}>
              {getTrendIcon(trend)}
            </span>
          )}
        </div>
        
        <div className="space-y-1">
          <div className="flex items-baseline space-x-1">
            <span className={cn("text-2xl font-bold", getStatusColor(status))}>
              {value}
            </span>
            <span className="text-sm text-muted-foreground">
              {unit}
            </span>
          </div>
          
          <div className={cn(
            "h-1 rounded-full overflow-hidden bg-secondary",
          )}>
            <div 
              className={cn(
                "h-full transition-smooth rounded-full",
                status === 'excellent' && "bg-health-excellent",
                status === 'good' && "bg-health-good", 
                status === 'warning' && "bg-health-warning",
                status === 'danger' && "bg-health-danger"
              )}
              style={{ 
                width: status === 'excellent' ? '100%' : 
                       status === 'good' ? '75%' : 
                       status === 'warning' ? '50%' : '25%' 
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};