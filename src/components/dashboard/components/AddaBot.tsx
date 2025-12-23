import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Send, Bot, User, Globe, Sparkles, Volume2, VolumeX, 
  Coffee, MapPin, Utensils, Camera, Bus, Star, Heart,
  Loader2, MessageSquare, Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BorderBeam } from '../../magicui/BorderBeam';
import { AnimatedGradientText } from '../../magicui/AnimatedGradientText';
import { aiService, voiceService, isElevenLabsConfigured } from '../../../lib/services';
import { AddaTeaIcon, TramIcon, DurgaIcon } from '../../kolkata/KolkataIcons';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  language?: 'en' | 'bn';
}

interface AddaBotProps {
  isOpen: boolean;
  onClose: () => void;
}

// Kolkata-style Adda responses with Bengali flavor
const addaResponses = {
  greetings: {
    en: [
      "Nomoshkar! 🙏 Welcome to Kolkata, the City of Joy! Ki khobor? Tell me what you want to explore today - I'm here for some adda!",
      "Arey bhai/didi! 👋 Welcome to our beloved Kolkata! Whether it's phuchka at Victoria Memorial or a ferry ride on the Hooghly, I've got you covered!",
      "Dada/Didi, apni bhalo achhen? 🪔 I'm your Kolkata guide with a heart full of rosogolla sweetness! Ask me anything!"
    ],
    bn: [
      "নমস্কার! 🙏 আনন্দের শহর কলকাতায় স্বাগতম! কী খবর? বলুন আজ কী explore করতে চান - আমি আড্ডার জন্য রেডি!",
      "আরে ভাই/দিদি! 👋 আমাদের প্রিয় কলকাতায় স্বাগতম! ভিক্টোরিয়া মেমোরিয়ালে ফুচকা হোক বা হুগলিতে ফেরি রাইড - সব arrange করব!",
      "দাদা/দিদি, আপনি ভালো আছেন? 🪔 আমি আপনার কলকাতার গাইড - রসগোল্লার মতো মিষ্টি মন নিয়ে! যা জানতে চান জিজ্ঞেস করুন!"
    ]
  },
  food: {
    en: [
      "Ahhh food talk! 🍛 In Kolkata, we don't just eat - we celebrate! From the legendary Kathi Rolls at Nizam's to the divine Mishti Doi at Balaram Mullick, every bite tells a story. Ki khaben bolun? What are you craving?",
      "Khide peyechhe? 🥘 Let me tell you dada/didi - Kolkata's food is an emotion! Try the iconic Kosha Mangsho at Golbari, or the silky Chelo Kebab at Peter Cat. And for sweet ending? KC Das er rosogolla is mandatory!",
      "Bhai, Kolkata r khabar er kotha bolte gele raat kaṭe jabe! 🍽️ Must try: Mughlai Paratha at Paramount, Biryani at Arsalan, and end with Sandesh from any sweet shop. Porer jonmo e abar asben ei khabar er jonno!"
    ],
    bn: [
      "আহা খাবারের কথা! 🍛 কলকাতায় আমরা শুধু খাই না - উদযাপন করি! নিজাম'স-এর কাঠি রোল থেকে বলরাম মল্লিক-এর মিষ্টি দই - প্রতিটা কামড়ে গল্প আছে। কী খাবেন বলুন?",
      "খিদে পেয়েছে? 🥘 দাদা/দিদি বলি - কলকাতার খাবার একটা ইমোশন! গোলবাড়ির কষা মাংস ট্রাই করুন, Peter Cat-এর চেলো কাবাব। মিষ্টিতে শেষ? KC দাসের রসগোল্লা mandatory!",
      "ভাই, কলকাতার খাবারের কথা বলতে গেলে রাত কাটে যাবে! 🍽️ Must try: প্যারামাউন্টের মোগলাই পরোটা, আরসালানের বিরিয়ানি, শেষে যেকোনো মিষ্টির দোকান থেকে সন্দেশ। পরের জন্মে আবার আসবেন এই খাবারের জন্য!"
    ]
  },
  places: {
    en: [
      "Kolkata sightseeing? 🏛️ Start with Victoria Memorial at sunrise - it's magical! Then walk to Howrah Bridge, feel the city's heartbeat. In the evening, take a stroll at Prinsep Ghat watching the sunset over Hooghly. Pure joy!",
      "Dada/Didi, Kolkata is best explored slowly with chai in hand! ☕ Begin at College Street - the world's largest second-hand book market, then to Indian Museum (oldest in Asia!), end at Park Street for that vintage Calcutta vibe!",
      "Want the authentic Kolkata experience? 🎭 Morning at Marble Palace (hidden gem!), afternoon in Kumartuli watching artists create gods from clay, evening at Dakshineswar Temple. This is the soul of Kolkata!"
    ],
    bn: [
      "কলকাতা ঘোরাঘুরি? 🏛️ সূর্যোদয়ে ভিক্টোরিয়া মেমোরিয়াল দিয়ে শুরু করুন - জাদুকরী! তারপর হাওড়া ব্রিজে হাঁটুন, শহরের হার্টবিট অনুভব করুন। সন্ধ্যায় প্রিন্সেপ ঘাটে হুগলির সূর্যাস্ত দেখুন!",
      "দাদা/দিদি, কলকাতা চায়ের কাপ হাতে আস্তে আস্তে explore করতে হয়! ☕ কলেজ স্ট্রীট দিয়ে শুরু করুন - বিশ্বের বৃহত্তম সেকেন্ড-হ্যান্ড বইয়ের বাজার, তারপর ইন্ডিয়ান মিউজিয়াম!",
      "অথেন্টিক কলকাতার অভিজ্ঞতা চান? 🎭 সকালে মার্বেল প্যালেস (লুকানো রত্ন!), দুপুরে কুমারটুলিতে শিল্পীদের মাটি থেকে দেবতা তৈরি দেখুন, সন্ধ্যায় দক্ষিণেশ্বর মন্দির। এটাই কলকাতার আত্মা!"
    ]
  },
  transport: {
    en: [
      "Transport in Kolkata? 🚃 You MUST ride the iconic yellow tram - it's heritage on wheels! Metro is fastest, but for the real experience, take a hand-pulled rickshaw in North Kolkata or ferry across the Ganges!",
      "Getting around Kolkata is an adventure! 🚕 Yellow Ambassador taxis, blue Ola/Uber, Metro (India's first!), and of course - the legendary trams. Pro tip: Avoid rush hour on Howrah Bridge unless you want 2-hour traffic jam!",
      "Dada, Kolkata te ghura mane adventure! 🛺 Try everything - Metro for speed, tram for romance, ferry for views, and yellow taxi for authentic experience. The city is best explored on foot though - every gully has a story!"
    ],
    bn: [
      "কলকাতায় যাতায়াত? 🚃 আপনাকে iconic হলুদ ট্রামে চড়তেই হবে - চাকায় হেরিটেজ! মেট্রো সবচেয়ে দ্রুত, কিন্তু আসল অভিজ্ঞতার জন্য, উত্তর কলকাতায় হাতে টানা রিকশা নিন!",
      "কলকাতায় ঘোরাঘুরি নিজেই একটা adventure! 🚕 হলুদ অ্যাম্বাসেডর ট্যাক্সি, নীল ওলা/উবার, মেট্রো (ভারতের প্রথম!), আর অবশ্যই - legendary ট্রাম। Pro tip: হাওড়া ব্রিজে rush hour এড়িয়ে চলুন!",
      "দাদা, কলকাতায় ঘোরা মানে অ্যাডভেঞ্চার! 🛺 সব ট্রাই করুন - মেট্রো স্পিডের জন্য, ট্রাম রোমান্সের জন্য, ফেরি দৃশ্যের জন্য। শহর পায়ে হেঁটে explore করাই সেরা - প্রতিটা গলিতে গল্প আছে!"
    ]
  },
  culture: {
    en: [
      "Kolkata's culture? 🎭 Where do I begin! We gave the world Rabindranath Tagore, Satyajit Ray, Mother Teresa! Our adda culture is UNESCO-worthy! We debate politics, poetry, and football with equal passion. Ami Bangali!",
      "Culture in City of Joy? 🪔 Durga Puja is our heartbeat - the whole city transforms into an art gallery! Year-round: Rabindra Sangeet echoes everywhere, theater thrives at Academy of Fine Arts, and coffee houses host intellectual revolutions!",
      "Dada/Didi, Kolkata IS culture! 📚 From Nandan film center to College Street bookstores, from Rabindra Sadan to Oxford Bookstore's Cha Bar - we live and breathe art, literature, music. Even our roadside chai wallah discusses Tagore!"
    ],
    bn: [
      "কলকাতার সংস্কৃতি? 🎭 কোথা থেকে শুরু করি! আমরা বিশ্বকে রবীন্দ্রনাথ ঠাকুর, সত্যজিৎ রায়, মাদার তেরেসা দিয়েছি! আমাদের আড্ডার কালচার UNESCO-worthy! আমরা রাজনীতি, কবিতা, ফুটবল নিয়ে সমান উদ্দীপনায় বিতর্ক করি!",
      "আনন্দের শহরে সংস্কৃতি? 🪔 দুর্গাপূজা আমাদের হার্টবিট - পুরো শহর আর্ট গ্যালারিতে পরিণত হয়! সারাবছর: রবীন্দ্রসংগীত সব জায়গায় প্রতিধ্বনিত হয়, থিয়েটার ফাইন আর্টস একাডেমিতে সমৃদ্ধ হয়!",
      "দাদা/দিদি, কলকাতা মানেই সংস্কৃতি! 📚 নন্দন ফিল্ম সেন্টার থেকে কলেজ স্ট্রিট বইয়ের দোকান, রবীন্দ্র সদন থেকে অক্সফোর্ড বুকস্টোরের চা বার - আমরা শিল্প, সাহিত্য, সংগীতে বাঁচি। এমনকি আমাদের রাস্তার চা-ওয়ালাও রবীন্দ্রনাথ নিয়ে আলোচনা করে!"
    ]
  },
  puja: {
    en: [
      "Durga Puja! 🪔 Ohho, this is not just a festival - it's Kolkata's soul! For 5 days, 3000+ pandals turn the city into the world's largest open-air art gallery. The dhak beats, the new clothes, the late-night pandal hopping - UNMATCHED!",
      "Pujo in Kolkata? 🔔 It's like the whole city becomes family! We dress up, hop pandals till 3 AM, eat at every corner, and feel the spiritual energy everywhere. The craftsmanship at pandals - from replicas of temples to modern art - mind-blowing!",
      "Bhai, Kolkata te Durga Puja manei - life stops, celebration starts! 🎉 Top pandals: Bagbazar, Kumartuli, College Square, Suruchi Sangha. Pro tip: Go late night, lesser crowd, same magic. And don't forget - Subho Bijoya on Dashami!"
    ],
    bn: [
      "দুর্গাপূজা! 🪔 ওহো, এটা শুধু একটা উৎসব না - এটা কলকাতার আত্মা! ৫ দিন ধরে ৩০০০+ প্যান্ডেল শহরকে বিশ্বের বৃহত্তম ওপেন-এয়ার আর্ট গ্যালারিতে পরিণত করে। ঢাকের বাজনা, নতুন জামাকাপড়, রাত জেগে প্যান্ডেল হপিং - UNMATCHED!",
      "কলকাতায় পুজো? 🔔 যেন পুরো শহর পরিবার হয়ে যায়! আমরা সেজেগুজে রাত ৩টা পর্যন্ত প্যান্ডেল ঘুরি, প্রতিটা কোণায় খাই, সব জায়গায় spiritual energy অনুভব করি। প্যান্ডেলের craftsmanship - মন্দিরের replica থেকে modern art!",
      "ভাই, কলকাতায় দুর্গাপূজা মানেই - জীবন থেমে যায়, উদযাপন শুরু হয়! 🎉 Top প্যান্ডেল: বাগবাজার, কুমারটুলি, কলেজ স্কোয়ার, সুরুচি সংঘ। Pro tip: রাতে যান, কম ভিড়, একই ম্যাজিক। আর ভুলবেন না - দশমীতে শুভ বিজয়া!"
    ]
  },
  fallback: {
    en: [
      "Ah interesting question, dada/didi! 🤔 Let me think about this over a cup of chai... Actually, why don't you ask me about Kolkata's food, places, transport, or Durga Puja? I have stories for days!",
      "Hmm, that's a tough one! 🫖 While I brew my answer, tell me - have you tried the phuchka near Victoria Memorial? Or walked across Howrah Bridge at sunset? Kolkata has so much to offer!",
      "Bhai/Didi, I'm more of a Kolkata specialist! 🏛️ Ask me about the best rosogolla, how to navigate the metro, or which pandal to visit during Puja. That's where my heart lies!"
    ],
    bn: [
      "আহ interesting প্রশ্ন, দাদা/দিদি! 🤔 এক কাপ চায়ের সাথে এটা নিয়ে ভাবি... আসলে, কলকাতার খাবার, জায়গা, যাতায়াত, বা দুর্গাপূজা নিয়ে জিজ্ঞেস করুন না? আমার কাছে গল্প আছে দিনের পর দিন!",
      "হুম, এটা কঠিন! 🫖 আমি উত্তর brew করছি, বলুন - ভিক্টোরিয়া মেমোরিয়ালের কাছে ফুচকা ট্রাই করেছেন? বা সূর্যাস্তে হাওড়া ব্রিজ পার হয়েছেন? কলকাতার অনেক কিছু offer করার আছে!",
      "ভাই/দিদি, আমি কলকাতা স্পেশালিস্ট! 🏛️ সেরা রসগোল্লা, মেট্রোতে কীভাবে navigate করতে হয়, বা পুজোয় কোন প্যান্ডেল ভিজিট করতে হবে - এসব জিজ্ঞেস করুন। ওখানেই আমার হৃদয়!"
    ]
  }
};

// Quick suggestions for Adda chat
const quickTopics = {
  en: [
    { icon: Utensils, label: "Best Food Spots", topic: "food" },
    { icon: MapPin, label: "Must-Visit Places", topic: "places" },
    { icon: Bus, label: "Getting Around", topic: "transport" },
    { icon: Star, label: "Culture & Arts", topic: "culture" },
    { icon: DurgaIcon, label: "Durga Puja", topic: "puja" }
  ],
  bn: [
    { icon: Utensils, label: "সেরা খাবার", topic: "food" },
    { icon: MapPin, label: "দর্শনীয় স্থান", topic: "places" },
    { icon: Bus, label: "যাতায়াত", topic: "transport" },
    { icon: Star, label: "সংস্কৃতি ও শিল্প", topic: "culture" },
    { icon: DurgaIcon, label: "দুর্গাপূজা", topic: "puja" }
  ]
};

const AddaBot: React.FC<AddaBotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState<'en' | 'bn'>('en');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const elevenLabsConfigured = isElevenLabsConfigured();

  // Initialize with greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = addaResponses.greetings[language][Math.floor(Math.random() * addaResponses.greetings[language].length)];
      setMessages([{
        id: 'initial',
        type: 'bot',
        content: greeting,
        timestamp: new Date(),
        language
      }]);
    }
  }, [isOpen, language]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAddaResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Detect topic from user message
    const foodKeywords = ['food', 'eat', 'restaurant', 'khana', 'khabar', 'biryani', 'rosogolla', 'sweet', 'roll', 'misti', 'খাবার', 'খাওয়া', 'মিষ্টি', 'বিরিয়ানি', 'রসগোল্লা'];
    const placeKeywords = ['visit', 'see', 'place', 'tourist', 'attraction', 'victoria', 'howrah', 'temple', 'museum', 'ghat', 'দেখা', 'জায়গা', 'ঘোরা', 'মন্দির'];
    const transportKeywords = ['transport', 'travel', 'metro', 'bus', 'tram', 'taxi', 'uber', 'train', 'ferry', 'যাতায়াত', 'ট্রাম', 'মেট্রো', 'ট্যাক্সি'];
    const cultureKeywords = ['culture', 'art', 'music', 'theater', 'poetry', 'rabindranath', 'tagore', 'film', 'literature', 'সংস্কৃতি', 'শিল্প', 'সাহিত্য', 'রবীন্দ্রনাথ'];
    const pujaKeywords = ['puja', 'pujo', 'durga', 'pandal', 'festival', 'dashami', 'পূজা', 'পুজো', 'দুর্গা', 'প্যান্ডেল', 'দশমী'];

    let topic = 'fallback';
    
    if (foodKeywords.some(kw => lowerMessage.includes(kw))) topic = 'food';
    else if (placeKeywords.some(kw => lowerMessage.includes(kw))) topic = 'places';
    else if (transportKeywords.some(kw => lowerMessage.includes(kw))) topic = 'transport';
    else if (cultureKeywords.some(kw => lowerMessage.includes(kw))) topic = 'culture';
    else if (pujaKeywords.some(kw => lowerMessage.includes(kw))) topic = 'puja';

    const responses = addaResponses[topic as keyof typeof addaResponses][language];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      language
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay for natural feel
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));

    const botResponse = getAddaResponse(inputMessage);
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: botResponse,
      timestamp: new Date(),
      language
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);

    // Auto-speak if enabled
    if (autoSpeak) {
      handleSpeak(botResponse);
    }
  };

  const handleTopicClick = (topic: string) => {
    const topicMessages: Record<string, Record<'en' | 'bn', string>> = {
      food: { en: "What are the best places to eat in Kolkata?", bn: "কলকাতায় খাওয়ার সেরা জায়গা কোথায়?" },
      places: { en: "What places should I visit in Kolkata?", bn: "কলকাতায় কোন জায়গাগুলো দেখা উচিত?" },
      transport: { en: "How do I get around in Kolkata?", bn: "কলকাতায় কীভাবে যাতায়াত করব?" },
      culture: { en: "Tell me about Kolkata's culture and arts", bn: "কলকাতার সংস্কৃতি ও শিল্প সম্পর্কে বলুন" },
      puja: { en: "Tell me about Durga Puja in Kolkata!", bn: "কলকাতায় দুর্গাপূজা সম্পর্কে বলুন!" }
    };

    setInputMessage(topicMessages[topic][language]);
    // Auto-send after a brief delay
    setTimeout(() => {
      const input = topicMessages[topic][language];
      setInputMessage('');
      
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: input,
        timestamp: new Date(),
        language
      };

      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);

      setTimeout(async () => {
        const botResponse = getAddaResponse(input);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: botResponse,
          timestamp: new Date(),
          language
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);

        if (autoSpeak) {
          handleSpeak(botResponse);
        }
      }, 1500);
    }, 300);
  };

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
          voiceService.playAudio(result.audioUrl, `adda-${Date.now()}`, () => setIsSpeaking(false));
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

  const handleLanguageSwitch = () => {
    const newLang = language === 'en' ? 'bn' : 'en';
    setLanguage(newLang);
    
    // Add language switch message
    const switchMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content: newLang === 'bn' 
        ? "বাংলায় স্বাগতম! 🪔 এখন আমি বাংলায় কথা বলব। কী জানতে চান?"
        : "Switching to English! 🇬🇧 Now I'll respond in English. What would you like to know?",
      timestamp: new Date(),
      language: newLang
    };
    setMessages(prev => [...prev, switchMessage]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-end p-4">
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.9 }}
        className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg h-[700px] flex flex-col overflow-hidden relative"
      >
        <BorderBeam size={400} duration={20} colorFrom="#FFB800" colorTo="#E23D28" />

        {/* Header - Kolkata themed */}
        <div className="relative bg-gradient-to-r from-kolkata-yellow via-kolkata-terracotta to-durga-500 p-5">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 tram-tracks" />
          </div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30"
              >
                <AddaTeaIcon className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2 font-heritage">
                  Adda Bot
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ☕
                  </motion.span>
                </h2>
                <p className="text-white/80 text-sm font-bengali">
                  {language === 'bn' ? 'আপনার কলকাতা গাইড' : 'Your Kolkata Companion'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLanguageSwitch}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors"
                title="Switch Language"
              >
                <Globe className="w-5 h-5 text-white" />
              </motion.button>

              {/* Settings */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSettings(true)}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5 text-white" />
              </motion.button>

              {/* Close */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>

          {/* Language Indicator */}
          <div className="flex items-center justify-center mt-3">
            <div className={`px-4 py-1 rounded-full text-xs font-medium ${
              language === 'bn' 
                ? 'bg-durga-600 text-white' 
                : 'bg-white/20 text-white'
            }`}>
              {language === 'bn' ? '🪔 বাংলায় আড্ডা' : '🇬🇧 English Adda'}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-end gap-2 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500'
                      : 'bg-gradient-to-r from-kolkata-yellow to-kolkata-terracotta'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <AddaTeaIcon className="w-4 h-4 text-white" />
                    )}
                  </div>

                  <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-md'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md'
                  }`}>
                    <p className={`text-sm leading-relaxed ${message.language === 'bn' ? 'font-bengali' : ''}`}>
                      {message.content}
                    </p>
                    
                    <div className={`flex items-center justify-between gap-3 mt-2 text-xs ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      
                      {message.type === 'bot' && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleSpeak(message.content)}
                          className={`p-1.5 rounded-full transition-colors ${
                            isSpeaking 
                              ? 'bg-kolkata-yellow text-white' 
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-kolkata-yellow hover:text-white'
                          }`}
                        >
                          {isSpeaking ? (
                            <VolumeX className="w-3 h-3" />
                          ) : (
                            <Volume2 className="w-3 h-3" />
                          )}
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-kolkata-yellow to-kolkata-terracotta rounded-xl flex items-center justify-center">
                  <AddaTeaIcon className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-1">
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-kolkata-yellow rounded-full"
                    />
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-kolkata-terracotta rounded-full"
                    />
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-durga-500 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Topics */}
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {quickTopics[language].map((topic, index) => {
              const IconComponent = topic.icon;
              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTopicClick(topic.topic)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:from-kolkata-yellow/20 hover:to-kolkata-terracotta/20 transition-all whitespace-nowrap border border-gray-200 dark:border-gray-600"
                >
                  <IconComponent className="w-4 h-4 text-kolkata-terracotta" />
                  <span className={language === 'bn' ? 'font-bengali' : ''}>{topic.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={language === 'bn' ? 'কলকাতা নিয়ে কিছু জিজ্ঞেস করুন...' : 'Ask about Kolkata...'}
                className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-kolkata-yellow focus:border-transparent transition-all ${language === 'bn' ? 'font-bengali' : ''}`}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="w-12 h-12 bg-gradient-to-r from-kolkata-yellow to-kolkata-terracotta rounded-xl flex items-center justify-center text-white shadow-lg shadow-kolkata-yellow/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isTyping ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl w-full max-w-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Settings className="w-5 h-5 text-kolkata-yellow" />
                  Adda Settings
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowSettings(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </motion.button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center justify-between text-gray-700 dark:text-gray-300">
                    <span className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-kolkata-yellow" />
                      Auto-speak responses
                    </span>
                    <button
                      onClick={() => setAutoSpeak(!autoSpeak)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        autoSpeak ? 'bg-kolkata-yellow' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <motion.div
                        animate={{ x: autoSpeak ? 24 : 2 }}
                        className="w-5 h-5 bg-white rounded-full shadow"
                      />
                    </button>
                  </label>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-green-500" />
                    Voice AI Status
                  </p>
                  <div className={`px-3 py-2 rounded-lg text-sm ${
                    elevenLabsConfigured 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                  }`}>
                    {elevenLabsConfigured 
                      ? '✓ ElevenLabs AI Voice Active'
                      : '⚠ Using Browser TTS (Add API key for premium voice)'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddaBot;


