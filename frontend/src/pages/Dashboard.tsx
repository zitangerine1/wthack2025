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
} from "lucide-react";

export function Dashboard() {
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
        <Button className="self-start sm:self-auto">Connect to ESP32</Button>
      </div>

      {/* Alert for disconnected state */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Device is not connected. Click "Connect to ESP32" to establish
          connection.
        </AlertDescription>
      </Alert>

      {/* Current Status Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">22.5°C</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3" />{" "}
              <span className="hidden sm:inline">-0.5°C from target</span>
              <span className="sm:hidden">-0.5°C</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">72 BPM</div>
            <p className="text-xs text-muted-foreground">
              <Activity className="inline h-3 w-3" />{" "}
              <span className="hidden sm:inline">Normal range</span>
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
            <div className="text-xl lg:text-2xl font-bold">45%</div>
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
            <div className="text-xl lg:text-2xl font-bold">Good</div>
            <p className="text-xs text-muted-foreground">CO2: 420 ppm</p>
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
                <label className="text-sm font-medium">
                  Target Temperature
                </label>
                <Badge variant="outline">24°C</Badge>
              </div>
              <Slider
                defaultValue={[24]}
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
                  <Switch />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Power</span>
                    <span>0%</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Snowflake className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Cooling</span>
                  </div>
                  <Switch />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Power</span>
                    <span>0%</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
              </div>
            </div>

            {/* Auto Mode */}
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium">Auto Mode</span>
              </div>
              <Switch defaultChecked />
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
            {/* Current Sleep State */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Sleep State</span>
                <Badge>Awake</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Heart Rate Variability</span>
                  <span className="font-medium">Normal</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Breathing Rate</span>
                  <span className="font-medium">16 rpm</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Movement</span>
                  <span className="font-medium">Minimal</span>
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
                  <div className="text-sm font-medium">21.8°C</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Humidity</div>
                  <div className="text-sm font-medium">45%</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Air</div>
                  <div className="text-sm font-medium">Good</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Particles</div>
                  <div className="text-sm font-medium">Low</div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Sleep Score */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Sleep Score</span>
                <Badge variant="secondary">85/100</Badge>
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Good sleep quality with optimal temperature regulation
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
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-muted-foreground">2 minutes ago</span>
              <span>Temperature adjusted to 24°C</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-muted-foreground">5 minutes ago</span>
              <span>Heart rate monitoring started</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-muted-foreground">10 minutes ago</span>
              <span>Auto mode enabled</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-muted-foreground">15 minutes ago</span>
              <span>Device disconnected</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
