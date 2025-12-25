# Spur Chat Bot

A full-stack AI-powered chat application built with React, TypeScript, Node.js, and Express. The application features a modern chat interface with support for multiple AI providers (Google Gemini, OpenAI, Puter.js), Redis caching, and PostgreSQL database.

## 🌐 Live Demo

Check out the live application: [https://spur-chat-bot.vercel.app/](https://spur-chat-bot.vercel.app/)

## 📦 Clone Repository

```bash
git clone https://github.com/RhythmItaliya/spur_chat_bot.git
cd spur_chat_bot
```

## 📁 Project Structure

```
spur/
├── frontend/          # React + TypeScript client application
├── backend/           # Node.js + Express server
└── README.md          # This file
```

---

## 🎨 Frontend

The frontend is a modern React application built with TypeScript and styled with Tailwind CSS, featuring a beautiful chat interface with Poppins font and smooth animations.

### Tech Stack

- **Framework**: React 19.2.3
- **Language**: TypeScript 4.9.5
- **Styling**: Tailwind CSS 3.4.14
- **UI Components**: Radix UI (Tooltips), Lucide React (Icons)
- **Markdown Rendering**: React Markdown
- **HTTP Client**: Axios

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Setup & Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .example.env .env
   ```
   
   Update `.env` with your backend API URL:
   ```env
   REACT_APP_API_URL=http://localhost:8080
   ```

### Running the Frontend

**Development Mode:**
```bash
npm start
# or
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

**Production Build:**
```bash
npm run build
```

Builds the app for production to the `build` folder with optimized performance.

### Available Scripts

- `npm start` / `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run format` - Format code using Prettier

### Key Features

- Modern chat interface with message history
- Markdown support for AI responses
- Real-time message streaming
- Responsive design with Tailwind CSS
- Custom Poppins font integration
- Smooth animations and transitions

---

## ⚙️ Backend

The backend is a robust Node.js server built with Express and TypeScript, featuring multiple AI provider integrations, Redis caching, and PostgreSQL database with Prisma ORM.

### Tech Stack

- **Runtime**: Node.js
- **Framework**: Express 5.2.1
- **Language**: TypeScript 5.9.3
- **Database**: PostgreSQL with Prisma ORM 6.19.1
- **Caching**: Redis (ioredis 5.8.2)
- **AI Providers**: 
  - Google Gemini
  - OpenAI
  - Puter.js
- **HTTP Client**: Axios

### Prerequisites

- Node.js (v16 or higher recommended)
- PostgreSQL database
- Redis server

### Setup & Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .example.env .env
   ```
   
   Update `.env` with your configuration:
   ```env
   # Server Configuration
   PORT=8080
   DATABASE_URL=postgresql://user:password@localhost:5432/spur
   CORS_ORIGINS=http://localhost:3000
   
   # AI Provider Configuration (choose one: google, openai, puter)
   AI_PROVIDER=google
   
   # Google Gemini Configuration
   GOOGLE_API_KEY=your_google_api_key_here
   GOOGLE_MODEL=gemini-2.0-flash
   
   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key_here
   OPENAI_MODEL=gpt-4o-mini
   
   # Puter.js Configuration
   PUTER_AUTH_TOKEN=your_puter_auth_token_here
   PUTER_APP_UID=your_puter_app_uid_here
   PUTER_MODEL=gpt-4o-mini
   
   # Redis Configuration
   REDIS_URL=redis://localhost:6379
   CACHE_TTL=600

   # Backend Configuration
   BACKEND_URL=your_backend_url_here
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

### Running the Backend

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm run build
npm start
```

The server will start at [http://localhost:8080](http://localhost:8080)

### Available Scripts

- `npm run dev` - Build and start in development mode
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run format` - Format code using Prettier

### Key Features

- **Multi-AI Provider Support**: Switch between Google Gemini, OpenAI, and Puter.js
- **Redis Caching**: Configurable TTL for improved performance
- **Retry Logic**: Exponential backoff with jitter for API rate limiting
- **Database**: PostgreSQL with Prisma ORM for data persistence
- **CORS**: Configurable cross-origin resource sharing
- **TypeScript**: Full type safety with path aliases

### API Endpoints

- `POST /api/chat` - Send a message and receive AI response
- Additional endpoints for conversation management (see backend documentation)

---

## 🚀 Quick Start (Full Stack)

To run both frontend and backend together:

1. **Start the backend:**
   ```bash
   cd backend
   npm install
   cp .example.env .env
   # Configure your .env file
   npx prisma migrate dev
   npm run dev
   ```

2. **Start the frontend (in a new terminal):**
   ```bash
   cd frontend
   npm install
   cp .example.env .env
   npm start
   ```

3. **Access the application:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:8080](http://localhost:8080)

---

## 🔧 Configuration

### AI Provider Selection

The backend supports three AI providers. Configure via the `AI_PROVIDER` environment variable:

- `google` - Google Gemini (default: gemini-2.0-flash)
- `openai` - OpenAI GPT models (default: gpt-4o-mini)
- `puter` - Puter.js integration

### Cache Configuration

Redis cache TTL can be configured via the `CACHE_TTL` environment variable (in seconds). Default is 600 seconds (10 minutes).

---

## 📝 Development Notes

- Both frontend and backend use Prettier for code formatting
- TypeScript is used throughout for type safety
- The backend uses module aliases (`@/`) for cleaner imports
- Redis caching helps reduce API costs and improve response times
- Retry logic with exponential backoff handles rate limiting gracefully

---

## 👤 Author

**Rhythm Italiya**

---

## 📄 License

ISC

---

## 🤝 Contributing

For detailed setup instructions for each component, refer to:
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
