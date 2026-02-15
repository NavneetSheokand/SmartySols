import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInview.js';

const Problem = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const problems = [
    { icon: '🐌', text: 'Slow, outdated websites' },
    { icon: '📉', text: "Apps that don't scale" },
    { icon: '⏰', text: 'Manual processes eating time' },
    { icon: '🔌', text: 'Disconnected systems' },
    { icon: '🤖', text: 'No automation strategy' },
  ];

  return (
    <section ref={ref} className="section-padding bg-gradient-dark text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid-pattern"></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-display-sm font-display font-bold mb-8">
            Most Businesses Lose Time & Revenue Because Their{' '}
            <span className="text-accent">Tech Isn't Built Right</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 mb-12">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-start gap-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <span className="text-3xl flex-shrink-0">{problem.icon}</span>
                <p className="text-left text-lg text-neutral-200">{problem.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12"
          >
            <p className="text-2xl md:text-3xl font-display font-semibold text-accent">
              That's where SmartySols comes in.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 fill-white" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Problem;