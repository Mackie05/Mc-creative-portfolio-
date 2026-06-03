import { useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { Navigation } from "./components/Navigation";
import { SmoothScroll } from "./components/SmoothScroll";
import EdgeGlow from "./components/EdgeGlow";

// Inner landing sections
import { Hero } from "./components/sections/Hero";
import { Services } from "./components/sections/Services";
import { SampleWorks } from "./components/sections/SampleWorks";
import ProcessSection from "./components/sections/ProcessSection";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/sections/Footer";

// Standalone Pages
import { WorkPage } from "./components/sections/WorkPage";
import { ProjectPage } from "./components/sections/ProjectPage";
import { ServicesSection } from "./components/sections/ServicesSection";
import { ContactPage } from "./components/sections/ContactPage";

// Dynamic routing top loader
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}

// Home container combining standard portfolio segments
function Home() {
  return (
    <div className="relative">
      <Hero />
      <Services />
      <SampleWorks />
      <ProcessSection />
      <Contact />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Router>
        <ScrollToTop />
        <SmoothScroll>
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative overflow-x-hidden selection:bg-orange-500/25">
            {/* Ambient Edge Glow elements */}
            <EdgeGlow />
            
            {/* Global Sticky Header */}
            <Navigation />

            {/* Custom routing views */}
            <main className="relative z-10 w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<WorkPage />} />
                <Route path="/work/" element={<WorkPage />} />
                <Route path="/work/:slug" element={<ProjectPage />} />
                <Route path="/services" element={<ServicesSection />} />
                <Route path="/services/" element={<ServicesSection />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/contact/" element={<ContactPage />} />
              </Routes>
            </main>

            {/* General Site footer */}
            <Footer />
          </div>
        </SmoothScroll>
      </Router>
    </ThemeProvider>
  );
}
