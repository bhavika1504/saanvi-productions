import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Events } from '@/components/Events';
import { CastingForm } from '@/components/CastingForm';
import { Portfolio } from '@/components/Portfolio';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { AdminLoginModal } from '@/components/AdminLoginModal';
import { FloatingElements } from '@/components/FloatingElements';

const Index = () => {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingElements />
      <Navbar onAdminClick={() => setIsAdminModalOpen(true)} />
      <main className="relative z-10">
        <Hero />
        <Services />
        <Events />
        <CastingForm />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
};

export default Index;
