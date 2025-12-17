import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { aiTips } from '../../data/mockData';

const AITipsMarquee: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-green-600 to-orange-500 py-4 overflow-hidden">
      <div className="flex items-center space-x-4 mb-2">
        <div className="flex items-center space-x-2 px-6">
          <Sparkles className="w-5 h-5 text-white" />
          <span className="text-white font-medium">AI Travel Tips</span>
        </div>
      </div>
      
      <div className="relative">
        <motion.div
          animate={{ x: [0, -100 * aiTips.length] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex space-x-8 whitespace-nowrap"
        >
          {[...aiTips, ...aiTips].map((tip, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 text-white px-6"
            >
              <span className="text-lg">{tip.split(' ')[0]}</span>
              <span className="text-sm">{tip.substring(tip.indexOf(' ') + 1)}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AITipsMarquee;