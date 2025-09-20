# Dark Mode Implementation Guide

This document explains the dark mode functionality that has been added to the Smart Pillow frontend application.

## Overview

The application now includes a comprehensive dark mode system that:
- Automatically detects system theme preferences
- Persists user theme choices across sessions
- Provides smooth transitions between themes
- Affects all components throughout the application

## How to Use

### Toggle Dark Mode
1. Look for the sun/moon icon in the top-right corner of the header
2. Click the icon to toggle between light and dark modes
3. The theme will be saved automatically and persist across browser sessions

### Theme Icons
- **Moon icon** (🌙): Appears in light mode - click to switch to dark mode
- **Sun icon** (☀️): Appears in dark mode - click to switch to light mode

### Automatic Detection
- On first visit, the app automatically detects your system's theme preference
- If your system is set to dark mode, the app will start in dark mode
- If your system is set to light mode, the app will start in light mode

## Technical Implementation

### Theme Context
The dark mode functionality is built using React Context API:
- `ThemeProvider` wraps the entire application
- `useTheme()` hook provides access to theme state and controls
- Theme state is managed globally and affects all components

### CSS Variables
The styling system uses CSS custom properties (variables) that automatically change based on the theme:
- Light mode and dark mode each have their own color palette
- All UI components automatically adapt to the current theme
- Smooth transitions (0.3s) are applied when switching themes

### Features
1. **System Preference Detection**: Automatically detects `prefers-color-scheme`
2. **Persistent Storage**: Uses `localStorage` to remember user preference
3. **Dynamic Updates**: Listens for system theme changes
4. **Smooth Transitions**: Animated theme switches with CSS transitions
5. **Accessibility**: Proper ARIA labels and screen reader support

### Files Modified/Added
- `src/contexts/ThemeContext.tsx` - Theme management context
- `src/components/Layout.tsx` - Added theme toggle button
- `src/components/DarkModeDemo.tsx` - Demo component showing theme features
- `src/pages/Settings.tsx` - Added appearance tab with theme demo
- `src/App.tsx` - Wrapped with ThemeProvider
- `src/index.css` - Added theme transitions and styling

## Customization

### Colors
To modify the color scheme, edit the CSS custom properties in `src/index.css`:
- `:root` section contains light mode colors
- `.dark` section contains dark mode colors

### Transitions
Transition duration can be adjusted in the CSS:
```css
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

### Default Theme
To change the default theme when no preference is saved:
1. Open `src/contexts/ThemeContext.tsx`
2. Modify the return value in the theme initialization logic
3. Change `return 'light';` to `return 'dark';` for dark default

## Browser Support

The dark mode implementation is compatible with:
- Chrome 76+
- Firefox 67+
- Safari 12.1+
- Edge 79+

All modern browsers that support CSS custom properties and `prefers-color-scheme` media query.

## Testing

To test the dark mode functionality:
1. Toggle the theme using the header button
2. Refresh the page to verify persistence
3. Change your system theme preference to test automatic detection
4. Check the Settings > Appearance tab for the demo component

## Troubleshooting

### Theme Not Persisting
- Check if localStorage is enabled in your browser
- Clear browser data and try again

### Smooth Transitions Not Working
- Ensure CSS transitions are not disabled by user preferences
- Check browser developer tools for CSS errors

### Icons Not Updating
- Verify JavaScript is enabled
- Check browser console for React errors

## Future Enhancements

Potential improvements that could be added:
- Multiple theme options (not just light/dark)
- Per-component theme customization
- Theme scheduling (automatic switching at specific times)
- High contrast mode support
- Custom color picker for user-defined themes