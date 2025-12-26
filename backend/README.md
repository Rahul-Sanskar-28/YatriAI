# YatriAI Backend

Express + TypeScript + Prisma backend for the YatriAI tourism platform.

## Prerequisites

- **Node.js** v18+ 
- **PostgreSQL** database (local or cloud like Neon, Supabase, Railway)

## Quick Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Database

Edit `.env` file with your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/yatri_ai?schema=public"
```

**For local PostgreSQL:**
- Create a database named `yatri_ai`
- Update the connection string with your credentials

**For cloud PostgreSQL (recommended for easy setup):**
- [Neon](https://neon.tech) - Free tier available
- [Railway](https://railway.app) - Free tier available
- [Supabase](https://supabase.com) - Free tier available

### 3. Initialize Database

```bash
# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

### 4. Start the Server

```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm run build
npm start
```

Server will run on `http://localhost:3001`

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/profile` | Update profile |
| GET | `/api/auth/users` | Get all users (admin) |

### Destinations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/destinations` | Get all destinations |
| GET | `/api/destinations/:id` | Get destination by ID |
| POST | `/api/destinations` | Create destination (admin) |
| PUT | `/api/destinations/:id` | Update destination (admin) |
| DELETE | `/api/destinations/:id` | Delete destination (admin) |

### Guides
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/guides` | Get all guides |
| GET | `/api/guides/:id` | Get guide by ID |
| GET | `/api/guides/profile/me` | Get my guide profile |
| PUT | `/api/guides/profile` | Update guide profile |
| POST | `/api/guides/tours` | Create tour |
| PUT | `/api/guides/tours/:id` | Update tour |
| DELETE | `/api/guides/tours/:id` | Delete tour |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| GET | `/api/products/seller/my-products` | Get seller products |
| GET | `/api/products/seller/stats` | Get seller stats |
| POST | `/api/products` | Create product (seller) |
| PUT | `/api/products/:id` | Update product (seller) |
| DELETE | `/api/products/:id` | Delete product (seller) |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookings/my` | Get my bookings |
| POST | `/api/bookings` | Create booking |
| PATCH | `/api/bookings/:id/cancel` | Cancel booking |
| GET | `/api/bookings` | Get all bookings (admin) |

### Itineraries
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/itineraries/my` | Get my itineraries |
| POST | `/api/itineraries` | Create itinerary |
| POST | `/api/itineraries/generate` | AI generate itinerary |
| PUT | `/api/itineraries/:id` | Update itinerary |
| DELETE | `/api/itineraries/:id` | Delete itinerary |

### Testimonials
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/testimonials` | Get testimonials |
| GET | `/api/testimonials/tips` | Get AI tips |
| POST | `/api/testimonials/feedback` | Submit feedback |

## Test Credentials

After running the seed script:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@yatri.ai | admin123 |
| Tourist | john.doe@example.com | tourist123 |
| Guide | ravi.kumar@example.com | guide123 |
| Seller | tribal.crafts@example.com | seller123 |

## Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes
npm run db:push

# Create migration
npm run db:migrate

# Seed database
npm run db:seed

# Open Prisma Studio (database GUI)
npm run db:studio
```

## Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Seed data
├── src/
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Auth & error handling
│   ├── routes/          # API routes
│   ├── utils/           # JWT utilities
│   └── index.ts         # Server entry
├── .env                 # Environment variables
├── package.json
└── tsconfig.json
```




















