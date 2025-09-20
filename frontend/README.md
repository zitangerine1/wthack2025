# Smart Pillow Frontend

A modern React frontend for controlling and monitoring the Smart Pillow climate control system. Built with Vite, React Router, TypeScript, and shadcn/ui components.

## Features

- **Dashboard**: Real-time monitoring of temperature, heart rate, humidity, and air quality
- **Climate Control**: Adjust heating/cooling settings with target temperature controls
- **Sleep Analytics**: Comprehensive sleep quality analysis and insights
- **Health Monitoring**: Track heart rate patterns, breathing analysis, and sleep phases
- **Settings Management**: Configure device connection, preferences, and system settings
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful icon library

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+

### Installation

1. Clone the repository and navigate to the frontend directory:
```bash
cd wthack2025/frontend
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

4. Open your browser to `http://localhost:5173`

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build locally
- `bun run start` - Start production server with host access
- `bun run deploy` - Build and start production server
- `bun run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   └── Layout.tsx       # Main application layout
├── pages/
│   ├── Dashboard.tsx    # Main dashboard page
│   ├── Settings.tsx     # Settings configuration
│   └── Analytics.tsx    # Sleep and health analytics
├── lib/
│   └── utils.ts         # Utility functions
├── App.tsx              # Root application component
├── main.tsx             # Application entry point
└── index.css            # Global styles and CSS variables
```

## Features Overview

### Dashboard
- Real-time device status and metrics
- Climate control with target temperature adjustment
- Current sleep analytics and health monitoring
- Recent activity log
- Connection status to ESP32 device

### Settings
- **Device**: ESP32 connection configuration and status
- **Climate**: Temperature preferences and automation settings
- **Health**: Heart rate monitoring and sleep tracking configuration
- **Notifications**: Alert preferences and notification methods
- **System**: Maintenance, updates, and device information

### Analytics
- **Sleep Analysis**: Sleep quality trends, phases, and AI-powered insights
- **Temperature**: Climate control efficiency and energy usage
- **Health Metrics**: Heart rate patterns, breathing analysis, and correlations
- **Environment**: Air quality, humidity, and environmental impact on sleep

## ESP32 Integration

The frontend is designed to connect to an ESP32-powered smart pillow system via WiFi. Key integration points:

- WebSocket or HTTP REST API communication
- Real-time sensor data visualization
- Remote climate control commands
- Device status monitoring and alerts

## Customization

### Theming
The app supports light and dark themes using CSS custom properties. Modify `src/index.css` to customize colors:

```css
:root {
  --primary: your-color-here;
  --background: your-bg-color;
  /* ... other variables */
}
```

### Adding Components
Use shadcn/ui CLI to add new components:

```bash
bunx shadcn@latest add [component-name]
```

## Deployment

### Development
```bash
bun run dev --host
```

### Production
```bash
bun run build
bun run start
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## License

Part of the wthack2025 Smart Pillow project.