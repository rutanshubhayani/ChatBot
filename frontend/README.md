# Frontend Client Application 🎨

The customer-facing interface for Velora Boutique's AI support assistant, delivering a beautiful and responsive chat experience for fashion shoppers seeking instant help.

## ✨ Overview

A sleek, performant chat interface that connects Velora Boutique customers with an AI assistant for instant support. Get answers about shipping, returns, sizing, product availability, and personalized styling advice through an intuitive conversational interface.

## 📋 Requirements

- **Node.js** v16 or higher
- **npm** or **yarn** package manager

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Environment Setup

Create your environment configuration:

```bash
cp .example.env .env
```

Update `.env` with your backend API URL:

```env
REACT_APP_API_URL=http://localhost:8080
```

For production, use your deployed backend URL.

### 3. Launch Application

**Development server**:
```bash
npm start
```

The app will automatically open at `http://localhost:3000`

**Production build**:
```bash
npm run build
```

Creates an optimized build in the `build/` directory.

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Launch development server with hot reload |
| `npm run dev` | Alternative command to start dev server |
| `npm run build` | Create optimized production build |
| `npm run format` | Format code with Prettier |

## 🎨 Features

### User Interface
- 💬 Clean, modern chat interface
- 🌙 Smooth animations and transitions
- 📱 Fully responsive design
- ⌨️ Keyboard shortcuts (Enter to send)
- 🎯 Auto-scroll to latest messages

### Technical Features
- 📝 Markdown rendering for AI responses
- ⚡ Optimized React 19 performance
- 🎨 Tailwind CSS for styling
- 🔄 Real-time message updates
- 🛡️ TypeScript type safety

## 🛍️ Customer Support Features

### What Velora Can Help With

The AI assistant provides instant support for:

#### Shopping & Products
- 👗 **Product Information** - Details about clothing, accessories, and collections
- 📏 **Size Guidance** - Size charts, fit recommendations, and virtual fitting room
- 🎨 **Style Advice** - Outfit coordination and personalized fashion recommendations
- 🔍 **Product Availability** - Check stock and browse categories

#### Orders & Shipping
- 📦 **Shipping Info** - Delivery timeframes, tracking, and shipping options
- 🚚 **Order Status** - Track your order and get delivery updates
- 🌍 **International Shipping** - Information for global customers
- 💰 **Free Shipping** - Learn about free shipping on orders over $75

#### Returns & Exchanges
- 🔄 **Return Policy** - 30-day return window details
- 💱 **Exchanges** - Free size and color exchanges
- 💳 **Refunds** - Refund timeline and process information
- ⚠️ **Exceptions** - Final sale and non-returnable items

#### Payment & Account
- 💳 **Payment Methods** - Credit cards, PayPal, Apple Pay, Afterpay, Klarna
- 🎁 **Gift Cards** - Gift card and store credit information
- 📞 **Contact Support** - Get phone, email, and live chat details
- 🕐 **Support Hours** - When human agents are available

### Conversation Experience
- **Instant Responses** - Get answers in seconds
- **Context Awareness** - AI remembers your conversation
- **Markdown Formatting** - Clear, structured responses with bullet points and emphasis
- **Honest & Accurate** - Only provides verified information from the knowledge base
- **Human Escalation** - Connects you to human stylists when needed


## 🛠️ Tech Stack

- **React** 19.2.3 - UI library
- **TypeScript** 4.9.5 - Type safety
- **Tailwind CSS** 3.4.14 - Utility-first styling
- **Axios** 1.13.2 - HTTP client
- **React Markdown** 10.1.0 - Markdown rendering
- **Lucide React** 0.460.0 - Icon library
- **Radix UI** - Accessible UI components

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── chat/       # Chat-specific components
│   │   └── ui/         # Reusable UI components
│   ├── services/       # API services
│   ├── types/          # TypeScript types
│   ├── utils/          # Helper functions
│   ├── App.tsx         # Main app component
│   └── index.tsx       # Entry point
├── .env                # Environment variables
└── package.json        # Dependencies
```

## 🎯 Development Tips

### Hot Reload
The dev server supports hot module replacement - changes appear instantly without full page reload.

### Browser DevTools
React DevTools extension recommended for debugging component hierarchy and state.

### Code Formatting
Run Prettier before committing:
```bash
npm run format
```

## 🏗️ Building for Production

### Create Build
```bash
npm run build
```

This command:
- Bundles React in production mode
- Optimizes for best performance
- Minifies code
- Generates source maps
- Outputs to `build/` directory

### Test Production Build Locally
```bash
npx serve -s build
```

## 🚀 Deployment

The frontend is configured for Vercel deployment with `vercel.json` included.

For detailed deployment steps, see [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md) in the root directory.

### Quick Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## ⚙️ Configuration

### Environment Variables

All environment variables must be prefixed with `REACT_APP_`:

```env
REACT_APP_API_URL=your_backend_url
```

Access in code:
```typescript
const apiUrl = process.env.REACT_APP_API_URL;
```

### Tailwind Configuration

Customize styling in `tailwind.config.js`:
- Colors
- Fonts
- Breakpoints
- Plugins

## 🐛 Troubleshooting

**Port 3000 already in use**
```bash
# Use different port
PORT=3001 npm start
```

**Module not found errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build fails**
- Check for TypeScript errors
- Verify all environment variables are set
- Ensure all imports are correct

**Blank page after build**
- Check browser console for errors
- Verify `REACT_APP_API_URL` is set correctly
- Ensure backend is accessible

## 📝 Code Style

This project uses:
- **Prettier** for code formatting
- **TypeScript** strict mode
- **ESLint** for code quality

## 🔧 Browser Support

Supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 👨‍💻 Maintained By

Rutanshu Bhayani

## 📚 Learn More

- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
