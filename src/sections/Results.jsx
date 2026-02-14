import { motion } from 'framer-motion';
import { useInView, useCountUp } from '../hooks/useInView';

const Results = () => {
  const [ref, isInView] = useInView({ threshold: 0.3 });

  const outcomes = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Faster product launches',
      description: 'Ship quality products in weeks, not months',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Reduced operational cost',
      description: 'Eliminate inefficiencies and redundant processes',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      title: 'Scalable architecture',
      description: 'Systems that grow with your business needs',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      ),
      title: 'Better user experience',
      description: 'Intuitive interfaces that users love',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'AI-driven efficiency',
      description: 'Automate repetitive tasks and focus on growth',
    },
  ];

  const stats = [
    { number: 12, suffix: '+', label: 'Projects Delivered' },
    { number: 15, suffix: '+', label: 'Automation Workflows Built' },
    { number: 99, suffix: '%', label: 'Client Satisfaction' },
  ];

  return (
    <section ref={ref} className="section-padding bg-neutral-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-display-sm font-display font-bold text-neutral-900 mb-4">
            What Working With <span className="gradient-text">SmartySols</span> Means for You
          </h2>
        </motion.div>

        {/* Outcomes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-brand text-white flex items-center justify-center">
                {outcome.icon}
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2">
                  {outcome.title}
                </h3>
                <p className="text-neutral-600">{outcome.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              number={stat.number}
              suffix={stat.suffix}
              label={stat.label}
              isInView={isInView}
              delay={index * 0.2}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const StatCounter = ({ number, suffix, label, isInView, delay }) => {
  const count = useCountUp(number, 2000, isInView);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="text-center p-8 rounded-2xl bg-white shadow-soft"
    >
      <div className="text-5xl md:text-6xl font-display font-bold gradient-text mb-2">
        {count}{suffix}
      </div>
      <div className="text-lg text-neutral-600 font-medium">{label}</div>
    </motion.div>
  );
};

export default Results;