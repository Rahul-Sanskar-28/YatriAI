// Recipe Vault API Test Script
// Tests all endpoints with proper role-based permissions

const BASE_URL = 'http://localhost:3001/api';

// Mock tokens for different roles (format: mock-token-{role}-{userId})
const TOKENS = {
  tourist: 'mock-token-tourist-123456789',
  admin: 'mock-token-admin-987654321'
};

// Test data
const testRecipe = {
  title: 'Test Bengali Sweet - Sandesh',
  description: 'A traditional Bengali sweet made from fresh cottage cheese',
  ingredients: [
    '500g fresh paneer (cottage cheese)',
    '1/2 cup powdered sugar',
    '1 tsp cardamom powder',
    'A few pistachios for garnish'
  ],
  instructions: [
    'Knead the paneer until smooth',
    'Add powdered sugar and cardamom',
    'Cook on low heat for 5-7 minutes',
    'Shape into desired forms',
    'Garnish with pistachios'
  ],
  prepTime: 15,
  cookTime: 10,
  servings: 8,
  difficulty: 'Easy',
  category: 'Bengali_Sweets',
  tags: ['traditional', 'sweet', 'vegetarian'],
  region: 'Bengal'
};

// Helper function to make API calls
async function apiCall(endpoint, method = 'GET', data = null, token = null) {
  const url = `${BASE_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    ...(data && { body: JSON.stringify(data) })
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return {
      status: response.status,
      success: response.ok,
      data: result
    };
  } catch (error) {
    return {
      status: 0,
      success: false,
      error: error.message
    };
  }
}

// Test functions
async function testGetRecipes() {
  console.log('\n🧪 Testing GET /api/recipes (Tourist access)');
  const result = await apiCall('/recipes', 'GET', null, TOKENS.tourist);
  console.log(`Status: ${result.status}`);
  console.log(`Success: ${result.success}`);
  if (result.success) {
    console.log(`Found ${result.data.data?.recipes?.length || 0} recipes`);
    console.log('Sample recipe:', result.data.data?.recipes?.[0]?.title);
  } else {
    console.log('Error:', result.data.message);
  }
}

async function testGetRecipeStats() {
  console.log('\n🧪 Testing GET /api/recipes/stats (Tourist access)');
  const result = await apiCall('/recipes/stats', 'GET', null, TOKENS.tourist);
  console.log(`Status: ${result.status}`);
  console.log(`Success: ${result.success}`);
  if (result.success) {
    console.log('Stats:', result.data.data);
  } else {
    console.log('Error:', result.data.message);
  }
}

async function testCreateRecipe() {
  console.log('\n🧪 Testing POST /api/recipes (Tourist creating recipe)');
  const result = await apiCall('/recipes', 'POST', testRecipe, TOKENS.tourist);
  console.log(`Status: ${result.status}`);
  console.log(`Success: ${result.success}`);
  if (result.success) {
    console.log('Created recipe:', result.data.data.title);
    console.log('Status:', result.data.data.status);
    return result.data.data.id;
  } else {
    console.log('Error:', result.data.message);
    return null;
  }
}

async function testGetMyRecipes() {
  console.log('\n🧪 Testing GET /api/recipes/my-recipes (Tourist access)');
  const result = await apiCall('/recipes/my-recipes', 'GET', null, TOKENS.tourist);
  console.log(`Status: ${result.status}`);
  console.log(`Success: ${result.success}`);
  if (result.success) {
    console.log(`Found ${result.data.data?.recipes?.length || 0} user recipes`);
    result.data.data?.recipes?.forEach(recipe => {
      console.log(`- ${recipe.title} (${recipe.status})`);
    });
  } else {
    console.log('Error:', result.data.message);
  }
}

async function testAdminGetAllRecipes() {
  console.log('\n🧪 Testing GET /api/recipes/admin/all (Admin access)');
  const result = await apiCall('/recipes/admin/all', 'GET', null, TOKENS.admin);
  console.log(`Status: ${result.status}`);
  console.log(`Success: ${result.success}`);
  if (result.success) {
    console.log(`Found ${result.data.data?.recipes?.length || 0} total recipes`);
    console.log('Status counts:', result.data.data?.statusCounts);
  } else {
    console.log('Error:', result.data.message);
  }
}

async function testTouristAccessAdminEndpoint() {
  console.log('\n🧪 Testing GET /api/recipes/admin/all (Tourist access - should fail)');
  const result = await apiCall('/recipes/admin/all', 'GET', null, TOKENS.tourist);
  console.log(`Status: ${result.status}`);
  console.log(`Success: ${result.success}`);
  console.log('Message:', result.data.message);
}

async function testApproveRecipe(recipeId) {
  if (!recipeId) {
    console.log('\n⚠️ Skipping approve test - no recipe ID');
    return;
  }
  
  console.log('\n🧪 Testing PATCH /api/recipes/:id/status (Admin approving recipe)');
  const result = await apiCall(`/recipes/${recipeId}/status`, 'PATCH', {
    status: 'Approved'
  }, TOKENS.admin);
  console.log(`Status: ${result.status}`);
  console.log(`Success: ${result.success}`);
  if (result.success) {
    console.log('Recipe approved:', result.data.data.title);
    console.log('New status:', result.data.data.status);
  } else {
    console.log('Error:', result.data.message);
  }
}

async function testUpdateRecipe(recipeId) {
  if (!recipeId) {
    console.log('\n⚠️ Skipping update test - no recipe ID');
    return;
  }
  
  console.log('\n🧪 Testing PUT /api/recipes/:id (Tourist updating own recipe)');
  const result = await apiCall(`/recipes/${recipeId}`, 'PUT', {
    title: 'Updated Test Bengali Sweet - Sandesh',
    description: 'Updated description with more details'
  }, TOKENS.tourist);
  console.log(`Status: ${result.status}`);
  console.log(`Success: ${result.success}`);
  if (result.success) {
    console.log('Updated recipe:', result.data.data.title);
    console.log('Status after update:', result.data.data.status);
  } else {
    console.log('Error:', result.data.message);
  }
}

async function testDeleteRecipe(recipeId) {
  if (!recipeId) {
    console.log('\n⚠️ Skipping delete test - no recipe ID');
    return;
  }
  
  console.log('\n🧪 Testing DELETE /api/recipes/:id (Tourist deleting own recipe)');
  const result = await apiCall(`/recipes/${recipeId}`, 'DELETE', null, TOKENS.tourist);
  console.log(`Status: ${result.status}`);
  console.log(`Success: ${result.success}`);
  console.log('Message:', result.data.message);
}

async function testUnauthorizedAccess() {
  console.log('\n🧪 Testing unauthorized access (no token)');
  const result = await apiCall('/recipes', 'GET');
  console.log(`Status: ${result.status}`);
  console.log(`Success: ${result.success}`);
  console.log('Message:', result.data.message);
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting Recipe Vault API Tests');
  console.log('=====================================');

  // Test unauthorized access
  await testUnauthorizedAccess();

  // Test basic recipe retrieval
  await testGetRecipes();
  await testGetRecipeStats();

  // Test recipe creation
  const createdRecipeId = await testCreateRecipe();
  
  // Test user's own recipes
  await testGetMyRecipes();

  // Test admin endpoints
  await testAdminGetAllRecipes();
  await testTouristAccessAdminEndpoint();

  // Test recipe approval (admin only)
  await testApproveRecipe(createdRecipeId);

  // Test recipe update
  await testUpdateRecipe(createdRecipeId);

  // Test recipe deletion (should be last)
  await testDeleteRecipe(createdRecipeId);

  console.log('\n✅ Recipe Vault API Tests Completed');
  console.log('=====================================');
}

// Run tests
runTests().catch(console.error);