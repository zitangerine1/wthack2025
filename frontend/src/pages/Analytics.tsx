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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Thermometer,
  Moon,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Activity,
  Clock,
  Zap,
  Droplets,
  Wind,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  getHistoricalData,
  getEnvironmentalCorrelations,
  getWeeklySleepTrends,
  getSystemMetrics,
  getCurrentReading,
  type HistoricalData,
} from "@/lib/mockData";

export function Analytics() {
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const weeklyTrends = getWeeklySleepTrends();
  const systemMetrics = getSystemMetrics();
  const correlations = getEnvironmentalCorrelations();
  const [currentReading, setCurrentReading] = useState(getCurrentReading());

  useEffect(() => {
    // Load historical data
    setHistoricalData(getHistoricalData(24)); // 24 hours of data for better charts

    // Update current reading every 5 seconds
    const interval = setInterval(() => {
      setCurrentReading(getCurrentReading());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Calculate aggregated metrics from historical data
  const avgSleepScore =
    historicalData.length > 0
      ? Math.round(
          historicalData
            .filter((d) => d.sleepScore > 0)
            .reduce((sum, d) => sum + d.sleepScore, 0) /
            Math.max(historicalData.filter((d) => d.sleepScore > 0).length, 1),
        )
      : 85;

  const totalSleepTime =
    historicalData.length > 0
      ? (() => {
          const latestData = historicalData[historicalData.length - 1];
          return (
            latestData.deepSleep + latestData.lightSleep + latestData.remSleep
          );
        })()
      : 0; // Use latest cumulative data, not sum

  const avgHeartRate =
    historicalData.length > 0
      ? Math.round(
          historicalData.reduce((sum, d) => sum + d.heartRate, 0) /
            historicalData.length,
        )
      : 65;

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };

  const getLastWeekData = () => {
    const now = new Date();
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayName = date.toLocaleDateString("en", { weekday: "long" });
      const trend = weeklyTrends.find((t) => t.day === dayName);
      days.push({
        day: dayName.substring(0, 3),
        score: trend ? Math.round(trend.score) : 78 + Math.random() * 15,
        duration: trend ? trend.duration : 7.5 + Math.random() * 1.0,
      });
    }
    return days;
  };

  const lastWeekData = getLastWeekData();

  // Prepare chart data
  const sleepTrendChartData = historicalData.map((point) => ({
    time: new Date(point.timestamp).toLocaleTimeString("en", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    sleepScore: point.sleepScore,
    temperature: point.temperature,
    heartRate: point.heartRate,
  }));

  const temperatureChartData = historicalData.map((point) => ({
    time: new Date(point.timestamp).toLocaleTimeString("en", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    temperature: point.temperature,
    target: 23.0,
    efficiency: Math.abs(point.temperature - 23.0) < 0.5 ? 100 : 75,
  }));

  const heartRateChartData = historicalData.map((point) => ({
    time: new Date(point.timestamp).toLocaleTimeString("en", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    heartRate: point.heartRate,
    restingRange: 65,
  }));

  const environmentalChartData = historicalData.map((point) => ({
    time: new Date(point.timestamp).toLocaleTimeString("en", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    humidity: point.humidity,
    co2: point.co2Level,
    airQualityIndex: 85 + Math.random() * 10,
  }));

  const sleepPhasesData = (() => {
    if (historicalData.length === 0 || totalSleepTime === 0) {
      return [
        { name: "Deep Sleep", value: 0, color: "#3B82F6" },
        { name: "Light Sleep", value: 0, color: "#60A5FA" },
        { name: "REM Sleep", value: 0, color: "#93C5FD" },
        { name: "Awake", value: 100, color: "#DBEAFE" },
      ];
    }

    const latestData = historicalData[historicalData.length - 1];
    const deepPercent = (latestData.deepSleep / totalSleepTime) * 100;
    const lightPercent = (latestData.lightSleep / totalSleepTime) * 100;
    const remPercent = (latestData.remSleep / totalSleepTime) * 100;
    const awakePercent = Math.max(
      0,
      100 - deepPercent - lightPercent - remPercent,
    );

    return [
      {
        name: "Deep Sleep",
        value: Math.round(deepPercent * 10) / 10,
        color: "#3B82F6",
      },
      {
        name: "Light Sleep",
        value: Math.round(lightPercent * 10) / 10,
        color: "#60A5FA",
      },
      {
        name: "REM Sleep",
        value: Math.round(remPercent * 10) / 10,
        color: "#93C5FD",
      },
      {
        name: "Awake",
        value: Math.round(awakePercent * 10) / 10,
        color: "#DBEAFE",
      },
    ];
  })();

  const energyUsageData = [
    { name: "Heating", usage: 23, color: "#F97316" },
    { name: "Cooling", usage: 45, color: "#3B82F6" },
    { name: "Ventilation", usage: 12, color: "#10B981" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Analytics</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Sleep quality insights and environmental data analysis
          </p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Sleep Score
            </CardTitle>
            <Moon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSleepScore}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3" /> +
              {Math.round(((avgSleepScore - 82) / 82) * 100)}% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sleep Duration
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatDuration(totalSleepTime)}
            </div>
            <p className="text-xs text-muted-foreground">
              {totalSleepTime >= 450 ? (
                <>
                  <TrendingUp className="inline h-3 w-3" /> Target achieved
                </>
              ) : (
                <>
                  <TrendingDown className="inline h-3 w-3" />{" "}
                  {Math.round(480 - totalSleepTime)}m from target
                </>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Heart Rate
            </CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgHeartRate} BPM</div>
            <p className="text-xs text-muted-foreground">
              <Activity className="inline h-3 w-3" />{" "}
              {avgHeartRate >= 60 && avgHeartRate <= 80
                ? "Normal range"
                : "Variable range"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Temperature Efficiency
            </CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(systemMetrics.targetAchievementRate)}%
            </div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3" /> +
              {Math.round(systemMetrics.targetAchievementRate - 88)}% from last
              week
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sleep" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sleep">Sleep Analysis</TabsTrigger>
          <TabsTrigger value="temperature">Temperature</TabsTrigger>
          <TabsTrigger value="health">Health Metrics</TabsTrigger>
          <TabsTrigger value="environment">Environment</TabsTrigger>
        </TabsList>

        {/* Sleep Analysis */}
        <TabsContent value="sleep" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sleep Quality Trends</CardTitle>
                <CardDescription>
                  Last 24 hours sleep score progression
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sleepTrendChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="time"
                        fontSize={12}
                        interval="preserveStartEnd"
                      />
                      <YAxis domain={[0, 100]} fontSize={12} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="sleepScore"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sleep Phases Distribution</CardTitle>
                <CardDescription>
                  Average time spent in each sleep phase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sleepPhasesData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {sleepPhasesData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Percentage"]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Sleep Trends</CardTitle>
              <CardDescription>
                Sleep score and duration over the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={lastWeekData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" fill="#3B82F6" name="Sleep Score" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sleep Insights</CardTitle>
              <CardDescription>
                AI-powered recommendations for better sleep
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800 dark:text-green-200">
                        Excellent Temperature Control
                      </h4>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Your optimal sleep temperature of{" "}
                        {currentReading.temperature}°C has been maintained
                        consistently, contributing to{" "}
                        {Math.round(15 + Math.random() * 10)}% longer deep sleep
                        phases.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start space-x-3">
                    <Moon className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                        Consistent Sleep Schedule
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        You've maintained a regular bedtime within 30 minutes
                        for the past week. Consider going to bed 15 minutes
                        earlier to reach your 8-hour goal.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
                  <div className="flex items-start space-x-3">
                    <Heart className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-orange-800 dark:text-orange-200">
                        Heart Rate Variability
                      </h4>
                      <p className="text-sm text-orange-700 dark:text-orange-300">
                        Your HRV indicates good recovery (current:{" "}
                        {currentReading.heartRate} BPM). Consider{" "}
                        {currentReading.temperature > 23
                          ? "lowering"
                          : "maintaining"}{" "}
                        the room temperature for optimal REM sleep.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Temperature Analysis */}
        <TabsContent value="temperature" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Temperature Control Timeline</CardTitle>
              <CardDescription>
                Temperature vs target over the last 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={temperatureChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="time"
                      fontSize={12}
                      interval="preserveStartEnd"
                    />
                    <YAxis domain={[20, 26]} fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="target"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.1}
                      strokeDasharray="5 5"
                      name="Target Temp"
                    />
                    <Area
                      type="monotone"
                      dataKey="temperature"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.3}
                      name="Actual Temp"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Temperature Control Efficiency</CardTitle>
                <CardDescription>
                  How well the system maintains target temperatures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Target Achievement Rate</span>
                    <Badge variant="secondary">89%</Badge>
                  </div>
                  <Progress value={89} className="h-3" />

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {historicalData.length > 0
                          ? (
                              historicalData.reduce(
                                (sum, d) => sum + d.temperature,
                                0,
                              ) /
                                historicalData.length -
                              0.8
                            ).toFixed(1)
                          : "22.1"}
                        °C
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Avg Night Temp
                      </div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {historicalData.length > 0
                          ? (
                              historicalData.reduce(
                                (sum, d) => sum + d.temperature,
                                0,
                              ) /
                                historicalData.length +
                              1.2
                            ).toFixed(1)
                          : "24.3"}
                        °C
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Avg Day Temp
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Energy Usage Distribution</CardTitle>
                <CardDescription>
                  Power consumption by system component
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={energyUsageData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="usage"
                      >
                        {energyUsageData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Usage"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="pt-2 border-t mt-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Total Energy</span>
                    <span className="text-sm font-medium">
                      {systemMetrics.totalEnergyWeek.toFixed(1)} kWh this week
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Health Metrics */}
        <TabsContent value="health" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Heart Rate Patterns</CardTitle>
              <CardDescription>
                Heart rate monitoring during sleep periods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={heartRateChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="time"
                      fontSize={12}
                      interval="preserveStartEnd"
                    />
                    <YAxis domain={[50, 80]} fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="restingRange"
                      stroke="#10B981"
                      strokeDasharray="5 5"
                      strokeWidth={2}
                      dot={false}
                      name="Optimal Range"
                    />
                    <Line
                      type="monotone"
                      dataKey="heartRate"
                      stroke="#EF4444"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      name="Heart Rate"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Heart Rate Statistics</CardTitle>
                <CardDescription>
                  Statistical analysis of heart rate data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 border rounded-lg">
                      <div className="text-xl font-bold text-red-500">
                        {historicalData.length > 0
                          ? Math.min(...historicalData.map((d) => d.heartRate))
                          : 62}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Minimum
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-xl font-bold">{avgHeartRate}</div>
                      <div className="text-xs text-muted-foreground">
                        Average
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-xl font-bold text-orange-500">
                        {historicalData.length > 0
                          ? Math.max(...historicalData.map((d) => d.heartRate))
                          : 74}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Maximum
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Heart Rate Variability</span>
                      <span className="font-medium">
                        {Math.round(35 + Math.random() * 15)}ms
                      </span>
                    </div>
                    <Progress
                      value={
                        currentReading.heartRate >= 60 &&
                        currentReading.heartRate <= 75
                          ? 75
                          : 55
                      }
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      {currentReading.heartRate >= 60 &&
                      currentReading.heartRate <= 75
                        ? "Good"
                        : "Variable"}{" "}
                      recovery indicator
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Breathing Analysis</CardTitle>
                <CardDescription>
                  Respiratory patterns during sleep
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-xl font-bold">
                        {Math.round(currentReading.breathingRate)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Breaths/min
                      </div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-xl font-bold">
                        {Math.round(95 + Math.random() * 4)}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Regularity
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sleep Apnea Events</span>
                      <Badge variant="secondary">0</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Breathing Interruptions</span>
                      <Badge variant="secondary">2</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Health Correlations</CardTitle>
              <CardDescription>
                Relationship between environmental factors and health metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Temperature vs Heart Rate</h4>
                  <div className="space-y-2">
                    {correlations.temperatureVsHeartRate.map((item) => (
                      <div
                        key={item.range}
                        className="flex justify-between text-sm"
                      >
                        <span>{item.range}</span>
                        <span>{item.avgHeartRate} BPM avg</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Optimal heart rate at 22-24°C range
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Humidity vs Sleep Quality</h4>
                  <div className="space-y-2">
                    {correlations.humidityVsSleepQuality.map((item) => (
                      <div
                        key={item.range}
                        className="flex justify-between text-sm"
                      >
                        <span>{item.range}</span>
                        <span>{item.avgScore} score</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Best sleep quality at 40-50% humidity
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Environment */}
        <TabsContent value="environment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Environmental Factors Timeline</CardTitle>
              <CardDescription>
                Humidity, CO2, and air quality over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={environmentalChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="time"
                      fontSize={12}
                      interval="preserveStartEnd"
                    />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="humidity"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      name="Humidity (%)"
                    />
                    <Line
                      type="monotone"
                      dataKey="airQualityIndex"
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      name="Air Quality Index"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Droplets className="h-4 w-4" />
                  <span>Humidity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold">
                    {Math.round(currentReading.humidity)}%
                  </div>
                  <Progress value={currentReading.humidity} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    Optimal range: 40-60%
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wind className="h-4 w-4" />
                  <span>Air Quality</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold">
                    {currentReading.airQuality}
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>CO2</span>
                      <span>{currentReading.co2} ppm</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>PM2.5</span>
                      <span>{Math.round(currentReading.pm25)} μg/m³</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span>Power Usage</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold">
                    {systemMetrics.totalEnergyWeek.toFixed(1)} kWh
                  </div>
                  <div className="text-xs text-muted-foreground">This week</div>
                  <Badge variant="secondary">
                    {Math.round(
                      ((2.5 - systemMetrics.totalEnergyWeek) / 2.5) * 100,
                    )}
                    % less than last week
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Environmental Impact on Sleep</CardTitle>
              <CardDescription>
                How room conditions affect your sleep quality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Optimal Conditions</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Temperature</span>
                        <span className="font-medium">22-23°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Humidity</span>
                        <span className="font-medium">42-48%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CO2 Level</span>
                        <span className="font-medium">&lt; 500 ppm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Noise Level</span>
                        <span className="font-medium">&lt; 30 dB</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Current Status</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Temperature</span>
                        <Badge variant="default">Optimal</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Humidity</span>
                        <Badge variant="default">Optimal</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Air Quality</span>
                        <Badge variant="default">Good</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Ventilation</span>
                        <Badge variant="secondary">Adequate</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Recommendation
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Your environmental conditions are{" "}
                    {currentReading.airQuality.toLowerCase()} for sleep. The
                    temperature ({currentReading.temperature}°C) and humidity (
                    {Math.round(currentReading.humidity)}%) levels are
                    contributing to your{" "}
                    {avgSleepScore >= 80 ? "excellent" : "good"} sleep quality.
                    Consider maintaining these settings for continued success.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
