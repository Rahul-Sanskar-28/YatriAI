import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedRecipes = async () => {
  console.log('🌱 Seeding Bengali recipes...');

  // Find existing users to assign as recipe authors
  const users = await prisma.user.findMany({
    where: {
      role: { in: ['tourist', 'admin'] }
    },
    take: 3
  });

  if (users.length === 0) {
    console.log('⚠️ No users found to assign as recipe authors');
    return;
  }

  const recipes = [
    {
      title: 'Authentic Kolkata Mishti Doi',
      description: 'Traditional Bengali sweet yogurt that melts in your mouth. A signature dessert from the City of Joy.',
      ingredients: [
        '1 liter full-fat milk',
        '4 tbsp sugar',
        '2 tbsp jaggery (gur)',
        '1/4 cup condensed milk',
        '1 tsp cardamom powder',
        'A pinch of saffron',
        '2 tbsp yogurt starter'
      ],
      instructions: [
        'Boil milk in a heavy-bottomed pan until it reduces to 3/4th of original quantity',
        'Add sugar and jaggery, stir until dissolved',
        'Let the milk cool to lukewarm temperature',
        'Add condensed milk, cardamom powder, and saffron',
        'Mix in yogurt starter gently',
        'Pour into earthen pots (bhaar) or glass containers',
        'Keep in a warm place for 6-8 hours to set',
        'Refrigerate before serving'
      ],
      prepTime: 20,
      cookTime: 45,
      servings: 6,
      difficulty: 'Medium',
      category: 'Bengali_Sweets',
      tags: ['traditional', 'dessert', 'kolkata-special', 'vegetarian'],
      image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=400',
      tips: [
        'Use earthen pots for authentic taste',
        'The milk should be lukewarm when adding yogurt starter',
        'Keep in a warm place for proper fermentation'
      ],
      story: 'Mishti Doi originated in Bengal and became synonymous with Kolkata\'s sweet culture. The earthen pots give it a unique flavor that cannot be replicated.',
      region: 'Kolkata',
      status: 'Approved',
      authorId: users[0].id
    },
    {
      title: 'Street-Style Kolkata Puchka',
      description: 'The iconic street food of Kolkata - crispy puris filled with spicy tamarind water and chutneys.',
      ingredients: [
        '30 puchka puris (store-bought or homemade)',
        '2 cups tamarind water (tetuler jol)',
        '1 cup boiled chickpeas',
        '2 boiled potatoes, mashed',
        '1 tbsp chaat masala',
        '1 tsp black salt',
        '1 tsp roasted cumin powder',
        'Mint-coriander chutney',
        'Sweet tamarind chutney',
        'Chopped onions and green chilies'
      ],
      instructions: [
        'Prepare tamarind water by soaking tamarind in water for 2 hours, then strain',
        'Add black salt, chaat masala, and cumin powder to tamarind water',
        'Mix boiled chickpeas with mashed potatoes',
        'Make a small hole in each puri',
        'Fill with potato-chickpea mixture',
        'Add both chutneys',
        'Pour spiced tamarind water just before eating',
        'Garnish with chopped onions and green chilies'
      ],
      prepTime: 30,
      cookTime: 15,
      servings: 4,
      difficulty: 'Easy',
      category: 'Street_Food',
      tags: ['street-food', 'spicy', 'tangy', 'vegetarian', 'kolkata-famous'],
      image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400',
      tips: [
        'Eat immediately after filling to maintain crispiness',
        'Adjust spice level according to taste',
        'Use fresh mint for better flavor'
      ],
      story: 'Puchka is the heart of Kolkata street food culture. Every neighborhood has its famous puchka-wallah with their secret recipe.',
      region: 'Kolkata',
      status: 'Approved',
      authorId: users[1].id
    },
    {
      title: 'Traditional Bengali Fish Curry (Macher Jhol)',
      description: 'A light and flavorful Bengali fish curry that pairs perfectly with steamed rice.',
      ingredients: [
        '500g rohu or katla fish, cut in pieces',
        '2 potatoes, quartered',
        '1 tbsp mustard oil',
        '1 tsp panch phoron (Bengali five spice)',
        '2 bay leaves',
        '1 tsp turmeric powder',
        '1 tsp red chili powder',
        '1 tsp ginger-garlic paste',
        '2 tomatoes, chopped',
        '1 tsp cumin powder',
        '1 tsp coriander powder',
        'Salt to taste',
        'Fresh coriander leaves',
        '2 green chilies, slit'
      ],
      instructions: [
        'Marinate fish pieces with turmeric and salt for 15 minutes',
        'Heat mustard oil in a pan until smoking, then reduce heat',
        'Fry fish pieces until golden, remove and set aside',
        'In the same oil, fry potato pieces until golden',
        'Add panch phoron and bay leaves, let them splutter',
        'Add ginger-garlic paste and green chilies',
        'Add tomatoes and cook until soft',
        'Add all spice powders and cook for 2 minutes',
        'Add 2 cups water and bring to boil',
        'Add fried potatoes and fish pieces',
        'Simmer for 10-15 minutes until fish is cooked',
        'Garnish with fresh coriander'
      ],
      prepTime: 25,
      cookTime: 35,
      servings: 4,
      difficulty: 'Medium',
      category: 'Fish_Curry',
      tags: ['traditional', 'bengali-cuisine', 'main-course', 'comfort-food'],
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
      tips: [
        'Use fresh river fish for authentic taste',
        'Don\'t overcook the fish to prevent breaking',
        'Mustard oil is essential for authentic flavor'
      ],
      story: 'Macher Jhol is the soul of Bengali cuisine. Every Bengali household has their own version passed down through generations.',
      region: 'Bengal',
      status: 'Pending',
      authorId: users[2].id
    },
    {
      title: 'Durga Puja Special Khichuri',
      description: 'The traditional one-pot meal served during Durga Puja celebrations, comfort food at its best.',
      ingredients: [
        '1 cup basmati rice',
        '1/2 cup moong dal (yellow lentils)',
        '2 tbsp ghee',
        '1 tsp cumin seeds',
        '2 bay leaves',
        '1 inch cinnamon stick',
        '4-5 green cardamom',
        '1 tsp turmeric powder',
        '1 tsp ginger paste',
        '2 green chilies, slit',
        '1 cup mixed vegetables (cauliflower, peas, carrots)',
        'Salt to taste',
        '4 cups water',
        'Fresh coriander leaves'
      ],
      instructions: [
        'Wash rice and dal together, drain and set aside',
        'Heat ghee in a heavy-bottomed pot',
        'Add cumin seeds, bay leaves, cinnamon, and cardamom',
        'Add ginger paste and green chilies, sauté briefly',
        'Add mixed vegetables and cook for 3-4 minutes',
        'Add rice and dal, mix gently',
        'Add turmeric powder and salt',
        'Add water and bring to boil',
        'Reduce heat, cover and cook for 20-25 minutes',
        'Let it rest for 5 minutes before opening',
        'Garnish with fresh coriander and serve hot'
      ],
      prepTime: 15,
      cookTime: 30,
      servings: 4,
      difficulty: 'Easy',
      category: 'Festival_Specials',
      tags: ['festival-food', 'one-pot-meal', 'vegetarian', 'durga-puja', 'comfort-food'],
      image: 'https://images.pexels.com/photos/5560756/pexels-photo-5560756.jpeg?auto=compress&cs=tinysrgb&w=400',
      tips: [
        'Use equal proportions of rice and dal for perfect texture',
        'Don\'t stir too much while cooking',
        'Serve with papad and pickle'
      ],
      story: 'Khichuri is synonymous with Durga Puja. It\'s served as prasad in pandals and is the ultimate comfort food during the festivities.',
      region: 'Bengal',
      status: 'Draft',
      authorId: users[0].id
    },
    {
      title: 'Kolkata-Style Egg Roll',
      description: 'The famous street food wrap that originated in Kolkata - paratha wrapped around spiced scrambled eggs.',
      ingredients: [
        '4 parathas (store-bought or homemade)',
        '6 eggs',
        '2 onions, finely chopped',
        '2 green chilies, chopped',
        '1 tsp ginger-garlic paste',
        '1 tsp red chili powder',
        '1/2 tsp turmeric powder',
        '1 tsp garam masala',
        '2 tbsp oil',
        'Salt to taste',
        'Fresh coriander leaves',
        'Cucumber slices',
        'Onion rings',
        'Green chutney',
        'Tomato ketchup'
      ],
      instructions: [
        'Heat oil in a pan, add chopped onions',
        'Cook until onions are golden brown',
        'Add ginger-garlic paste and green chilies',
        'Add all spice powders and cook for 1 minute',
        'Beat eggs and add to the pan',
        'Scramble eggs with the spice mixture',
        'Cook until eggs are well done',
        'Warm the parathas on a tawa',
        'Place egg mixture on one side of paratha',
        'Add cucumber slices and onion rings',
        'Apply chutneys as desired',
        'Roll tightly and wrap in paper',
        'Serve immediately'
      ],
      prepTime: 15,
      cookTime: 20,
      servings: 4,
      difficulty: 'Easy',
      category: 'Street_Food',
      tags: ['street-food', 'egg-dish', 'kolkata-special', 'quick-meal', 'non-vegetarian'],
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
      tips: [
        'Don\'t make eggs too wet',
        'Wrap tightly to prevent filling from falling out',
        'Serve hot for best taste'
      ],
      story: 'The Kolkata Egg Roll was invented in the 1960s and became an instant hit. It\'s now found in every corner of the city.',
      region: 'Kolkata',
      status: 'Approved',
      authorId: users[1].id
    }
  ];

  try {
    // Create recipes
    for (const recipe of recipes) {
      await prisma.recipe.create({
        data: {
          ...recipe,
          approvedBy: recipe.status === 'Approved' ? users[0].id : null,
          approvedAt: recipe.status === 'Approved' ? new Date() : null
        }
      });
    }

    console.log(`✅ Successfully seeded ${recipes.length} Bengali recipes`);
  } catch (error) {
    console.error('❌ Error seeding recipes:', error);
  }
};

// Run seeder if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedRecipes()
    .then(() => {
      console.log('✅ Recipe seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Recipe seeding failed:', error);
      process.exit(1);
    });
}