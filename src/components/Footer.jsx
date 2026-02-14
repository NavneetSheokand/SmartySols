import { motion } from 'framer-motion';
import logo from "../assets/logo.png"

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Services: [
      { name: 'React Native Development', href: '#services' },
      { name: 'MERN Stack Development', href: '#services' },
      { name: 'AI Automation', href: '#ai-automation' },
      { name: 'Custom Solutions', href: '#contact' },
    ],
    Company: [
      { name: 'About Us', href: '#hero' },
      { name: 'Our Process', href: '#process' },
      { name: 'Case Studies', href: '#testimonials' },
      { name: 'Contact', href: '#contact' },
    ],
    Resources: [
      { name: 'Blog', href: '#' },
      { name: 'Documentation', href: '#' },
      { name: 'Support', href: '#' },
      { name: 'FAQs', href: '#' },
    ],
  };

  
   const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/navneet-sheokand-759360259/',
    icon: (
       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"> 
       <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/> 
       </svg>
        ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/smarty_sols',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7.75 2C4.575 2 2 4.575 2 7.75v8.5C2 19.425 4.575 22 7.75 22h8.5C19.425 22 22 19.425 22 16.25v-8.5C22 4.575 19.425 2 16.25 2h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm4.75-2.75a1 1 0 110 2 1 1 0 010-2z"/>
      </svg>
    ),
  },
];


  return (
    <footer className="bg-gradient-dark text-white pt-20 pb-10">
      <div className="container-custom">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img 
  src={logo} 
  alt="SmartySols Logo"
  className="h-20 w-auto"
/>

              <p className="text-neutral-300 mb-6 leading-relaxed max-w-md">
                Building scalable apps, high-performance websites, and AI automation systems 
                for ambitious companies worldwide.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-accent flex items-center justify-center transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="font-display font-semibold text-lg mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-neutral-300 hover:text-accent transition-colors duration-200 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-neutral-400 text-sm"
          >
            © {currentYear} SmartySols. All rights reserved.
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-6 text-sm text-neutral-400"
          >
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">Cookies</a>
          </motion.div>
        </div>

        {/* Made with love badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <p className="text-neutral-500 text-sm flex items-center justify-center gap-2">
            Made with 
            <svg className="w-4 h-4 text-accent animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            by SmartySols Team
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;