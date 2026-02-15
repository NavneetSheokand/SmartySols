import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInview.js';

const Services = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const services = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'React Native App Development',
      description: 'Cross-platform mobile apps built for performance and growth.',
      features: [
        'iOS & Android from single codebase',
        'Native performance & UX',
        'Scalable architecture',
        'App Store deployment support',
      ],
      gradient: 'from-accent to-secondary',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'MERN Stack Web Development',
      description: 'Modern, scalable, secure web platforms built with clean architecture.',
      features: [
        'MongoDB, Express, React, Node.js',
        'RESTful API design',
        'Authentication & security',
        'Cloud deployment & CI/CD',
      ],
      gradient: 'from-primary to-secondary',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'AI Automation Systems',
      description: 'Automate workflows, integrate tools, and eliminate manual bottlenecks using intelligent AI systems.',
      features: [
        'Workflow automation',
        'AI-powered chatbots',
        'CRM & tool integration',
        'Custom AI solutions',
      ],
      gradient: 'from-secondary to-accent',
    },
  ];

  return (
    <section id="services" ref={ref} className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-display-sm font-display font-bold text-neutral-900 mb-4">
            We Engineer Smart Digital Systems —{' '}
            <span className="gradient-text">Not Just Code</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Premium solutions built with modern technology and strategic thinking
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Card */}
              <div className="h-full card card-hover p-8 relative overflow-hidden">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                {/* Icon with gradient background */}
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5 mb-6 relative z-10`}>
                  <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center text-primary">
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-display font-bold text-neutral-900 mb-3 relative z-10">
                  {service.title}
                </h3>
                <p className="text-neutral-600 mb-6 leading-relaxed relative z-10">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 relative z-10">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover Arrow */}
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                  className="mt-6 flex items-center gap-2 text-accent font-semibold relative z-10"
                >
                  <span>Learn more</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.a
            href="#contact"
            className="btn btn-primary text-lg px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get a Custom Proposal →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;