# Recipe Vault API Documentation

## Overview
The Recipe Vault is a comprehensive backend system for managing Bengali and Kolkata traditional recipes with role-based access control. It supports recipe creation, approval workflows, and community sharing.

## Role-Based Permissions

### Tourist Role 🏛️
- **Create**: ✅ Can create new recipes (status: Pending)
- **Read**: ✅ Can view approved recipes and own recipes
- **Update**: ✅ Can update own recipes only
- **Delete**: ✅ Can delete own recipes only

### Admin Role 🛡️
- **Create**: ✅ Can create recipes (status: Approved by default)
- **Read**: ✅ Can view all recipes regardless of status
- **Update**: ✅ Can update any recipe
- **Delete**: ✅ Can delete any recipe
- **Approve**: ✅ Can approve/reject pending recipes

### Guide & Seller Roles
- **Access**: ❌ No access to Recipe Vault features

## Database Schema

### Recipe Model
```prisma
model Recipe {
  id            String        @id @default(cuid())
  title         String
  description   String
  ingredients   String[]      // Array of ingredients
  instructions  String[]      // Step-by-step instructions
  prepTime      Int           // Preparation time in minutes
  cookTime      Int           // Cooking time in minutes
  servings      Int           // Number of servings
  difficulty    String        // Easy, Medium, Hard
  category      RecipeCategory
  tags          String[]      // Searchable tags
  image         String?       // Recipe image URL
  videoUrl      String?       // Optional cooking video
  nutritionInfo Json?         // Flexible nutrition data
  tips          String[]      // Cooking tips
  story         String?       // Cultural story behind recipe
  region        String?       // Specific region (Bengal/Kolkata)
  status        RecipeStatus  @default(Draft)
  authorId      String        // Recipe creator
  approvedBy    String?       // Admin who approved
  approvedAt    DateTime?     // Approval timestamp
  views         Int           @default(0)
  likes         Int           @default(0)
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  author        User          @relation(fields: [authorId], references: [id])
}
```

### Enums
```prisma
enum RecipeStatus {
  Draft     // Initial state
  Pending   // Submitted for approval
  Approved  // Admin approved
  Rejected  // Admin rejected
}

enum RecipeCategory {
  Bengali_Sweets
  Street_Food
  Traditional_Meals
  Festival_Specials
  Tea_Snacks
  Fish_Curry
  Rice_Dishes
  Vegetarian
}
```

## API Endpoints

### Base URL
```
http://localhost:3001/api/recipes
```

### Authentication
All endpoints require authentication via Bearer token:
```
Authorization: Bearer <token>
```

---

## Public Endpoints (Tourist + Admin)

### 1. Get All Approved Recipes
```http
GET /api/recipes
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 12)
- `category` (string): Filter by recipe category
- `difficulty` (string): Filter by difficulty level
- `search` (string): Search in title, description, tags
- `sortBy` (string): Sort field (default: createdAt)
- `sortOrder` (string): asc/desc (default: desc)

**Response:**
```json
{
  "success": true,
  "data": {
    "recipes": [
      {
        "id": "recipe_id",
        "title": "Authentic Kolkata Mishti Doi",
        "description": "Traditional Bengali sweet yogurt...",
        "ingredients": ["1 liter full-fat milk", "..."],
        "instructions": ["Boil milk in heavy-bottomed pan", "..."],
        "prepTime": 20,
        "cookTime": 45,
        "servings": 6,
        "difficulty": "Medium",
        "category": "Bengali_Sweets",
        "tags": ["traditional", "dessert"],
        "image": "https://...",
        "status": "Approved",
        "views": 150,
        "likes": 25,
        "author": {
          "id": "user_id",
          "name": "Chef Name",
          "avatar": "https://..."
        },
        "createdAt": "2025-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 50,
      "pages": 5
    }
  }
}
```

### 2. Get Recipe by ID
```http
GET /api/recipes/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "recipe_id",
    "title": "Recipe Title",
    // ... full recipe details
    "author": {
      "id": "user_id",
      "name": "Author Name",
      "avatar": "https://..."
    }
  }
}
```

### 3. Get Recipe Statistics
```http
GET /api/recipes/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalRecipes": 45,
    "totalViews": 12500,
    "categoryStats": {
      "Bengali_Sweets": 12,
      "Street_Food": 8,
      "Traditional_Meals": 15
    },
    "difficultyStats": {
      "Easy": 20,
      "Medium": 18,
      "Hard": 7
    }
  }
}
```

### 4. Get My Recipes
```http
GET /api/recipes/my-recipes
```

**Query Parameters:**
- `page`, `limit`: Pagination
- `status`: Filter by recipe status

**Response:**
```json
{
  "success": true,
  "data": {
    "recipes": [
      // User's own recipes with all statuses
    ],
    "pagination": { /* ... */ }
  }
}
```

---

## Create/Update Endpoints (Tourist + Admin)

### 5. Create Recipe
```http
POST /api/recipes
```

**Request Body:**
```json
{
  "title": "Recipe Title",
  "description": "Recipe description",
  "ingredients": ["ingredient 1", "ingredient 2"],
  "instructions": ["step 1", "step 2"],
  "prepTime": 20,
  "cookTime": 30,
  "servings": 4,
  "difficulty": "Medium",
  "category": "Bengali_Sweets",
  "tags": ["traditional", "sweet"],
  "image": "https://image-url.jpg",
  "videoUrl": "https://video-url.mp4",
  "tips": ["tip 1", "tip 2"],
  "story": "Cultural story behind the recipe",
  "region": "Kolkata"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "new_recipe_id",
    "title": "Recipe Title",
    "status": "Pending",
    // ... other fields
  },
  "message": "Recipe created successfully and submitted for approval"
}
```

### 6. Update Recipe
```http
PUT /api/recipes/:id
```

**Authorization:** Owner or Admin only

**Request Body:** Same as create (partial updates allowed)

**Response:**
```json
{
  "success": true,
  "data": {
    // Updated recipe data
  },
  "message": "Recipe updated successfully"
}
```

**Note:** If a non-admin updates an approved recipe, status changes to "Pending"

### 7. Delete Recipe
```http
DELETE /api/recipes/:id
```

**Authorization:** Owner or Admin only

**Response:**
```json
{
  "success": true,
  "message": "Recipe deleted successfully"
}
```

---

## Admin-Only Endpoints

### 8. Get All Recipes (Admin)
```http
GET /api/recipes/admin/all
```

**Authorization:** Admin only

**Query Parameters:** Same as public endpoint + status filter

**Response:**
```json
{
  "success": true,
  "data": {
    "recipes": [
      // All recipes regardless of status
    ],
    "statusCounts": {
      "Draft": 5,
      "Pending": 12,
      "Approved": 28,
      "Rejected": 3
    },
    "pagination": { /* ... */ }
  }
}
```

### 9. Approve/Reject Recipe
```http
PATCH /api/recipes/:id/status
```

**Authorization:** Admin only

**Request Body:**
```json
{
  "status": "Approved", // or "Rejected", "Pending"
  "rejectionReason": "Optional reason for rejection"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "recipe_id",
    "status": "Approved",
    "approvedBy": "admin_user_id",
    "approvedAt": "2025-01-01T12:00:00Z"
  },
  "message": "Recipe approved successfully"
}
```

---

## Error Responses

### Authentication Error
```json
{
  "success": false,
  "message": "Authentication required"
}
```

### Authorization Error
```json
{
  "success": false,
  "message": "Not authorized to access this resource"
}
```

### Validation Error
```json
{
  "success": false,
  "message": "Missing required fields"
}
```

### Not Found Error
```json
{
  "success": false,
  "message": "Recipe not found"
}
```

---

## Usage Examples

### Creating a Recipe (Tourist)
```javascript
const response = await fetch('/api/recipes', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer tourist_token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'My Bengali Sweet',
    description: 'A family recipe passed down generations',
    ingredients: ['milk', 'sugar', 'cardamom'],
    instructions: ['Heat milk', 'Add sugar', 'Garnish'],
    prepTime: 15,
    cookTime: 30,
    servings: 6,
    difficulty: 'Easy',
    category: 'Bengali_Sweets',
    tags: ['traditional', 'family-recipe']
  })
});
```

### Approving a Recipe (Admin)
```javascript
const response = await fetch('/api/recipes/recipe_id/status', {
  method: 'PATCH',
  headers: {
    'Authorization': 'Bearer admin_token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    status: 'Approved'
  })
});
```

---

## Testing

Run the test script to verify all endpoints:
```bash
node test-recipe-api.js
```

The test script covers:
- ✅ Authentication and authorization
- ✅ Recipe CRUD operations
- ✅ Role-based access control
- ✅ Admin approval workflow
- ✅ Error handling

---

## Database Migration

To add the Recipe model to your database:

1. Update Prisma schema (already done)
2. Run migration:
```bash
cd backend
npx prisma db push
```

3. Seed sample data:
```bash
node src/seeders/recipeSeed.ts
```

---

## Security Features

1. **JWT Authentication**: All endpoints require valid tokens
2. **Role-based Authorization**: Endpoints restricted by user role
3. **Ownership Validation**: Users can only modify their own recipes
4. **Input Validation**: Required fields and data types validated
5. **SQL Injection Protection**: Prisma ORM prevents SQL injection
6. **XSS Protection**: Input sanitization on frontend required

---

## Future Enhancements

1. **Recipe Ratings**: Allow users to rate recipes
2. **Comments System**: Recipe comments and discussions
3. **Recipe Collections**: Curated recipe collections
4. **Image Upload**: Direct image upload functionality
5. **Recipe Sharing**: Social sharing features
6. **Nutritional Analysis**: Automated nutrition calculation
7. **Recipe Variations**: Support for recipe variations
8. **Cooking Timer**: Integrated cooking timers
9. **Shopping Lists**: Generate shopping lists from recipes
10. **Recipe Import**: Import recipes from external sources