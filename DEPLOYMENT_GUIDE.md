# 🚀 Deployment Guide: Frontend on Vercel & Backend on Render

This guide will walk you through deploying your ChatBot application with the frontend on Vercel and backend on Render.

---

## 📋 Prerequisites

Before you begin, ensure you have:

- [ ] GitHub account
- [ ] Vercel account (sign up at [vercel.com](https://vercel.com))
- [ ] Render account (sign up at [render.com](https://render.com))
- [ ] Your code pushed to a GitHub repository
- [ ] PostgreSQL database (we'll set this up on Render)
- [ ] Redis instance (we'll set this up on Render)
- [ ] AI Provider API key (Google Gemini, OpenAI, or Puter.js)

---

## 🔧 Part 1: Backend Deployment on Render

### Step 1: Create PostgreSQL Database on Render

1. **Login to Render Dashboard**
   - Go to [dashboard.render.com](https://dashboard.render.com)
   - Click on **"New +"** button in the top right
   - Select **"PostgreSQL"**

2. **Configure Database**
   - **Name**: `chatbot-database` (or your preferred name)
   - **Database**: `chatbot` (or your preferred database name)
   - **User**: Leave default or customize
   - **Region**: Choose closest to your users
   - **PostgreSQL Version**: Select latest (15 or higher)
   - **Plan**: Select **Free** tier for testing

3. **Create Database**
   - Click **"Create Database"**
   - Wait for provisioning (takes 1-2 minutes)
   - **IMPORTANT**: Copy the **Internal Database URL** (starts with `postgresql://`)
   - Save this URL - you'll need it for environment variables

### Step 2: Create Redis Instance on Render

1. **Create Redis**
   - Click **"New +"** button
   - Select **"Redis"**

2. **Configure Redis**
   - **Name**: `chatbot-redis`
   - **Region**: Same as your database
   - **Plan**: Select **Free** tier

3. **Create Redis**
   - Click **"Create Redis"**
   - **IMPORTANT**: Copy the **Internal Redis URL** (starts with `redis://`)
   INTERNAL REDIS URL: redis://red-d5a1gsqli9vc73au8bd0:6379
   - Save this URL for later

### Step 3: Deploy Backend Web Service

1. **Create Web Service**
   - Click **"New +"** button
   - Select **"Web Service"**

2. **Connect Repository**
   - Choose **"Build and deploy from a Git repository"**
   - Click **"Next"**
   - Connect your GitHub account if not already connected
   - Select your repository: `spur_chat_bot`
   - Click **"Connect"**

3. **Configure Web Service**
   - **Name**: `chatbot-backend`
   - **Region**: Same as your database and Redis
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: 
     ```bash
     npm ci && npx prisma generate && npm run build
     ```
   - **Start Command**: 
     ```bash
     npm start
     ```
   - **Plan**: Select **Free** tier

4. **Add Environment Variables**
   
   Click on **"Advanced"** and add the following environment variables:

   | Key | Value | Notes |
   |-----|-------|-------|
   | `PORT` | `10000` | Render's default port |
   | `DATABASE_URL` | `<Your Internal PostgreSQL URL>` | From Step 1 |
   | `REDIS_URL` | `<Your Internal Redis URL>` | From Step 2 |
   | `AI_PROVIDER` | `google` | Or `openai` or `puter` |
   | `GOOGLE_API_KEY` | `<Your Google API Key>` | If using Google Gemini |
   | `GOOGLE_MODEL` | `gemini-2.0-flash` | Or your preferred model |
   | `OPENAI_API_KEY` | `<Your OpenAI API Key>` | If using OpenAI |
   | `OPENAI_MODEL` | `gpt-4o-mini` | Or your preferred model |
   | `PUTER_AUTH_TOKEN` | `<Your Puter Token>` | If using Puter.js |
   | `PUTER_APP_UID` | `<Your Puter App UID>` | If using Puter.js |
   | `PUTER_MODEL` | `gpt-4o-mini` | If using Puter.js |
   | `CACHE_TTL` | `600` | Cache time in seconds |
   | `CORS_ORIGINS` | `https://your-app.vercel.app` | Update after frontend deployment |
   | `BACKEND_URL` | `https://chatbot-backend.onrender.com` | Your Render URL |

   > **Note**: You'll update `CORS_ORIGINS` after deploying the frontend

5. **Create Web Service**
   - Click **"Create Web Service"**
   - Wait for deployment (first deploy takes 5-10 minutes)
   - Once deployed, copy your backend URL (e.g., `https://chatbot-backend.onrender.com`)

6. **Run Database Migrations**
   
   After the first deployment:
   - Go to your backend service dashboard
   - Click on **"Shell"** tab (left sidebar)
   - Run the following command:
     ```bash
     npx prisma migrate deploy
     ```
   - This will set up your database schema

### Step 4: Verify Backend Deployment

1. **Check Logs**
   - Go to **"Logs"** tab in your Render dashboard
   - Verify there are no errors
   - Look for "Server running on port 10000" message

2. **Test API**
   - Your backend should be live at: `https://chatbot-backend.onrender.com`
   - You can test the health endpoint (if you have one)

---

## 🎨 Part 2: Frontend Deployment on Vercel

### Step 1: Prepare Frontend for Deployment

1. **Update Environment Variable**
   
   Your frontend needs to know the backend URL. Since you already have a `vercel.json`, you're good to go!

### Step 2: Deploy to Vercel

1. **Login to Vercel**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Sign in with GitHub

2. **Import Project**
   - Click **"Add New..."** → **"Project"**
   - Import your GitHub repository: `spur_chat_bot`
   - Click **"Import"**

3. **Configure Project**
   - **Framework Preset**: Vercel should auto-detect **"Create React App"**
   - **Root Directory**: Click **"Edit"** and select `frontend`
   - **Build Command**: `npm run build` (should be auto-filled)
   - **Output Directory**: `build` (should be auto-filled)
   - **Install Command**: `npm install` (should be auto-filled)

4. **Add Environment Variables**
   
   In the **"Environment Variables"** section, add:
   
   | Name | Value |
   |------|-------|
   | `REACT_APP_API_URL` | `https://chatbot-backend.onrender.com` |
   
   > Replace with your actual Render backend URL from Part 1, Step 3

5. **Deploy**
   - Click **"Deploy"**
   - Wait for deployment (takes 2-5 minutes)
   - Once complete, you'll get a URL like: `https://your-app.vercel.app`

### Step 3: Update Backend CORS Settings

Now that you have your frontend URL, update the backend:

1. **Go to Render Dashboard**
   - Navigate to your backend service
   - Click on **"Environment"** tab

2. **Update CORS_ORIGINS**
   - Find the `CORS_ORIGINS` variable
   - Update it to your Vercel URL: `https://your-app.vercel.app`
   - Click **"Save Changes"**
   - Your backend will automatically redeploy

### Step 4: Verify Frontend Deployment

1. **Visit Your App**
   - Go to your Vercel URL: `https://your-app.vercel.app`
   - The chat interface should load

2. **Test Chat Functionality**
   - Try sending a message
   - Verify you get a response from the AI

---

## 🔄 Part 3: Continuous Deployment Setup

### Automatic Deployments

Both Vercel and Render are now set up for automatic deployments:

- **Frontend (Vercel)**: Any push to your `main` branch will trigger a new deployment
- **Backend (Render)**: Any push to your `main` branch will trigger a new deployment

### Preview Deployments (Vercel)

- Every pull request will create a preview deployment
- Test changes before merging to main

---

## 🛠️ Part 4: Post-Deployment Configuration

### Custom Domain (Optional)

#### For Vercel (Frontend):
1. Go to your project settings
2. Click **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions

#### For Render (Backend):
1. Go to your service settings
2. Click **"Custom Domains"**
3. Add your custom domain
4. Update DNS records

### Environment Variables Management

#### To Update Environment Variables:

**Vercel:**
1. Go to project settings
2. Click **"Environment Variables"**
3. Add/Edit/Delete variables
4. Redeploy for changes to take effect

**Render:**
1. Go to service dashboard
2. Click **"Environment"** tab
3. Add/Edit/Delete variables
4. Service will auto-redeploy

---

## 📊 Part 5: Monitoring & Maintenance

### Render Monitoring

1. **Logs**: Check **"Logs"** tab for errors
2. **Metrics**: View **"Metrics"** tab for performance
3. **Events**: Check **"Events"** for deployment history

### Vercel Monitoring

1. **Deployments**: View all deployments in dashboard
2. **Analytics**: Enable Vercel Analytics for insights
3. **Logs**: Check function logs for errors

### Free Tier Limitations

> **Important**: Both services have free tier limitations:

**Render Free Tier:**
- Services spin down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month of runtime

**Vercel Free Tier:**
- 100GB bandwidth/month
- Unlimited deployments
- Serverless function execution limits

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Backend Returns 503 Error
- **Cause**: Render free tier spins down after inactivity
- **Solution**: Wait 30-60 seconds for service to wake up

#### 2. CORS Errors
- **Cause**: `CORS_ORIGINS` not set correctly
- **Solution**: Verify `CORS_ORIGINS` in Render matches your Vercel URL exactly

#### 3. Database Connection Errors
- **Cause**: Incorrect `DATABASE_URL`
- **Solution**: Use the **Internal Database URL** from Render, not External

#### 4. Build Failures on Render
- **Cause**: Missing dependencies or build command issues
- **Solution**: Check logs, ensure `package.json` is correct

#### 5. Frontend Can't Connect to Backend
- **Cause**: Incorrect `REACT_APP_API_URL`
- **Solution**: Verify environment variable in Vercel settings

#### 6. Redis Connection Errors
- **Cause**: Incorrect `REDIS_URL`
- **Solution**: Use the **Internal Redis URL** from Render

---

## 📝 Checklist

Use this checklist to ensure everything is deployed correctly:

### Backend (Render)
- [ ] PostgreSQL database created
- [ ] Redis instance created
- [ ] Web service deployed
- [ ] All environment variables set
- [ ] Database migrations run
- [ ] Backend URL copied
- [ ] Logs show no errors

### Frontend (Vercel)
- [ ] Project imported from GitHub
- [ ] Root directory set to `frontend`
- [ ] `REACT_APP_API_URL` environment variable set
- [ ] Deployment successful
- [ ] Frontend URL copied

### Configuration
- [ ] Backend `CORS_ORIGINS` updated with Vercel URL
- [ ] Chat functionality tested and working
- [ ] No CORS errors in browser console

---

## 🎉 Success!

Your ChatBot application should now be live:

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://chatbot-backend.onrender.com`

### Next Steps

1. **Test thoroughly**: Send various messages to ensure AI responses work
2. **Monitor logs**: Check both Vercel and Render logs for any issues
3. **Set up custom domain** (optional)
4. **Enable analytics** (optional)
5. **Share with users!**

---

## 📞 Need Help?

If you encounter issues:

1. Check the **Troubleshooting** section above
2. Review Render logs for backend issues
3. Review Vercel deployment logs for frontend issues
4. Check browser console for client-side errors
5. Verify all environment variables are set correctly

---

## 🔗 Useful Links

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)
- [React Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)

---

**Author**: Rhythm Italiya  
**Last Updated**: December 30, 2025
