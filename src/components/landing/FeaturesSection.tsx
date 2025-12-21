import React from 'react';
import { Brain, Shield, Map, ShoppingBag, Users, Smartphone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { MagicCard } from '../magicui/MagicCard';
import { BorderBeam } from '../magicui/BorderBeam';
import { BlurFade } from '../magicui/BlurFade';
import { AnimatedGradientText } from '../magicui/AnimatedGradientText';
import { ShimmerButton } from '../magicui/ShimmerButton';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Itinerary',
      description: 'Get personalized travel plans based on your preferences, budget, and interests',
      color: 'from-purple-500 to-pink-500',
      gradient: '#a855f7'
    },
    {
      icon: Shield,
      title: 'Blockchain Verification',
      description: 'Trust verified guides and services with our secure blockchain certification system',
      color: 'from-blue-500 to-cyan-500',
      gradient: '#3b82f6'
    },
    {
      icon: Map,
      title: 'Interactive Maps',
      description: 'Explore destinations with real-time location tracking and offline map support',
      color: 'from-green-500 to-emerald-500',
      gradient: '#22c55e'
    },
    {
      icon: ShoppingBag,
      title: 'Authentic Marketplace',
      description: 'Shop for genuine tribal handicrafts and local products from verified sellers',
      color: 'from-orange-500 to-red-500',
      gradient: '#f97316'
    },
    {
      icon: Users,
      title: 'Local Guide Network',
      description: 'Connect with certified local guides who know the hidden gems of Jharkhand',
      color: 'from-indigo-500 to-purple-500',
      gradient: '#6366f1'
    },
    {
      icon: Smartphone,
      title: 'Multilingual Support',
      description: 'Access the platform in English, Hindi, and local tribal languages',
      color: 'from-teal-500 to-green-500',
      gradient: '#14b8a6'
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <BlurFade delay={0.1} inView>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-green-700 dark:text-green-300 text-sm font-medium">Powered by Advanced AI</span>
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose{' '}
              <AnimatedGradientText>YatriAI?</AnimatedGradientText>
            </h2>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Experience the future of travel with our cutting-edge AI technology and 
              blockchain-secured services designed specifically for Jharkhand tourism.
            </p>
          </BlurFade>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <BlurFade key={index} delay={0.1 * index} inView>
                <MagicCard 
                  className="h-full"
                  gradientColor={feature.gradient}
                  gradientOpacity={0.15}
                >
                  <div className="relative p-8 h-full">
                    {/* Border Beam Effect */}
                    <BorderBeam 
                      size={250}
                      duration={12}
                      delay={index * 2}
                      colorFrom={feature.gradient}
                      colorTo="#f97316"
                    />

                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                      {feature.description}
                    </p>

                    <motion.a
                      href="#"
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                    >
                      Learn more
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  </div>
                </MagicCard>
              </BlurFade>
            );
          })}
        </div>

        {/* Stats Section */}
        <BlurFade delay={0.6} inView>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Destinations', icon: '🗺️' },
              { value: '200+', label: 'Local Guides', icon: '👨‍🏫' },
              { value: '10K+', label: 'Happy Travelers', icon: '😊' },
              { value: '1000+', label: 'Handicrafts', icon: '🏺' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </BlurFade>

        {/* Call to Action */}
        <BlurFade delay={0.8} inView>
          <div className="text-center mt-20">
            <ShimmerButton
              shimmerColor="#ffffff"
              background="linear-gradient(135deg, #16a34a 0%, #ea580c 100%)"
              className="text-lg px-10 py-5"
            >
              <span>Start Your Journey Today</span>
              <ArrowRight className="w-5 h-5" />
            </ShimmerButton>
            
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
              No credit card required • Free AI itinerary included
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};

export default FeaturesSection;
