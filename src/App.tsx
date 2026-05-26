import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import PartnersPage from "./pages/PartnersPage.tsx";
import CommunityPage from "./pages/CommunityPage.tsx";
import BrandSystemPage from "./pages/BrandSystemPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import MafiaNamePage from "./pages/MafiaNamePage.tsx";

import Privacy from "./pages/Privacy.tsx";
import Terms from "./pages/Terms.tsx";
import NotFound from "./pages/NotFound.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import BennyPeek from "./components/BennyPeek.tsx";
import PostHogProvider from "./lib/analytics/PostHogProvider.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PostHogProvider>
          <ScrollToTop />
          <BennyPeek />
          <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/brand-system" element={<BrandSystemPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/get-your-mafia-name" element={<MafiaNamePage />} />
          
          {/* Public legal pages */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </PostHogProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
