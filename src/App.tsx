import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import SubmitEvent from "./pages/SubmitEvent";
import StudioLayout from "./pages/studio/StudioLayout";
import StudioAbout from "./pages/studio/About";
import StudioRepairs from "./pages/studio/Repairs";
import StudioCustomBuilds from "./pages/studio/CustomBuilds";
import StudioForSale from "./pages/studio/ForSale";
import StudioFaq from "./pages/studio/Faq";
import StudioContact from "./pages/studio/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/submit" element={<SubmitEvent />} />
            <Route path="/repair-studio" element={<StudioLayout />}>
              <Route index element={<StudioAbout />} />
              <Route path="repairs" element={<StudioRepairs />} />
              <Route path="custom-builds" element={<StudioCustomBuilds />} />
              <Route path="for-sale" element={<StudioForSale />} />
              <Route path="faq" element={<StudioFaq />} />
              <Route path="contact" element={<StudioContact />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
