import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CyberBackground } from './components/CyberBackground';
import { ScrollToTop } from './components/ScrollToTop';
import { LoadingScreen } from './components/LoadingScreen';

// Pages
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Events = lazy(() => import('./pages/Events').then(m => ({ default: m.Events })));
const EventDetails = lazy(() => import('./pages/EventDetails').then(m => ({ default: m.EventDetails })));
const Register = lazy(() => import('./pages/Register').then(m => ({ default: m.Register })));
const OwnerPortal = lazy(() => import('./pages/OwnerPortal').then(m => ({ default: m.OwnerPortal })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#040e0a] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white font-sans antialiased overflow-x-hidden">
        {/* Scroll handler */}
        <ScrollToTop />

        {/* Global 3D Cyber background canvas */}
        <CyberBackground />

        {/* Top Navigation */}
        <Navbar />

        {/* Main Routed Content */}
        <main className="flex-1 w-full relative z-10">
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/register" element={<Register />} />
              <Route path="/owner" element={<OwnerPortal />} />
              <Route path="/admin" element={<OwnerPortal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
