import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RODetails from "./pages/RODetails";
import BranchDetails from "./pages/BranchDetails";
import NonFIStatus from "./pages/NonFIStatus";
import DashboardLayout from "./components/layout/DashboardLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const userId = localStorage.getItem("userId");
  return userId ? <>{children}</> : <Navigate to="/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/ro-details/:roName" element={
            <ProtectedRoute>
              <DashboardLayout>
                <RODetails />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/branch-details/:branchName" element={
            <ProtectedRoute>
              <DashboardLayout>
                <BranchDetails />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/non-fi" element={
            <ProtectedRoute>
              <DashboardLayout>
                <NonFIStatus />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
