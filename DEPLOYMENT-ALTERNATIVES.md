# Marine Platform - Alternative Cloud Deployment Guide

Since Railway is no longer available, here are the best alternative platforms for deploying your Marine Data Platform.

## 🏆 **Recommended: Render (Easiest Setup)**

Render offers the most similar experience to Railway with a generous free tier.

### Quick Setup (Render + Vercel)

**1. Deploy Backend to Render**
- Go to [render.com](https://render.com)
- Click "New" → "Web Service"
- Connect your GitHub repository
- Set **Root Directory** to `backend`
- Use these settings:
  - **Environment**: Node
  - **Build Command**: `npm install`
  - **Start Command**: `npm start`
  - **Plan**: Free

**2. Add Database on Render**
- Click "New" → "PostgreSQL"
- Name: `marine-db`
- Plan: Free
- Note connection details

**3. Configure Environment Variables**
In your Render web service:
```env
NODE_ENV=production
PORT=10000
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=marine
DB_PORT=5432
```

**4. Deploy Frontend to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repo
- Set **Root Directory** to `frontend`
- Add environment variable:
```env
REACT_APP_API_URL=https://your-app-name.onrender.com
```

---

## 🥈 **Alternative Options**

### **Option 2: DigitalOcean App Platform**

**Pros:** Reliable, good performance, predictable pricing
**Cons:** Not free (starts at $5/month)

**Setup:**
1. Create DigitalOcean account
2. Go to App Platform → Create App
3. Connect GitHub repo
4. Use `.do/app.yaml` configuration file
5. Add PostgreSQL database

**Cost:** ~$5-15/month depending on usage

### **Option 3: AWS (Elastic Beanstalk)**

**Pros:** Most scalable, enterprise-ready
**Cons:** More complex setup, higher cost

**Setup:**
1. Create AWS account
2. Go to Elastic Beanstalk
3. Create new Node.js application
4. Deploy using `Dockerrun.aws.json`
5. Add RDS PostgreSQL database

**Cost:** ~$20-50/month for basic setup

### **Option 4: Heroku**

**Pros:** Simple deployment, good free tier
**Cons:** Recent changes to free plans

**Setup:**
1. Install Heroku CLI
2. `heroku create`
3. `heroku addons:create heroku-postgresql:hobby-dev`
4. `git push heroku main`

---

## 📊 **Platform Comparison**

| Platform | Free Tier | Ease of Use | Database | Cost (Paid) |
|----------|-----------|-------------|----------|-------------|
| **Render** | ✅ 750h/month | ⭐⭐⭐⭐⭐ | Built-in | $7/month |
| DigitalOcean | ❌ | ⭐⭐⭐⭐ | Built-in | $5/month |
| AWS | ❌ | ⭐⭐ | Separate | $20/month |
| Heroku | ⚠️ Limited | ⭐⭐⭐⭐ | Built-in | $5/month |

---

## 🚀 **Render Deployment Steps (Detailed)**

### Backend Setup

1. **Create Web Service**
   ```bash
   # After connecting GitHub, Render will auto-detect Node.js
   # Make sure to set:
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```

2. **Database Setup**
   - Create PostgreSQL service
   - Get connection string from dashboard
   - Add to environment variables

3. **Environment Variables**
   ```env
   NODE_ENV=production
   PORT=10000
   DB_HOST=your-postgres-host
   DB_USER=postgres
   DB_PASSWORD=your-password
   DB_NAME=marine
   DB_PORT=5432
   ```

### Frontend Setup (Vercel)

1. **Import Project**
   - Connect GitHub repository
   - Set root directory to `frontend`
   - Vercel will auto-detect React

2. **Environment Variables**
   ```env
   REACT_APP_API_URL=https://your-backend-name.onrender.com
   REACT_APP_ENV=production
   ```

---

## 🔧 **Configuration Files Created**

### Render Configuration
- `backend/render.yaml` - Render service definition
- `.github/workflows/deploy-render.yml` - CI/CD for Render

### AWS Configuration
- `backend/Dockerrun.aws.json` - ECS task definition

### DigitalOcean Configuration
- `backend/.do/app.yaml` - App Platform config

### Frontend Updates
- `frontend/src/config.js` - Multi-platform API URLs
- `frontend/.env.production` - Updated for Render

---

## 🛠️ **Testing Your Deployment**

### Health Checks
```bash
# Backend health
curl https://your-app.onrender.com/api/health

# Frontend access
# Open https://your-frontend.vercel.app
```

### Common Issues & Solutions

**1. Cold Starts (Render Free Tier)**
- First request may take 30-60 seconds
- Subsequent requests are faster
- Consider upgrading to paid plan for production

**2. Database Connection**
- Ensure database is in same region as app
- Check firewall settings
- Verify connection string format

**3. CORS Issues**
- Add frontend URL to backend CORS whitelist
- Check that API calls use HTTPS in production

---

## 💰 **Cost Optimization**

### Render (Recommended)
- **Free**: 750 hours/month, PostgreSQL included
- **Starter**: $7/month - No cold starts
- **Standard**: $25/month - Better performance

### DigitalOcean
- **App Platform**: $5/month minimum
- **Database**: $15/month for PostgreSQL
- **Total**: ~$20/month

### AWS
- **EC2**: ~$15/month (t3.micro)
- **RDS**: ~$15/month (db.t3.micro)
- **Data Transfer**: ~$10/month
- **Total**: ~$40/month

---

## 🔐 **Security Notes**

1. **Environment Variables**
   - Never commit secrets to Git
   - Use platform's secret management
   - Rotate database passwords

2. **Database Security**
   - Use SSL connections
   - Limit network access
   - Enable backups

3. **API Security**
   - Implement rate limiting
   - Add authentication if needed
   - Validate inputs

---

## 📞 **Getting Help**

### Render Support
- Documentation: [render.com/docs](https://render.com/docs)
- Status: [status.render.com](https://status.render.com)
- Support: support@render.com

### Platform-Specific Docs
- **DigitalOcean**: [docs.digitalocean.com](https://docs.digitalocean.com)
- **AWS**: [docs.aws.amazon.com](https://docs.aws.amazon.com)
- **Heroku**: [devcenter.heroku.com](https://devcenter.heroku.com)

---

## 🎯 **Recommendation**

**Start with Render + Vercel** because:
- ✅ Most similar to Railway experience
- ✅ Generous free tier
- ✅ Built-in database
- ✅ Simple deployment
- ✅ Good performance

Once you're ready to scale, you can migrate to DigitalOcean or AWS for better control and performance.

---

**Your Marine Platform is ready for deployment! 🌊**
