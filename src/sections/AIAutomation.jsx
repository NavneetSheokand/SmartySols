import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const AIAutomation = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const aiSolutions = [
    {
      title: 'AI Workflow Systems',
      description: 'End-to-end automation of complex business processes',
      icon: '⚡',
    },
    {
      title: 'CRM Automation',
      description: 'Smart customer relationship management with AI insights',
      icon: '🎯',
    },
    {
      title: 'Lead Qualification Bots',
      description: 'Intelligent chatbots that qualify and nurture leads 24/7',
      icon: '🤖',
    },
    {
      title: 'Business Intelligence Dashboards',
      description: 'Real-time data visualization and predictive analytics',
      icon: '📊',
    },
    {
      title: 'Custom AI Integrations',
      description: 'Seamlessly connect AI capabilities to your existing tools',
      icon: '🔌',
    },
  ];

  return (
    <section id="ai-automation" ref={ref} className="section-padding bg-gradient-to-br from-primary via-secondary to-primary-dark text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 -right-32 w-96 h-96 border border-white/30 rounded-full"
        ></motion.div>
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-32 -left-32 w-96 h-96 border border-white/30 rounded-full"
        ></motion.div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-display-sm font-display font-bold mb-6">
              Don't Just Build. <span className="text-accent">Automate & Scale.</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              We don't just code features — we engineer intelligent systems that think, 
              learn, and optimize your business operations automatically.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center text-2xl">
                  ⏱️
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Save 20+ Hours Weekly</h4>
                  <p className="text-white/80">Automate repetitive tasks and focus on strategic growth</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center text-2xl">
                  💡
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Data-Driven Decisions</h4>
                  <p className="text-white/80">AI-powered insights to guide your business strategy</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center text-2xl">
                  🚀
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Scale Without Limits</h4>
                  <p className="text-white/80">Systems that grow with your business automatically</p>
                </div>
              </div>
            </div>

            <motion.a
              href="#contact"
              className="btn bg-accent hover:bg-accent-dark text-white inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore AI Solutions
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Right Content - AI Solutions Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {aiSolutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                whileHover={{ x: 10 }}
                className="flex items-start gap-4 p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className="text-4xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  {solution.icon}
                </div>
                <div>
                  <h4 className="font-display font-semibold text-lg mb-1">{solution.title}</h4>
                  <p className="text-white/80 text-sm">{solution.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-4xl font-display font-bold text-accent mb-2">60%</div>
            <div className="text-white/80">Average time saved through automation</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-4xl font-display font-bold text-accent mb-2">24/7</div>
            <div className="text-white/80">AI systems working for your business</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-4xl font-display font-bold text-accent mb-2">3x</div>
            <div className="text-white/80">ROI within first 6 months</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIAutomation;