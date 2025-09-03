import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateMonthlyAnalysis } from '@/data/healthData';
import { cn } from '@/lib/utils';

interface MonthlyReportProps {
  className?: string;
}

export const MonthlyReport: React.FC<MonthlyReportProps> = ({ className }) => {
  const monthlyData = generateMonthlyAnalysis();

  const getCurrentMonth = () => {
    return new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getImprovementIcon = (area: string) => {
    switch (area.toLowerCase()) {
      case 'stress management techniques': return '🧘';
      case 'regular exercise routine': return '💪';
      case 'sleep hygiene optimization': return '💤';
      default: return '📋';
    }
  };

  return (
    <Card className={cn(
      "relative overflow-hidden bg-gradient-card backdrop-blur-sm border-border/50",
      className
    )}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">
            Monthly Report
          </h3>
          <div className="text-sm text-muted-foreground">
            {getCurrentMonth()}
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Monthly Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gradient-health/10 border border-primary/20">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">
                    {monthlyData.summary.averageHeartRate}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Average Heart Rate
                  </div>
                  <div className="text-xs text-health-good">
                    Within normal range
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gradient-warning/10 border border-health-warning/20">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-health-warning">
                    {monthlyData.summary.totalStressEpisodes}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Stress Episodes
                  </div>
                  <div className="text-xs text-health-warning">
                    Monitor triggers
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 col-span-2">
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-primary">
                    {monthlyData.summary.averageTicFrequency}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Average Tics per Day
                  </div>
                  <div className="text-xs text-health-good">
                    Consistent with baseline
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Breakdown */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Weekly Breakdown</h4>
              <div className="space-y-2">
                {monthlyData.weeks.map((week, index) => {
                  const weekAvg = {
                    heartRate: Math.round(
                      week.dailyData.reduce((sum, day) => sum + day.averageHeartRate, 0) / week.dailyData.length
                    ),
                    stressEpisodes: week.dailyData.reduce((sum, day) => sum + day.stressEpisodes, 0),
                    ticFrequency: Math.round(
                      week.dailyData.reduce((sum, day) => sum + day.ticFrequency, 0) / week.dailyData.length
                    )
                  };

                  return (
                    <div 
                      key={index}
                      className="p-4 rounded-lg bg-secondary/30 border border-border/30"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Week {index + 1}</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(week.weekStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(week.weekEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-medium text-vitals-heart">{weekAvg.heartRate}</div>
                          <div className="text-xs text-muted-foreground">Avg BPM</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-vitals-temperature">{weekAvg.stressEpisodes}</div>
                          <div className="text-xs text-muted-foreground">Stress Episodes</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-vitals-pressure">{weekAvg.ticFrequency}</div>
                          <div className="text-xs text-muted-foreground">Avg Tics</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <div className="text-center py-8 text-muted-foreground">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-lg font-medium mb-2">Trend Analysis</p>
              <p className="text-sm">
                Based on 4 weeks of continuous monitoring
              </p>
            </div>

            {/* Simple trend visualization with text */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-health-excellent/10 border border-health-excellent/20">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📈</span>
                  <div>
                    <div className="font-medium text-health-excellent">Overall Health Improving</div>
                    <div className="text-sm text-muted-foreground">
                      Heart rate variability shows positive trends
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-health-warning/10 border border-health-warning/20">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <div className="font-medium text-health-warning">Stress Management Needed</div>
                    <div className="text-sm text-muted-foreground">
                      Elevated stress episodes in week 2 and 3
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-health-good/10 border border-health-good/20">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <div className="font-medium text-health-good">Tic Management Stable</div>
                    <div className="text-sm text-muted-foreground">
                      Frequency remains within expected range
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Improvement Areas</h4>
              
              <div className="space-y-3">
                {monthlyData.summary.improvementAreas.map((area, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-3 p-4 rounded-lg bg-primary/5 border border-primary/10"
                  >
                    <span className="text-2xl mt-1">{getImprovementIcon(area)}</span>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{area}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {area === 'Stress management techniques' && 'Consider meditation, breathing exercises, or yoga'}
                        {area === 'Regular exercise routine' && 'Low-impact activities like walking or swimming'}
                        {area === 'Sleep hygiene optimization' && 'Maintain consistent sleep schedule and bedroom environment'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-lg bg-gradient-health/10 border border-primary/20">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <div className="font-medium text-primary">Great Progress!</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Your consistent monitoring is providing valuable insights for managing your Tourette syndrome. 
                      Keep up the excellent work with daily tracking.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            Download PDF
          </Button>
          <Button variant="default" size="sm" className="flex-1">
            Share with Doctor
          </Button>
        </div>
      </div>
    </Card>
  );
};