import { useState, lazy, Suspense, useRef } from 'react';
import { useInView } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import GHero from '@/components/GHero';
import { Services } from '@/components/Services';
import { Portfolio } from '@/components/Portfolio';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { FloatingElements } from '@/components/FloatingElements';
import { PageLoader } from '@/components/PageLoader';

// Lazy load heavy components (especially those using Firebase)
const Events = lazy(() => import('@/components/Events').then(module => ({ default: module.Events })));
const AdminLoginModal = lazy(() => import('@/components/AdminLoginModal').then(module => ({ default: module.AdminLoginModal })));

const Index = () => {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const eventsRef = useRef(null);
  const isEventsInView = useInView(eventsRef, { once: true, margin: "200px" });

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingElements />
      <Navbar onAdminClick={() => setIsAdminModalOpen(true)} />
      <main className="relative z-10">
        <GHero />
        <Services />
        <div ref={eventsRef} className="min-h-10">
          {isEventsInView && (
            <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><PageLoader /></div>}>
              <Events />
            </Suspense>
          )}
        </div>
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <AdminLoginModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
        />
      </Suspense>
    </div>
  );
};

export default Index;
