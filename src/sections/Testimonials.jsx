import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const Testimonials = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [isPaused, setIsPaused] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    review: '',
    rating: 5,
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const initialTestimonials = [
    {
      quote: "SmartySols transformed our entire workflow and reduced manual work by 60%. Their AI automation saved us countless hours weekly.",
      author: "Sarah Chen",
      role: "CEO",
      company: "TechFlow Solutions",
      rating: 5,
    },
    {
      quote: "The MERN stack platform they built scales effortlessly with our growth. Clean code, excellent architecture, and outstanding support.",
      author: "Michael Rodriguez",
      role: "CTO",
      company: "DataSync Inc",
      rating: 5,
    },
    {
      quote: "Our React Native app launched in 8 weeks with zero bugs. The team's expertise and communication made the entire process seamless.",
      author: "Emily Watson",
      role: "Founder",
      company: "HealthTrack",
      rating: 5,
    },
    {
      quote: "Outstanding AI automation that streamlined our entire sales process. Response time and quality exceeded all expectations.",
      author: "James Park",
      role: "VP Operations",
      company: "SalesForce Pro",
      rating: 5,
    },
    {
      quote: "Best development partner we've worked with. They delivered a complex React Native app ahead of schedule with incredible quality.",
      author: "Lisa Anderson",
      role: "Product Manager",
      company: "FitLife App",
      rating: 5,
    },
    {
      quote: "Their technical expertise in MERN stack is unmatched. Built us a scalable platform that handles thousands of users effortlessly.",
      author: "David Kumar",
      role: "CTO",
      company: "CloudStream",
      rating: 5,
    },
  ];

  // Duplicate testimonials for infinite scroll effect
  const [testimonials, setTestimonials] = useState([...initialTestimonials, ...initialTestimonials]);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingClick = (rating) => {
    setFormData({
      ...formData,
      rating,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add new review to the testimonials
    const newReview = {
      quote: formData.review,
      author: formData.name,
      role: formData.role,
      company: formData.company,
      rating: formData.rating,
    };

    setTestimonials(prev => [...prev, newReview, newReview]); // Add twice for scroll effect
    setSubmitStatus('success');
    setFormData({ name: '', role: '', company: '', review: '', rating: 5 });
    
    setTimeout(() => {
      setShowForm(false);
      setSubmitStatus(null);
    }, 2000);
  };

  return (
    <section id="testimonials" ref={ref} className="section-padding bg-neutral-50 overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-display-sm font-display font-bold text-neutral-900 mb-4">
            Trusted by <span className="gradient-text">Forward-Thinking Companies</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
            Real results from real clients who've transformed their business with SmartySols
          </p>

          {/* Write Review Button */}
          <motion.button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            {showForm ? 'Hide Form' : 'Write Your Review'}
          </motion.button>
        </motion.div>

        {/* Review Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="max-w-2xl mx-auto mb-16"
          >
            <div className="card p-8">
              <h3 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                Share Your Experience
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Your Role *
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                      placeholder="CEO, Developer, etc."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Your Review *
                  </label>
                  <textarea
                    name="review"
                    value={formData.review}
                    onChange={handleFormChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
                    placeholder="Tell us about your experience working with SmartySols..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Rating *
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <svg
                          className={`w-8 h-8 ${
                            star <= formData.rating ? 'text-accent' : 'text-neutral-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="w-full btn btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Review
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-accent/10 border border-accent/20 text-accent flex items-center gap-3"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Thank you! Your review has been added.</span>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        )}

        {/* Infinite Scrolling Testimonials */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-50 to-transparent z-10 pointer-events-none"></div>

          <div 
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              className="flex gap-6"
              animate={{
                x: isPaused ? undefined : [0, -1920],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[400px] card p-6 hover:shadow-brand transition-all duration-300"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-accent"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-neutral-700 leading-relaxed mb-4 line-clamp-4">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-neutral-200">
                    <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-display font-bold">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-display font-semibold text-neutral-900 text-sm">
                        {testimonial.author}
                      </div>
                      <div className="text-xs text-neutral-600">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <p className="text-center text-sm text-neutral-500 mt-6">
            Hover over reviews to pause • {testimonials.length / 2}+ satisfied clients
          </p>
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white shadow-soft">
            <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div className="text-left">
              <div className="font-display font-bold text-neutral-900 text-lg">98% Client Satisfaction</div>
              <div className="text-sm text-neutral-600">Based on {testimonials.length / 2}+ completed projects</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;