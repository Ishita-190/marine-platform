# Marine Platform - Cloud Deployment Guide

This guide will help you deploy the Marine Data Platform to production using Vercel (frontend) and Railway (backend).

## 🚀 Quick Deployment

### Prerequisites
- GitHub account
- Vercel account
- Railway account
- PostgreSQL database (Railway or Supabase)

### Step 1: Deploy Backend to Railway

1. **Connect Railway to GitHub**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your marine-platform repository
   - Choose the `backend` directory as the root directory

2. **Configure Environment Variables**
   Set these in Railway environment variables:
   ```
   PORT=5000
   DB_HOST=your-railway-postgres-host.railway.app
   DB_USER=postgres
   DB_PASSWORD=your-postgres-password
   DB_NAME=marine
   DB_PORT=5432
   NODE_ENV=production
   ```

3. **Deploy**
   - Railway will automatically build and deploy
   - Your backend URL will be: `https://your-app-name.railway.app`

### Step 2: Deploy Frontend to Vercel

1. **Connect Vercel to GitHub**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project" → "Import Git Repository"
   - Select your marine-platform repository
   - Set the "Root Directory" to `frontend`

2. **Configure Environment Variables**
   Set these in Vercel environment variables:
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app
   REACT_APP_ENV=production
   ```

3. **Deploy**
   - Vercel will automatically build and deploy
   - Your frontend URL will be: `https://your-app-name.vercel.app`

## 🔧 Configuration Files Created

### Backend Configuration
- `Dockerfile` - Container configuration
- `railway.json` - Railway deployment settings
- `nixpacks.toml` - Build configuration
- `healthcheck.js` - Health check endpoint

### Frontend Configuration
- `vercel.json` - Vercel deployment settings
- `src/config.js` - Environment-based API configuration
- `.env.production` - Production environment variables

### CI/CD
- `.github/workflows/deploy.yml` - Automated deployment workflow

## 📊 Database Setup

### Option 1: Railway PostgreSQL (Recommended)
1. In Railway, add a PostgreSQL service
2. Get connection details from Railway dashboard
3. Update environment variables in backend

### Option 2: Supabase
1. Create a new Supabase project
2. Run the schema.sql file in Supabase SQL editor
3. Update environment variables with Supabase credentials

## 🔄 Environment Variables

### Backend (.env)
```env
PORT=5000
DB_HOST=your-db-host
DB_USER=postgres
DB_PASSWORD=your-password
DB_NAME=marine
DB_PORT=5432
NODE_ENV=production
```

### Frontend (.env.production)
```env
REACT_APP_API_URL=https://your-backend-url.railway.app
REACT_APP_ENV=production
```

## 🛠️ Local Development

After deployment, you can still run locally:

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm start
```

## 🔍 Testing Deployment

1. **Backend Health Check**
   ```bash
   curl https://your-backend-url.railway.app/health
   ```

2. **Frontend Access**
   - Open `https://your-frontend-url.vercel.app`
   - Check browser console for API connection errors

3. **API Endpoints**
   - Species: `/api/species`
   - Ocean Data: `/api/ocean`
   - Occurrences: `/api/occurrences`

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure frontend URL is in backend CORS whitelist
   - Check that API calls use the correct production URL

2. **Database Connection**
   - Verify database credentials
   - Check if database is accessible from Railway
   - Ensure schema is properly imported

3. **Build Failures**
   - Check build logs in Vercel/Railway dashboards
   - Ensure all dependencies are in package.json
   - Verify environment variables are set

### Debugging Commands

```bash
# Check backend logs (Railway)
railway logs

# Check frontend deployment (Vercel)
vercel logs

# Test API locally
curl http://localhost:5000/api/health
```

## 📈 Monitoring

### Railway
- Built-in metrics and logs
- Health checks automatically configured
- Error tracking in dashboard

### Vercel
- Analytics and performance metrics
- Build logs and deployment history
- Custom domain management

## 🔐 Security Considerations

1. **Environment Variables**
   - Never commit `.env` files to Git
   - Use Railway/Vercel environment variables
   - Rotate database passwords regularly

2. **Database Security**
   - Use SSL connections
   - Limit database user permissions
   - Enable database backups

3. **API Security**
   - Implement rate limiting
   - Add authentication if needed
   - Validate all inputs

## 🌍 Custom Domains (Optional)

### Vercel
1. Go to project settings → Domains
2. Add your custom domain
3. Configure DNS records

### Railway
1. Go to project settings → Custom Domains
2. Add your domain
3. Update DNS settings

## 💰 Cost Optimization

### Free Tiers
- Vercel: 100GB bandwidth/month
- Railway: $5/month after free credits
- PostgreSQL: Free tier available on Supabase

### Scaling Tips
- Enable caching on Vercel
- Optimize database queries
- Use CDN for static assets
- Monitor resource usage

## 📞 Support

- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Railway Documentation: [railway.app/docs](https://railway.app/docs)
- GitHub Issues: Create an issue in your repository

---

**Your Marine Platform is now live! 🌊**
