import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import DiseaseMap from "./pages/DiseaseMap.tsx";
import Predictive from "./pages/Predictive.tsx";
import Solutions from "./pages/Solutions.tsx";
import Alerts from "./pages/Alerts.tsx";
import Compare from "./pages/Compare.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/disease-map" element={<DiseaseMap />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/predictive" element={<Predictive />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
