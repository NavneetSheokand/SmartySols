import { motion } from 'framer-motion';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-accent/5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-accent/10 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-secondary/10 to-transparent blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-50"></div>
        
        {/* Floating Orbs */}
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-brand opacity-10 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        ></motion.div>
      </div>

      <div className="container-custom relative z-10 py-20 lg:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center"
        >
          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-display-md font-display font-bold text-neutral-900 mb-6 leading-tight"
          >
            We Build Scalable Apps,{' '}
            <span className="gradient-text">High-Performance Websites</span>{' '}
            & AI Automation Systems That Grow Your Business
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl lg:text-2xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            From React Native mobile apps to MERN stack platforms and AI-powered automation — 
            SmartySols helps ambitious companies build faster, smarter, and more efficiently.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.a
              href="#contact"
              className="btn btn-primary text-lg px-8 py-4 shadow-brand-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px -15px rgba(69, 196, 176, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Free Strategy Call
            </motion.a>
            <motion.a
              href="#services"
              className="btn btn-secondary text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See Our Services
            </motion.a>
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm md:text-base text-neutral-600"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Trusted by startups & growing businesses</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>100% custom-built solutions</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>AI-first approach</span>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-neutral-400"
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;