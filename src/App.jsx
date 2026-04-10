import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Blogs from './sections/Blogs';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ScrollToTop from './components/ScrollToTop';
import AdminBlog from './pages/AdminBlog';
import AdminLogin from './pages/AdminLogin';

function LandingPage() {
  return (
    <main>
      <Hero />
      <Problem />
      <Services />
      <Results />
      <Process />
      <AIAutomation />
      <Blogs />
      <Testimonials />
      <Contact />
    </main>
  );
}

function App() {

  useEffect(() => {
  document.title = "AI Automation Services & Web Development | SmartySols";
}, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);


  return (
    <Router>
      <ScrollToTop />
      <div className="App min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
         <Route path="/admin" element={<AdminBlog />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blogs/:slug" element={<BlogPostPage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;