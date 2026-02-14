import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Problem from './sections/Problem';
import Services from './sections/Services';
import Results from './sections/Results';
import Process from './sections/Process';
import AIAutomation from './sections/AIAutomation';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';

function App() {
  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="App min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Services />
        <Results />
        <Process />
        <AIAutomation />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;