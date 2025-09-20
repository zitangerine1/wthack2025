import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Dashboard } from "@/pages/Dashboard";
import { Settings } from "@/pages/Settings";
import { Analytics } from "@/pages/Analytics";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
