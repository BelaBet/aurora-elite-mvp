import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Login from "./pages/Login";
import Transportes from "./pages/dashboard/Transportes";
import Concierge from "./pages/dashboard/Concierge";
import Hospedagem from "./pages/dashboard/Hospedagem";
import TheVault from "./pages/dashboard/TheVault";
import Profile from "./pages/dashboard/Profile";
import Carros from "./pages/dashboard/Carros";
import Iates from "./pages/dashboard/Iates";
import Experiencias from "./pages/dashboard/Experiencias";
import Seguros from "./pages/dashboard/Seguros";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Transportes />} />
              <Route path="concierge" element={<Concierge />} />
              <Route path="hospedagem" element={<Hospedagem />} />
              <Route path="vault" element={<TheVault />} />
              <Route path="profile" element={<Profile />} />
              <Route path="carros" element={<Carros />} />
              <Route path="iates" element={<Iates />} />
              <Route path="experiencias" element={<Experiencias />} />
              <Route path="seguros" element={<Seguros />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
