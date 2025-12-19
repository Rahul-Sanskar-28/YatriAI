import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HeroSection from './components/landing/HeroSection';
import AITipsMarquee from './components/landing/AITipsMarquee';
import TestimonialsCarousel from './components/landing/TestimonialsCarousel';
import FeaturesSection from './components/landing/FeaturesSection';
import TouristDashboard from './components/dashboard/TouristDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import GuideDashboard from './components/dashboard/GuideDashboard';
import MarketplaceDashboard from './components/dashboard/MarketplaceDashboard';
import { initializeServices } from './lib/services';
import { DEBUG_PANEL_ENABLED } from './lib/debug';
import { DebugPanel } from './components/debug/DebugPanel';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <HeroSection />
      <AITipsMarquee />
      <FeaturesSection />
      <TestimonialsCarousel />
      <Footer />
    </div>
  );
};

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading YatriAI...</p>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated && user) {
    // Show appropriate dashboard based on user role
    switch (user.role) {
      case 'tourist':
        return <Navigate to="/tourist-dashboard" replace />;
      case 'admin':
        return <Navigate to="/admin-dashboard" replace />;
      case 'guide':
        return <Navigate to="/guide-dashboard" replace />;
      case 'seller':
        return <Navigate to="/marketplace-dashboard" replace />;
      default:
        return <LandingPage />;
    }
  }

  return <LandingPage />;
};


function App() {
  // Initialize external services on app startup
  useEffect(() => {
    initializeServices().then(({ status, usingMocks }) => {
      if (usingMocks) {
        console.log('📋 External Service Status:', status);
        console.log('💡 To use Beeceptor mocks, set VITE_BEECEPTOR_URL in .env.local');
      }
      
      // Log Requestly debug info
      console.log(
        '%c🔍 YatriAI Debug Mode: ' + (DEBUG_PANEL_ENABLED ? 'ENABLED' : 'DISABLED'),
        `color: ${DEBUG_PANEL_ENABLED ? '#10b981' : '#6b7280'}; font-weight: bold;`
      );
      if (DEBUG_PANEL_ENABLED) {
        console.log(
          '%c💡 Debug Panel available! Click the 🐞 button in the corner.',
          'color: #8b5cf6;'
        );
        console.log(
          '%c💡 Console commands: YatriAIDebug.toggleDebugMode(), YatriAIDebug.getRequests(), YatriAIDebug.clearRequests()',
          'color: #8b5cf6;'
        );
      }
    });

    // Add keyboard shortcut for debug panel toggle
    const handleKeydown = (e: KeyboardEvent) => {
      // Ctrl+Shift+D to toggle debug mode
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        const { toggleDebugMode } = window as any;
        if (typeof (window as any).YatriAIDebug?.toggleDebugMode === 'function') {
          (window as any).YatriAIDebug.toggleDebugMode();
          // Force re-render (in a real app, you'd use state management)
          window.location.reload();
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <div className="App">
              <Routes>
                {/* Role-based landing and redirects */}
                <Route path="/" element={<AppContent />} />

                {/* Explicit dashboard routes */}
                <Route path="/tourist-dashboard" element={<TouristDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/guide-dashboard" element={<GuideDashboard />} />
                <Route path="/marketplace-dashboard" element={<MarketplaceDashboard />} />
              </Routes>
              
              {/* Debug Panel - Only shown in development or when debug mode is enabled */}
              {DEBUG_PANEL_ENABLED && <DebugPanel />}
            </div>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
