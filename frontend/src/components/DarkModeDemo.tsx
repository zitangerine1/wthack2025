import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sun, Moon, Palette } from "lucide-react";

export function DarkModeDemo() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Palette className="h-5 w-5" />
          <span>Dark Mode Demo</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Current theme: <Badge variant="outline">{theme}</Badge>
          </p>

          <Button onClick={toggleTheme} className="w-full">
            {theme === "dark" ? (
              <>
                <Sun className="h-4 w-4 mr-2" />
                Switch to Light Mode
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 mr-2" />
                Switch to Dark Mode
              </>
            )}
          </Button>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Theme Features:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Automatic system preference detection</li>
            <li>• Persistent theme selection</li>
            <li>• Smooth transitions</li>
            <li>• System theme change listener</li>
          </ul>
        </div>

        <div className="p-3 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground">
            The theme preference is automatically saved and will persist across
            browser sessions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
