import { useRef, useState } from 'react';

import Nav from './components/Nav';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import About from './components/About';
import Research from './components/Research';
import Work from './components/Work';
import Projects from './components/Projects';
import Stack from './components/Stack';
import Log from './components/Log';
import Education from './components/Education';
import Certs from './components/Certs';
import Contact from './components/Contact';
import ProjectModal from './components/ProjectModal';
import Viggy from './components/Viggy';
import ChatPanel from './components/ChatPanel';

import {
  useScrollReveal,
  useActiveSection,
  useNeuralCanvas,
  useTokenRain,
} from './hooks';

const SECTION_IDS = [
  'top', 'about', 'research', 'work', 'projects',
  'stack', 'log', 'education', 'certs', 'contact',
];

export default function App() {
  const canvasRef = useRef(null);
  const tokenRainRef = useRef(null);
  const [openProjectKey, setOpenProjectKey] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);

  // Wire up everything
  useScrollReveal();
  useNeuralCanvas(canvasRef);
  useTokenRain(tokenRainRef);
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <>
      <canvas id="neural-bg" ref={canvasRef} aria-hidden="true" />
      <div className="token-rain" ref={tokenRainRef} aria-hidden="true" />

      <Nav activeSection={activeSection} />
      <Hero />
      <Ticker />
      <About />
      <Research />
      <Work />
      <Projects onOpenProject={setOpenProjectKey} />
      <Stack />
      <Log />
      <Education />
      <Certs />
      <Contact />

      <ProjectModal openKey={openProjectKey} onClose={() => setOpenProjectKey(null)} />
      <Viggy
        activeSection={activeSection}
        onOpenProject={setOpenProjectKey}
        onOpenChat={() => setChatOpen(true)}
      />
      <ChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
