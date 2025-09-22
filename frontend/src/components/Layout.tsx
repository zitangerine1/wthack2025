import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Thermometer,
  Heart,
  Settings,
  BarChart3,
  Home,
  WifiOff,
  Menu,
  X,
  Sun,
  Moon,
  Wifi,
} from "lucide-react";
import { getCurrentReading } from "@/lib/mockData";

export function Layout() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [currentReading, setCurrentReading] = useState(getCurrentReading());
  const { theme, toggleTheme } = useTheme();

  const navigationItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/settings", label: "Settings", icon: Settings },
    { path: "/analytics", label: "Analytics", icon: BarChart3 },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("sidebar-open");
    };
  }, [isSidebarOpen]);

  // Simulate connection after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnected(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Update sensor data every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReading(getCurrentReading());
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile hamburger menu */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={toggleSidebar}
              >
                <Menu className="h-5 w-5" />
              </Button>

              <Thermometer className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
              <div>
                <h1 className="text-xl lg:text-2xl font-bold">Smart Pillow</h1>
                <p className="text-xs lg:text-sm text-muted-foreground">
                  Climate Control System
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-8 w-8 lg:h-9 lg:w-9 theme-toggle"
                title={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 transition-transform duration-300" />
                ) : (
                  <Moon className="h-4 w-4 transition-transform duration-300" />
                )}
                <span className="sr-only">
                  {theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"}
                </span>
              </Button>

              {/* Connection Status */}
              <div className="flex items-center space-x-1 lg:space-x-2">
                {isConnected ? (
                  <Wifi className="h-3 w-3 lg:h-4 lg:w-4 text-green-500" />
                ) : (
                  <WifiOff className="h-3 w-3 lg:h-4 lg:w-4 text-destructive" />
                )}
                <Badge
                  variant={isConnected ? "secondary" : "destructive"}
                  className="text-xs"
                >
                  <span className="hidden sm:inline">
                    {isConnected ? "Connected" : "Disconnected"}
                  </span>
                  <span className="sm:hidden">
                    {isConnected ? "On" : "Off"}
                  </span>
                </Badge>
              </div>

              {/* Current Status */}
              <Card className="p-1 lg:p-2">
                <div className="flex items-center space-x-1 lg:space-x-2 text-xs lg:text-sm">
                  <Heart className="h-3 w-3 lg:h-4 lg:w-4 text-red-500" />
                  <span className="hidden sm:inline">
                    {currentReading.heartRate} BPM
                  </span>
                  <span className="sm:hidden">{currentReading.heartRate}</span>
                  <Separator orientation="vertical" className="h-3 lg:h-4" />
                  <Thermometer className="h-3 w-3 lg:h-4 lg:w-4 text-blue-500" />
                  <span>{currentReading.temperature}°C</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6 relative">
          {/* Mobile sidebar overlay */}
          {isSidebarOpen && (
            <button
              type="button"
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={closeSidebar}
              onKeyDown={(e) => e.key === "Escape" && closeSidebar()}
              aria-label="Close sidebar"
            />
          )}

          {/* Sidebar Navigation */}
          <aside
            className={`
              fixed lg:static top-0 left-0 h-full lg:h-auto w-80 lg:w-64
              bg-background lg:bg-transparent z-50 lg:z-auto
              transform sidebar-transition
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
              border-r lg:border-r-0 lg:space-y-2 p-4 lg:p-0 mobile-sidebar
            `}
          >
            {/* Mobile sidebar header with close button */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <div className="flex items-center space-x-3">
                <Thermometer className="h-6 w-6 text-primary" />
                <span className="font-semibold">Smart Pillow</span>
              </div>
              <Button variant="ghost" size="icon" onClick={closeSidebar}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-4 lg:space-y-2">
              <Card className="p-4">
                <h2 className="font-semibold mb-3">Navigation</h2>
                <nav className="space-y-1">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPath === item.path;

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={closeSidebar} // Close sidebar on mobile when navigating
                        className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </Card>

              {/* Quick Status */}
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Quick Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Heating</span>
                    <Badge
                      variant={
                        currentReading.isHeating ? "default" : "secondary"
                      }
                    >
                      {currentReading.isHeating ? "Active" : "Off"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Cooling</span>
                    <Badge
                      variant={
                        currentReading.isCooling ? "default" : "secondary"
                      }
                    >
                      {currentReading.isCooling ? "Active" : "Off"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Target Temp</span>
                    <span className="text-sm font-medium">24°C</span>
                  </div>
                </div>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
