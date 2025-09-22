# ShopHub Deployment Guide - Render

This guide will help you deploy your ShopHub e-commerce application to Render.

## Prerequisites

- A Render account (free tier available)
- Your code pushed to a Git repository (GitHub, GitLab, etc.)

## Deployment Steps

### Step 1: Prepare Your Repository

1. **Push your code to GitHub/GitLab**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

### Step 2: Deploy Backend API

1. **Go to Render Dashboard**
   - Visit [render.com](https://render.com)
   - Sign in to your account

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your Git repository
   - Select the repository containing your ShopHub code

3. **Configure Backend Service**
   - **Name**: `shophub-backend`
   - **Root Directory**: `backend` (important!)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Environment Variables**
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: Generate a secure random string
   - `PORT`: `10000` (Render will override this)

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note the URL (e.g., `https://shophub-backend.onrender.com`)

### Step 3: Update Frontend Configuration

1. **Update API URL**
   - Edit `frontend/public/config.js`
   - Replace `https://your-backend-app.onrender.com` with your actual backend URL
   ```javascript
   apiUrl: window.location.hostname === 'localhost' 
     ? 'http://localhost:5000' 
     : 'https://shophub-backend.onrender.com', // Your actual backend URL
   ```

2. **Commit and push changes**
   ```bash
   git add .
   git commit -m "Update API URL for production"
   git push origin main
   ```

### Step 4: Deploy Frontend

1. **Create Another Web Service**
   - Click "New +" → "Web Service"
   - Connect the same Git repository

2. **Configure Frontend Service**
   - **Name**: `shophub-frontend`
   - **Root Directory**: `frontend` (important!)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

3. **Environment Variables**
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (Render will override this)

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note the URL (e.g., `https://shophub-frontend.onrender.com`)

### Step 5: Update CORS Configuration

1. **Update Backend CORS**
   - Edit `backend/app.js`
   - Update the CORS origin to include your frontend URL:
   ```javascript
   app.use(cors({
     origin: process.env.NODE_ENV === 'production' 
       ? ['https://shophub-frontend.onrender.com', 'http://localhost:8000'] 
       : 'http://localhost:8000',
     credentials: true
   }));
   ```

2. **Redeploy Backend**
   - Push changes to Git
   - Render will automatically redeploy

## Environment Variables Reference

### Backend Environment Variables
- `NODE_ENV`: Set to `production`
- `JWT_SECRET`: Secure random string for JWT tokens
- `PORT`: Port number (Render sets this automatically)

### Frontend Environment Variables
- `NODE_ENV`: Set to `production`
- `PORT`: Port number (Render sets this automatically)

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are in `package.json`
   - Ensure build commands are correct
   - Check Render logs for specific errors

2. **CORS Errors**
   - Verify CORS configuration in backend
   - Ensure frontend URL is included in allowed origins

3. **API Connection Issues**
   - Check that API URL is correctly configured in `config.js`
   - Verify backend service is running
   - Check network tab in browser for failed requests

4. **Port Issues**
   - Render automatically sets the PORT environment variable
   - Don't hardcode port numbers in production

### Checking Logs

1. **In Render Dashboard**
   - Go to your service
   - Click "Logs" tab
   - Check for error messages

2. **Common Log Locations**
   - Build logs: Show build process
   - Runtime logs: Show application errors

## Security Considerations

1. **JWT Secret**
   - Use a strong, random secret
   - Never commit secrets to Git
   - Use Render's environment variables

2. **CORS**
   - Only allow necessary origins
   - Don't use `*` in production

3. **Environment Variables**
   - Keep sensitive data in environment variables
   - Use Render's secure environment variable storage

## Performance Optimization

1. **Enable Auto-Deploy**
   - Connect to Git repository
   - Enable automatic deployments on push

2. **Monitor Performance**
   - Use Render's built-in monitoring
   - Check response times and error rates

## Support

If you encounter issues:
1. Check Render documentation
2. Review application logs
3. Verify configuration settings
4. Test locally first

## URLs After Deployment

- **Frontend**: `https://shophub-frontend.onrender.com`
- **Backend API**: `https://shophub-backend.onrender.com`

Remember to update the API URL in your frontend configuration with the actual backend URL! 