import React, { useState } from 'react';
import { 
  ChefHat, Clock, Users, Heart, Share2, BookOpen, 
  Play, Volume2, VolumeX, Star, Filter, Search,
  Flame, Sparkles, Globe, Camera, Plus, Bookmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagicCard } from '../../magicui/MagicCard';
import { BorderBeam } from '../../magicui/BorderBeam';
import { ShimmerButton } from '../../magicui/ShimmerButton';
import { AnimatedGradientText } from '../../magicui/AnimatedGradientText';
import { BlurFade } from '../../magicui/BlurFade';
import { RosogollaIcon, FishCurryIcon } from '../../kolkata/KolkataIcons';
import { voiceService, isElevenLabsConfigured } from '../../../lib/services';

// Bengali Heritage Recipes with Family Stories
const recipes = [
  {
    id: 'recipe-001',
    name: 'Kosha Mangsho',
    nameBengali: 'কষা মাংস',
    category: 'Main Course',
    categoryBengali: 'মূল খাবার',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&h=500&q=80',
    cookTime: '90 mins',
    servings: 4,
    difficulty: 'Medium',
    rating: 4.9,
    reviews: 342,
    heritage: 'Traditional Bengali',
    featured: true,
    familyStory: {
      en: {
        title: "From Dida's Kitchen",
        storyteller: "Ananya Mukherjee, 34, Kolkata",
        story: "This Kosha Mangsho recipe has been in our family for five generations. My great-great-grandmother first made it during the 1920s in our ancestral home in Murshidabad. The secret, she always said, was patience – the meat must be cooked slowly until it absorbs every drop of the masala. When my grandmother married and moved to Kolkata, she carried this recipe like a treasure. Now, every Sunday, when the aroma of kosha mangsho fills my kitchen, I feel connected to the women who came before me. My daughter, just 8, already knows to check the 'koshano' – the caramelization. The recipe will continue.",
        memories: "I remember Dida saying, 'The best kosha mangsho should be so tender, it falls off the bone when you look at it lovingly.'"
      },
      bn: {
        title: "দিদার রান্নাঘর থেকে",
        storyteller: "অনন্যা মুখার্জি, ৩৪, কলকাতা",
        story: "এই কষা মাংসের রেসিপি আমাদের পরিবারে পাঁচ প্রজন্ম ধরে আছে। আমার প্র-প্র-দিদা প্রথম এটি তৈরি করেছিলেন ১৯২০-এর দশকে মুর্শিদাবাদে আমাদের পৈতৃক বাড়িতে। রহস্য, তিনি সবসময় বলতেন, ধৈর্য – মাংস ধীরে ধীরে রান্না করতে হবে যতক্ষণ না এটি মশলার প্রতিটি ফোঁটা শোষণ করে। এখন, প্রতি রবিবার, যখন কষা মাংসের সুগন্ধ আমার রান্নাঘর ভরে যায়, আমি আমার আগে যারা এসেছিলেন সেই মহিলাদের সাথে সংযুক্ত বোধ করি।",
        memories: "আমার মনে আছে দিদা বলতেন, 'সেরা কষা মাংস এতটাই নরম হওয়া উচিত, ভালোবাসার চোখে তাকালেই হাড় থেকে খসে পড়বে।'"
      }
    },
    ingredients: [
      { item: 'Mutton', amount: '750g', itemBengali: 'মাংস' },
      { item: 'Onions', amount: '4 large', itemBengali: 'পেঁয়াজ' },
      { item: 'Yogurt', amount: '1 cup', itemBengali: 'দই' },
      { item: 'Ginger-garlic paste', amount: '3 tbsp', itemBengali: 'আদা-রসুন বাটা' },
      { item: 'Kashmiri red chili', amount: '2 tbsp', itemBengali: 'কাশ্মীরি লাল লঙ্কা' },
      { item: 'Garam masala', amount: '1 tsp', itemBengali: 'গরম মশলা' },
      { item: 'Mustard oil', amount: '½ cup', itemBengali: 'সর্ষের তেল' }
    ],
    steps: [
      { step: 1, instruction: 'Marinate mutton with yogurt, ginger-garlic paste, and salt for 2 hours', instructionBengali: 'মাংস দই, আদা-রসুন বাটা এবং নুন দিয়ে ২ ঘন্টা মেরিনেট করুন' },
      { step: 2, instruction: 'Heat mustard oil until smoking, then cool slightly', instructionBengali: 'সর্ষের তেল ধোঁয়া ওঠা পর্যন্ত গরম করুন, তারপর একটু ঠান্ডা করুন' },
      { step: 3, instruction: 'Fry sliced onions until deep brown (this is key!)', instructionBengali: 'কাটা পেঁয়াজ গভীর বাদামী হওয়া পর্যন্ত ভাজুন (এটাই মূল!)' },
      { step: 4, instruction: 'Add marinated mutton and cook on high for 10 minutes', instructionBengali: 'মেরিনেট করা মাংস যোগ করুন এবং উচ্চ আঁচে ১০ মিনিট রান্না করুন' },
      { step: 5, instruction: 'Lower heat and slow cook for 1 hour until oil separates', instructionBengali: 'আঁচ কমিয়ে তেল আলাদা না হওয়া পর্যন্ত ১ ঘন্টা ধীরে রান্না করুন' }
    ],
    tips: 'The secret is in the "koshano" – the slow caramelization. Never rush this dish.',
    tipsBengali: 'রহস্য হল "কষানো" – ধীর ক্যারামেলাইজেশন। এই পদ তাড়াহুড়ো করবেন না।'
  },
  {
    id: 'recipe-002',
    name: 'Rosogolla',
    nameBengali: 'রসগোল্লা',
    category: 'Dessert',
    categoryBengali: 'মিষ্টি',
    image: 'https://images.unsplash.com/photo-1666190077490-67d0c72a8d37?auto=format&fit=crop&w=800&h=500&q=80',
    cookTime: '45 mins',
    servings: 12,
    difficulty: 'Hard',
    rating: 5.0,
    reviews: 567,
    heritage: 'Kolkata Original',
    featured: true,
    familyStory: {
      en: {
        title: "The Sweet Memory",
        storyteller: "Debashish Das, 56, North Kolkata",
        story: "My father worked at K.C. Das for 40 years. Growing up, I would visit him at the shop and watch the magic – fresh chhena being kneaded, shaped into balls, and dropped into boiling sugar syrup. The hissing sound, the rising of the rosogollas, the first bite of a fresh one – these are my childhood. When he retired, he taught me the exact technique. 'The chhena must be like a baby's cheek,' he would say, 'soft, smooth, without any grain.' Now I make them for my grandchildren, and they call them 'Dadu's magic balls.'",
        memories: "Father always said, 'A true rosogolla must be spongy enough to squeeze and spring back immediately.'"
      },
      bn: {
        title: "মিষ্টি স্মৃতি",
        storyteller: "দেবাশীষ দাস, ৫৬, উত্তর কলকাতা",
        story: "আমার বাবা কে.সি. দাসে ৪০ বছর কাজ করেছিলেন। বড় হতে হতে, আমি তাঁকে দোকানে দেখতে যেতাম এবং জাদু দেখতাম – তাজা ছানা মাখা হচ্ছে, গোল করা হচ্ছে, এবং ফুটন্ত চিনির সিরায় ফেলা হচ্ছে। সেই হিসহিস শব্দ, রসগোল্লা ভেসে ওঠা, তাজা একটার প্রথম কামড় – এগুলো আমার শৈশব। অবসর নেওয়ার পর তিনি আমাকে সঠিক কৌশল শেখালেন।",
        memories: "বাবা সবসময় বলতেন, 'আসল রসগোল্লা এতটাই স্পঞ্জি হতে হবে যে চাপ দিলে সঙ্গে সঙ্গে ফিরে আসবে।'"
      }
    },
    ingredients: [
      { item: 'Full cream milk', amount: '2 liters', itemBengali: 'ফুল ক্রিম দুধ' },
      { item: 'Lemon juice', amount: '4 tbsp', itemBengali: 'লেবুর রস' },
      { item: 'Sugar', amount: '2 cups', itemBengali: 'চিনি' },
      { item: 'Water', amount: '6 cups', itemBengali: 'জল' },
      { item: 'Cardamom', amount: '2-3 pods', itemBengali: 'এলাচ' },
      { item: 'Rose water', amount: '1 tsp (optional)', itemBengali: 'গোলাপ জল (ঐচ্ছিক)' }
    ],
    steps: [
      { step: 1, instruction: 'Boil milk, add lemon juice to curdle, strain through muslin', instructionBengali: 'দুধ ফুটিয়ে লেবুর রস দিয়ে ফাটিয়ে মসলিনে ছেঁকে নিন' },
      { step: 2, instruction: 'Knead chhena for 8-10 minutes until completely smooth', instructionBengali: 'ছানা ৮-১০ মিনিট মাখুন যতক্ষণ না সম্পূর্ণ মসৃণ হয়' },
      { step: 3, instruction: 'Make small balls, ensure no cracks', instructionBengali: 'ছোট গোল করুন, কোনো ফাটল যেন না থাকে' },
      { step: 4, instruction: 'Prepare sugar syrup with cardamom, bring to rolling boil', instructionBengali: 'এলাচ দিয়ে চিনির সিরা তৈরি করুন, জোর ফুটন্ত করুন' },
      { step: 5, instruction: 'Add balls, cover and cook for 15 mins on high heat', instructionBengali: 'গোল দিন, ঢাকা দিয়ে উচ্চ আঁচে ১৫ মিনিট রান্না করুন' }
    ],
    tips: 'The kneading is crucial. Under-kneaded chhena will crack; over-kneaded will become hard.',
    tipsBengali: 'মাখা অত্যন্ত গুরুত্বপূর্ণ। কম মাখলে ফাটবে; বেশি মাখলে শক্ত হবে।'
  },
  {
    id: 'recipe-003',
    name: 'Shorshe Ilish',
    nameBengali: 'সর্ষে ইলিশ',
    category: 'Main Course',
    categoryBengali: 'মূল খাবার',
    image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?auto=format&fit=crop&w=800&h=500&q=80',
    cookTime: '30 mins',
    servings: 4,
    difficulty: 'Medium',
    rating: 4.9,
    reviews: 423,
    heritage: 'Monsoon Delicacy',
    featured: true,
    familyStory: {
      en: {
        title: "Monsoon Memories",
        storyteller: "Supriya Banerjee, 62, Behala",
        story: "In Bengal, ilish and monsoon are inseparable. My mother would wait for the first big ilish of the season – always bought from our trusted fishmonger who knew exactly which fish had the right amount of fat. The ritual was sacred: fresh ilish, stone-ground mustard, green chilies from our own plant, and the steam rising from the covered pan. When I smell shorshe ilish now, I'm instantly transported to those monsoon afternoons, rain pattering on the window, Ma in the kitchen, and the promise of that first bite.",
        memories: "Ma always said, 'The ilish tells you when it's done – the mustard will glisten like gold.'"
      },
      bn: {
        title: "বর্ষার স্মৃতি",
        storyteller: "সুপ্রিয়া ব্যানার্জি, ৬২, বেহালা",
        story: "বাংলায়, ইলিশ আর বর্ষা অবিচ্ছেদ্য। মা মৌসুমের প্রথম বড় ইলিশের জন্য অপেক্ষা করতেন – সবসময় আমাদের বিশ্বস্ত মাছ বিক্রেতার কাছ থেকে কেনা হত যিনি জানতেন ঠিক কোন মাছে সঠিক পরিমাণ চর্বি আছে। আচারটি ছিল পবিত্র: তাজা ইলিশ, শিলনোড়ায় বাটা সর্ষে, আমাদের নিজের গাছের কাঁচা লঙ্কা।",
        memories: "মা সবসময় বলতেন, 'ইলিশ নিজেই বলে দেয় কখন হয়ে গেছে – সর্ষে সোনার মতো চকচক করবে।'"
      }
    },
    ingredients: [
      { item: 'Hilsa fish', amount: '4 pieces', itemBengali: 'ইলিশ মাছ' },
      { item: 'Mustard seeds', amount: '4 tbsp', itemBengali: 'সর্ষে' },
      { item: 'Green chilies', amount: '6-8', itemBengali: 'কাঁচা লঙ্কা' },
      { item: 'Mustard oil', amount: '4 tbsp', itemBengali: 'সর্ষের তেল' },
      { item: 'Turmeric', amount: '1 tsp', itemBengali: 'হলুদ' },
      { item: 'Salt', amount: 'to taste', itemBengali: 'নুন স্বাদমতো' }
    ],
    steps: [
      { step: 1, instruction: 'Soak mustard seeds for 30 mins, grind to smooth paste', instructionBengali: 'সর্ষে ৩০ মিনিট ভিজিয়ে মসৃণ বাটা করুন' },
      { step: 2, instruction: 'Marinate fish with turmeric and salt', instructionBengali: 'মাছ হলুদ ও নুন দিয়ে মাখিয়ে রাখুন' },
      { step: 3, instruction: 'Lightly fry fish in mustard oil and set aside', instructionBengali: 'সর্ষের তেলে মাছ হালকা ভেজে তুলে রাখুন' },
      { step: 4, instruction: 'Mix mustard paste with water, green chilies, and oil', instructionBengali: 'সর্ষে বাটা জল, কাঁচা লঙ্কা ও তেল দিয়ে মেশান' },
      { step: 5, instruction: 'Add fish, cover and cook on low heat for 10 minutes', instructionBengali: 'মাছ দিন, ঢাকা দিয়ে ধীমা আঁচে ১০ মিনিট রান্না করুন' }
    ],
    tips: 'Never overcook ilish – it should be just done, flaky and moist.',
    tipsBengali: 'ইলিশ কখনও বেশি রান্না করবেন না – ঠিক হয়ে গেলেই নামান, আঁশালো ও রসালো থাকবে।'
  },
  {
    id: 'recipe-004',
    name: 'Mishti Doi',
    nameBengali: 'মিষ্টি দই',
    category: 'Dessert',
    categoryBengali: 'মিষ্টি',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&h=500&q=80',
    cookTime: '8 hours (set)',
    servings: 6,
    difficulty: 'Easy',
    rating: 4.8,
    reviews: 289,
    heritage: 'Bengali Classic',
    featured: false,
    familyStory: {
      en: {
        title: "Clay Pot Magic",
        storyteller: "Bimal Ghosh, 70, Shantiniketan",
        story: "My grandmother's mishti doi was legendary in our para (neighborhood). Her secret? The earthen pot. 'The pot breathes,' she would explain, 'it takes the excess water and gives the doi its creamy texture.' Every evening, she would set the doi near the kitchen fire, wrapped in an old shawl. By morning, magic. I still use her 50-year-old recipe and her technique of caramelizing the sugar until it's just copper-colored – not too light, not burnt.",
        memories: "Thamma said, 'The best mishti doi should be so set, you can turn the pot upside down and it won't fall.'"
      },
      bn: {
        title: "মাটির হাঁড়ির জাদু",
        storyteller: "বিমল ঘোষ, ৭০, শান্তিনিকেতন",
        story: "আমার ঠাকুমার মিষ্টি দই আমাদের পাড়ায় কিংবদন্তি ছিল। তাঁর রহস্য? মাটির হাঁড়ি। 'হাঁড়ি শ্বাস নেয়,' তিনি বোঝাতেন, 'এটা অতিরিক্ত জল নেয় এবং দইকে ক্রিমি টেক্সচার দেয়।' প্রতি সন্ধ্যায়, তিনি রান্নাঘরের আগুনের কাছে দই বসাতেন, পুরনো শাল দিয়ে মোড়া। সকালে, জাদু।",
        memories: "ঠাম্মা বলতেন, 'সেরা মিষ্টি দই এতটাই জমাট হওয়া উচিত, হাঁড়ি উলটে দিলেও পড়বে না।'"
      }
    },
    ingredients: [
      { item: 'Full cream milk', amount: '1 liter', itemBengali: 'ফুল ক্রিম দুধ' },
      { item: 'Sugar', amount: '½ cup', itemBengali: 'চিনি' },
      { item: 'Yogurt culture', amount: '2 tbsp', itemBengali: 'দই' },
      { item: 'Cardamom powder', amount: '¼ tsp', itemBengali: 'এলাচ গুঁড়া' }
    ],
    steps: [
      { step: 1, instruction: 'Reduce milk to half by slow boiling', instructionBengali: 'ধীরে ফুটিয়ে দুধ অর্ধেক করুন' },
      { step: 2, instruction: 'Caramelize sugar until copper colored', instructionBengali: 'চিনি তামাটে রঙ না হওয়া পর্যন্ত ক্যারামেলাইজ করুন' },
      { step: 3, instruction: 'Add caramel to hot milk, mix well', instructionBengali: 'গরম দুধে ক্যারামেল মেশান' },
      { step: 4, instruction: 'Cool to lukewarm, add yogurt culture', instructionBengali: 'হালকা গরম করে দই মেশান' },
      { step: 5, instruction: 'Set in earthen pots for 6-8 hours', instructionBengali: 'মাটির হাঁড়িতে ৬-৮ ঘন্টা জমাতে দিন' }
    ],
    tips: 'The earthen pot is essential – it absorbs excess moisture and gives the characteristic texture.',
    tipsBengali: 'মাটির হাঁড়ি অপরিহার্য – এটি অতিরিক্ত আর্দ্রতা শোষণ করে এবং বৈশিষ্ট্যপূর্ণ টেক্সচার দেয়।'
  }
];

const RecipeVault: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(recipes[0]);
  const [language, setLanguage] = useState<'en' | 'bn'>('en');
  const [activeTab, setActiveTab] = useState<'story' | 'recipe' | 'video'>('story');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

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
          voiceService.playAudio(result.audioUrl, `recipe-${selectedRecipe.id}`, () => setIsSpeaking(false));
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

  const toggleSaved = (recipeId: string) => {
    setSavedRecipes(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const currentStory = selectedRecipe.familyStory[language];

  const filteredRecipes = recipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.nameBengali.includes(searchQuery)
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <BlurFade delay={0.1} inView>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-r from-durga-500 to-kolkata-yellow rounded-2xl flex items-center justify-center shadow-lg">
              <ChefHat className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-heritage">
                Recipe Heritage{' '}
                <AnimatedGradientText className="text-3xl">Vault</AnimatedGradientText>
                {' '}🍛
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Preserving family recipes & stories • <span className="font-bengali">রেসিপি সংরক্ষণ</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'bn' ? 'রেসিপি খুঁজুন...' : 'Search recipes...'}
                className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-kolkata-yellow"
              />
            </div>

            {/* Language Toggle */}
            <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-durga-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                🇬🇧 English
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-4 py-2 text-sm font-medium transition-colors font-bengali ${
                  language === 'bn'
                    ? 'bg-kolkata-yellow text-gray-900'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                🪔 বাংলা
              </button>
            </div>
          </div>
        </div>
      </BlurFade>

      {/* Recipe Cards */}
      <BlurFade delay={0.2} inView>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredRecipes.map((recipe) => {
            const isSelected = selectedRecipe.id === recipe.id;
            const isSaved = savedRecipes.includes(recipe.id);

            return (
              <motion.div
                key={recipe.id}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedRecipe(recipe)}
                className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all ${
                  isSelected ? 'ring-4 ring-durga-500 shadow-2xl' : 'shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="relative h-40">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Save Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaved(recipe.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-kolkata-yellow text-kolkata-yellow' : 'text-white'}`} />
                  </button>

                  {recipe.featured && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-durga-500 text-white rounded-full text-xs font-bold">
                      Heritage
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white font-semibold text-sm">{recipe.name}</h3>
                    <p className="text-kolkata-gold text-xs font-bengali">{recipe.nameBengali}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 text-white/80 text-xs">
                        <Clock className="w-3 h-3" />
                        {recipe.cookTime}
                      </div>
                      <div className="flex items-center gap-1 text-white/80 text-xs">
                        <Star className="w-3 h-3 fill-kolkata-yellow text-kolkata-yellow" />
                        {recipe.rating}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </BlurFade>

      {/* Selected Recipe Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <MagicCard gradientColor="#E23D28" gradientOpacity={0.15}>
            <div className="relative">
              <BorderBeam size={300} duration={20} colorFrom="#E23D28" colorTo="#FFB800" />

              {/* Cover Image */}
              <div className="relative h-56 rounded-t-xl overflow-hidden">
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                
                <div className="absolute bottom-4 left-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-durga-500 text-white rounded-full text-xs font-medium">
                      {language === 'bn' ? selectedRecipe.categoryBengali : selectedRecipe.category}
                    </span>
                    <span className="px-3 py-1 bg-kolkata-yellow/90 text-gray-900 rounded-full text-xs font-medium">
                      {selectedRecipe.heritage}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white font-heritage">{selectedRecipe.name}</h2>
                  <p className="text-kolkata-gold font-bengali text-xl">{selectedRecipe.nameBengali}</p>
                </div>

                {/* Voice Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSpeak(currentStory.story)}
                  className={`absolute top-4 right-4 p-3 rounded-full shadow-lg ${
                    isSpeaking 
                      ? 'bg-durga-500 text-white' 
                      : 'bg-white/90 text-durga-500 hover:bg-white'
                  }`}
                >
                  {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </motion.button>
              </div>

              <div className="p-6">
                {/* Meta */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <Clock className="w-4 h-4 text-durga-500" />
                    <span className="text-sm">{selectedRecipe.cookTime}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <Users className="w-4 h-4 text-durga-500" />
                    <span className="text-sm">{selectedRecipe.servings} servings</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <Flame className="w-4 h-4 text-durga-500" />
                    <span className="text-sm">{selectedRecipe.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <Star className="w-4 h-4 fill-kolkata-yellow text-kolkata-yellow" />
                    <span className="text-sm">{selectedRecipe.rating} ({selectedRecipe.reviews})</span>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                  {(['story', 'recipe', 'video'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                        activeTab === tab
                          ? 'bg-gradient-to-r from-durga-500 to-kolkata-yellow text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {tab === 'story' ? (language === 'bn' ? 'গল্প' : 'Story') : 
                       tab === 'recipe' ? (language === 'bn' ? 'রেসিপি' : 'Recipe') : 
                       (language === 'bn' ? 'ভিডিও' : 'Video')}
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
                      <h3 className={`text-xl font-semibold text-gray-900 dark:text-white ${language === 'bn' ? 'font-bengali' : 'font-heritage'}`}>
                        {currentStory.title}
                      </h3>
                      <p className="text-sm text-durga-500 dark:text-durga-400">
                        — {currentStory.storyteller}
                      </p>
                      <p className={`text-gray-700 dark:text-gray-300 leading-relaxed ${language === 'bn' ? 'font-bengali' : ''}`}>
                        {currentStory.story}
                      </p>

                      {/* Memory Quote */}
                      <div className="bg-gradient-to-r from-durga-50 to-kolkata-yellow/10 dark:from-durga-900/20 dark:to-kolkata-yellow/5 rounded-xl p-6 border-l-4 border-durga-500">
                        <p className={`text-lg italic text-durga-600 dark:text-durga-400 ${language === 'bn' ? 'font-bengali' : ''}`}>
                          "{currentStory.memories}"
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'recipe' && (
                    <motion.div
                      key="recipe"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      {/* Ingredients */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-kolkata-yellow" />
                          {language === 'bn' ? 'উপকরণ' : 'Ingredients'}
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {selectedRecipe.ingredients.map((ing, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                              <span className={`text-gray-700 dark:text-gray-300 ${language === 'bn' ? 'font-bengali' : ''}`}>
                                {language === 'bn' ? ing.itemBengali : ing.item}
                              </span>
                              <span className="text-sm text-durga-500 font-medium">{ing.amount}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Steps */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-kolkata-yellow" />
                          {language === 'bn' ? 'পদ্ধতি' : 'Instructions'}
                        </h3>
                        <div className="space-y-4">
                          {selectedRecipe.steps.map((step) => (
                            <div key={step.step} className="flex gap-4">
                              <div className="w-8 h-8 bg-durga-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                                {step.step}
                              </div>
                              <p className={`text-gray-700 dark:text-gray-300 ${language === 'bn' ? 'font-bengali' : ''}`}>
                                {language === 'bn' ? step.instructionBengali : step.instruction}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tips */}
                      <div className="bg-kolkata-yellow/10 rounded-xl p-4 border border-kolkata-yellow/30">
                        <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                          <Flame className="w-4 h-4 text-durga-500 flex-shrink-0 mt-0.5" />
                          <span className={language === 'bn' ? 'font-bengali' : ''}>
                            <strong>{language === 'bn' ? 'টিপস:' : 'Pro Tip:'}</strong>{' '}
                            {language === 'bn' ? selectedRecipe.tipsBengali : selectedRecipe.tips}
                          </span>
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'video' && (
                    <motion.div
                      key="video"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center"
                    >
                      <div className="text-center">
                        <Play className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">{language === 'bn' ? 'ভিডিও শীঘ্রই আসছে' : 'Video coming soon'}</p>
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
            {/* Share */}
            <MagicCard gradientColor="#22c55e" gradientOpacity={0.1}>
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  {language === 'bn' ? 'আপনার গল্প শেয়ার করুন' : 'Share Your Story'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {language === 'bn' 
                    ? 'আপনার পারিবারিক রেসিপি ও গল্প যোগ করে এই ভল্টকে সমৃদ্ধ করুন।'
                    : 'Help preserve heritage by adding your family recipe and story to the vault.'}
                </p>
                <ShimmerButton
                  className="w-full"
                  background="linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
                >
                  <Plus className="w-4 h-4" />
                  <span>{language === 'bn' ? 'রেসিপি যোগ করুন' : 'Add Recipe'}</span>
                </ShimmerButton>
              </div>
            </MagicCard>

            {/* Preservation Badge */}
            <MagicCard gradientColor="#D4A015" gradientOpacity={0.1}>
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-kolkata-yellow to-heritage-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {language === 'bn' ? 'ডিজিটাল সংরক্ষণ' : 'Digital Preservation'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'bn'
                    ? 'এই রেসিপিগুলি ভবিষ্যৎ প্রজন্মের জন্য সংরক্ষিত হচ্ছে।'
                    : 'These recipes are being preserved for future generations.'}
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Globe className="w-4 h-4" />
                  <span>{recipes.length} recipes preserved</span>
                </div>
              </div>
            </MagicCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeVault;


