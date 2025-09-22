# Render Deployment Checklist

## ✅ Pre-Deployment Checklist

### Code Preparation
- [ ] All API calls use dynamic URLs (not hardcoded localhost)
- [ ] Environment variables are properly configured
- [ ] CORS is configured for production
- [ ] JWT secret is not hardcoded
- [ ] All dependencies are in package.json

### Repository Setup
- [ ] Code is pushed to Git repository (GitHub/GitLab)
- [ ] Repository is public or Render has access
- [ ] All files are committed and pushed

## 🚀 Deployment Steps

### Backend Deployment
- [ ] Create Render account
- [ ] Create new Web Service
- [ ] Connect Git repository
- [ ] Set Root Directory to `backend`
- [ ] Set Environment to `Node`
- [ ] Set Build Command: `npm install`
- [ ] Set Start Command: `npm start`
- [ ] Add Environment Variables:
  - [ ] `NODE_ENV`: `production`
  - [ ] `JWT_SECRET`: [generate secure string]
  - [ ] `PORT`: `10000`
- [ ] Deploy and note the URL

### Frontend Configuration
- [ ] Update `frontend/public/config.js` with backend URL
- [ ] Update `backend/app.js` CORS with frontend URL
- [ ] Commit and push changes

### Frontend Deployment
- [ ] Create another Web Service
- [ ] Connect same Git repository
- [ ] Set Root Directory to `frontend`
- [ ] Set Environment to `Node`
- [ ] Set Build Command: `npm install`
- [ ] Set Start Command: `npm start`
- [ ] Add Environment Variables:
  - [ ] `NODE_ENV`: `production`
  - [ ] `PORT`: `10000`
- [ ] Deploy and note the URL

## 🔧 Post-Deployment Verification

### Backend API
- [ ] API is accessible at backend URL
- [ ] CORS is working (no CORS errors)
- [ ] JWT authentication works
- [ ] Products endpoint returns data
- [ ] User registration/login works

### Frontend
- [ ] Frontend loads at frontend URL
- [ ] Can browse products
- [ ] Can register/login users
- [ ] Cart functionality works
- [ ] Admin panel accessible (if admin user)

### Integration
- [ ] Frontend can communicate with backend
- [ ] No console errors in browser
- [ ] All features work as expected

## 🐛 Common Issues & Solutions

### Build Failures
- [ ] Check package.json dependencies
- [ ] Verify build commands
- [ ] Check Render logs

### CORS Errors
- [ ] Verify CORS configuration
- [ ] Check frontend URL in backend CORS
- [ ] Ensure HTTPS URLs are used

### API Connection Issues
- [ ] Verify API URL in config.js
- [ ] Check backend service is running
- [ ] Test API endpoints directly

### Environment Variables
- [ ] Verify all required variables are set
- [ ] Check variable names match code
- [ ] Ensure JWT_SECRET is secure

## 📝 Final Steps

- [ ] Test all application features
- [ ] Create admin user for admin panel
- [ ] Document deployment URLs
- [ ] Set up monitoring (optional)
- [ ] Configure custom domain (optional)

## 🔗 Useful Links

- [Render Dashboard](https://dashboard.render.com)
- [Render Documentation](https://render.com/docs)
- [Node.js on Render](https://render.com/docs/deploy-node-express-app)

## 📞 Support

If you encounter issues:
1. Check Render logs
2. Verify configuration
3. Test locally first
4. Check this checklist
5. Review deployment guide 