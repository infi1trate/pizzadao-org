import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import PartnersPage from "./pages/PartnersPage.tsx";
import JoinPage from "./pages/JoinPage.tsx";
import CommunityPage from "./pages/CommunityPage.tsx";
import BrandSystemPage from "./pages/BrandSystemPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import Transmission from "./pages/Transmission.tsx";
import Privacy from "./pages/Privacy.tsx";
import Terms from "./pages/Terms.tsx";
import NotFound from "./pages/NotFound.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import PasswordGate from "./components/PasswordGate.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public pre-launch teaser */}
          <Route path="/pre-launch" element={<Transmission />} />

          {/* Root redirects to the pre-launch page until full launch */}
          <Route path="/" element={<Navigate to="/pre-launch" replace />} />

          {/* Everything else is gated */}
          <Route path="/home" element={<PasswordGate><Index /></PasswordGate>} />
          <Route path="/about" element={<PasswordGate><About /></PasswordGate>} />
          <Route path="/partners" element={<PasswordGate><PartnersPage /></PasswordGate>} />
          <Route path="/join" element={<PasswordGate><JoinPage /></PasswordGate>} />
          <Route path="/community" element={<PasswordGate><CommunityPage /></PasswordGate>} />
          <Route path="/brand-system" element={<PasswordGate><BrandSystemPage /></PasswordGate>} />
          <Route path="/contact" element={<PasswordGate><ContactPage /></PasswordGate>} />
          {/* Public legal pages */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<PasswordGate><NotFound /></PasswordGate>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
