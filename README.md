# ShopHub Backend API

A modern e-commerce backend API built with Node.js and Express using in-memory storage.

## Features

- 🔐 **User Authentication**: JWT-based authentication with bcrypt password hashing
- 📦 **Product Management**: CRUD operations for products with categories
- 🔍 **Search & Filter**: Product search and category filtering
- 👨‍💼 **Admin Dashboard**: Admin-only routes for user management
- 🛡️ **Security**: Password hashing, input validation, and error handling
- 💾 **Storage**: In-memory storage with 30 pre-loaded products

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Server**
   ```bash
   node app.js
   ```

The API will be available at `http://localhost:5000`

## Pre-loaded Data

The API comes with 30 realistic products across 5 categories:
- **Electronics**: iPhones, laptops, headphones, TVs, and more
- **Fashion**: Shoes, jeans, sunglasses, watches
- **Home & Garden**: Furniture, smart home devices, kitchen appliances
- **Sports & Fitness**: Exercise equipment, fitness trackers, sports gear
- **Books & Media**: Books, e-readers, streaming services

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login user
- `GET /api/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search/:query` - Search products

### Categories
- `GET /api/categories` - Get all categories

### Admin (Admin only)
- `GET /api/admin/users` - Get all users

## Admin Access

To access admin features:
1. Register a user with username "admin"
2. Login with those credentials
3. Admin routes will be accessible

## Environment Variables

You can set these environment variables:
- `JWT_SECRET` - JWT secret key (default: your_jwt_secret)
- `PORT` - Server port (default: 5000)

## Error Handling

The API includes comprehensive error handling:
- Validation errors
- Authentication errors
- Not found errors

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation
- CORS enabled for frontend integration

## Development

To run in development mode with auto-restart:
```bash
npm install -g nodemon
nodemon app.js
```

## Troubleshooting

### Port Already in Use
Change the port in `app.js` or kill the process using the port:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

## License

MIT License 