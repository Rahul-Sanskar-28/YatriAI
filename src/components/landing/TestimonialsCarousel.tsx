import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { testimonials } from '../../data/mockData';
import { Marquee } from '../magicui/Marquee';
import { BlurFade } from '../magicui/BlurFade';
import { AnimatedGradientText } from '../magicui/AnimatedGradientText';
import { MagicCard } from '../magicui/MagicCard';

const TestimonialCard = ({ testimonial, index }: { testimonial: any; index: number }) => {
  return (
    <MagicCard
      className="w-[350px] mx-4 flex-shrink-0"
      gradientColor="#22c55e"
      gradientOpacity={0.1}
    >
      <div className="p-6">
        <Quote className="w-8 h-8 text-green-500/30 mb-4" />
        
        <div className="flex items-center space-x-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
          {[...Array(5 - testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-gray-300 dark:text-gray-600" />
          ))}
        </div>
        
        <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-sm">
          "{testimonial.comment}"
        </blockquote>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-green-200 dark:border-green-700"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="font-semibold text-gray-900 dark:text-white text-sm">
              {testimonial.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {testimonial.location}
            </div>
          </div>
          
          <div className="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
            {testimonial.sentiment}
          </div>
        </div>
      </div>
    </MagicCard>
  );
};

const TestimonialsCarousel: React.FC = () => {
  // Ensure we have enough testimonials for the marquee
  const allTestimonials = [...testimonials, ...testimonials];
  const firstRow = allTestimonials.slice(0, allTestimonials.length / 2);
  const secondRow = allTestimonials.slice(allTestimonials.length / 2);

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gradient-to-r from-green-500/10 to-transparent rounded-full blur-3xl transform -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-to-l from-orange-500/10 to-transparent rounded-full blur-3xl transform -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <BlurFade delay={0.1} inView>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 mb-6">
              <span className="text-2xl">💬</span>
              <span className="text-orange-700 dark:text-orange-300 text-sm font-medium">Real Reviews from Real Travelers</span>
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              What Our{' '}
              <AnimatedGradientText>Travelers</AnimatedGradientText>
              {' '}Say
            </h2>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Real experiences from real travelers, powered by AI sentiment analysis
            </p>
          </BlurFade>
        </div>
      </div>

      {/* Marquee Testimonials */}
      <div className="relative">
        {/* Gradient overlays for smooth fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />
        
        <Marquee pauseOnHover speed={50} className="py-4">
          {firstRow.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </Marquee>
        
        <Marquee reverse pauseOnHover speed={50} className="py-4">
          {secondRow.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </Marquee>
      </div>

      {/* Trust indicators */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <BlurFade delay={0.5} inView>
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {testimonials.slice(0, 4).map((t, i) => (
                  <img
                    key={i}
                    src={t.avatar}
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900"
                  />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                <span className="font-semibold text-gray-900 dark:text-white">10,000+</span> happy travelers
              </span>
            </div>
            
            <div className="h-8 w-px bg-gray-300 dark:bg-gray-700 hidden md:block" />
            
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                <span className="font-semibold text-gray-900 dark:text-white">4.9/5</span> average rating
              </span>
            </div>
            
            <div className="h-8 w-px bg-gray-300 dark:bg-gray-700 hidden md:block" />
            
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span><span className="font-semibold text-gray-900 dark:text-white">AI-verified</span> authentic reviews</span>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
