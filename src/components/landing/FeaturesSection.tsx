import React from 'react';
import { Brain, Shield, Map, ShoppingBag, Users, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Itinerary',
      description: 'Get personalized travel plans based on your preferences, budget, and interests',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Blockchain Verification',
      description: 'Trust verified guides and services with our secure blockchain certification system',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Map,
      title: 'Interactive Maps',
      description: 'Explore destinations with real-time location tracking and offline map support',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: ShoppingBag,
      title: 'Authentic Marketplace',
      description: 'Shop for genuine tribal handicrafts and local products from verified sellers',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Users,
      title: 'Local Guide Network',
      description: 'Connect with certified local guides who know the hidden gems of Jharkhand',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Smartphone,
      title: 'Multilingual Support',
      description: 'Access the platform in English, Hindi, and local tribal languages',
      color: 'from-teal-500 to-green-500'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Why Choose YatriAI?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            Experience the future of travel with our cutting-edge AI technology and 
            blockchain-secured services designed specifically for Jharkhand tourism.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect Background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <button className="bg-gradient-to-r from-green-600 to-orange-500 text-white px-8 py-4 rounded-xl text-lg font-medium hover:from-green-700 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Start Your Journey Today
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;