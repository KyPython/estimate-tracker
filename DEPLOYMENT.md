# Deployment Guide

This guide explains how to deploy the Estimate Tracker application to production.

## Architecture

- **Backend**: Node.js/Express API (deploy to Railway, Render, or Fly.io)
- **Frontend**: React SPA (deploy to Vercel or Netlify)

## Backend Deployment (Railway)

1. **Create Railway account** at https://railway.app
2. **Create new project** and connect your GitHub repository
3. **Select the backend folder** as the root directory
4. **Set environment variables** (if needed):
   - `PORT` (optional, defaults to 3001)
5. **Deploy** - Railway will automatically detect Node.js and deploy

### Alternative: Render

1. Create account at https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node

## Frontend Deployment (Vercel)

1. **Create Vercel account** at https://vercel.com
2. **Import your GitHub repository**
3. **Configure project**:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Add Environment Variable**:
   - `VITE_API_URL`: Your backend URL (e.g., `https://your-app.railway.app`)
5. **Deploy**

### Alternative: Netlify

1. Create account at https://netlify.com
2. Import GitHub repository
3. Set:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
4. Add environment variable:
   - `VITE_API_URL`: Your backend URL

## Post-Deployment

1. Update `frontend/vercel.json` with your actual backend URL
2. Update CORS settings in `backend/src/index.ts` if needed to allow your frontend domain
3. Test the deployed application

## Database

The SQLite database (`data.db`) is stored locally in the backend directory. For production:
- Railway/Render: Uses ephemeral storage (data persists during deployment)
- For persistent storage, consider migrating to PostgreSQL or another managed database

## CORS Configuration

If deploying frontend and backend to different domains, ensure CORS is configured in `backend/src/index.ts`. The current setup allows all origins (`cors()`), which is fine for development but you may want to restrict it in production:

```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
```

