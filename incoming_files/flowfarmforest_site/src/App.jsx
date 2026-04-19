import React, { Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Home from './pages/Home';
const Location = React.lazy(() => import('./pages/Location'));
const InquiryPage = React.lazy(() => import('./pages/InquiryPage'));
const AllPhotosGallery = React.lazy(() => import('./components/property/cinematic/AllPhotosGallery'));
const PhotoGallery = React.lazy(() => import('./pages/PhotoGallery'));
import { ReactLenis } from '@studio-freight/react-lenis';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/transitions/PageTransition';
import AmbientOverlay from './components/transitions/AmbientOverlay';

const AuthenticatedApp = () => {
  const location = useLocation();
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Send GA4 page_view on SPA route changes
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_location: window.location.href,
        page_path: location.pathname,
        page_title: document.title,
      });
    }
  }, [location.pathname]);

  // Prefetch route chunks after first paint to speed up navigation
  useEffect(() => {
    const warm = async () => {
      await Promise.all([
        import('./pages/Location'),
        import('./pages/InquiryPage'),
        import('./components/property/cinematic/AllPhotosGallery'),
        import('./pages/PhotoGallery'),
      ]);
    };
    warm();
  }, []);


  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return <div style={{ padding: 40, background: 'orange', color: 'black' }}>AUTH REQUIRED</div>;
    }
  }

  // Render the main app
  return (
    <>
      <Suspense fallback={null}>
      <AmbientOverlay />
      <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/Home" element={<Navigate to="/" replace />} />
        <Route path="/Location" element={<PageTransition><Location /></PageTransition>} />



        <Route path="/inquiry" element={<PageTransition><InquiryPage /></PageTransition>} />
        <Route path="/estate-at-a-glance" element={<PageTransition><PhotoGallery /></PageTransition>} />
        <Route path="/all-photos" element={<PageTransition><AllPhotosGallery /></PageTransition>} />

        <Route path="*" element={<PageTransition><PageNotFound /></PageTransition>} />
      </Routes>
      </AnimatePresence>
      </Suspense>
    </>
  );
}


function App() {


  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.0, smoothWheel: true, smoothTouch: false, wheelMultiplier: 0.9, normalizeWheel: true }}>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <BrowserRouter>
            <AuthenticatedApp />
          </BrowserRouter>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </ReactLenis>
  )
}

export default App