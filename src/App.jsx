import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LoadingProvider } from "./context/LoadingContext";
import { SearchProvider } from "./context/SearchContext";
import { DataOperationProvider } from "./context/DataOperationContext";
import NavigationLoader from "./components/common/NavigationLoader";

// Layouts
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import AnalyzePage from "./pages/AnalyzePage";
import SuggestionsPage from "./pages/SuggestionsPage";
import ComparisonPage from "./pages/ComparisonPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoadingPage from "./pages/LoadingPage";

const App = () => {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <DataOperationProvider>
          <Router>
            <SearchProvider>
              <NavigationLoader>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<AuthPage type="login" />} />
                    <Route
                      path="register"
                      element={<AuthPage type="register" />}
                    />
                    <Route path="features" element={<FeaturesPage />} />
                    <Route path="pricing" element={<PricingPage />} />
                    <Route path="integrations" element={<IntegrationsPage />} />
                    <Route path="loading" element={<LoadingPage />} />
                  </Route>

                  {/* Auth routes */}
                  <Route
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                  />
                  <Route
                    path="/reset-password"
                    element={<ResetPasswordPage />}
                  />

                  {/* Protected routes - will add authentication later */}
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="analyze" element={<AnalyzePage />} />
                    <Route path="suggestions" element={<SuggestionsPage />} />
                    <Route path="comparison" element={<ComparisonPage />} />
                    <Route path="reports" element={<ReportsPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                  </Route>

                  {/* 404 Not Found - must be last */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </NavigationLoader>
            </SearchProvider>
          </Router>
        </DataOperationProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
};

export default App;
