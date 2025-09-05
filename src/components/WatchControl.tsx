import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WatchControlProps {
  className?: string;
}

export const WatchControl: React.FC<WatchControlProps> = ({ className }) => {
  const [isWatchOpen, setIsWatchOpen] = useState(true);
  const [autoMode, setAutoMode] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(85);

  useEffect(() => {
    // Simulate auto open/close based on stress levels or time
    if (autoMode) {
      const interval = setInterval(() => {
        const shouldOpen = Math.random() > 0.7; // 30% chance to auto-toggle
        if (shouldOpen !== isWatchOpen) {
          setIsWatchOpen(shouldOpen);
        }
      }, 10000); // Check every 10 seconds

      return () => clearInterval(interval);
    }
  }, [autoMode, isWatchOpen]);

  useEffect(() => {
    // Simulate battery drain
    const interval = setInterval(() => {
      setBatteryLevel(prev => Math.max(0, prev - 0.1));
    }, 30000); // Drain 0.1% every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const toggleWatch = () => {
    setIsWatchOpen(!isWatchOpen);
  };

  const toggleAutoMode = () => {
    setAutoMode(!autoMode);
  };

  return (
    <Card className={cn(
      "relative overflow-hidden bg-gradient-card backdrop-blur-sm border-border/50",
      className
    )}>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Watch Control
          </h3>
          <div className="flex items-center space-x-2">
            <div className="text-xs text-muted-foreground">
              Battery: {batteryLevel.toFixed(1)}%
            </div>
            <div className={cn(
              "w-6 h-3 border rounded-sm relative",
              batteryLevel > 20 ? "border-health-good" : "border-health-danger"
            )}>
              <div 
                className={cn(
                  "h-full rounded-sm transition-smooth",
                  batteryLevel > 20 ? "bg-health-good" : "bg-health-danger"
                )}
                style={{ width: `${batteryLevel}%` }}
              />
              <div className={cn(
                "absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-1 rounded-r",
                batteryLevel > 20 ? "bg-health-good" : "bg-health-danger"
              )} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Watch Status Indicator */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
            <div className="flex items-center space-x-3">
              <div className={cn(
                "w-4 h-4 rounded-full transition-smooth",
                isWatchOpen ? "bg-health-good animate-pulse" : "bg-muted"
              )} />
              <span className="font-medium">
                Watch Status: {isWatchOpen ? 'Open' : 'Closed'}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleWatch}
              disabled={autoMode}
              className="min-w-[80px]"
            >
              {isWatchOpen ? 'Close' : 'Open'}
            </Button>
          </div>

          {/* Auto Mode Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
            <div className="space-y-1">
              <div className="font-medium">Auto Mode</div>
              <div className="text-xs text-muted-foreground">
                Automatically adjusts based on health data
              </div>
            </div>
            <Button
              variant={autoMode ? "default" : "outline"}
              size="sm"
              onClick={toggleAutoMode}
              className="min-w-[80px]"
            >
              {autoMode ? 'Enabled' : 'Disabled'}
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-12 flex flex-col items-center justify-center space-y-1"
              onClick={() => {
                // Simulate sync process
                const originalText = document.querySelector('[data-sync-btn] span:last-child')?.textContent;
                const syncBtn = document.querySelector('[data-sync-btn] span:last-child');
                if (syncBtn) {
                  syncBtn.textContent = 'Syncing...';
                  setTimeout(() => {
                    syncBtn.textContent = 'Synced!';
                    setTimeout(() => {
                      syncBtn.textContent = 'Sync';
                    }, 1500);
                  }, 2000);
                }
              }}
              data-sync-btn
            >
              <span className="text-lg">🔄</span>
              <span className="text-xs">Sync</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-12 flex flex-col items-center justify-center space-y-1"
              onClick={() => {
                alert('Settings:\n\n• Monitoring Interval: 3 seconds\n• Auto-close sensitivity: Medium\n• Heart rate alerts: Enabled\n• Stress notifications: On\n• Data backup: Cloud enabled');
              }}
            >
              <span className="text-lg">⚙️</span>
              <span className="text-xs">Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};