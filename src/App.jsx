import { useCallback, useEffect } from "react";
import { MotionConfig } from "framer-motion";

import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import BackgroundBlobs from "./components/BackgroundBlobs";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectsPage from "./components/ProjectsPage";

import { ToastProvider, useToast } from "./components/ui/Toast";
import useKonami from "./hooks/useKonami";
import confetti from "./lib/confetti";

function Page() {
  const toast = useToast();

  /* Easter egg: Konami code → confetti rain */
  const onKonami = useCallback(() => {
    confetti(160);
    toast("🎮 Konami code accepted — +30 lives and a clean dataset!");
  }, [toast]);
  useKonami(onKonami);

  /* Easter egg: a note for dev-tools explorers */
  useEffect(() => {
    console.log("%c👋 Hey, fellow dev-tools explorer!", "font-size:16px;font-weight:bold;color:#7FA37A");
    console.log(
      "%cThis is Rantizi's portfolio — now running on React + Framer Motion. Try the Konami code 🎮",
      "color:#8A6F58"
    );
  }, []);

  return (
    <>
      <Cursor />
      <ScrollProgress />
      <BackgroundBlobs />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default function App() {
  const isProjectsPage = window.location.pathname.replace(/\/$/, "") === "/projects";

  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        {isProjectsPage ? <ProjectsPage /> : <Page />}
      </ToastProvider>
    </MotionConfig>
  );
}
