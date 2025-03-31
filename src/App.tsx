
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { IssueProvider } from "./contexts/IssueContext";
import { SidebarProvider } from "./components/ui/sidebar";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CommunityIssuesPage from "./pages/CommunityIssuesPage";
import PriorityIssuesPage from "./pages/PriorityIssuesPage";
import ReportIssuePage from "./pages/ReportIssuePage";
import IssueDetailsPage from "./pages/IssueDetailsPage";
import HelpSupportPage from "./pages/HelpSupportPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <IssueProvider>
          <SidebarProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                <Route element={<Layout />}>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  
                  <Route
                    path="/community-issues"
                    element={
                      <ProtectedRoute>
                        <CommunityIssuesPage />
                      </ProtectedRoute>
                    }
                  />
                  
                  <Route
                    path="/priority-issues"
                    element={
                      <ProtectedRoute>
                        <PriorityIssuesPage />
                      </ProtectedRoute>
                    }
                  />
                  
                  <Route
                    path="/report-issue"
                    element={
                      <ProtectedRoute>
                        <ReportIssuePage />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/help-support"
                    element={
                      <ProtectedRoute>
                        <HelpSupportPage />
                      </ProtectedRoute>
                    }
                  />
                  
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <SettingsPage />
                      </ProtectedRoute>
                    }
                  />
                  
                  <Route
                    path="/issues/:id"
                    element={
                      <ProtectedRoute>
                        <IssueDetailsPage />
                      </ProtectedRoute>
                    }
                  />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </SidebarProvider>
        </IssueProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
