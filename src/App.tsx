import { useEffect, useState } from 'react';
import { useMotionValue } from 'framer-motion';
import DiagnosticApp from './diagnostic/DiagnosticApp';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Diagnosis from './components/Diagnosis';
import Implementations from './components/Implementations';
import GrowthSprint from './components/GrowthSprint';
import AudienceFit from './components/AudienceFit';
import FreeDiagnosis from './components/FreeDiagnosis';
import ConnectedOperation from './components/ConnectedOperation';
import PositioningStatement from './components/PositioningStatement';
import Faq from './components/Faq';
import FinalCta from './components/FinalCta';
import Process from './components/Process';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  const navOpacity = useMotionValue(1);
  const [isDiagnostic, setIsDiagnostic] = useState(() => window.location.hash === '#/diagnostico');

  useEffect(() => {
    const syncRoute = () => setIsDiagnostic(window.location.hash === '#/diagnostico');
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  if (isDiagnostic) {
    return <DiagnosticApp onBackToDeck={() => { window.location.hash = ''; }} />;
  }

  return (
    <main className="min-h-[100dvh] bg-[#030304] w-full">
      <div
        className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
      />

      <Navbar opacity={navOpacity} />
      <Hero />
      <About />
      <Diagnosis />
      <Process />
      <Implementations />
      <GrowthSprint />
      <AudienceFit />
      <FreeDiagnosis />
      <ConnectedOperation />
      <PositioningStatement />
      <Faq />
      <FinalCta />
      <FloatingWhatsApp />
    </main>
  );
}

export default App;
