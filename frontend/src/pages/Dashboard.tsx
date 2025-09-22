import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Thermometer,
  Heart,
  Droplets,
  Wind,
  Zap,
  Snowflake,
  Flame,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import {
  getCurrentReading,
  getActivityLog,
  getHistoricalData,
  getSessionStartTime,
  type SensorReading,
} from "@/lib/mockData";

export function Dashboard() {
  const [currentData, setCurrentData] =
    useState<SensorReading>(getCurrentReading());
  const [isConnected, setIsConnected] = useState(true);
  const [targetTemp, setTargetTemp] = useState(24);
  const [autoMode, setAutoMode] = useState(true);
  const [activities] = useState(getActivityLog());

  // Calculate sleep duration with improved accuracy
  const calculateSleepDuration = () => {
    const sessionStart = getSessionStartTime();
    const now = Date.now();
    const totalSessionMs = now - sessionStart;
    const totalSessionMinutes = totalSessionMs / (1000 * 60);

    const historicalData = getHistoricalData(5);
    if (historicalData.length === 0 || totalSessionMinutes < 0) {
      return {
        hours: 0,
        minutes: 0,
        totalSleepTime: 0,
        sessionHours: Math.max(0, Math.floor(totalSessionMinutes / 60)),
        sessionMinutes: Math.max(0, Math.round(totalSessionMinutes % 60)),
        sleepEfficiency: 0,
        sessionDurationMs: Math.max(0, totalSessionMs),
      };
    }

    // Get the latest (most recent) data point which contains cumulative sleep time
    const latestData = historicalData[historicalData.length - 1];
    const totalSleepMinutes =
      latestData.deepSleep + latestData.lightSleep + latestData.remSleep;

    const hours = Math.floor(totalSleepMinutes / 60);
    const minutes = Math.round(totalSleepMinutes % 60);

    // Calculate sleep efficiency (time asleep / time in bed)
    const sleepEfficiency =
      totalSessionMinutes > 0
        ? Math.min(
            100,
            Math.round((totalSleepMinutes / totalSessionMinutes) * 100),
          )
        : 0;

    return {
      hours,
      minutes,
      totalSleepTime: totalSleepMinutes,
      sessionHours: Math.floor(totalSessionMinutes / 60),
      sessionMinutes: Math.round(totalSessionMinutes % 60),
      sleepEfficiency,
      sessionDurationMs: totalSessionMs,
    };
  };

  const sleepDuration = calculateSleepDuration();
  const histData = getHistoricalData(5);
  const latestData =
    histData.length > 0
      ? histData[histData.length - 1]
      : {
          deepSleep: 0,
          lightSleep: 0,
          remSleep: 0,
          temperature: 22,
          heartRate: 65,
          sleepScore: 0,
          humidity: 45,
          co2Level: 400,
          timestamp: Date.now(),
        };

  // Simulate live data updates every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentData(getCurrentReading());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Simulate connection after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnected(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  // Enhanced sleep phase determination based on session time
  const getSleepPhaseContext = () => {
    const sessionStart = getSessionStartTime();
    const now = Date.now();
    const sessionHours = (now - sessionStart) / (1000 * 60 * 60);

    // Realistic sleep phase progression
    if (sessionHours < 0.5) {
      return {
        phase: "awake",
        description: "Settling in",
        probability: "high",
      };
    } else if (sessionHours < 1) {
      return {
        phase: "light",
        description: "Sleep onset",
        probability: "moderate",
      };
    } else if (sessionHours < 3) {
      return {
        phase: "deep",
        description: "Deep sleep period",
        probability: "high",
      };
    } else if (sessionHours < 5) {
      return {
        phase: "light",
        description: "Light sleep maintenance",
        probability: "high",
      };
    } else if (sessionHours < 7) {
      return {
        phase: "rem",
        description: "REM sleep period",
        probability: "high",
      };
    } else {
      return {
        phase: "light",
        description: "Morning sleep",
        probability: "moderate",
      };
    }
  };

  const sleepPhaseContext = getSleepPhaseContext();

  const getTemperatureTrend = () => {
    const diff = currentData.temperature - targetTemp;
    if (Math.abs(diff) < 0.3)
      return { icon: Activity, text: "On target", type: "success" };
    if (diff > 0)
      return {
        icon: TrendingUp,
        text: `+${diff.toFixed(1)}°C above`,
        type: "warning",
      };
    return {
      icon: TrendingDown,
      text: `${Math.abs(diff).toFixed(1)}°C below`,
      type: "info",
    };
  };

  const getHeartRateStatus = () => {
    if (currentData.heartRate >= 60 && currentData.heartRate <= 80) {
      return { text: "Normal range", type: "success" };
    } else if (currentData.heartRate > 80) {
      return { text: "Slightly elevated", type: "warning" };
    }
    return { text: "Low resting rate", type: "info" };
  };

  const tempTrend = getTemperatureTrend();
  const hrStatus = getHeartRateStatus();
  const TempIcon = tempTrend.icon;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Monitor and control your smart pillow system
          </p>
        </div>
        <Button
          className="self-start sm:self-auto"
          variant={isConnected ? "secondary" : "default"}
          disabled={isConnected}
        >
          {isConnected ? "Connected to ESP32" : "Connecting..."}
        </Button>
      </div>

      {/* Connection Status Alert */}
      {!isConnected ? (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Establishing connection to ESP32 device...
          </AlertDescription>
        </Alert>
      ) : (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Connected to Smart Pillow ESP32 - Live monitoring active
          </AlertDescription>
        </Alert>
      )}

      {/* Current Status Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">
              {currentData.temperature}°C
            </div>
            <p className="text-xs text-muted-foreground">
              <TempIcon className="inline h-3 w-3" />{" "}
              <span className="hidden sm:inline">{tempTrend.text}</span>
              <span className="sm:hidden">{tempTrend.text.split(" ")[0]}</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">
              {currentData.heartRate} BPM
            </div>
            <p className="text-xs text-muted-foreground">
              <Activity className="inline h-3 w-3" />{" "}
              <span className="hidden sm:inline">{hrStatus.text}</span>
              <span className="sm:hidden">Normal</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Humidity</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">
              {Math.round(currentData.humidity)}%
            </div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3" />{" "}
              <span className="hidden sm:inline">Optimal level</span>
              <span className="sm:hidden">Optimal</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Air Quality</CardTitle>
            <Wind className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">
              {currentData.airQuality}
            </div>
            <p className="text-xs text-muted-foreground">
              CO2: {currentData.co2} ppm
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Climate Control */}
        <Card>
          <CardHeader>
            <CardTitle>Climate Control</CardTitle>
            <CardDescription>
              Adjust heating and cooling settings for optimal comfort
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Target Temperature */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Target Temperature</span>
                <Badge variant="outline">{targetTemp}°C</Badge>
              </div>
              <Slider
                value={[targetTemp]}
                onValueChange={(value) => setTargetTemp(value[0])}
                max={30}
                min={18}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>18°C</span>
                <span>30°C</span>
              </div>
            </div>

            <Separator />

            {/* Heating/Cooling Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">Heating</span>
                  </div>
                  <Switch checked={currentData.isHeating} />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Power</span>
                    <span>{Math.round(currentData.heatingPower)}%</span>
                  </div>
                  <Progress value={currentData.heatingPower} className="h-2" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Snowflake className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Cooling</span>
                  </div>
                  <Switch checked={currentData.isCooling} />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Power</span>
                    <span>{Math.round(currentData.coolingPower)}%</span>
                  </div>
                  <Progress value={currentData.coolingPower} className="h-2" />
                </div>
              </div>
            </div>

            {/* Auto Mode */}
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium">Auto Mode</span>
              </div>
              <Switch checked={autoMode} onCheckedChange={setAutoMode} />
            </div>
          </CardContent>
        </Card>

        {/* Sleep Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Sleep Analytics</CardTitle>
            <CardDescription>
              Real-time monitoring and post-sleep analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Sleep Duration Summary */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Sleep Time</span>
                <Badge variant="secondary" className="text-base px-3 py-1">
                  {sleepDuration.hours}h {sleepDuration.minutes}m
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Session:</span>
                  <span>
                    {sleepDuration.sessionHours}h {sleepDuration.sessionMinutes}
                    m
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Efficiency:</span>
                  <span
                    className={`font-medium ${
                      sleepDuration.sleepEfficiency >= 85
                        ? "text-green-600"
                        : sleepDuration.sleepEfficiency >= 70
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {sleepDuration.sleepEfficiency}%
                  </span>
                </div>
              </div>

              {sleepDuration.totalSleepTime > 0 && (
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <div className="font-medium text-blue-700">Deep</div>
                    <div className="text-blue-600">
                      {Math.round(latestData.deepSleep)}m
                    </div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="font-medium text-green-700">Light</div>
                    <div className="text-green-600">
                      {Math.round(latestData.lightSleep)}m
                    </div>
                  </div>
                  <div className="text-center p-2 bg-purple-50 rounded">
                    <div className="font-medium text-purple-700">REM</div>
                    <div className="text-purple-600">
                      {Math.round(latestData.remSleep)}m
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Current Sleep State */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Current State</span>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      sleepPhaseContext.phase === "awake"
                        ? "default"
                        : sleepPhaseContext.phase === "deep"
                          ? "destructive"
                          : sleepPhaseContext.phase === "rem"
                            ? "outline"
                            : "secondary"
                    }
                  >
                    {sleepPhaseContext.phase.charAt(0).toUpperCase() +
                      sleepPhaseContext.phase.slice(1)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    ({sleepPhaseContext.description})
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Heart Rate Variability</span>
                  <span className="font-medium">
                    {currentData.heartRate >= 60 && currentData.heartRate <= 80
                      ? "Normal"
                      : "Variable"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Breathing Rate</span>
                  <span className="font-medium">
                    {Math.round(currentData.breathingRate)} rpm
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Movement</span>
                  <span className="font-medium">
                    {currentData.movement < 5
                      ? "Minimal"
                      : currentData.movement < 15
                        ? "Moderate"
                        : "Active"}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Environmental Factors */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Environmental Factors</h4>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Temp</div>
                  <div className="text-sm font-medium">
                    {currentData.temperature}°C
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Humidity</div>
                  <div className="text-sm font-medium">
                    {Math.round(currentData.humidity)}%
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Air</div>
                  <div className="text-sm font-medium">
                    {currentData.airQuality}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">PM2.5</div>
                  <div className="text-sm font-medium">
                    {Math.round(currentData.pm25)} μg/m³
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Sleep Score */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Current Session Score
                </span>
                <Badge variant="secondary">
                  {sleepDuration.totalSleepTime === 0
                    ? "—"
                    : Math.round(
                        Math.min(100, 60 + sleepDuration.sleepEfficiency * 0.4),
                      )}
                  /100
                </Badge>
              </div>
              <Progress
                value={
                  sleepDuration.totalSleepTime === 0
                    ? 0
                    : Math.min(100, 60 + sleepDuration.sleepEfficiency * 0.4)
                }
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                {sleepDuration.totalSleepTime === 0
                  ? `Session active for ${sleepDuration.sessionHours}h ${sleepDuration.sessionMinutes}m`
                  : `${sleepPhaseContext.phase} sleep phase - ${sleepDuration.sleepEfficiency}% efficiency`}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest system events and adjustments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center space-x-3 text-sm"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === "success"
                      ? "bg-green-500"
                      : activity.type === "warning"
                        ? "bg-orange-500"
                        : activity.type === "error"
                          ? "bg-red-500"
                          : "bg-blue-500"
                  }`}
                ></div>
                <span className="text-muted-foreground">{activity.time}</span>
                <span>{activity.message}</span>
              </div>
            ))}
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-muted-foreground">
                {formatTime(currentData.timestamp)}
              </span>
              <span>Live monitoring active - all systems normal</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
