import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { LoadingProvider, useLoading } from './contexts/LoadingContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HeroSection from './components/landing/HeroSection';
import AITipsMarquee from './components/landing/AITipsMarquee';
import TestimonialsCarousel from './components/landing/TestimonialsCarousel';
import FeaturesSection from './components/landing/FeaturesSection';
import HeritageSection from './components/landing/HeritageSection';
import PujoSection from './components/landing/PujoSection';
import ArtisansSection from './components/landing/ArtisansSection';
import SectionTransition from './components/common/SectionTransition';
import TouristDashboard from './components/dashboard/TouristDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import GuideDashboard from './components/dashboard/GuideDashboard';
import MarketplaceDashboard from './components/dashboard/MarketplaceDashboard';
import DestinationSearch from './components/common/DestinationSearch';
import TranslateTest from './components/common/TranslateTest';
import LoadingDemo from './components/common/LoadingDemo';
import InteractiveLoader from './components/common/InteractiveLoader';
import InitialLoader from './components/common/InitialLoader';
import { initializeServices } from './lib/services';
import { DEBUG_PANEL_ENABLED } from './lib/debug';
import { DebugPanel } from './components/debug/DebugPanel';
import './lib/utils/translateDebug';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <HeroSection />
      <SectionTransition direction="right" delay={0.1} duration={0.6}>
        <AITipsMarquee />
      </SectionTransition>
      <SectionTransition direction="scale" delay={0.2} duration={1} threshold={0.15}>
        <HeritageSection />
      </SectionTransition>
      <SectionTransition direction="left" delay={0.1} duration={0.8} staggerChildren={true} staggerDelay={0.15}>
        <PujoSection />
      </SectionTransition>
      <SectionTransition direction="up" delay={0.3} duration={0.9} threshold={0.2}>
        <ArtisansSection />
      </SectionTransition>
      <SectionTransition direction="fade" delay={0.2} duration={1} staggerChildren={true} staggerDelay={0.2}>
        <FeaturesSection />
      </SectionTransition>
      <SectionTransition direction="scale" delay={0.2} duration={0.8}>
        <TestimonialsCarousel />
      </SectionTransition>
      <SectionTransition direction="down" delay={0.1} duration={0.7}>
        <Footer />
      </SectionTransition>
    </div>
  );
};

const LoadingScreen: React.FC = () => {
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(true, 'Initializing YatriAI...');
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [setLoading]);

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
  const { setLoading } = useLoading();

  useEffect(() => {
    if (isLoading) setLoading(true, 'Authenticating user...');
    else setLoading(false);
  }, [isLoading, setLoading]);

  if (isLoading) return <LoadingScreen />;

  if (isAuthenticated && user) {
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
  const [showInitialLoader, setShowInitialLoader] = useState(true);

  const handleInitialLoadComplete = () => setShowInitialLoader(false);

  // Initialize external services once on startup
  useEffect(() => {
    initializeServices().then(({ status, usingMocks, usingAxicov, usingN8n, usingElevenLabs, usingDodoPayments, usingBlockchain, analyticsEnabled }) => {
      console.log('📋 External Service Status:', status);
      if (usingAxicov) console.log('🤖 AI agents powered by Axicov - https://axicov.com');
      if (usingN8n) console.log('⚡ Workflow automation powered by n8n');
      if (usingElevenLabs) console.log('🎙️ Voice AI powered by ElevenLabs - https://elevenlabs.io');
      if (usingDodoPayments) console.log('💳 Payments powered by Dodo Payments - https://dodopayments.com');
      if (usingBlockchain) console.log('⛓️ Blockchain verification powered by ETHIndia');
      if (analyticsEnabled) console.log('📊 Analytics tracking enabled');
      if (usingMocks) {
        console.log('💡 Tips:');
        console.log('   - Set VITE_BEECEPTOR_URL for API mocking');
        console.log('   - Set VITE_USE_AXICOV=true for AI agents');
        console.log('   - Set VITE_USE_N8N=true for workflow automation');
        console.log('   - Set VITE_ELEVENLABS_API_KEY for premium voice');
        console.log('   - Set VITE_DODO_PUBLIC_KEY for Dodo Payments');
        console.log('   - Set VITE_USE_REAL_BLOCKCHAIN=true for Ethereum');
      }
      console.log(
        '%c🔍 YatriAI Debug Mode: ' + (DEBUG_PANEL_ENABLED ? 'ENABLED' : 'DISABLED'),
        `color: ${DEBUG_PANEL_ENABLED ? '#10b981' : '#6b7280'}; font-weight: bold;`
      );
      if (DEBUG_PANEL_ENABLED) {
        console.log('%c💡 Debug Panel available! Click the 🐞 button in the corner.', 'color: #8b5cf6;');
        console.log('%c💡 Console commands: YatriAIDebug.toggleDebugMode(), YatriAIDebug.getRequests(), YatriAIDebug.clearRequests()', 'color: #8b5cf6;');
      }
    });

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        if (typeof (window as any).YatriAIDebug?.toggleDebugMode === 'function') {
          (window as any).YatriAIDebug.toggleDebugMode();
          window.location.reload();
        }
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  if (showInitialLoader) {
    return <InitialLoader onComplete={handleInitialLoadComplete} minLoadingTime={1500} />;
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <LoadingProvider>
          <AuthProvider>
            <Router>
              <div className="App">
                <AppWithLoader />
              </div>
            </Router>
          </AuthProvider>
        </LoadingProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

const AppWithLoader: React.FC = () => {
  const { isLoading, loadingText, progress, showProgress } = useLoading();

  return (
    <>
      <InteractiveLoader
        isLoading={isLoading}
        loadingText={loadingText}
        progress={progress}
        showProgress={showProgress}
      />

      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/search" element={<DestinationSearch />} />
        <Route path="/tourist-dashboard" element={<TouristDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/guide-dashboard" element={<GuideDashboard />} />
        <Route path="/marketplace-dashboard" element={<MarketplaceDashboard />} />
        <Route path="/translate-test" element={<TranslateTest />} />
        <Route path="/loading-demo" element={<LoadingDemo />} />
        <Route path="/:lang" element={<AppContent />} />
        <Route path="/:lang/dashboard" element={<AppContent />} />
      </Routes>

      {DEBUG_PANEL_ENABLED && <DebugPanel />}
    </>
  );
};

export default App;
