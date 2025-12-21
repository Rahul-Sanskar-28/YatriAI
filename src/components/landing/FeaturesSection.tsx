import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { MagicCard } from '../magicui/MagicCard';
import { BorderBeam } from '../magicui/BorderBeam';
import { BlurFade } from '../magicui/BlurFade';
import { AnimatedGradientText } from '../magicui/AnimatedGradientText';
import { ShimmerButton } from '../magicui/ShimmerButton';
import { 
  TramIcon, 
  DurgaIcon, 
  VictoriaMemorialIcon, 
  TerracottaIcon, 
  BookIcon, 
  AddaTeaIcon,
  PatachitraIcon,
  GhatIcon
} from '../kolkata/KolkataIcons';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      Icon: TramIcon,
      title: 'Tram Heritage Tracker',
      titleBengali: 'ট্রাম ঐতিহ্য',
      description: 'Track real-time tram locations and discover the history of Asia\'s oldest running tram network',
      color: 'from-kolkata-yellow to-kolkata-gold',
      gradient: '#FFB800'
    },
    {
      Icon: DurgaIcon,
      title: 'Pujo Route Planner',
      titleBengali: 'পুজো পথ',
      description: 'AI-optimized pandal hopping with crowd predictions and cultural insights for Durga Puja',
      color: 'from-durga-500 to-kolkata-vermillion',
      gradient: '#E23D28'
    },
    {
      Icon: VictoriaMemorialIcon,
      title: 'Heritage Walk Audio',
      titleBengali: 'ঐতিহ্য কথা',
      description: 'AI-narrated walking tours of Victoria Memorial, Marble Palace, and historic Kolkata',
      color: 'from-kolkata-sepia to-heritage-700',
      gradient: '#8B7355'
    },
    {
      Icon: TerracottaIcon,
      title: 'Verified Artisan Market',
      titleBengali: 'শিল্পী বাজার',
      description: 'Buy authentic Kumartuli crafts and tribal art with blockchain-verified authenticity',
      color: 'from-kolkata-terracotta to-kolkata-maroon',
      gradient: '#C45C26'
    },
    {
      Icon: BookIcon,
      title: 'Literary Kolkata',
      titleBengali: 'সাহিত্যিক কলকাতা',
      description: 'Explore College Street, Coffee House, and discover Tagore\'s Kolkata with curated tours',
      color: 'from-kolkata-blue to-kolkata-purple',
      gradient: '#1E3A5F'
    },
    {
      Icon: AddaTeaIcon,
      title: 'Adda AI Companion',
      titleBengali: 'আড্ডা সঙ্গী',
      description: 'Chat with an AI that knows Kolkata\'s soul - from mishti doi to metro shortcuts',
      color: 'from-kolkata-maidan to-heritage-600',
      gradient: '#2D5A27'
    }
  ];

  const hackathonThemes = [
    {
      icon: '🏛️',
      theme: 'Heritage & Stories',
      themeBengali: 'ঐতিহ্য ও কথা',
      description: 'Tech rooted in heritage and human stories'
    },
    {
      icon: '🌱',
      theme: 'Smart & Sustainable',
      themeBengali: 'স্মার্ট ও টেকসই',
      description: 'Smarter, sustainable city experiences'
    },
    {
      icon: '🎨',
      theme: 'Digital Preservation',
      themeBengali: 'ডিজিটাল সংরক্ষণ',
      description: 'Preserving art, language & culture digitally'
    },
    {
      icon: '🔗',
      theme: 'Tradition + Tech',
      themeBengali: 'ঐতিহ্য + প্রযুক্তি',
      description: 'Bridging tradition and technology'
    }
  ];

  return (
    <section className="py-24 bg-kolkata-cream dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Background decoration - Kolkata themed */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-kolkata-yellow/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-durga-500/10 rounded-full blur-3xl" />
        {/* Tram tracks pattern */}
        <div className="absolute inset-0 tram-tracks opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hackathon Themes Banner */}
        <BlurFade delay={0.05} inView>
          <div className="mb-16 bg-gradient-to-r from-kolkata-yellow/10 via-durga-500/10 to-kolkata-terracotta/10 dark:from-kolkata-yellow/5 dark:via-durga-500/5 dark:to-kolkata-terracotta/5 rounded-2xl p-6 border border-kolkata-yellow/20">
            <h3 className="text-center text-lg font-semibold text-kolkata-sepia dark:text-kolkata-gold mb-4 font-heritage">
              Calcutta Hacks 2025 - Four Themes
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {hackathonThemes.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                >
                  <span className="text-3xl mb-2 block">{item.icon}</span>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{item.theme}</h4>
                  <p className="text-xs text-kolkata-terracotta dark:text-kolkata-gold font-bengali">{item.themeBengali}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </BlurFade>

        <div className="text-center mb-20">
          <BlurFade delay={0.1} inView>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kolkata-yellow/20 dark:bg-kolkata-yellow/10 border border-kolkata-yellow/40 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kolkata-yellow opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-kolkata-yellow"></span>
              </span>
              <span className="text-kolkata-terracotta dark:text-kolkata-gold text-sm font-medium">Powered by AI & Blockchain</span>
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 font-heritage">
              Experience{' '}
              <AnimatedGradientText>Kolkata</AnimatedGradientText>
            </h2>
            <p className="text-2xl font-bengali text-kolkata-terracotta dark:text-kolkata-gold mb-6">
              কলকাতা অভিজ্ঞতা
            </p>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              From <span className="text-kolkata-yellow font-semibold">tram tracks</span> to <span className="text-durga-500 font-semibold">tech stacks</span> — 
              Discover the City of Joy with AI-powered heritage experiences and 
              blockchain-verified authenticity.
            </p>
          </BlurFade>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.Icon;
            return (
              <BlurFade key={index} delay={0.1 * index} inView>
                <MagicCard 
                  className="h-full card-heritage"
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
                      colorTo="#FFB800"
                    />

                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-kolkata-yellow dark:group-hover:text-kolkata-gold transition-colors font-heritage">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-kolkata-terracotta dark:text-kolkata-gold mb-4 font-bengali">
                      {feature.titleBengali}
                    </p>
                    
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                      {feature.description}
                    </p>

                    <motion.a
                      href="#"
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-2 text-sm font-medium text-kolkata-yellow dark:text-kolkata-gold hover:text-kolkata-terracotta dark:hover:text-kolkata-yellow transition-colors"
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

        {/* Stats Section - Kolkata themed */}
        <BlurFade delay={0.6} inView>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '300+', label: 'Heritage Sites', labelBengali: 'ঐতিহ্যবাহী স্থান', icon: '🏛️' },
              { value: '5000+', label: 'Pujo Pandals', labelBengali: 'পুজো প্যান্ডেল', icon: '🪔' },
              { value: '1000+', label: 'Artisan Crafts', labelBengali: 'শিল্পী শিল্প', icon: '🎭' },
              { value: '150+', label: 'Tram Stops', labelBengali: 'ট্রাম স্টপ', icon: '🚃' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="text-center p-6 rounded-2xl bg-white dark:bg-gray-800 border border-kolkata-sepia/20 dark:border-kolkata-gold/20 shadow-heritage"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-gray-700 dark:text-gray-300 text-sm font-medium">{stat.label}</div>
                <div className="text-kolkata-terracotta dark:text-kolkata-gold text-xs font-bengali">{stat.labelBengali}</div>
              </motion.div>
            ))}
          </div>
        </BlurFade>

        {/* Call to Action */}
        <BlurFade delay={0.8} inView>
          <div className="text-center mt-20">
            <ShimmerButton
              shimmerColor="#ffffff"
              background="linear-gradient(135deg, #FFB800 0%, #C45C26 100%)"
              className="text-lg px-10 py-5"
            >
              <span className="font-heritage">Start Your Kolkata Journey</span>
              <ArrowRight className="w-5 h-5" />
            </ShimmerButton>
            
            <p className="mt-4 text-kolkata-sepia dark:text-gray-400 text-sm">
              🪔 Free heritage walk included • AI-powered itinerary • Blockchain verified
            </p>

            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Built for</span>
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-kolkata-yellow/20 to-durga-500/20 text-sm font-medium text-kolkata-terracotta dark:text-kolkata-gold border border-kolkata-yellow/30">
                Calcutta Hacks 2025
              </span>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};

export default FeaturesSection;
