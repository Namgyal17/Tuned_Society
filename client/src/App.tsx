import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Consultation from './components/Consultation';
import JoinTheCult from './components/JoinTheCult';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';
import PerformanceInfo from './pages/PerformanceInfo';
import SuspensionInfo from './pages/SuspensionInfo';
import WheelsInfo from './pages/WheelsInfo';
import ExhaustInfo from './pages/ExhaustInfo';
import AestheticsInfo from './pages/AestheticsInfo';
import BrakingInfo from './pages/BrakingInfo';

function LandingPage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      {/* <Consultation /> */}
      <JoinTheCult />
    </>
  );
}

function App() {
  // Global modal opener hack to match legacy behavior
  useEffect(() => {
    (window as any).openConsultationModal = () => {
      const event = new CustomEvent('open-consultation');
      window.dispatchEvent(event);
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-primary selection:bg-accent-red selection:text-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/performance-tuning" element={<PerformanceInfo />} />
          <Route path="/suspension-handling" element={<SuspensionInfo />} />
          <Route path="/wheels-tires" element={<WheelsInfo />} />
          <Route path="/exhaust-systems" element={<ExhaustInfo />} />
          <Route path="/aesthetics-aero" element={<AestheticsInfo />} />
          <Route path="/braking-systems" element={<BrakingInfo />} />
        </Routes>
      </main>
      <Footer />
      <ConsultationModal />
    </div>
  );
}

export default App;
