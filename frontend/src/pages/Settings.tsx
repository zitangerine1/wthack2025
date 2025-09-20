import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DarkModeDemo } from "@/components/DarkModeDemo";
import {
  Wifi,
  Thermometer,
  Heart,
  Bell,
  Shield,
  Zap,
  Moon,
  Sun,
  Smartphone,
  WifiOff,
  CheckCircle,
  AlertCircle,
  Palette,
} from "lucide-react";

export function Settings() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Configure your smart pillow system preferences
        </p>
      </div>

      <Tabs defaultValue="device" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6">
          <TabsTrigger value="device" className="text-xs sm:text-sm">
            Device
          </TabsTrigger>
          <TabsTrigger value="climate" className="text-xs sm:text-sm">
            Climate
          </TabsTrigger>
          <TabsTrigger value="health" className="text-xs sm:text-sm">
            Health
          </TabsTrigger>
          <TabsTrigger value="appearance" className="text-xs sm:text-sm">
            <span className="hidden sm:inline">Appearance</span>
            <span className="sm:hidden">Theme</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs sm:text-sm">
            <span className="hidden sm:inline">Notifications</span>
            <span className="sm:hidden">Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="text-xs sm:text-sm">
            System
          </TabsTrigger>
        </TabsList>

        {/* Device Settings */}
        <TabsContent value="device" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wifi className="h-5 w-5" />
                <span>ESP32 Connection</span>
              </CardTitle>
              <CardDescription>
                Configure connection to your smart pillow device
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <WifiOff className="h-4 w-4" />
                <AlertDescription>
                  Device is currently disconnected. Check your WiFi settings and
                  device power.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="device-ip">Device IP Address</Label>
                  <Input
                    id="device-ip"
                    placeholder="192.168.1.100"
                    defaultValue="192.168.1.100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="device-port">Port</Label>
                  <Input id="device-port" placeholder="80" defaultValue="80" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="device-name">Device Name</Label>
                <Input
                  id="device-name"
                  placeholder="Smart Pillow"
                  defaultValue="Smart Pillow - Bedroom"
                />
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button className="w-full sm:w-auto">Connect</Button>
                <Button variant="outline" className="w-full sm:w-auto">
                  Test Connection
                </Button>
                <Button variant="outline" className="w-full sm:w-auto">
                  Scan Network
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Device Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Connection Status</span>
                    <Badge variant="destructive">Disconnected</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Firmware Version</span>
                    <span className="text-sm font-medium">v1.2.3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Uptime</span>
                    <span className="text-sm font-medium">--</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">WiFi Signal</span>
                    <span className="text-sm font-medium">--</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Battery Level</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Last Update</span>
                    <span className="text-sm font-medium">Never</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Climate Settings */}
        <TabsContent value="climate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Thermometer className="h-5 w-5" />
                <span>Temperature Preferences</span>
              </CardTitle>
              <CardDescription>
                Set your ideal temperature ranges for different times
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Daytime Target Temperature</Label>
                    <Badge variant="outline">24°C</Badge>
                  </div>
                  <Slider defaultValue={[24]} max={30} min={18} step={0.5} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>18°C</span>
                    <span>30°C</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Nighttime Target Temperature</Label>
                    <Badge variant="outline">22°C</Badge>
                  </div>
                  <Slider defaultValue={[22]} max={30} min={18} step={0.5} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>18°C</span>
                    <span>30°C</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto Temperature Adjustment</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically adjust based on sleep patterns
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Gradual Temperature Changes</Label>
                    <p className="text-sm text-muted-foreground">
                      Make temperature changes slowly over time
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-3">
                  <Label>Temperature Change Rate</Label>
                  <Slider defaultValue={[30]} max={120} min={5} step={5} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5 min</span>
                    <span>2 hours</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Climate Modes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-3 p-4 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">Summer Mode</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Optimized for warm weather with enhanced cooling
                  </p>
                  <Button variant="outline" size="sm">
                    Activate
                  </Button>
                </div>

                <div className="space-y-3 p-4 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Moon className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">Winter Mode</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Optimized for cold weather with enhanced heating
                  </p>
                  <Button variant="outline" size="sm">
                    Activate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Health Monitoring Settings */}
        <TabsContent value="health" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>Health Monitoring</span>
              </CardTitle>
              <CardDescription>
                Configure health and sleep tracking features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Heart Rate Monitoring</Label>
                    <p className="text-sm text-muted-foreground">
                      Continuous heart rate tracking during sleep
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Breathing Pattern Analysis</Label>
                    <p className="text-sm text-muted-foreground">
                      Monitor breathing patterns for sleep quality
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Movement Detection</Label>
                    <p className="text-sm text-muted-foreground">
                      Track movement and sleep position changes
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="target-hr">Target Heart Rate Range</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      id="min-hr"
                      placeholder="Min BPM"
                      defaultValue="60"
                    />
                    <Input
                      id="max-hr"
                      placeholder="Max BPM"
                      defaultValue="100"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Data Collection Frequency</Label>
                  <Slider defaultValue={[30]} max={300} min={5} step={5} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5 seconds</span>
                    <span>5 minutes</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sleep Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto Sleep Detection</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically detect when you fall asleep
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Smart Wake-up</Label>
                  <p className="text-sm text-muted-foreground">
                    Wake you during light sleep phases
                  </p>
                </div>
                <Switch />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sleep-goal">Sleep Duration Goal (hours)</Label>
                <Input
                  id="sleep-goal"
                  type="number"
                  defaultValue="8"
                  min="6"
                  max="12"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Theme Settings</span>
              </CardTitle>
              <CardDescription>
                Customize the appearance of your smart pillow interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <DarkModeDemo />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>
                Manage alerts and notifications from your smart pillow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Temperature Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when temperature targets are not met
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Health Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Alerts for unusual heart rate or breathing patterns
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>System Status Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Device connection and battery status updates
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sleep Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Daily sleep quality and analytics reports
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Notification Methods</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-4 w-4" />
                      <span className="text-sm">Mobile Push Notifications</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4" />
                      <span className="text-sm">In-App Notifications</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>System Settings</span>
              </CardTitle>
              <CardDescription>
                General system configuration and maintenance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-Update Firmware</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically update device firmware when available
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Data Backup</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically backup sleep and health data
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label>Data Retention Period</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm">
                      30 days
                    </Button>
                    <Button variant="outline" size="sm">
                      90 days
                    </Button>
                    <Button size="sm">1 year</Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Maintenance</h4>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline">
                    <Zap className="h-4 w-4 mr-2" />
                    Check for Updates
                  </Button>
                  <Button variant="outline">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Run Diagnostics
                  </Button>
                  <Button variant="outline">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Export Logs
                  </Button>
                  <Button variant="outline">Reset Settings</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium">Device Information</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Model: Smart Pillow v2</div>
                  <div>Serial: SP2024-001</div>
                  <div>Firmware: v1.2.3</div>
                  <div>Hardware: Rev C</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reset Options</CardTitle>
              <CardDescription>
                Reset various aspects of your smart pillow system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Reset Climate Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Reset Health Preferences
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Clear All Data
              </Button>
              <Button variant="destructive" className="w-full justify-start">
                Factory Reset
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
