import React, { useState } from 'react';
import { 
  User, MapPin, Calendar, Award, Heart, Share2, 
  ChevronRight, Play, ExternalLink, Shield, Star,
  BookOpen, Camera, Clock, Globe, Sparkles, Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagicCard } from '../../magicui/MagicCard';
import { BorderBeam } from '../../magicui/BorderBeam';
import { ShimmerButton } from '../../magicui/ShimmerButton';
import { AnimatedGradientText } from '../../magicui/AnimatedGradientText';
import { BlurFade } from '../../magicui/BlurFade';
import { TerracottaIcon, PatachitraIcon } from '../../kolkata/KolkataIcons';
import { voiceService, isElevenLabsConfigured } from '../../../lib/services';

// Artisan data with rich stories
const artisans = [
  {
    id: 'artisan-001',
    name: 'Kartik Pal',
    nameBengali: 'কার্তিক পাল',
    craft: 'Kumartuli Clay Idol Making',
    craftBengali: 'কুমারটুলি মাটির প্রতিমা শিল্প',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1599030641314-e7f9e2f5e8e1?auto=format&fit=crop&w=800&h=400&q=80',
    location: 'Kumartuli, North Kolkata',
    experience: '45 years',
    generation: '5th Generation',
    rating: 4.9,
    reviews: 234,
    featured: true,
    awards: ['National Award 2018', 'State Artisan Award 2015', 'UNESCO Recognition 2020'],
    story: {
      en: {
        intro: "In the narrow lanes of Kumartuli, where the air is thick with the scent of wet clay and the sound of artisans at work, Kartik Pal continues a tradition that his family has upheld for five generations.",
        journey: "At the age of 8, young Kartik first touched clay under his grandfather's watchful eyes. 'The clay speaks to you,' his grandfather would say, 'you just need to learn its language.' Today, at 65, Kartik has mastered that language, creating Durga idols that are not just sculptures but embodiments of devotion.",
        philosophy: "Unlike modern workshops that use molds, Kartik still follows the traditional 'ekchala' style - each idol carved entirely by hand. 'When I shape Ma Durga's eyes,' he explains, 'I'm not just sculpting clay. I'm giving birth to the divine. Each stroke is a prayer.'",
        legacy: "His workshop has created idols for some of Kolkata's most prestigious Durga Puja pandals. But what gives Kartik the most joy? Teaching his granddaughter the craft, ensuring this 200-year-old tradition lives on.",
        quote: "মাটি থেকে মা তৈরি করি - From clay, I create the Mother."
      },
      bn: {
        intro: "কুমারটুলির সরু গলিতে, যেখানে বাতাস ভেজা মাটির গন্ধে ভরা এবং শিল্পীদের কাজের শব্দে মুখর, কার্তিক পাল একটি ঐতিহ্য বহন করে চলেছেন যা তাঁর পরিবার পাঁচ প্রজন্ম ধরে ধরে রেখেছে।",
        journey: "৮ বছর বয়সে, ছোট্ট কার্তিক তাঁর দাদুর সতর্ক দৃষ্টিতে প্রথম মাটি স্পর্শ করেছিলেন। 'মাটি তোমার সাথে কথা বলে,' দাদু বলতেন, 'তোমাকে শুধু তার ভাষা শিখতে হবে।' আজ, ৬৫ বছর বয়সে, কার্তিক সেই ভাষায় দক্ষ হয়েছেন।",
        philosophy: "আধুনিক কর্মশালার মতো ছাঁচ ব্যবহার না করে, কার্তিক এখনও ঐতিহ্যবাহী 'একচালা' শৈলী অনুসরণ করেন - প্রতিটি প্রতিমা সম্পূর্ণ হাতে তৈরি। 'যখন আমি মা দুর্গার চোখ আকার দিই,' তিনি বলেন, 'আমি শুধু মাটি ভাস্কর্য করছি না। আমি দেবত্বের জন্ম দিচ্ছি।'",
        legacy: "তাঁর কর্মশালা কলকাতার সবচেয়ে মর্যাদাপূর্ণ দুর্গা পূজা প্যান্ডেলের জন্য প্রতিমা তৈরি করেছে। কিন্তু কার্তিককে সবচেয়ে বেশি আনন্দ দেয় কী? তাঁর নাতনিকে এই শিল্প শেখানো।",
        quote: "মাটি থেকে মা তৈরি করি।"
      }
    },
    products: [
      { name: 'Durga Idol (12 inch)', price: 15000 },
      { name: 'Ganesh Murti', price: 5000 },
      { name: 'Lakshmi-Saraswati Set', price: 12000 }
    ],
    verificationHash: '0x7a8b9c...3d4e5f' // Future blockchain verification
  },
  {
    id: 'artisan-002',
    name: 'Mrinmoyee Devi',
    nameBengali: 'মৃন্ময়ী দেবী',
    craft: 'Patachitra Scroll Painting',
    craftBengali: 'পটচিত্র স্ক্রোল পেইন্টিং',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&h=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&h=400&q=80',
    location: 'Naya Village, Pingla',
    experience: '35 years',
    generation: '4th Generation',
    rating: 4.8,
    reviews: 189,
    featured: true,
    awards: ['President\'s Award 2019', 'Bengal Craft Master 2017'],
    story: {
      en: {
        intro: "In the village of Naya, where every wall tells a story through Patachitra paintings, Mrinmoyee Devi is known as the 'Singing Painter' - for she paints while singing the ancient Pater Gaan.",
        journey: "Born into a family of Patuas (scroll painters), Mrinmoyee learned to hold a brush before she could write. Her mother taught her the secret of making natural colors - from burnt earth for red, indigo plants for blue, and tamarind seeds mixed with coconut shell ash for black.",
        philosophy: "Each Patachitra tells a story - from the Ramayana to social messages about the environment. 'My paintings are not just art,' Mrinmoyee explains, 'they are my voice. Through them, I speak about our gods, our struggles, and our hopes.'",
        legacy: "Mrinmoyee has trained over 50 women in her village, creating a cooperative that now exports Patachitra to galleries worldwide. She believes art is not just heritage but livelihood - a way to preserve culture while empowering communities.",
        quote: "রঙে রঙে কথা বলি - I speak through colors."
      },
      bn: {
        intro: "নয়া গ্রামে, যেখানে প্রতিটি দেয়াল পটচিত্রের মাধ্যমে গল্প বলে, মৃন্ময়ী দেবী 'গায়িকা চিত্রকর' নামে পরিচিত - কারণ তিনি প্রাচীন পটের গান গাইতে গাইতে আঁকেন।",
        journey: "পটুয়া পরিবারে জন্মগ্রহণ করে, মৃন্ময়ী লেখার আগেই তুলি ধরতে শিখেছিলেন। তাঁর মা তাঁকে প্রাকৃতিক রং তৈরির রহস্য শিখিয়েছিলেন - পোড়া মাটি থেকে লাল, নীল গাছ থেকে নীল।",
        philosophy: "প্রতিটি পটচিত্র একটি গল্প বলে - রামায়ণ থেকে পরিবেশ সম্পর্কে সামাজিক বার্তা। 'আমার ছবি শুধু শিল্প নয়,' মৃন্ময়ী বলেন, 'এগুলো আমার কণ্ঠস্বর।'",
        legacy: "মৃন্ময়ী তাঁর গ্রামে ৫০ জনেরও বেশি মহিলাকে প্রশিক্ষণ দিয়েছেন, একটি সমবায় তৈরি করেছেন যা এখন বিশ্বব্যাপী গ্যালারিতে পটচিত্র রপ্তানি করে।",
        quote: "রঙে রঙে কথা বলি।"
      }
    },
    products: [
      { name: 'Ramayana Scroll (5 ft)', price: 25000 },
      { name: 'Durga Patachitra', price: 8000 },
      { name: 'Environmental Series', price: 15000 }
    ],
    verificationHash: '0x2b3c4d...8e9f0a'
  },
  {
    id: 'artisan-003',
    name: 'Abdul Karim',
    nameBengali: 'আবদুল করিম',
    craft: 'Dokra Metal Craft',
    craftBengali: 'ডোকরা ধাতু শিল্প',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?auto=format&fit=crop&w=800&h=400&q=80',
    location: 'Bikna, Bankura',
    experience: '40 years',
    generation: '6th Generation',
    rating: 4.9,
    reviews: 312,
    featured: true,
    awards: ['Shilp Guru Award 2016', 'National Dokra Master 2020'],
    story: {
      en: {
        intro: "In the remote village of Bikna, where the ancient lost-wax casting technique has been practiced for over 4,000 years, Abdul Karim keeps alive one of humanity's oldest metal-working traditions.",
        journey: "Dokra craft came to Abdul's family through a Hindu-Muslim collaboration that dates back centuries. 'In our village,' he says with pride, 'we don't see religion in art. The craft belongs to the land, not to any one community.'",
        philosophy: "The lost-wax (cire perdue) technique involves creating a wax model, coating it with clay, melting the wax out, and pouring molten bronze into the hollow. Each piece is unique - once the clay mold breaks, it can never be replicated.",
        legacy: "Abdul's dancing lady figurines and tribal sculptures have found homes in museums from Paris to New York. Yet he still works in his small workshop, heating brass in the same furnace his grandfather used.",
        quote: "আগুন থেকে শিল্প জন্মায় - Art is born from fire."
      },
      bn: {
        intro: "বিকনা গ্রামে, যেখানে প্রাচীন লস্ট-ওয়াক্স কাস্টিং কৌশল ৪,০০০ বছরেরও বেশি সময় ধরে অনুশীলন করা হয়েছে, আবদুল করিম মানবতার প্রাচীনতম ধাতু শিল্পের ঐতিহ্য বাঁচিয়ে রেখেছেন।",
        journey: "ডোকরা শিল্প আবদুলের পরিবারে এসেছে শতাব্দী প্রাচীন হিন্দু-মুসলিম সহযোগিতার মাধ্যমে। 'আমাদের গ্রামে,' তিনি গর্বের সাথে বলেন, 'আমরা শিল্পে ধর্ম দেখি না।'",
        philosophy: "লস্ট-ওয়াক্স কৌশলে মোমের মডেল তৈরি করা হয়, মাটি দিয়ে আবরণ দেওয়া হয়, মোম গলিয়ে বের করা হয়, এবং গলিত ব্রোঞ্জ ঢালা হয়। প্রতিটি টুকরো অনন্য।",
        legacy: "আবদুলের নৃত্যরত মহিলার মূর্তি এবং ট্রাইবাল ভাস্কর্য প্যারিস থেকে নিউইয়র্ক পর্যন্ত জাদুঘরে স্থান পেয়েছে।",
        quote: "আগুন থেকে শিল্প জন্মায়।"
      }
    },
    products: [
      { name: 'Dancing Lady (12 inch)', price: 18000 },
      { name: 'Tribal Horse', price: 12000 },
      { name: 'Dokra Jewellery Set', price: 5000 }
    ],
    verificationHash: '0x5e6f7a...1b2c3d'
  },
  {
    id: 'artisan-004',
    name: 'Shyamal Das',
    nameBengali: 'শ্যামল দাস',
    craft: 'Baluchari Silk Weaving',
    craftBengali: 'বালুচরী রেশম বয়ন',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&h=400&q=80',
    location: 'Bishnupur, Bankura',
    experience: '50 years',
    generation: '7th Generation',
    rating: 5.0,
    reviews: 456,
    featured: true,
    awards: ['National Award 2010', 'Sant Kabir Award 2015', 'Padma Shri Nominee 2022'],
    story: {
      en: {
        intro: "In the terracotta town of Bishnupur, where temples tell stories in clay, Shyamal Das weaves stories in silk. His Baluchari sarees are not just garments - they are epics you can wear.",
        journey: "The Baluchari tradition nearly died in the 1950s. Shyamal's grandfather was one of the last master weavers. 'He made me swear,' Shyamal recalls, 'that I would never let this art die. That promise has been my life's purpose.'",
        philosophy: "Each Baluchari saree takes 15-45 days to weave. The pallu (decorative end) depicts scenes from the Ramayana or Mahabharata. 'When a bride wears my saree,' Shyamal says, 'she carries our civilization's stories to her new home.'",
        legacy: "Shyamal has trained hundreds of weavers and fought to get Baluchari its GI (Geographical Indication) tag. His sarees have been worn by Prime Ministers and displayed in the Victoria & Albert Museum.",
        quote: "প্রতিটি সুতোয় একটি গল্প - Every thread holds a story."
      },
      bn: {
        intro: "টেরাকোটার শহর বিষ্ণুপুরে, যেখানে মন্দিরগুলি মাটিতে গল্প বলে, শ্যামল দাস রেশমে গল্প বোনেন। তাঁর বালুচরী শাড়ি শুধু পোশাক নয় - এগুলো পরিধানযোগ্য মহাকাব্য।",
        journey: "বালুচরী ঐতিহ্য প্রায় ১৯৫০-এর দশকে মারা যাচ্ছিল। শ্যামলের দাদু ছিলেন শেষ মাস্টার বয়নকারীদের একজন। 'তিনি আমাকে শপথ করিয়েছিলেন,' শ্যামল স্মরণ করেন।",
        philosophy: "প্রতিটি বালুচরী শাড়ি বুনতে ১৫-৪৫ দিন সময় লাগে। পল্লু রামায়ণ বা মহাভারতের দৃশ্য চিত্রিত করে।",
        legacy: "শ্যামল শত শত বয়নকারীকে প্রশিক্ষণ দিয়েছেন এবং বালুচরীকে জিআই ট্যাগ পেতে লড়াই করেছেন।",
        quote: "প্রতিটি সুতোয় একটি গল্প।"
      }
    },
    products: [
      { name: 'Ramayana Baluchari Saree', price: 85000 },
      { name: 'Mahabharata Series', price: 120000 },
      { name: 'Contemporary Baluchari', price: 45000 }
    ],
    verificationHash: '0x9a0b1c...4d5e6f'
  }
];

const ArtisanChronicles: React.FC = () => {
  const [selectedArtisan, setSelectedArtisan] = useState(artisans[0]);
  const [language, setLanguage] = useState<'en' | 'bn'>('en');
  const [activeTab, setActiveTab] = useState<'story' | 'products' | 'gallery'>('story');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const elevenLabsConfigured = isElevenLabsConfigured();

  const handleSpeak = async (text: string) => {
    if (isSpeaking) {
      voiceService.stopAudio();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    try {
      if (elevenLabsConfigured) {
        const result = await voiceService.textToSpeech(text, {
          language: language === 'bn' ? 'hi' : 'en'
        });
        if (result.audioUrl) {
          voiceService.playAudio(result.audioUrl, `artisan-${selectedArtisan.id}`, () => setIsSpeaking(false));
        }
      } else {
        voiceService.speakWithBrowserTTS(text, language === 'bn' ? 'hi' : 'en');
        const words = text.split(' ').length;
        const duration = (words / 150) * 60 * 1000;
        setTimeout(() => setIsSpeaking(false), duration);
      }
    } catch (error) {
      console.error('Speech error:', error);
      setIsSpeaking(false);
    }
  };

  const toggleFavorite = (artisanId: string) => {
    setFavorites(prev => 
      prev.includes(artisanId) 
        ? prev.filter(id => id !== artisanId)
        : [...prev, artisanId]
    );
  };

  const currentStory = selectedArtisan.story[language];

  return (
    <div className="space-y-8">
      {/* Header */}
      <BlurFade delay={0.1} inView>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-r from-kolkata-terracotta to-heritage-500 rounded-2xl flex items-center justify-center shadow-lg">
              <TerracottaIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-heritage">
                Artisan{' '}
                <AnimatedGradientText className="text-3xl">Chronicles</AnimatedGradientText>
                {' '}🎨
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Preserving stories of Bengal's master craftspeople • <span className="font-bengali">শিল্পীদের কাহিনী</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-kolkata-terracotta text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                }`}
              >
                🇬🇧 English
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-4 py-2 text-sm font-medium transition-colors font-bengali ${
                  language === 'bn'
                    ? 'bg-durga-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                }`}
              >
                🪔 বাংলা
              </button>
            </div>
          </div>
        </div>
      </BlurFade>

      {/* Artisan Cards Grid */}
      <BlurFade delay={0.2} inView>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {artisans.map((artisan) => {
            const isSelected = selectedArtisan.id === artisan.id;
            const isFavorite = favorites.includes(artisan.id);

            return (
              <motion.div
                key={artisan.id}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedArtisan(artisan)}
                className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all ${
                  isSelected ? 'ring-4 ring-kolkata-terracotta shadow-2xl' : 'shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="relative h-40">
                  <img
                    src={artisan.image}
                    alt={artisan.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(artisan.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </button>

                  {artisan.featured && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-kolkata-yellow text-gray-900 rounded-full text-xs font-bold">
                      Featured
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white font-semibold text-sm">{artisan.name}</h3>
                    <p className="text-kolkata-gold text-xs font-bengali">{artisan.nameBengali}</p>
                    <p className="text-white/70 text-xs mt-1">{artisan.craft}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </BlurFade>

      {/* Selected Artisan Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <MagicCard gradientColor="#C45C26" gradientOpacity={0.15}>
            <div className="relative">
              <BorderBeam size={300} duration={20} colorFrom="#C45C26" colorTo="#D4A015" />

              {/* Cover Image */}
              <div className="relative h-48 rounded-t-xl overflow-hidden">
                <img
                  src={selectedArtisan.coverImage}
                  alt={selectedArtisan.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Profile */}
                <div className="absolute bottom-4 left-6 flex items-end gap-4">
                  <img
                    src={selectedArtisan.image}
                    alt={selectedArtisan.name}
                    className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg"
                  />
                  <div className="mb-2">
                    <h2 className="text-2xl font-bold text-white font-heritage">{selectedArtisan.name}</h2>
                    <p className="text-kolkata-gold font-bengali">{selectedArtisan.nameBengali}</p>
                  </div>
                </div>

                {/* Voice Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSpeak(currentStory.intro + ' ' + currentStory.journey)}
                  className={`absolute top-4 right-4 p-3 rounded-full shadow-lg ${
                    isSpeaking 
                      ? 'bg-durga-500 text-white' 
                      : 'bg-white/90 text-kolkata-terracotta hover:bg-white'
                  }`}
                >
                  <Volume2 className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 text-kolkata-terracotta" />
                    {selectedArtisan.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4 text-kolkata-terracotta" />
                    {selectedArtisan.experience}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <User className="w-4 h-4 text-kolkata-terracotta" />
                    {selectedArtisan.generation}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Star className="w-4 h-4 fill-kolkata-yellow text-kolkata-yellow" />
                    {selectedArtisan.rating} ({selectedArtisan.reviews})
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                  {(['story', 'products', 'gallery'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                        activeTab === tab
                          ? 'bg-gradient-to-r from-kolkata-terracotta to-heritage-500 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  {activeTab === 'story' && (
                    <motion.div
                      key="story"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <div className={`prose dark:prose-invert max-w-none ${language === 'bn' ? 'font-bengali' : ''}`}>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {currentStory.intro}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {currentStory.journey}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {currentStory.philosophy}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {currentStory.legacy}
                        </p>
                      </div>

                      {/* Quote */}
                      <div className="bg-gradient-to-r from-kolkata-yellow/20 to-kolkata-terracotta/10 rounded-xl p-6 border-l-4 border-kolkata-terracotta">
                        <p className={`text-xl italic text-kolkata-terracotta dark:text-kolkata-gold ${language === 'bn' ? 'font-bengali' : 'font-heritage'}`}>
                          "{currentStory.quote}"
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          — {selectedArtisan.name}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'products' && (
                    <motion.div
                      key="products"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      {selectedArtisan.products.map((product, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                        >
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">{product.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Handcrafted • Authentic</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-kolkata-terracotta">₹{product.price.toLocaleString()}</p>
                            <ShimmerButton className="text-xs py-1 px-3 mt-1" background="linear-gradient(135deg, #C45C26 0%, #D4A015 100%)">
                              Inquire
                            </ShimmerButton>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'gallery' && (
                    <motion.div
                      key="gallery"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                        <Play className="w-8 h-8 text-gray-400" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </MagicCard>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Awards */}
            <MagicCard gradientColor="#D4A015" gradientOpacity={0.1}>
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-kolkata-yellow" />
                  Awards & Recognition
                </h3>
                <div className="space-y-3">
                  {selectedArtisan.awards.map((award, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="w-8 h-8 bg-kolkata-yellow/20 rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-kolkata-yellow" />
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{award}</span>
                    </div>
                  ))}
                </div>
              </div>
            </MagicCard>

            {/* Verification */}
            <MagicCard gradientColor="#22c55e" gradientOpacity={0.1}>
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  Authenticity Verification
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">Verified Artisan</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                    Hash: {selectedArtisan.verificationHash}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Future: Blockchain verification coming soon
                  </p>
                </div>
              </div>
            </MagicCard>

            {/* Contact */}
            <ShimmerButton
              className="w-full py-3"
              background="linear-gradient(135deg, #C45C26 0%, #D4A015 100%)"
            >
              <BookOpen className="w-4 h-4" />
              <span>Contact Artisan</span>
            </ShimmerButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanChronicles;


