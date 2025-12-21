import React from 'react';
import { Sparkles } from 'lucide-react';
import { Marquee } from '../magicui/Marquee';

// Kolkata-themed AI tips
const kolkataTips = [
  "🚃 Tram Route 36 passes through the most heritage spots - perfect for a vintage tour!",
  "🪔 Best Durga Puja pandals are in South Kolkata - start at Ekdalia Evergreen",
  "☕ For authentic adda, visit Indian Coffee House on College Street since 1942",
  "🎭 Kumartuli artisans start work on idols 4 months before Pujo - visit in July!",
  "📚 College Street has the largest second-hand book market in the world",
  "🌅 Princep Ghat sunset views are magical - arrive 30 mins before sunset",
  "🍛 Try Arsalan's biryani or 6 Ballygunge Place for authentic Bengali cuisine",
  "🏛️ Victoria Memorial is best visited early morning to avoid crowds",
  "🚕 Yellow taxis follow meter + ₹10 rule for short distances in the city",
  "🎨 Jorasanko Thakur Bari has Tagore's original artworks - don't miss it!",
  "🛕 Kalighat Temple allows short visits - go during aarti for the experience",
  "🌉 Howrah Bridge carries 100,000 vehicles daily - walk across at dawn!",
  "🎪 Park Street transforms during Christmas - best visited after 7 PM",
  "🎵 Rabindra Sadan hosts classical concerts - check schedule for baul performances",
  "🍰 Don't leave without trying mishti doi and sandesh from Balaram Mullick",
];

const TipCard = ({ tip, index }: { tip: string; index: number }) => {
  const emoji = tip.split(' ')[0];
  const text = tip.substring(tip.indexOf(' ') + 1);
  
  return (
    <div className="flex items-center gap-3 px-5 py-3 mx-2 bg-white/10 backdrop-blur-sm rounded-full border border-kolkata-gold/30 hover:bg-kolkata-yellow/20 transition-all duration-300 group cursor-default">
      <span className="text-xl group-hover:scale-110 transition-transform">{emoji}</span>
      <span className="text-white text-sm font-medium whitespace-nowrap">{text}</span>
    </div>
  );
};

const AITipsMarquee: React.FC = () => {
  // Create duplicate tips for seamless looping
  const allTips = [...kolkataTips, ...kolkataTips];

  return (
    <div className="relative bg-gradient-to-r from-kolkata-yellow via-kolkata-terracotta to-durga-500 py-6 overflow-hidden">
      {/* Animated background pattern - Alpona style */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Gradient overlays for smooth fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-kolkata-yellow to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-durga-500 to-transparent z-10 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-4 relative z-20">
        <div className="flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
          <Sparkles className="w-4 h-4 text-white animate-pulse" />
          <span className="text-white font-semibold text-sm">AI Kolkata Tips</span>
          <span className="text-xs font-bengali text-white/80">কলকাতা টিপস</span>
          <span className="px-2 py-0.5 bg-white/20 text-white text-xs rounded-full">Live</span>
        </div>
      </div>
      
      {/* Marquee */}
      <Marquee pauseOnHover speed={30} className="relative z-0">
        {allTips.map((tip, index) => (
          <TipCard key={index} tip={tip} index={index} />
        ))}
      </Marquee>

      {/* Bottom subtle decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  );
};

export default AITipsMarquee;
