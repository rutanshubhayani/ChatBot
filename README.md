# Velora Boutique AI Assistant 🤖

An intelligent customer support chatbot designed specifically for **Velora Boutique**, a premium online fashion store. This full-stack application combines a sleek React frontend with a powerful Node.js backend to deliver instant, accurate customer service for fashion-conscious shoppers.

## ✨ What's Inside

This repository contains a production-ready AI customer support system that helps Velora Boutique customers with:

- 🛍️ **Shopping Assistance** - Product inquiries, size guides, and availability
- 📦 **Order Support** - Shipping information, tracking, and delivery estimates
- 🔄 **Returns & Exchanges** - Policy information and return initiation
- 💳 **Payment Help** - Payment methods, gift cards, and checkout assistance
- 👗 **Style Advice** - Personalized fashion recommendations and outfit coordination
- 📞 **General Support** - Store hours, contact information, and policies

The AI assistant, named **Velora**, is trained on comprehensive store knowledge including shipping policies, return procedures, product categories, and customer service best practices. Built with performance, accuracy, and exceptional user experience in mind.

**Live Application**: Coming soon!

## 🏗️ Architecture Overview

```
spur_chat_bot/
├── frontend/           # React-based user interface
├── backend/            # Express API server
```

---



### Velora - Your Fashion Support Assistant

The AI agent is specifically trained to assist Velora Boutique customers with:

#### 📚 Knowledge Base
- **Store Information** - Complete details about Velora Boutique's history and mission
- **Shipping Policies** - Free shipping thresholds, delivery timeframes, and international options
- **Return & Refund Procedures** - 30-day return window, exchange policies, and refund timelines
- **Payment Options** - Credit cards, PayPal, Apple Pay, Afterpay, and Klarna
- **Product Categories** - Women's wear, men's fashion, accessories, and seasonal collections
- **Size Guides** - Detailed sizing information and fit recommendations

#### 💬 Conversation Style
- Warm, professional, and fashion-forward tone
- Markdown-formatted responses for clarity
- Personalized styling recommendations
- Honest about limitations - escalates to human agents when needed
- Focused, concise answers (2-4 sentences for simple queries)
- Sophisticated language reflecting premium brand identity

#### 🎯 Core Functions
1. **Customer Support** - Answer questions about policies, shipping, and returns
2. **Product Assistance** - Help with sizing, availability, and product details
3. **Style Consultation** - Provide outfit coordination and fashion advice
4. **Order Management** - Track shipments and resolve order issues
5. **Store Navigation** - Guide customers to relevant product categories

The AI maintains conversation context, provides accurate information from its knowledge base, and never fabricates details it doesn't know.

---

## 🚀 Getting Started

### System Requirements

Before you begin, ensure you have:
- **Node.js** v16 or higher
- **PostgreSQL** database instance
- **Redis** server (for caching)
- **API Key** for your chosen AI provider

### Installation Steps

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/rutanshubhayani/spur_chat_bot.git
cd spur_chat_bot
```

#### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .example.env .env
# Edit .env with your configuration (see Configuration section below)

# Initialize database
npx prisma migrate dev

# Start the server
npm run dev
```

The backend server will be available at `http://localhost:8080`

#### 3️⃣ Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Configure environment
cp .example.env .env
# Update REACT_APP_API_URL to point to your backend

# Launch the application
npm start
```

The frontend will open automatically at `http://localhost:3000`

---

## 🎯 Features

### Client Application
- 💬 Intuitive chat interface with real-time message updates
- 🎨 Modern UI built with Tailwind CSS and custom styling
- 📱 Fully responsive design for all screen sizes
- ⌨️ Markdown rendering for rich text responses
- ⚡ Optimized performance with React 19

### Server Application
- 🔄 Flexible AI provider integration (Google Gemini, OpenAI, Puter.js)
- 🚀 High-performance caching with Redis
- 💾 Persistent data storage using PostgreSQL
- 🔒 Secure CORS configuration
- 🛡️ Built-in retry mechanisms with exponential backoff
- 📊 Type-safe development with TypeScript

---

## 🧠 AI Capabilities

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory with the following:

```env
# Server Settings
PORT=8080
DATABASE_URL=postgresql://username:password@localhost:5432/spur_db
CORS_ORIGINS=http://localhost:3000

# AI Provider (choose: google, openai, or puter)
AI_PROVIDER=google

# Google Gemini Setup
GOOGLE_API_KEY=your_api_key_here
GOOGLE_MODEL=gemini-2.0-flash

# OpenAI Setup (if using OpenAI)
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4o-mini

# Puter.js Setup (if using Puter)
PUTER_AUTH_TOKEN=your_token_here
PUTER_APP_UID=your_app_uid_here
PUTER_MODEL=gpt-4o-mini

# Cache Configuration
REDIS_URL=redis://localhost:6379
CACHE_TTL=600

# Backend URL
BACKEND_URL=http://localhost:8080
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:8080
```

---

## 🛠️ Technology Stack

### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.3 | UI framework |
| TypeScript | 4.9.5 | Type safety |
| Tailwind CSS | 3.4.14 | Styling |
| Axios | 1.13.2 | HTTP client |
| React Markdown | 10.1.0 | Markdown rendering |
| Lucide React | 0.460.0 | Icon library |

### Backend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | - | Runtime environment |
| Express | 5.2.1 | Web framework |
| TypeScript | 5.9.3 | Type safety |
| Prisma | 6.19.1 | ORM |
| PostgreSQL | - | Database |
| Redis | - | Caching layer |
| ioredis | 5.8.2 | Redis client |

---

## 📚 Available Commands

### Frontend Commands

```bash
npm start          # Start development server
npm run dev        # Alternative start command
npm run build      # Create production build
npm run format     # Format code with Prettier
```

### Backend Commands

```bash
npm run dev        # Build and start in development
npm run build      # Compile TypeScript
npm start          # Run production server
npm run format     # Format code with Prettier
npx prisma studio  # Open Prisma database GUI
```

---

## 🌐 Deployment

### Quick Deployment Overview

**Frontend (Vercel)**:
1. Connect your GitHub repository
2. Set root directory to `frontend`
3. Add `REACT_APP_API_URL` environment variable
4. Deploy

**Backend (Render)**:
1. Create PostgreSQL and Redis instances
2. Deploy web service from repository
3. Configure all environment variables
4. Run database migrations


---

## 🔌 API Reference

### Chat Endpoint

**POST** `/api/chat`

Send a message and receive an AI-generated response.

**Request Body**:
```json
{
  "message": "Your message here",
  "conversationId": "optional-conversation-id"
}
```

**Response**:
```json
{
  "response": "AI generated response",
  "conversationId": "conversation-id"
}
```

---

## 🎨 Project Highlights

### Smart Caching
Redis-based caching reduces API calls and improves response times. Configurable TTL allows fine-tuning based on your needs.

### Multi-Provider Support
Seamlessly switch between different AI providers without changing your application code. Perfect for testing different models or managing costs.

### Type Safety
Full TypeScript implementation across both frontend and backend ensures fewer runtime errors and better developer experience.

### Modern UI/UX
Clean, responsive interface with smooth animations and markdown support for rich AI responses.

### Production Ready
Includes proper error handling, retry logic, CORS configuration, and environment-based configuration.

---

## 🐛 Troubleshooting

### Common Issues

**Database Connection Failed**
- Verify PostgreSQL is running
- Check `DATABASE_URL` format in `.env`
- Ensure database exists

**Redis Connection Error**
- Confirm Redis server is running
- Verify `REDIS_URL` in `.env`

**CORS Errors**
- Check `CORS_ORIGINS` matches your frontend URL
- Ensure no trailing slashes in URLs

**AI Provider Errors**
- Verify API keys are correct
- Check API quota/limits
- Ensure `AI_PROVIDER` value is valid

---

## 📖 Learn More

### Useful Resources
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

---

## 📝 License

This project is licensed under the ISC License.

---

## 👨‍💻 Developer

Built and maintained by **Rutanshu Bhayani**

---

## 🙏 Acknowledgments

Special thanks to the open-source community for the amazing tools and libraries that made this project possible.

---

**Note**: For production deployment, make sure to:
- Use environment variables for all sensitive data
- Enable HTTPS
- Set up proper monitoring and logging
- Configure rate limiting
- Implement proper authentication if needed
