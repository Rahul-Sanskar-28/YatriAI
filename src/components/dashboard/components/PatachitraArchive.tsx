import React, { useState } from 'react';
import { 
  Image, Info, ZoomIn, Download, Share2, Heart, 
  Volume2, VolumeX, Calendar, MapPin,
  User, Tag, ChevronLeft, ChevronRight, X, Sparkles,
  Shield, BookOpen, Eye, Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagicCard } from '../../magicui/MagicCard';
import { BorderBeam } from '../../magicui/BorderBeam';
import { ShimmerButton } from '../../magicui/ShimmerButton';
import { AnimatedGradientText } from '../../magicui/AnimatedGradientText';
import { BlurFade } from '../../magicui/BlurFade';
import { PatachitraIcon } from '../../kolkata/KolkataIcons';
import { voiceService, isElevenLabsConfigured } from '../../../lib/services';

// Patachitra Artwork Collection
const artworks = [
  {
    id: 'pata-001',
    title: 'Durga Slaying Mahishasura',
    titleBengali: 'দুর্গা মহিষাসুর বধ',
    artist: 'Mrinmoyee Devi',
    artistBengali: 'মৃন্ময়ী দেবী',
    village: 'Naya, Pingla',
    year: '2023',
    dimensions: '120 x 60 cm',
    medium: 'Natural pigments on handmade paper',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1200&h=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=400&h=300&q=80',
    category: 'Mythological',
    style: 'Traditional Scroll',
    featured: true,
    price: 45000,
    story: {
      en: {
        narrative: "This scroll depicts the eternal battle between good and evil - Goddess Durga vanquishing the demon Mahishasura. Created over three months using traditional techniques passed down through generations.",
        technique: "The natural pigments used include burnt earth (red), indigo leaves (blue), conch shell powder (white), and lamp soot (black). Each color is ground by hand on a stone slab with water and tree gum binder.",
        significance: "During creation, the artist sang the Pater Gaan - the traditional song that narrates the story. This practice, called 'Patua tradition', combines visual art with oral storytelling.",
        artistNote: "Every stroke is a prayer. When I paint Ma Durga's eyes, I feel her presence guiding my hand."
      },
      bn: {
        narrative: "এই স্ক্রোলটি ভালো এবং মন্দের মধ্যে চিরন্তন যুদ্ধ চিত্রিত করে - দেবী দুর্গা অসুর মহিষাসুরকে বধ করছেন। প্রজন্মের পর প্রজন্ম ধরে চলে আসা ঐতিহ্যবাহী কৌশল ব্যবহার করে তিন মাসে তৈরি।",
        technique: "ব্যবহৃত প্রাকৃতিক রঞ্জকগুলির মধ্যে রয়েছে পোড়া মাটি (লাল), নীল পাতা (নীল), শঙ্খের গুঁড়া (সাদা), এবং প্রদীপের কালি (কালো)। প্রতিটি রঙ পাথরের স্ল্যাবে জল এবং গাছের আঠা দিয়ে হাতে পেষা হয়।",
        significance: "সৃষ্টির সময়, শিল্পী পটের গান গেয়েছিলেন - ঐতিহ্যবাহী গান যা গল্প বর্ণনা করে। এই অনুশীলন, যাকে 'পটুয়া ঐতিহ্য' বলা হয়, দৃশ্য শিল্পকে মৌখিক গল্প বলার সাথে একত্রিত করে।",
        artistNote: "প্রতিটি স্ট্রোক একটি প্রার্থনা। যখন আমি মা দুর্গার চোখ আঁকি, আমি তাঁর উপস্থিতি অনুভব করি আমার হাত পরিচালনা করছে।"
      }
    },
    colors: ['#C45C26', '#1E3A5F', '#F5F5F0', '#2D5A27', '#D4A015'],
    verificationHash: '0x8a9b0c...2d3e4f'
  },
  {
    id: 'pata-002',
    title: 'Krishna Leela - Butter Thief',
    titleBengali: 'কৃষ্ণলীলা - মাখন চোর',
    artist: 'Gurupada Chitrakar',
    artistBengali: 'গুরুপদ চিত্রকর',
    village: 'Naya, Pingla',
    year: '2022',
    dimensions: '90 x 45 cm',
    medium: 'Natural pigments on cloth',
    image: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=1200&h=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=400&h=300&q=80',
    category: 'Mythological',
    style: 'Traditional Scroll',
    featured: true,
    price: 35000,
    story: {
      en: {
        narrative: "This playful scroll captures the beloved childhood story of Lord Krishna stealing butter from the homes of Vrindavan. The mischievous god is shown with his friends, rope in hand, reaching for the butter pot.",
        technique: "Created on hand-woven cotton cloth, first treated with a mixture of tamarind seed paste and cow dung to create a smooth surface. The cloth preparation alone takes two weeks.",
        significance: "Krishna Leela stories are among the most popular Patachitra subjects. They bring joy and remind us that the divine can be playful and accessible.",
        artistNote: "When I paint little Krishna, I think of my own grandchildren. The divine child's smile is the smile of every child."
      },
      bn: {
        narrative: "এই চঞ্চল স্ক্রোলটি বৃন্দাবনের ঘর থেকে মাখন চুরি করা ভগবান কৃষ্ণের প্রিয় শৈশবের গল্প ধারণ করে। দুষ্টু ভগবানকে তাঁর বন্ধুদের সাথে দেখানো হয়েছে, হাতে দড়ি, মাখনের পাত্রের দিকে হাত বাড়িয়ে।",
        technique: "হাতে বোনা সুতির কাপড়ে তৈরি, প্রথমে তেঁতুল বীজের পেস্ট এবং গোবরের মিশ্রণ দিয়ে মসৃণ পৃষ্ঠ তৈরি করতে। শুধু কাপড় প্রস্তুতিতেই দুই সপ্তাহ সময় লাগে।",
        significance: "কৃষ্ণলীলার গল্পগুলি সবচেয়ে জনপ্রিয় পটচিত্রের বিষয়গুলির মধ্যে রয়েছে। এগুলি আনন্দ নিয়ে আসে এবং আমাদের মনে করিয়ে দেয় যে দেবত্ব চঞ্চল এবং সহজলভ্য হতে পারে।",
        artistNote: "যখন আমি ছোট্ট কৃষ্ণ আঁকি, আমি আমার নিজের নাতি-নাতনিদের কথা ভাবি। দৈব শিশুর হাসি প্রতিটি শিশুর হাসি।"
      }
    },
    colors: ['#FFB800', '#1A5276', '#FFFEF7', '#4A235A', '#E23D28'],
    verificationHash: '0x5c6d7e...9a0b1c'
  },
  {
    id: 'pata-003',
    title: 'Save the Earth',
    titleBengali: 'পৃথিবী বাঁচাও',
    artist: 'Anwar Chitrakar',
    artistBengali: 'আনোয়ার চিত্রকর',
    village: 'Naya, Pingla',
    year: '2024',
    dimensions: '150 x 75 cm',
    medium: 'Natural pigments on handmade paper',
    image: 'https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?auto=format&fit=crop&w=1200&h=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?auto=format&fit=crop&w=400&h=300&q=80',
    category: 'Contemporary Social',
    style: 'Modern Patachitra',
    featured: true,
    price: 55000,
    story: {
      en: {
        narrative: "A powerful contemporary Patachitra addressing climate change and environmental destruction. The scroll shows Mother Earth weeping as forests burn and rivers dry up, while humans remain oblivious.",
        technique: "While maintaining traditional techniques, this work incorporates modern themes. The artist uses the same natural pigments his ancestors used, proving that tradition can speak to contemporary issues.",
        significance: "Patachitra has always been a medium for social commentary. From warning against dowry to promoting literacy, Patuas have used their art to educate and advocate.",
        artistNote: "My grandmother painted gods. I paint the Earth - our mother. Same devotion, same prayer, same plea to humanity."
      },
      bn: {
        narrative: "জলবায়ু পরিবর্তন এবং পরিবেশ ধ্বংসকে সম্বোধন করে একটি শক্তিশালী সমসাময়িক পটচিত্র। স্ক্রোলটি দেখায় মাতা পৃথিবী কাঁদছেন যখন বন জ্বলছে এবং নদী শুকিয়ে যাচ্ছে, যখন মানুষ উদাসীন।",
        technique: "ঐতিহ্যবাহী কৌশল বজায় রেখে, এই কাজ আধুনিক থিম অন্তর্ভুক্ত করে। শিল্পী তাঁর পূর্বপুরুষরা যে প্রাকৃতিক রঞ্জক ব্যবহার করতেন সেই একই ব্যবহার করেন, প্রমাণ করে যে ঐতিহ্য সমসাময়িক বিষয়ে কথা বলতে পারে।",
        significance: "পটচিত্র সবসময় সামাজিক মন্তব্যের একটি মাধ্যম। যৌতুকের বিরুদ্ধে সতর্কতা থেকে সাক্ষরতা প্রচার পর্যন্ত, পটুয়ারা তাদের শিল্প ব্যবহার করেছেন শিক্ষিত এবং সমর্থন করতে।",
        artistNote: "আমার ঠাকুমা দেবতাদের আঁকতেন। আমি পৃথিবী আঁকি - আমাদের মা। একই ভক্তি, একই প্রার্থনা, মানবতার কাছে একই আবেদন।"
      }
    },
    colors: ['#2D5A27', '#7B2D26', '#1A5276', '#8B7355', '#E23D28'],
    verificationHash: '0x3d4e5f...6a7b8c'
  },
  {
    id: 'pata-004',
    title: 'Manasa - The Snake Goddess',
    titleBengali: 'মনসা - সাপের দেবী',
    artist: 'Swarna Chitrakar',
    artistBengali: 'স্বর্ণা চিত্রকর',
    village: 'Naya, Pingla',
    year: '2021',
    dimensions: '100 x 50 cm',
    medium: 'Natural pigments on handmade paper',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&h=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&h=300&q=80',
    category: 'Mythological',
    style: 'Traditional Scroll',
    featured: false,
    price: 40000,
    story: {
      en: {
        narrative: "Goddess Manasa, worshipped primarily in Bengal for protection against snakebites, is depicted with her characteristic serpent crown. The scroll tells the story of Behula and Lakhindar from the Manasa Mangal Kavya.",
        technique: "The intricate snake patterns require exceptional control and patience. Each scale is individually painted, sometimes taking an entire day to complete a single snake figure.",
        significance: "Manasa worship is deeply rooted in Bengal's agrarian culture, where snake encounters were common. The Patachitra served as both devotional art and protective charm.",
        artistNote: "I am the sixth generation in my family to paint Manasa. She protects us, and we preserve her story."
      },
      bn: {
        narrative: "দেবী মনসা, প্রাথমিকভাবে বাংলায় সাপের কামড় থেকে সুরক্ষার জন্য পূজিত, তাঁর বৈশিষ্ট্যপূর্ণ সর্প মুকুট সহ চিত্রিত। স্ক্রোলটি মনসা মঙ্গল কাব্য থেকে বেহুলা এবং লখিন্দরের গল্প বলে।",
        technique: "জটিল সাপের নকশার জন্য ব্যতিক্রমী নিয়ন্ত্রণ এবং ধৈর্য প্রয়োজন। প্রতিটি আঁশ পৃথকভাবে আঁকা হয়, কখনও কখনও একটি সাপের চিত্র সম্পূর্ণ করতে পুরো একদিন সময় লাগে।",
        significance: "মনসা পূজা বাংলার কৃষি সংস্কৃতিতে গভীরভাবে নিহিত, যেখানে সাপের সাথে দেখা সাধারণ ছিল। পটচিত্র ভক্তিমূলক শিল্প এবং সুরক্ষামূলক তাবিজ উভয় হিসাবে কাজ করত।",
        artistNote: "আমি আমার পরিবারে ষষ্ঠ প্রজন্ম মনসা আঁকতে। তিনি আমাদের রক্ষা করেন, এবং আমরা তাঁর গল্প সংরক্ষণ করি।"
      }
    },
    colors: ['#2D5A27', '#D4A015', '#F5F5F0', '#1E3A5F', '#7B2D26'],
    verificationHash: '0x9e0f1a...2b3c4d'
  }
];

const categories = ['All', 'Mythological', 'Contemporary Social', 'Folk Tales'];

const PatachitraArchive: React.FC = () => {
  const [selectedArtwork, setSelectedArtwork] = useState(artworks[0]);
  const [language, setLanguage] = useState<'en' | 'bn'>('en');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const elevenLabsConfigured = isElevenLabsConfigured();

  const handleSpeak = async (text: string) => {
    if (isSpeaking) {
      voiceService.stopPlayback();
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
          await voiceService.playAudio(result.audioUrl);
        }
      } else {
        await voiceService.speakWithBrowserTTS(text, language === 'bn' ? 'hi' : 'en');
      }
    } catch (error) {
      console.error('Speech error:', error);
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(false);
  };

  const toggleFavorite = (artworkId: string) => {
    setFavorites(prev => 
      prev.includes(artworkId) 
        ? prev.filter(id => id !== artworkId)
        : [...prev, artworkId]
    );
  };

  const openGallery = (index: number) => {
    setCurrentIndex(index);
    setIsGalleryOpen(true);
  };

  const navigateGallery = (direction: 'prev' | 'next') => {
    const filtered = filteredArtworks;
    if (direction === 'prev') {
      setCurrentIndex((prev) => (prev === 0 ? filtered.length - 1 : prev - 1));
    } else {
      setCurrentIndex((prev) => (prev === filtered.length - 1 ? 0 : prev + 1));
    }
  };

  const filteredArtworks = selectedCategory === 'All' 
    ? artworks 
    : artworks.filter(a => a.category === selectedCategory);

  const currentStory = selectedArtwork.story[language];

  return (
    <div className="space-y-8">
      {/* Header */}
      <BlurFade delay={0.1} inView>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-r from-kolkata-terracotta to-kolkata-maroon rounded-2xl flex items-center justify-center shadow-lg">
              <PatachitraIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-heritage">
                Patachitra Digital{' '}
                <AnimatedGradientText className="text-3xl">Archive</AnimatedGradientText>
                {' '}🎨
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Preserving Bengal's scroll painting heritage • <span className="font-bengali">পটচিত্র সংরক্ষণ</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Stats */}
            <div className="hidden md:flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Image className="w-4 h-4 text-kolkata-terracotta" />
                <span>{artworks.length} Artworks</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4 text-kolkata-terracotta" />
                <span>4 Artists</span>
              </div>
            </div>

            {/* Language Toggle */}
            <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-kolkata-terracotta text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                🇬🇧 English
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-4 py-2 text-sm font-medium transition-colors font-bengali ${
                  language === 'bn'
                    ? 'bg-kolkata-maroon text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                🪔 বাংলা
              </button>
            </div>
          </div>
        </div>
      </BlurFade>

      {/* Category Filter */}
      <BlurFade delay={0.15} inView>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-kolkata-terracotta to-kolkata-maroon text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </BlurFade>

      {/* Gallery Grid */}
      <BlurFade delay={0.2} inView>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredArtworks.map((artwork, index) => {
            const isSelected = selectedArtwork.id === artwork.id;
            const isFavorite = favorites.includes(artwork.id);

            return (
              <motion.div
                key={artwork.id}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedArtwork(artwork)}
                className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all group ${
                  isSelected ? 'ring-4 ring-kolkata-terracotta shadow-2xl' : 'shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="relative aspect-[4/3]">
                  <img
                    src={artwork.thumbnail}
                    alt={artwork.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Hover Actions */}
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(artwork.id);
                      }}
                      className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openGallery(index);
                      }}
                      className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                    >
                      <ZoomIn className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  {artwork.featured && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-kolkata-terracotta text-white rounded-full text-xs font-bold">
                      Featured
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white font-semibold text-sm line-clamp-1">{artwork.title}</h3>
                    <p className="text-kolkata-gold text-xs font-bengali">{artwork.titleBengali}</p>
                    <div className="flex items-center gap-2 mt-1 text-white/70 text-xs">
                      <span>{artwork.artist}</span>
                      <span>•</span>
                      <span>{artwork.year}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </BlurFade>

      {/* Selected Artwork Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <MagicCard gradientColor="#C45C26" gradientOpacity={0.15}>
            <div className="relative">
              <BorderBeam size={300} duration={20} colorFrom="#C45C26" colorTo="#7B2D26" />

              {/* Large Image */}
              <div className="relative aspect-[16/10] rounded-t-xl overflow-hidden">
                <img
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Voice Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSpeak(currentStory.narrative + ' ' + currentStory.technique)}
                  className={`absolute top-4 right-4 p-3 rounded-full shadow-lg ${
                    isSpeaking 
                      ? 'bg-kolkata-terracotta text-white' 
                      : 'bg-white/90 text-kolkata-terracotta hover:bg-white'
                  }`}
                >
                  {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </motion.button>

                {/* Color Palette */}
                <div className="absolute bottom-4 right-4 flex gap-1">
                  {selectedArtwork.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                      style={{ backgroundColor: color }}
                      title={`Color ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="p-6">
                {/* Title & Meta */}
                <div className="mb-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-heritage">
                        {selectedArtwork.title}
                      </h2>
                      <p className="text-kolkata-terracotta font-bengali text-lg">{selectedArtwork.titleBengali}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-kolkata-terracotta">₹{selectedArtwork.price.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Original artwork</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <User className="w-4 h-4 text-kolkata-terracotta" />
                      <span className="text-sm">{selectedArtwork.artist}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <MapPin className="w-4 h-4 text-kolkata-terracotta" />
                      <span className="text-sm">{selectedArtwork.village}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <Calendar className="w-4 h-4 text-kolkata-terracotta" />
                      <span className="text-sm">{selectedArtwork.year}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <Tag className="w-4 h-4 text-kolkata-terracotta" />
                      <span className="text-sm">{selectedArtwork.category}</span>
                    </div>
                  </div>
                </div>

                {/* Story Sections */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-kolkata-terracotta" />
                      {language === 'bn' ? 'গল্প' : 'The Story'}
                    </h3>
                    <p className={`text-gray-700 dark:text-gray-300 leading-relaxed ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {currentStory.narrative}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-kolkata-terracotta" />
                      {language === 'bn' ? 'কৌশল' : 'Technique'}
                    </h3>
                    <p className={`text-gray-700 dark:text-gray-300 leading-relaxed ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {currentStory.technique}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Info className="w-5 h-5 text-kolkata-terracotta" />
                      {language === 'bn' ? 'তাৎপর্য' : 'Cultural Significance'}
                    </h3>
                    <p className={`text-gray-700 dark:text-gray-300 leading-relaxed ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {currentStory.significance}
                    </p>
                  </div>

                  {/* Artist Quote */}
                  <div className="bg-gradient-to-r from-kolkata-terracotta/10 to-kolkata-maroon/5 rounded-xl p-6 border-l-4 border-kolkata-terracotta">
                    <p className={`text-lg italic text-kolkata-terracotta dark:text-kolkata-gold ${language === 'bn' ? 'font-bengali' : ''}`}>
                      "{currentStory.artistNote}"
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      — {selectedArtwork.artist}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </MagicCard>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Artwork Details */}
            <MagicCard gradientColor="#D4A015" gradientOpacity={0.1}>
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-kolkata-yellow" />
                  {language === 'bn' ? 'শিল্পকর্মের বিবরণ' : 'Artwork Details'}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">{language === 'bn' ? 'মাধ্যম' : 'Medium'}</span>
                    <span className="text-sm text-gray-900 dark:text-white text-right">{selectedArtwork.medium}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">{language === 'bn' ? 'মাপ' : 'Dimensions'}</span>
                    <span className="text-sm text-gray-900 dark:text-white">{selectedArtwork.dimensions}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">{language === 'bn' ? 'শৈলী' : 'Style'}</span>
                    <span className="text-sm text-gray-900 dark:text-white">{selectedArtwork.style}</span>
                  </div>
                </div>
              </div>
            </MagicCard>

            {/* Verification */}
            <MagicCard gradientColor="#22c55e" gradientOpacity={0.1}>
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  {language === 'bn' ? 'প্রামাণ্যতা' : 'Authenticity'}
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">{language === 'bn' ? 'যাচাইকৃত শিল্পকর্ম' : 'Verified Artwork'}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                    Hash: {selectedArtwork.verificationHash}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {language === 'bn' ? 'ভবিষ্যতে: ব্লকচেইন যাচাইকরণ' : 'Future: Blockchain verification'}
                  </p>
                </div>
              </div>
            </MagicCard>

            {/* Actions */}
            <div className="space-y-3">
              <ShimmerButton
                className="w-full py-3"
                background="linear-gradient(135deg, #C45C26 0%, #7B2D26 100%)"
              >
                <Eye className="w-4 h-4" />
                <span>{language === 'bn' ? 'কিনতে জিজ্ঞাসা করুন' : 'Inquire to Purchase'}</span>
              </ShimmerButton>
              
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">{language === 'bn' ? 'শেয়ার' : 'Share'}</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">{language === 'bn' ? 'সেভ' : 'Save'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Gallery */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={() => setIsGalleryOpen(false)}
          >
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateGallery('prev');
              }}
              className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={filteredArtworks[currentIndex]?.image}
              alt={filteredArtworks[currentIndex]?.title}
              className="max-w-[90vw] max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateGallery('next');
              }}
              className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
              <h3 className="text-xl font-semibold">{filteredArtworks[currentIndex]?.title}</h3>
              <p className="text-white/70">
                {filteredArtworks[currentIndex]?.artist} • {filteredArtworks[currentIndex]?.year}
              </p>
              <p className="text-white/50 text-sm mt-1">
                {currentIndex + 1} / {filteredArtworks.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PatachitraArchive;


