# Deployment Guide

This guide explains how to deploy the Estimate Tracker application to production using Render.

## Architecture

- **Backend**: Node.js/Express API (deploy to Render)
- **Frontend**: React SPA (deploy to Render Static Site)

## Backend Deployment (Render)

1. **Create Render account** at https://render.com (or sign in with GitHub)
2. **Create new Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `KyPython/estimate-tracker`
3. **Configure the service**:
   - **Name**: `estimate-tracker-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. **Environment Variables** (optional):
   - `NODE_ENV`: `production`
   - `PORT`: Render sets this automatically (defaults to 10000)
5. **Click "Create Web Service"** - Render will deploy automatically
6. **Copy your service URL** (e.g., `https://estimate-tracker-backend.onrender.com`)

**Note**: Render uses the `render.yaml` file in the backend directory for configuration, or you can configure manually in the dashboard.

## Frontend Deployment (Render Static Site)

1. **In Render dashboard**, click "New +" → "Static Site"
2. **Connect your GitHub repository**: `KyPython/estimate-tracker`
3. **Configure the site**:
   - **Name**: `estimate-tracker-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. **Add Environment Variable**:
   - **Key**: `VITE_API_URL`
   - **Value**: Your backend URL from step above (e.g., `https://estimate-tracker-backend.onrender.com`)
5. **Click "Create Static Site"** - Render will deploy automatically
6. **Your app will be live** at `https://estimate-tracker-frontend.onrender.com`

**Note**: After deployment, Render may show a "Free tier" notice. The site will spin down after inactivity but will wake up on first request.

## Post-Deployment

1. **Update CORS settings** in `backend/src/index.ts` if needed to allow your frontend domain:
   ```typescript
   app.use(cors({
     origin: process.env.FRONTEND_URL || 'http://localhost:3000'
   }));
   ```
2. **Test the deployed application** - visit your frontend URL
3. **Verify API connection** - check browser console for any CORS errors

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

