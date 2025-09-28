import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import AsteroidSimulator from "./pages/AsteroidSimulator";
import SolarSystem from "./pages/SolarSystem";
import Education from "./pages/Education";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Separate component to ensure Router context is available
const AppRoutes = () => (
  <>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/simulator" element={<AsteroidSimulator />} />
      <Route path="/solar-system" element={<SolarSystem />} />
      <Route path="/education" element={<Education />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;