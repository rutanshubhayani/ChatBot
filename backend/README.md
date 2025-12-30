# Backend API Server 🔧

The server-side component of Velora Boutique's AI customer support system, providing a robust REST API with intelligent AI integration, conversation management, and efficient caching.

## 🎯 Overview

This Express-based backend powers the Velora AI assistant, handling customer support conversations for a premium fashion boutique. The system integrates with multiple AI providers to deliver accurate, context-aware responses about shipping, returns, products, and styling advice.

## 📋 Requirements

Ensure you have the following installed:

- **Node.js** v16 or higher
- **PostgreSQL** database
- **Redis** server for caching
- **AI Provider API Key** (Google Gemini, OpenAI, or Puter.js)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .example.env .env
```

Edit `.env` with your settings:

```env
PORT=8080
DATABASE_URL=postgresql://user:password@localhost:5432/spur_db
REDIS_URL=redis://localhost:6379
AI_PROVIDER=google
GOOGLE_API_KEY=your_api_key_here
CORS_ORIGINS=http://localhost:3000
```

See `.example.env` for all available configuration options.

### 3. Database Initialization

Set up your database schema:

```bash
npx prisma migrate dev
```

This creates the necessary tables and relationships.

### 4. Start the Server

**Development mode** (with auto-rebuild):
```bash
npm run dev
```

**Production mode**:
```bash
npm run build
npm start
```

Server will be running at `http://localhost:8080`

## 📦 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Build and start with development settings |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run the compiled production server |
| `npm run format` | Format code with Prettier |

## 🗄️ Database Management

### View Database
Open Prisma Studio to browse your data:
```bash
npx prisma studio
```

### Create Migration
After modifying the schema:
```bash
npx prisma migrate dev --name your_migration_name
```

### Reset Database
⚠️ Warning: This deletes all data
```bash
npx prisma migrate reset
```

## 🔌 API Endpoints

### Chat
- **POST** `/api/chat` - Send customer message and receive AI-powered support response
  - Handles questions about shipping, returns, products, sizing, and styling
  - Maintains conversation context for multi-turn interactions
  - Returns markdown-formatted responses

### Health Check
- **GET** `/health` - Server status check

For detailed API documentation, see the main project README.

## 🛠️ Tech Stack

- **Express.js** 5.2.1 - Web framework
- **TypeScript** 5.9.3 - Type safety
- **Prisma** 6.19.1 - Database ORM
- **ioredis** 5.8.2 - Redis client
- **Axios** - HTTP requests to AI providers

## 🧠 AI Knowledge Base

The backend includes a comprehensive knowledge base for Velora Boutique:

### Store Information
- **About**: Premium online fashion destination since 2019
- **Specialties**: Contemporary women's and men's clothing, accessories, seasonal collections
- **Location**: 456 Fashion Avenue, New York, NY 10018

### Policies Covered
- **Shipping**: Free over $75, standard ($5.99), express ($14.99), overnight ($29.99), international
- **Returns**: 30-day window, free exchanges, 5-7 day refund processing
- **Support Hours**: Mon-Fri 9AM-8PM EST, Sat 10AM-6PM EST
- **Payment Methods**: Major credit cards, PayPal, Apple Pay, Afterpay, Klarna

### Product Categories
- Women's: Dresses, Tops, Bottoms, Outerwear, Activewear
- Men's: Shirts, Pants, Jackets, Casual Wear
- Accessories: Bags, Jewelry, Scarves, Belts
- Seasonal Collections and Limited Editions

### AI Behavior
- Warm, professional, fashion-forward tone
- Markdown-formatted responses
- Personalized styling recommendations
- Escalates to human agents when uncertain
- Never fabricates information

## 🔧 Configuration Options

### AI Providers

Switch between providers by setting `AI_PROVIDER` in `.env`:

- `google` - Google Gemini API
- `openai` - OpenAI GPT models  
- `puter` - Puter.js integration

### Caching

Configure Redis cache behavior:
- `CACHE_TTL` - Time to live in seconds (default: 600)
- `REDIS_URL` - Redis connection string

### CORS

Set allowed origins in `CORS_ORIGINS` (comma-separated for multiple):
```env
CORS_ORIGINS=http://localhost:3000,https://yourdomain.com
```

## 🐛 Troubleshooting

**Port already in use**
```bash
# Change PORT in .env or kill the process using port 8080
lsof -ti:8080 | xargs kill
```

**Database connection failed**
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists

**Redis connection error**
- Confirm Redis server is active
- Verify REDIS_URL is correct

**Prisma errors**
```bash
# Regenerate Prisma client
npx prisma generate
```

## 📝 Development Notes

- Module aliases (`@/`) are configured for cleaner imports
- All API responses include proper error handling
- Retry logic with exponential backoff for AI provider rate limits
- TypeScript strict mode enabled for maximum type safety

## 🚀 Deployment

For production deployment instructions, see [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md) in the root directory.

## 👨‍💻 Maintained By

Rutanshu Bhayani
