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

export function Analytics() {
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
            <div className="text-2xl font-bold">82</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3" /> +5% from last week
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
            <div className="text-2xl font-bold">7h 32m</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3" /> -12m from target
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
            <div className="text-2xl font-bold">65 BPM</div>
            <p className="text-xs text-muted-foreground">
              <Activity className="inline h-3 w-3" /> Normal range
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
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3" /> +3% from last week
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
                  Last 7 days sleep score progression
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Mock chart data */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Monday</span>
                      <span>85</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tuesday</span>
                      <span>78</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Wednesday</span>
                      <span>92</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Thursday</span>
                      <span>88</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Friday</span>
                      <span>81</span>
                    </div>
                    <Progress value={81} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Saturday</span>
                      <span>86</span>
                    </div>
                    <Progress value={86} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sunday</span>
                      <span>89</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sleep Phases</CardTitle>
                <CardDescription>
                  Average time spent in each sleep phase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Deep Sleep</span>
                      <span className="text-sm font-medium">2h 15m (30%)</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Light Sleep</span>
                      <span className="text-sm font-medium">3h 45m (50%)</span>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">REM Sleep</span>
                      <span className="text-sm font-medium">1h 30m (20%)</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Awake</span>
                      <span className="text-sm font-medium">2m (0.4%)</span>
                    </div>
                    <Progress value={0.4} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

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
                        Your optimal sleep temperature of 22°C has been
                        maintained consistently, contributing to 15% longer deep
                        sleep phases.
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
                        Your HRV indicates good recovery. Consider lowering the
                        room temperature by 1°C during the first sleep cycle for
                        even better results.
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
                        22.3°C
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Avg Night Temp
                      </div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        24.1°C
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
                <CardTitle>Energy Usage</CardTitle>
                <CardDescription>
                  Heating and cooling system power consumption
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Cooling System</span>
                      <span className="text-sm font-medium">45% usage</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Heating System</span>
                      <span className="text-sm font-medium">23% usage</span>
                    </div>
                    <Progress value={23} className="h-2" />
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Total Energy</span>
                      <span className="text-sm font-medium">
                        2.3 kWh this week
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Temperature Timeline</CardTitle>
              <CardDescription>Last 24 hours temperature data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Mock timeline data */}
                {[
                  { time: "00:00", temp: "22.0°C", status: "Target" },
                  { time: "02:00", temp: "21.8°C", status: "Cooling" },
                  { time: "04:00", temp: "22.2°C", status: "Target" },
                  { time: "06:00", temp: "23.1°C", status: "Warming" },
                  { time: "08:00", temp: "24.0°C", status: "Target" },
                  { time: "10:00", temp: "24.2°C", status: "Target" },
                  { time: "12:00", temp: "23.8°C", status: "Target" },
                  { time: "14:00", temp: "24.1°C", status: "Target" },
                  { time: "16:00", temp: "23.9°C", status: "Target" },
                  { time: "18:00", temp: "23.5°C", status: "Target" },
                  { time: "20:00", temp: "22.8°C", status: "Cooling" },
                  { time: "22:00", temp: "22.2°C", status: "Target" },
                ].map((point, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                  >
                    <span className="text-sm font-mono">{point.time}</span>
                    <span className="text-sm font-medium">{point.temp}</span>
                    <Badge
                      variant={
                        point.status === "Target" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {point.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Health Metrics */}
        <TabsContent value="health" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Heart Rate Patterns</CardTitle>
                <CardDescription>
                  Resting heart rate during sleep periods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 border rounded-lg">
                      <div className="text-xl font-bold text-red-500">62</div>
                      <div className="text-xs text-muted-foreground">
                        Minimum
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-xl font-bold">67</div>
                      <div className="text-xs text-muted-foreground">
                        Average
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-xl font-bold text-orange-500">
                        74
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Maximum
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Heart Rate Variability</span>
                      <span className="font-medium">42ms</span>
                    </div>
                    <Progress value={70} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Good recovery indicator
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
                      <div className="text-xl font-bold">16</div>
                      <div className="text-xs text-muted-foreground">
                        Breaths/min
                      </div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-xl font-bold">98%</div>
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
                    <div className="flex justify-between text-sm">
                      <span>20-22°C</span>
                      <span>65 BPM avg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>22-24°C</span>
                      <span>63 BPM avg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>24-26°C</span>
                      <span>68 BPM avg</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Optimal heart rate at 22-24°C range
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Humidity vs Sleep Quality</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>30-40%</span>
                      <span>78 score</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>40-50%</span>
                      <span>85 score</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>50-60%</span>
                      <span>79 score</span>
                    </div>
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
                  <div className="text-2xl font-bold">45%</div>
                  <Progress value={45} className="h-2" />
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
                  <div className="text-2xl font-bold">Good</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>CO2</span>
                      <span>420 ppm</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>PM2.5</span>
                      <span>8 μg/m³</span>
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
                  <div className="text-2xl font-bold">2.3 kWh</div>
                  <div className="text-xs text-muted-foreground">This week</div>
                  <Badge variant="secondary">15% less than last week</Badge>
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
                    Your environmental conditions are optimal for sleep. The
                    consistent temperature and humidity levels are contributing
                    to your improved sleep quality. Consider maintaining these
                    settings for continued success.
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
