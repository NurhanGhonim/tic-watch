// Simulated real-time health data for Tourette syndrome monitoring
export interface VitalSigns {
  heartRate: number;
  temperature: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  stressLevel: 'low' | 'medium' | 'high';
  timestamp: Date;
}

export interface DailyAnalysis {
  date: string;
  averageHeartRate: number;
  averageTemperature: number;
  averagePressure: { systolic: number; diastolic: number };
  stressEpisodes: number;
  overallStatus: 'excellent' | 'good' | 'warning' | 'danger';
  ticFrequency: number;
}

export interface WeeklyAnalysis {
  weekStart: string;
  weekEnd: string;
  dailyData: DailyAnalysis[];
  trends: {
    heartRateTrend: 'improving' | 'stable' | 'declining';
    stressTrend: 'improving' | 'stable' | 'declining';
    ticTrend: 'improving' | 'stable' | 'declining';
  };
  recommendations: string[];
}

// Generate realistic vital signs with some variation for Tourette patients
export const generateVitalSigns = (): VitalSigns => {
  const baseHeartRate = 75;
  const heartRateVariation = Math.random() * 30 - 15; // ±15 bpm variation
  const heartRate = Math.max(60, Math.min(120, baseHeartRate + heartRateVariation));

  const baseTemp = 98.6;
  const tempVariation = Math.random() * 2 - 1; // ±1°F variation
  const temperature = baseTemp + tempVariation;

  const baseSystolic = 120;
  const baseDiastolic = 80;
  const pressureVariation = Math.random() * 20 - 10;
  
  const systolic = Math.max(90, Math.min(160, baseSystolic + pressureVariation));
  const diastolic = Math.max(60, Math.min(100, baseDiastolic + pressureVariation/2));

  // Stress level based on heart rate and pressure
  let stressLevel: 'low' | 'medium' | 'high' = 'low';
  if (heartRate > 100 || systolic > 140) {
    stressLevel = 'high';
  } else if (heartRate > 85 || systolic > 130) {
    stressLevel = 'medium';
  }

  return {
    heartRate: Math.round(heartRate),
    temperature: Math.round(temperature * 10) / 10,
    bloodPressureSystolic: Math.round(systolic),
    bloodPressureDiastolic: Math.round(diastolic),
    stressLevel,
    timestamp: new Date()
  };
};

// Generate sample daily data for the last 7 days
export const generateDailyAnalysis = (daysAgo: number): DailyAnalysis => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  
  const baseHeartRate = 75 + Math.random() * 10 - 5;
  const baseTemp = 98.6 + Math.random() * 1 - 0.5;
  const baseSystolic = 120 + Math.random() * 15 - 7.5;
  const baseDiastolic = 80 + Math.random() * 10 - 5;
  
  const stressEpisodes = Math.floor(Math.random() * 5);
  const ticFrequency = Math.floor(Math.random() * 15 + 5);
  
  let overallStatus: 'excellent' | 'good' | 'warning' | 'danger' = 'excellent';
  if (stressEpisodes > 3 || ticFrequency > 15) {
    overallStatus = 'danger';
  } else if (stressEpisodes > 2 || ticFrequency > 12) {
    overallStatus = 'warning';
  } else if (stressEpisodes > 1 || ticFrequency > 8) {
    overallStatus = 'good';
  }
  
  return {
    date: date.toISOString().split('T')[0],
    averageHeartRate: Math.round(baseHeartRate),
    averageTemperature: Math.round(baseTemp * 10) / 10,
    averagePressure: {
      systolic: Math.round(baseSystolic),
      diastolic: Math.round(baseDiastolic)
    },
    stressEpisodes,
    overallStatus,
    ticFrequency
  };
};

// Generate weekly analysis
export const generateWeeklyAnalysis = (): WeeklyAnalysis => {
  const dailyData = Array.from({ length: 7 }, (_, i) => generateDailyAnalysis(i));
  
  const weekStart = dailyData[6].date;
  const weekEnd = dailyData[0].date;
  
  // Calculate trends
  const heartRates = dailyData.map(d => d.averageHeartRate);
  const stressEpisodes = dailyData.map(d => d.stressEpisodes);
  const ticFrequencies = dailyData.map(d => d.ticFrequency);
  
  const heartRateTrend = heartRates[0] < heartRates[6] ? 'improving' : 
                        heartRates[0] > heartRates[6] ? 'declining' : 'stable';
  
  const stressTrend = stressEpisodes[0] < stressEpisodes[6] ? 'improving' : 
                     stressEpisodes[0] > stressEpisodes[6] ? 'declining' : 'stable';
  
  const ticTrend = ticFrequencies[0] < ticFrequencies[6] ? 'improving' : 
                  ticFrequencies[0] > ticFrequencies[6] ? 'declining' : 'stable';
  
  const recommendations = [
    "Consider meditation during high-stress periods",
    "Maintain regular sleep schedule",
    "Monitor triggers during high tic frequency days"
  ];
  
  return {
    weekStart,
    weekEnd,
    dailyData,
    trends: { heartRateTrend, stressTrend, ticTrend },
    recommendations
  };
};

// Generate monthly summary
export const generateMonthlyAnalysis = () => {
  const weeks = Array.from({ length: 4 }, () => generateWeeklyAnalysis());
  
  const allDailyData = weeks.flatMap(w => w.dailyData);
  const avgHeartRate = allDailyData.reduce((sum, d) => sum + d.averageHeartRate, 0) / allDailyData.length;
  const totalStressEpisodes = allDailyData.reduce((sum, d) => sum + d.stressEpisodes, 0);
  const avgTicFrequency = allDailyData.reduce((sum, d) => sum + d.ticFrequency, 0) / allDailyData.length;
  
  return {
    weeks,
    summary: {
      averageHeartRate: Math.round(avgHeartRate),
      totalStressEpisodes,
      averageTicFrequency: Math.round(avgTicFrequency),
      improvementAreas: [
        "Stress management techniques",
        "Regular exercise routine",
        "Sleep hygiene optimization"
      ]
    }
  };
};