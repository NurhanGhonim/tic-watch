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
    <div className="space-y-6">
      {/* Colorful Monthly Header */}
      <Card className={cn(
        "relative overflow-hidden bg-gradient-monthly backdrop-blur-sm border-border/50",
        "shadow-glow hover:shadow-vital transition-smooth",
        className
      )}>
        <div className="absolute inset-0 bg-gradient-rainbow opacity-15" />
        <div className="relative p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-health flex items-center justify-center shadow-glow">
              <span className="text-3xl">📊</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                Monthly Health Report
              </h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive analysis • {getCurrentMonth()}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary">
              {getCurrentMonth()}
            </div>
            <div className="text-xs text-muted-foreground">
              Full Month Analysis
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-analysis-purple/10 to-analysis-blue/10 border border-analysis-purple/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-analysis-purple/20 data-[state=active]:text-analysis-purple">📈 Overview</TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-analysis-blue/20 data-[state=active]:text-analysis-blue">📊 Trends</TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-analysis-green/20 data-[state=active]:text-analysis-green">💡 Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Vibrant Monthly Summary Cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-analysis-purple/20 to-analysis-blue/20 border border-analysis-purple/30 shadow-vital">
                <div className="absolute top-3 right-3 text-3xl opacity-60">💓</div>
                <div className="absolute inset-0 bg-gradient-to-br from-analysis-purple/5 to-transparent" />
                <div className="relative text-center space-y-3">
                  <div className="text-4xl font-bold text-analysis-purple">
                    {monthlyData.summary.averageHeartRate}
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    Average Heart Rate
                  </div>
                  <div className="text-xs text-health-good font-medium">
                    ✓ Within normal range
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-analysis-orange/20 to-analysis-red/20 border border-analysis-orange/30 shadow-vital">
                <div className="absolute top-3 right-3 text-3xl opacity-60">🔥</div>
                <div className="absolute inset-0 bg-gradient-to-br from-analysis-orange/5 to-transparent" />
                <div className="relative text-center space-y-3">
                  <div className="text-4xl font-bold text-analysis-orange">
                    {monthlyData.summary.totalStressEpisodes}
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    Total Stress Episodes
                  </div>
                  <div className="text-xs text-health-warning font-medium">
                    ⚠ Monitor triggers
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-analysis-cyan/20 to-analysis-green/20 border border-analysis-cyan/30 shadow-vital col-span-2">
                <div className="absolute top-3 right-3 text-4xl opacity-60">🎯</div>
                <div className="absolute inset-0 bg-gradient-to-br from-analysis-cyan/5 to-transparent" />
                <div className="relative text-center space-y-4">
                  <div className="text-5xl font-bold text-analysis-cyan">
                    {monthlyData.summary.averageTicFrequency}
                  </div>
                  <div className="text-base font-medium text-foreground">
                    Average Tics per Day
                  </div>
                  <div className="text-sm text-health-good font-medium">
                    ✅ Consistent with baseline patterns
                  </div>
                </div>
              </div>
            </div>

            {/* Colorful Weekly Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-rainbow flex items-center justify-center">
                  <span className="text-white font-bold">📅</span>
                </div>
                <h4 className="text-lg font-bold text-foreground">Weekly Breakdown</h4>
              </div>
              <div className="grid gap-4">
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

                  
                  const weekColors = [
                    'from-analysis-purple/20 to-analysis-blue/20 border-analysis-purple/30',
                    'from-analysis-blue/20 to-analysis-cyan/20 border-analysis-blue/30', 
                    'from-analysis-cyan/20 to-analysis-green/20 border-analysis-cyan/30',
                    'from-analysis-green/20 to-analysis-yellow/20 border-analysis-green/30'
                  ];
                  const weekIcons = ['🌟', '💫', '✨', '⭐'];

                  return (
                    <div 
                      key={index}
                      className={cn(
                        "relative overflow-hidden p-5 rounded-xl border transition-smooth hover:scale-105",
                        `bg-gradient-to-br ${weekColors[index]}`
                      )}
                    >
                      <div className="absolute top-3 right-3 text-2xl opacity-50">{weekIcons[index]}</div>
                      <div className="relative flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-sm font-bold">W{index + 1}</span>
                          </div>
                          <span className="font-medium text-foreground">Week {index + 1}</span>
                        </div>
                        <span className="text-sm text-muted-foreground font-medium">
                          {new Date(week.weekStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(week.weekEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <div className="relative grid grid-cols-3 gap-4">
                        <div className="text-center p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                          <div className="text-lg font-bold text-vitals-heart">{weekAvg.heartRate}</div>
                          <div className="text-xs text-muted-foreground">Avg BPM</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                          <div className="text-lg font-bold text-vitals-temperature">{weekAvg.stressEpisodes}</div>
                          <div className="text-xs text-muted-foreground">Stress Episodes</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                          <div className="text-lg font-bold text-vitals-pressure">{weekAvg.ticFrequency}</div>
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

        <div className="flex space-x-3">
          <Button variant="outline" size="sm" className="flex-1 border-analysis-purple/30 hover:bg-analysis-purple/10">
            <span className="mr-2">📥</span>
            Download PDF
          </Button>
          <Button variant="default" size="sm" className="flex-1 bg-gradient-health border-0">
            <span className="mr-2">👨‍⚕️</span>
            Share with Doctor
          </Button>
        </div>
        </div>
      </Card>
    </div>
  );
};