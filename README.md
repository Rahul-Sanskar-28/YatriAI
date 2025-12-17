# YatriAI 🌏

AI-powered tourism platform for Jharkhand, India. Features role-based dashboards for tourists, guides, sellers, and administrators.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue)
![Prisma](https://img.shields.io/badge/Prisma-5-purple)

## Features

- 🎯 **AI-Powered Recommendations** - Smart itinerary planning based on preferences
- 👥 **Multi-Role System** - Tourist, Guide, Seller, and Admin dashboards
- 🗺️ **Interactive Maps** - Explore destinations with location data
- 🛍️ **Marketplace** - Buy authentic local handicrafts
- 📅 **Booking System** - Book guides and tours with blockchain verification
- 🌙 **Dark Mode** - Full theme support
- 🌐 **Multi-language** - Internationalization ready

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL with Prisma ORM |
| Auth | JWT + bcrypt |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **PostgreSQL** database (local or cloud)

### Step 1: Clone the Repository

```bash
git clone https://github.com/Rahul-Sanskar-28/YatriAI.git
cd YatriAI
```

### Step 2: Set Up Database

**Option A: Cloud Database (Recommended - Easiest)**

1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Copy your connection string

**Option B: Local PostgreSQL**

1. Install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/)
2. Create a database:
   ```sql
   CREATE DATABASE yatri_ai;
   ```

### Step 3: Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Step 4: Configure Environment Variables

**Backend** (`backend/.env`):

```env
# Database - Replace with your connection string
DATABASE_URL="postgresql://username:password@host:5432/database_name?sslmode=require"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Server
PORT=3001
NODE_ENV="development"

# Frontend URL (for CORS)
FRONTEND_URL="http://localhost:5173"
```

**Frontend** (`.env` in root):

```env
VITE_API_URL=http://localhost:3001/api
```

### Step 5: Initialize Database

```bash
cd backend

# Create database tables
npm run db:push

# Seed with sample data
npm run db:seed

cd ..
```

### Step 6: Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173`

### Step 7: Open in Browser

Navigate to: **http://localhost:5173**

---

## 🔐 Test Credentials

After running the seed script, use these credentials to test:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@yatri.ai | admin123 |
| Tourist | john.doe@example.com | tourist123 |
| Guide | ravi.kumar@example.com | guide123 |
| Seller | tribal.crafts@example.com | seller123 |

---

## 📁 Project Structure

```
YatriAI/
├── src/                    # Frontend source
│   ├── components/         # React components
│   │   ├── common/         # Shared components
│   │   ├── dashboard/      # Dashboard components
│   │   └── landing/        # Landing page components
│   ├── contexts/           # React contexts (Auth, Theme, Language)
│   ├── data/               # Mock data (fallback)
│   ├── lib/                # API client
│   └── types/              # TypeScript types
├── backend/                # Backend source
│   ├── prisma/             # Database schema & seed
│   └── src/
│       ├── controllers/    # Route handlers
│       ├── middleware/     # Auth & error handling
│       ├── routes/         # API routes
│       └── utils/          # Utilities
├── public/                 # Static assets
└── package.json
```

---

## 🛠️ Available Scripts

### Frontend (root directory)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Backend (`backend/` directory)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript |
| `npm start` | Run production build |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio (DB GUI) |
| `npm run db:migrate` | Create migration |

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Destinations
- `GET /api/destinations` - List all destinations
- `GET /api/destinations/:id` - Get destination

### Guides
- `GET /api/guides` - List all guides
- `GET /api/guides/:id` - Get guide
- `GET /api/guides/profile/me` - Get my guide profile

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product

### Bookings
- `GET /api/bookings/my` - Get my bookings
- `POST /api/bookings` - Create booking

### Itineraries
- `GET /api/itineraries/my` - Get my itineraries
- `POST /api/itineraries/generate` - AI generate itinerary

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Jharkhand Tourism Department
- Local artisans and guides of Jharkhand
- All contributors and supporters
