import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VitalCard } from '@/components/VitalCard';
import { CircularProgress } from '@/components/CircularProgress';
import { StressIndicator } from '@/components/StressIndicator';
import { WatchControl } from '@/components/WatchControl';
import { DailyAnalysis } from '@/components/DailyAnalysis';
import { WeeklyTrends } from '@/components/WeeklyTrends';
import { MonthlyReport } from '@/components/MonthlyReport';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  generateVitalSigns, 
  generateDailyAnalysis, 
  generateWeeklyAnalysis,
  VitalSigns 
} from '@/data/healthData';

const Index = () => {
  const [vitals, setVitals] = useState<VitalSigns>(generateVitalSigns());
  const [isMonitoring, setIsMonitoring] = useState(true);

  // Generate sample data
  const dailyData = Array.from({ length: 7 }, (_, i) => generateDailyAnalysis(i));
  const weeklyData = generateWeeklyAnalysis();

  // Real-time vital updates
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      setVitals(generateVitalSigns());
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [isMonitoring]);

  // Calculate stress percentage based on vitals
  const calculateStressPercentage = (vitals: VitalSigns) => {
    let stress = 0;
    
    // Heart rate factor (60-100 is normal)
    if (vitals.heartRate > 100) stress += 40;
    else if (vitals.heartRate > 90) stress += 20;
    else if (vitals.heartRate < 60) stress += 15;
    
    // Blood pressure factor
    if (vitals.bloodPressureSystolic > 140) stress += 35;
    else if (vitals.bloodPressureSystolic > 130) stress += 20;
    
    // Temperature factor
    if (vitals.temperature > 38) stress += 25;
    else if (vitals.temperature > 37.5) stress += 15;
    
    return Math.min(100, stress);
  };

  const stressPercentage = calculateStressPercentage(vitals);

  const getVitalStatus = (type: string, value: number): 'excellent' | 'good' | 'warning' | 'danger' => {
    switch (type) {
      case 'heartRate':
        if (value >= 60 && value <= 80) return 'excellent';
        if (value >= 50 && value <= 100) return 'good';
        if (value >= 40 && value <= 120) return 'warning';
        return 'danger';
      
      case 'temperature':
        if (value >= 36.5 && value <= 37.2) return 'excellent';
        if (value >= 36 && value <= 37.5) return 'good';
        if (value >= 35.5 && value <= 38) return 'warning';
        return 'danger';
      
      case 'pressure':
        if (value <= 120) return 'excellent';
        if (value <= 130) return 'good';
        if (value <= 140) return 'warning';
        return 'danger';
      
      default:
        return 'good';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-health flex items-center justify-center">
                <span className="text-white font-bold text-sm">TS</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Tourette Monitor</h1>
                <p className="text-sm text-muted-foreground">Smart Health Tracking</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-health-excellent animate-pulse' : 'bg-muted'}`} />
              <span className="text-sm text-muted-foreground">
                {isMonitoring ? 'Live Monitoring' : 'Paused'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Real-time Vitals */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <VitalCard
                title="Heart Rate"
                value={vitals.heartRate}
                unit="BPM"
                status={getVitalStatus('heartRate', vitals.heartRate)}
                icon="❤️"
                trend={vitals.heartRate > 90 ? 'up' : vitals.heartRate < 70 ? 'down' : 'stable'}
              />
              
              <VitalCard
                title="Temperature"
                value={vitals.temperature}
                unit="°C"
                status={getVitalStatus('temperature', vitals.temperature)}
                icon="🌡️"
                trend={vitals.temperature > 37.5 ? 'up' : vitals.temperature < 36.5 ? 'down' : 'stable'}
              />
              
              <VitalCard
                title="Blood Pressure"
                value={`${vitals.bloodPressureSystolic}/${vitals.bloodPressureDiastolic}`}
                unit="mmHg"
                status={getVitalStatus('pressure', vitals.bloodPressureSystolic)}
                icon="💓"
                trend={vitals.bloodPressureSystolic > 130 ? 'up' : vitals.bloodPressureSystolic < 110 ? 'down' : 'stable'}
              />
              
              <div className="md:col-span-2 lg:col-span-1">
                <VitalCard
                  title="Last Updated"
                  value={vitals.timestamp.toLocaleTimeString()}
                  unit=""
                  status="good"
                  icon="🕐"
                  className="h-full"
                />
              </div>
            </div>

            {/* Stress Indicator and Watch Control */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StressIndicator
                level={vitals.stressLevel}
                percentage={stressPercentage}
              />
              
              <WatchControl />
            </div>

            {/* Current Status Summary */}
            <div className="p-6 rounded-xl bg-gradient-card border border-border/50">
              <h3 className="text-lg font-semibold mb-4">Current Health Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-secondary/30">
                  <div className="text-2xl mb-2">
                    {vitals.stressLevel === 'low' ? '😌' : vitals.stressLevel === 'medium' ? '😐' : '😰'}
                  </div>
                  <div className="font-medium">Overall Status</div>
                  <div className="text-sm text-muted-foreground capitalize">
                    {vitals.stressLevel} stress level
                  </div>
                </div>
                
                <div className="text-center p-4 rounded-lg bg-secondary/30">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="font-medium">Monitoring</div>
                  <div className="text-sm text-muted-foreground">
                    Real-time tracking active
                  </div>
                </div>
                
                <div className="text-center p-4 rounded-lg bg-secondary/30">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="font-medium">Recommendations</div>
                  <div className="text-sm text-muted-foreground">
                    {vitals.stressLevel === 'high' ? 'Take deep breaths' : 'Keep up the good work'}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Daily Analysis Tab */}
          <TabsContent value="daily">
            <DailyAnalysis data={dailyData} />
          </TabsContent>

          {/* Weekly Trends Tab */}
          <TabsContent value="weekly">
            <WeeklyTrends data={weeklyData} />
          </TabsContent>

          {/* Monthly Report Tab */}
          <TabsContent value="monthly">
            <MonthlyReport />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
