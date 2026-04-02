import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Playground from './components/Playground';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';

function App() {
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  return (
    <main className="min-h-[100dvh] bg-[#050505] w-full">
      <CustomCursor />
      {/* Noise Overlay for editorial texture */}
      <div
        className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
      />

      <Navbar isVideoEnded={isVideoEnded} />
      <Hero onVideoEnd={() => setIsVideoEnded(true)} />
      <Projects />
      <Testimonials />
      <Playground />
      <Contact />
    </main>
  );
}

export default App;
