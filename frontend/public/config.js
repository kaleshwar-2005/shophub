// Configuration for API endpoints
const config = {
  // API base URL - will be automatically detected
  apiUrl: window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://your-backend-app.onrender.com', // Replace with your actual backend URL
  
  // Environment detection
  isDevelopment: window.location.hostname === 'localhost',
  isProduction: window.location.hostname !== 'localhost'
};

// Helper function to get full API URL
function getApiUrl(endpoint) {
  return `${config.apiUrl}${endpoint}`;
}

// Export for use in other scripts
window.ShopHubConfig = config;
window.getApiUrl = getApiUrl; 