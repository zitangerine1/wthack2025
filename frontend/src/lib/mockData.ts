// Mock data utility for Smart Pillow hackathon project
// Provides both sensor data simulation and demo capabilities

// Sensor data types and interfaces
export interface SensorReading {
  temperature: number;
  heartRate: number;
  isHeating: boolean;
  isCooling: boolean;
  timestamp: number;
  humidity: number;
  airQuality: string;
  co2: number;
  pm25: number;
  heatingPower: number;
  coolingPower: number;
  sleepPhase: string;
  breathingRate: number;
  movement: number;
}

export interface HistoricalData {
  timestamp: number;
  deepSleep: number;
  lightSleep: number;
  remSleep: number;
  temperature: number;
  heartRate: number;
  sleepScore: number;
  humidity: number;
  co2Level: number;
}

export interface ActivityLogEntry {
  id: string;
  timestamp: number;
  type:
    | "temperature"
    | "heartRate"
    | "system"
    | "sleep"
    | "user"
    | "success"
    | "warning"
    | "error";
  message: string;
  severity: "info" | "warning" | "error";
  time: string;
}

export interface EnvironmentalCorrelation {
  factor: string;
  correlation: number;
  impact: string;
}

export interface WeeklySleepTrend {
  day: string;
  deepSleep: number;
  lightSleep: number;
  remSleep: number;
  quality: number;
  score: number;
  duration: number;
}

export interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: "good" | "warning" | "error";
}

// Session tracking
const SESSION_START_TIME = Date.now() - 300 * 60 * 60 * 1000; // 8 hours ago (full night's sleep session)

// Sensor data simulation
export function getCurrentReading(): SensorReading {
  const baseTemp = 22 + Math.sin(Date.now() / 60000) * 2;
  const baseHR = 65 + Math.sin(Date.now() / 45000) * 8;

  // Realistic sleep phase based on session duration
  const sessionDurationHours =
    (Date.now() - SESSION_START_TIME) / (1000 * 60 * 60);
  let currentPhase: string;

  if (sessionDurationHours < 0.5) {
    currentPhase = "awake";
  } else if (sessionDurationHours < 1) {
    currentPhase = Math.random() > 0.3 ? "light" : "awake";
  } else if (sessionDurationHours < 3) {
    currentPhase = Math.random() > 0.2 ? "deep" : "light";
  } else if (sessionDurationHours < 5) {
    currentPhase = Math.random() > 0.3 ? "light" : "deep";
  } else if (sessionDurationHours < 7) {
    currentPhase = Math.random() > 0.2 ? "rem" : "light";
  } else {
    currentPhase = Math.random() > 0.4 ? "light" : "rem";
  }

  return {
    temperature: Math.round(baseTemp * 10) / 10,
    heartRate: Math.round(baseHR),
    isHeating: baseTemp < 22.5,
    isCooling: baseTemp > 23.5,
    timestamp: Date.now(),
    humidity: 45 + Math.sin(Date.now() / 80000) * 10,
    airQuality: "Good",
    co2: 420 + Math.sin(Date.now() / 90000) * 30,
    pm25: 8 + Math.random() * 4,
    heatingPower: baseTemp < 22.5 ? 60 + Math.random() * 20 : 0,
    coolingPower: baseTemp > 23.5 ? 50 + Math.random() * 25 : 0,
    sleepPhase: currentPhase,
    breathingRate: 12 + Math.sin(Date.now() / 70000) * 3,
    movement: Math.random() * 20,
  };
}

export function getSessionStartTime(): number {
  return SESSION_START_TIME;
}

export function getHistoricalData(hours: number = 8): HistoricalData[] {
  const data: HistoricalData[] = [];
  const now = Date.now();
  const hourMs = 60 * 60 * 1000;
  const sessionStart = SESSION_START_TIME;
  const sessionDurationHours = (now - sessionStart) / hourMs;

  // Calculate realistic total sleep time based on actual session duration
  const actualSessionMinutes = Math.max(sessionDurationHours * 60, 0);
  const maxSleepMinutes = Math.min(actualSessionMinutes * 0.9, 480); // 90% efficiency, max 8 hours

  // Current cumulative sleep based on session progress
  const targetSessionHours = 8; // 8-hour target session
  const currentProgress = Math.min(
    sessionDurationHours / targetSessionHours,
    1,
  );
  const currentTotalSleep = maxSleepMinutes * Math.max(currentProgress, 0.85); // Ensure substantial sleep time

  // Distribute sleep phases realistically for current total
  // Adjust distribution based on sleep stage (deep sleep occurs more in first half)
  const deepSleepRatio = sessionDurationHours < 4 ? 0.25 : 0.2; // More deep sleep early
  const currentDeepSleep = currentTotalSleep * deepSleepRatio;
  const currentLightSleep = currentTotalSleep * 0.58; // 58% light sleep
  const currentRemSleep = currentTotalSleep * 0.22; // 22% REM sleep

  for (let i = hours - 1; i >= 0; i--) {
    const timestamp = now - i * hourMs;
    const hoursFromStart = (timestamp - sessionStart) / hourMs;

    if (hoursFromStart <= 0) {
      // Before session started - no sleep data
      data.push({
        timestamp,
        deepSleep: 0,
        lightSleep: 0,
        remSleep: 0,
        temperature: 22 + Math.random() * 2,
        heartRate: 60 + Math.random() * 15,
        sleepScore: 0,
        humidity: 45 + Math.random() * 10,
        co2Level: 400 + Math.random() * 50,
      });
    } else if (i === 0) {
      // Most recent data point - use current cumulative totals
      data.push({
        timestamp,
        deepSleep: currentDeepSleep,
        lightSleep: currentLightSleep,
        remSleep: currentRemSleep,
        temperature: 22 + Math.random() * 2,
        heartRate: 60 + Math.random() * 15,
        sleepScore:
          currentTotalSleep > 300
            ? 75 + Math.random() * 20
            : Math.max(currentTotalSleep / 10, 0),
        humidity: 45 + Math.random() * 10,
        co2Level: 400 + Math.random() * 50,
      });
    } else {
      // Historical progression - show cumulative build-up over time
      const timeProgress = Math.max(
        0,
        Math.min((timestamp - sessionStart) / (now - sessionStart), 1),
      );

      data.push({
        timestamp,
        deepSleep: currentDeepSleep * timeProgress,
        lightSleep: currentLightSleep * timeProgress,
        remSleep: currentRemSleep * timeProgress,
        temperature: 22 + Math.random() * 2,
        heartRate: 60 + Math.random() * 15,
        sleepScore:
          timeProgress > 0.3
            ? 75 + Math.random() * 20
            : Math.max(timeProgress * 60, 0),
        humidity: 45 + Math.random() * 10,
        co2Level: 400 + Math.random() * 50,
      });
    }
  }

  return data;
}

// Helper function to format relative time
function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diffMs = now - timestamp;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMs < 60000) {
    // Less than 1 minute
    return "Just now";
  } else if (diffMinutes < 60) {
    // Less than 1 hour
    return `${diffMinutes} min ago`;
  } else if (diffHours < 24) {
    // Less than 1 day
    return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
  } else {
    // 1 day or more
    return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
  }
}

export function getActivityLog(): ActivityLogEntry[] {
  const now = Date.now();
  const activities: ActivityLogEntry[] = [
    {
      id: "1",
      timestamp: now - 120000, // 2 minutes ago
      type: "system",
      message: "Temperature adjusted to optimize sleep quality",
      severity: "info",
      time: formatRelativeTime(now - 120000),
    },
    {
      id: "2",
      timestamp: now - 480000, // 8 minutes ago
      type: "sleep",
      message: "Deep sleep phase detected",
      severity: "info",
      time: formatRelativeTime(now - 480000),
    },
    {
      id: "3",
      timestamp: now - 900000, // 15 minutes ago
      type: "heartRate",
      message: "Heart rate stabilized at 68 BPM",
      severity: "info",
      time: formatRelativeTime(now - 900000),
    },
    {
      id: "4",
      timestamp: now - 1800000, // 30 minutes ago
      type: "temperature",
      message: "Cooling system activated",
      severity: "info",
      time: formatRelativeTime(now - 1800000),
    },
    {
      id: "5",
      timestamp: now - 3600000, // 1 hour ago
      type: "user",
      message: "Sleep session started",
      severity: "info",
      time: formatRelativeTime(now - 3600000),
    },
    {
      id: "6",
      timestamp: SESSION_START_TIME,
      type: "system",
      message: "Smart pillow monitoring session initiated",
      severity: "info",
      time: formatRelativeTime(SESSION_START_TIME),
    },
  ];

  return activities;
}

export function getEnvironmentalCorrelations(): EnvironmentalCorrelation[] & {
  temperatureVsHeartRate: Array<{
    range: string;
    temp: number;
    hr: number;
    avgHeartRate: number;
  }>;
  humidityVsSleepQuality: Array<{
    range: string;
    humidity: number;
    quality: number;
    avgScore: number;
  }>;
} {
  const correlations = [
    {
      factor: "Room Temperature",
      correlation: 0.85,
      impact: "High positive correlation with sleep quality",
    },
    {
      factor: "Humidity Level",
      correlation: 0.62,
      impact: "Moderate impact on comfort",
    },
    {
      factor: "Air Quality (CO2)",
      correlation: -0.78,
      impact: "High negative correlation when elevated",
    },
    {
      factor: "External Noise",
      correlation: -0.45,
      impact: "Moderate disruption to light sleep",
    },
  ];

  return Object.assign(correlations, {
    temperatureVsHeartRate: [
      { range: "20°C", temp: 20, hr: 75, avgHeartRate: 75 },
      { range: "22°C", temp: 22, hr: 68, avgHeartRate: 68 },
      { range: "24°C", temp: 24, hr: 65, avgHeartRate: 65 },
      { range: "26°C", temp: 26, hr: 70, avgHeartRate: 70 },
    ],
    humidityVsSleepQuality: [
      { range: "40%", humidity: 40, quality: 75, avgScore: 75 },
      { range: "50%", humidity: 50, quality: 85, avgScore: 85 },
      { range: "60%", humidity: 60, quality: 80, avgScore: 80 },
      { range: "70%", humidity: 70, quality: 70, avgScore: 70 },
    ],
  });
}

export function getWeeklySleepTrends(): WeeklySleepTrend[] {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Realistic sleep patterns - weekdays vs weekends
  const weekdayPattern = {
    duration: 7.5 + (Math.random() - 0.5) * 0.6, // 7.2-7.8 hours
    deepSleep: 90 + (Math.random() - 0.5) * 20, // 80-100 minutes
    lightSleep: 260 + (Math.random() - 0.5) * 30, // 245-275 minutes
    remSleep: 100 + (Math.random() - 0.5) * 20, // 90-110 minutes
    quality: 82 + (Math.random() - 0.5) * 12, // 76-88
    score: 82 + (Math.random() - 0.5) * 12, // 76-88
  };

  const weekendPattern = {
    duration: 8.2 + (Math.random() - 0.5) * 0.8, // 7.8-8.6 hours
    deepSleep: 100 + (Math.random() - 0.5) * 20, // 90-110 minutes
    lightSleep: 290 + (Math.random() - 0.5) * 40, // 270-310 minutes
    remSleep: 115 + (Math.random() - 0.5) * 20, // 105-125 minutes
    quality: 86 + (Math.random() - 0.5) * 10, // 81-91
    score: 86 + (Math.random() - 0.5) * 10, // 81-91
  };

  return days.map((day, index) => {
    const isWeekend = index >= 5; // Saturday and Sunday
    const pattern = isWeekend ? weekendPattern : weekdayPattern;

    return {
      day,
      deepSleep: Math.round(pattern.deepSleep),
      lightSleep: Math.round(pattern.lightSleep),
      remSleep: Math.round(pattern.remSleep),
      quality: Math.round(pattern.quality),
      score: Math.round(pattern.score),
      duration: Math.round(pattern.duration * 10) / 10,
    };
  });
}

export function getSystemMetrics(): SystemMetric[] & {
  targetAchievementRate: number;
  totalEnergyWeek: number;
  temperatureVsHeartRate: Array<{
    range: string;
    temp: number;
    hr: number;
    avgHeartRate: number;
  }>;
  humidityVsSleepQuality: Array<{
    range: string;
    humidity: number;
    quality: number;
    avgScore: number;
  }>;
} {
  const metrics = [
    {
      name: "CPU Usage",
      value: 12 + Math.random() * 8,
      unit: "%",
      status: "good" as const,
    },
    {
      name: "Memory Usage",
      value: 42 + Math.random() * 12,
      unit: "%",
      status: "good" as const,
    },
    {
      name: "Network Latency",
      value: 8 + Math.random() * 6,
      unit: "ms",
      status: "good" as const,
    },
    {
      name: "Sensor Accuracy",
      value: 97 + Math.random() * 3,
      unit: "%",
      status: "good" as const,
    },
    {
      name: "Battery Level",
      value: 88 + Math.random() * 8,
      unit: "%",
      status: "good" as const,
    },
  ];

  return Object.assign(metrics, {
    targetAchievementRate: 88 + Math.random() * 8,
    totalEnergyWeek: 2.3 + Math.random() * 0.3,
    temperatureVsHeartRate: [
      { range: "20°C", temp: 20, hr: 75, avgHeartRate: 75 },
      { range: "22°C", temp: 22, hr: 68, avgHeartRate: 68 },
      { range: "24°C", temp: 24, hr: 65, avgHeartRate: 65 },
      { range: "26°C", temp: 26, hr: 70, avgHeartRate: 70 },
    ],
    humidityVsSleepQuality: [
      { range: "40%", humidity: 40, quality: 75, avgScore: 75 },
      { range: "50%", humidity: 50, quality: 85, avgScore: 85 },
      { range: "60%", humidity: 60, quality: 80, avgScore: 80 },
      { range: "70%", humidity: 70, quality: 70, avgScore: 70 },
    ],
  });
}

// Demo mode utility for showcasing live data changes during presentation
// This section provides enhanced demo capabilities

export interface DemoScenario {
  name: string;
  description: string;
  duration: number; // in seconds
  events: DemoEvent[];
}

export interface DemoEvent {
  timestamp: number; // seconds from start
  type: "temperature" | "heartRate" | "sleepPhase" | "alert" | "system";
  action: string;
  value?: number | string | boolean;
  message?: string;
}

export class DemoModeController {
  private isActive: boolean = false;
  private startTime: number = 0;
  private currentScenario: DemoScenario | null = null;
  private eventListeners: Array<(event: DemoEvent) => void> = [];
  private intervalId: NodeJS.Timeout | null = null;

  // Pre-defined demo scenarios for different use cases
  private scenarios: DemoScenario[] = [
    {
      name: "Sleep Transition Demo",
      description:
        "Shows user falling asleep with automatic temperature adjustment",
      duration: 120, // 2 minutes
      events: [
        {
          timestamp: 0,
          type: "system",
          action: "start_monitoring",
          message: "Sleep monitoring started - user in bed",
        },
        {
          timestamp: 10,
          type: "heartRate",
          action: "decrease",
          value: 68,
          message: "Heart rate decreasing - relaxation detected",
        },
        {
          timestamp: 25,
          type: "temperature",
          action: "adjust",
          value: 22.5,
          message: "Temperature lowered for sleep onset",
        },
        {
          timestamp: 40,
          type: "sleepPhase",
          action: "change",
          value: "light",
          message: "Entering light sleep phase",
        },
        {
          timestamp: 55,
          type: "heartRate",
          action: "decrease",
          value: 62,
          message: "Heart rate stabilized in sleep range",
        },
        {
          timestamp: 70,
          type: "sleepPhase",
          action: "change",
          value: "deep",
          message: "Deep sleep phase achieved",
        },
        {
          timestamp: 85,
          type: "temperature",
          action: "fine_tune",
          value: 22.2,
          message: "Micro-adjustment for optimal deep sleep",
        },
        {
          timestamp: 110,
          type: "system",
          action: "energy_save",
          message: "Entering energy-efficient monitoring mode",
        },
      ],
    },
    {
      name: "Environmental Response Demo",
      description: "Shows system responding to changing room conditions",
      duration: 90,
      events: [
        {
          timestamp: 0,
          type: "alert",
          action: "co2_rise",
          value: 520,
          message: "CO2 levels rising - poor ventilation detected",
        },
        {
          timestamp: 15,
          type: "system",
          action: "ventilation_adjust",
          message: "Activating smart ventilation response",
        },
        {
          timestamp: 30,
          type: "temperature",
          action: "compensate",
          value: 23.1,
          message: "Temperature slightly increased due to air circulation",
        },
        {
          timestamp: 45,
          type: "system",
          action: "cooling_activate",
          message: "Cooling system activated to maintain target temperature",
        },
        {
          timestamp: 60,
          type: "alert",
          action: "co2_normal",
          value: 450,
          message: "CO2 levels normalized - air quality improved",
        },
        {
          timestamp: 75,
          type: "temperature",
          action: "stabilize",
          value: 22.8,
          message: "Temperature stabilized at optimal level",
        },
      ],
    },
    {
      name: "Health Monitoring Demo",
      description: "Demonstrates health monitoring and response capabilities",
      duration: 100,
      events: [
        {
          timestamp: 0,
          type: "heartRate",
          action: "spike",
          value: 85,
          message: "Elevated heart rate detected - possible stress or dream",
        },
        {
          timestamp: 10,
          type: "system",
          action: "comfort_enhance",
          message: "Enhancing comfort settings to promote relaxation",
        },
        {
          timestamp: 20,
          type: "temperature",
          action: "cool_slightly",
          value: 21.8,
          message: "Slight cooling to help reduce stress response",
        },
        {
          timestamp: 35,
          type: "heartRate",
          action: "normalize",
          value: 72,
          message: "Heart rate returning to normal range",
        },
        {
          timestamp: 50,
          type: "sleepPhase",
          action: "change",
          value: "rem",
          message: "REM sleep phase detected - maintaining stable conditions",
        },
        {
          timestamp: 65,
          type: "heartRate",
          action: "rem_pattern",
          value: 68,
          message: "Heart rate showing healthy REM sleep patterns",
        },
        {
          timestamp: 80,
          type: "system",
          action: "optimize",
          message: "All systems optimized for quality REM sleep",
        },
      ],
    },
  ];

  startDemo(scenarioName: string): boolean {
    const scenario = this.scenarios.find((s) => s.name === scenarioName);
    if (!scenario) {
      console.error(`Demo scenario "${scenarioName}" not found`);
      return false;
    }

    this.currentScenario = scenario;
    this.isActive = true;
    this.startTime = Date.now();

    console.log(`Starting demo: ${scenario.name}`);
    console.log(`Description: ${scenario.description}`);
    console.log(`Duration: ${scenario.duration} seconds`);

    // Start the demo event loop
    this.intervalId = setInterval(() => {
      this.checkEvents();
    }, 1000);

    return true;
  }

  stopDemo(): void {
    this.isActive = false;
    this.currentScenario = null;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    console.log("Demo stopped");
  }

  private checkEvents(): void {
    if (!this.isActive || !this.currentScenario) return;

    const elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);

    // Check if demo should end
    if (elapsedSeconds >= this.currentScenario.duration) {
      this.stopDemo();
      return;
    }

    // Find and trigger events for current timestamp
    const currentEvents = this.currentScenario.events.filter(
      (event) => event.timestamp === elapsedSeconds,
    );

    currentEvents.forEach((event) => {
      this.triggerEvent(event);
    });
  }

  private triggerEvent(event: DemoEvent): void {
    console.log(`Demo Event: ${event.action}`, event);

    // Notify all listeners
    this.eventListeners.forEach((listener) => {
      try {
        listener(event);
      } catch (error) {
        console.error("Error in demo event listener:", error);
      }
    });
  }

  addEventListener(listener: (event: DemoEvent) => void): void {
    this.eventListeners.push(listener);
  }

  removeEventListener(listener: (event: DemoEvent) => void): void {
    const index = this.eventListeners.indexOf(listener);
    if (index > -1) {
      this.eventListeners.splice(index, 1);
    }
  }

  getAvailableScenarios(): DemoScenario[] {
    return this.scenarios.map((scenario) => ({
      ...scenario,
      events: [], // Don't expose implementation details
    }));
  }

  isRunning(): boolean {
    return this.isActive;
  }

  getCurrentScenario(): string | null {
    return this.currentScenario?.name || null;
  }

  getProgress(): number {
    if (!this.isActive || !this.currentScenario) return 0;
    const elapsed = (Date.now() - this.startTime) / 1000;
    return Math.min(elapsed / this.currentScenario.duration, 1);
  }

  // Quick demo functions for manual triggers during presentation
  triggerTemperatureSpike(): void {
    this.triggerEvent({
      timestamp: 0,
      type: "temperature",
      action: "spike",
      value: 25.2,
      message: "Manual demo: Temperature spike triggered",
    });
  }

  triggerHeartRateChange(): void {
    this.triggerEvent({
      timestamp: 0,
      type: "heartRate",
      action: "change",
      value: 78 + Math.random() * 10,
      message: "Manual demo: Heart rate fluctuation",
    });
  }

  triggerCO2Alert(): void {
    this.triggerEvent({
      timestamp: 0,
      type: "alert",
      action: "co2_high",
      value: 580,
      message: "Manual demo: High CO2 levels detected",
    });
  }

  triggerSleepPhaseChange(): void {
    const phases = ["light", "deep", "rem"];
    const randomPhase = phases[Math.floor(Math.random() * phases.length)];
    this.triggerEvent({
      timestamp: 0,
      type: "sleepPhase",
      action: "change",
      value: randomPhase,
      message: `Manual demo: Sleep phase changed to ${randomPhase}`,
    });
  }

  // Presentation helper functions
  showDemoInfo(): void {
    console.log("=== Smart Pillow Demo Mode ===");
    console.log("Available scenarios:");
    this.scenarios.forEach((scenario, index) => {
      console.log(`${index + 1}. ${scenario.name}`);
      console.log(`   ${scenario.description}`);
      console.log(`   Duration: ${scenario.duration}s`);
      console.log("");
    });
    console.log("Manual triggers available:");
    console.log("- triggerTemperatureSpike()");
    console.log("- triggerHeartRateChange()");
    console.log("- triggerCO2Alert()");
    console.log("- triggerSleepPhaseChange()");
  }
}

// Create singleton instance for global access
export const demoController = new DemoModeController();

// Make it available globally for easy access during demos
if (typeof window !== "undefined") {
  (window as unknown as Record<string, unknown>).demoController =
    demoController;
  (window as unknown as Record<string, unknown>).startDemo = (
    scenario: string,
  ) => demoController.startDemo(scenario);
  (window as unknown as Record<string, unknown>).stopDemo = () =>
    demoController.stopDemo();
  (window as unknown as Record<string, unknown>).showDemoInfo = () =>
    demoController.showDemoInfo();

  // Quick access functions
  (window as unknown as Record<string, unknown>).tempSpike = () =>
    demoController.triggerTemperatureSpike();
  (window as unknown as Record<string, unknown>).hrChange = () =>
    demoController.triggerHeartRateChange();
  (window as unknown as Record<string, unknown>).co2Alert = () =>
    demoController.triggerCO2Alert();
  (window as unknown as Record<string, unknown>).sleepChange = () =>
    demoController.triggerSleepPhaseChange();
}

export default demoController;
