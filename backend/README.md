# Spur Backend

This is the backend server for the Spur application, built with Node.js, Express, and TypeScript. It uses Prisma for ORM and Redis for caching.

## Prerequisites

- Node.js (v16 or higher recommended)
- PostgreSQL
- Redis

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Setup

1. Copy the example environment file:
   ```bash
   cp .example.env .env
   ```

2. Update `.env` with your configuration (Database URL, Redis URL, API keys, etc.).

## Running the Project

### Development

To start the server in development mode with hot-reloading:

```bash
npm run dev
```

### Production

To build and start the server for production:

```bash
npm run build
npm start
```

## Database Setup

Ensure your PostgreSQL database is running and the `DATABASE_URL` is set in `.env`.

Run Prisma migrations (if applicable):
```bash
npx prisma migrate dev
```

## Other Scripts

- `npm run format`: Formats code using Prettier.
