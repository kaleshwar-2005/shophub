const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const app = express();
const PORT = 5000;
const SECRET = 'your_jwt_secret';
const USERS_FILE = './users.json';

// Load users from file if exists
let users = [];
if (fs.existsSync(USERS_FILE)) {
  try {
    users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
  } catch (e) {
    console.error('Failed to load users.json:', e);
    users = [];
  }
}

function saveUsers() {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 999.99,
    description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    category: "Electronics"
  },
  {
    id: 2,
    name: "MacBook Air M2",
    price: 1199.99,
    description: "Ultra-thin laptop with M2 chip, 13.6-inch Liquid Retina display",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    category: "Electronics"
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    price: 399.99,
    description: "Premium noise-canceling headphones with 30-hour battery life",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    category: "Electronics"
  },
  {
    id: 4,
    name: "Samsung 65\" QLED TV",
    price: 1299.99,
    description: "4K QLED Smart TV with Quantum Dot technology and HDR",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
    category: "Electronics"
  },
  {
    id: 5,
    name: "Nike Air Max 270",
    price: 150.00,
    description: "Comfortable running shoes with Air Max cushioning technology",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    category: "Fashion"
  },
  {
    id: 6,
    name: "Levi's 501 Jeans",
    price: 89.99,
    description: "Classic straight-fit jeans in authentic denim",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    category: "Fashion"
  },
  {
    id: 7,
    name: "Adidas Ultraboost 22",
    price: 180.00,
    description: "Responsive running shoes with Boost midsole technology",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400",
    category: "Fashion"
  },
  {
    id: 8,
    name: "Ray-Ban Aviator",
    price: 154.00,
    description: "Iconic aviator sunglasses with UV400 protection",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
    category: "Fashion"
  },
  {
    id: 9,
    name: "Casio G-Shock",
    price: 99.99,
    description: "Durable digital watch with shock resistance and water resistance",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400",
    category: "Fashion"
  },
  {
    id: 10,
    name: "IKEA KALLAX Shelf Unit",
    price: 89.99,
    description: "Versatile storage unit perfect for books, records, or display items",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    category: "Home & Garden"
  },
  {
    id: 11,
    name: "Philips Hue Smart Bulb",
    price: 49.99,
    description: "WiFi-enabled smart bulb with 16 million colors and voice control",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
    category: "Home & Garden"
  },
  {
    id: 12,
    name: "KitchenAid Stand Mixer",
    price: 399.99,
    description: "Professional stand mixer with 10-speed motor and tilt-head design",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    category: "Home & Garden"
  },
  {
    id: 13,
    name: "Dyson V15 Detect",
    price: 699.99,
    description: "Cordless vacuum with laser dust detection and 60-minute runtime",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    category: "Home & Garden"
  },
  {
    id: 14,
    name: "Nest Learning Thermostat",
    price: 249.99,
    description: "Smart thermostat that learns your schedule and saves energy",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    category: "Home & Garden"
  },
  {
    id: 15,
    name: "Nike Basketball",
    price: 29.99,
    description: "Official size and weight basketball for indoor/outdoor play",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    category: "Sports & Fitness"
  },
  {
    id: 16,
    name: "Bowflex SelectTech Dumbbells",
    price: 399.99,
    description: "Adjustable dumbbells that replace 15 sets in one",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    category: "Sports & Fitness"
  },
  {
    id: 17,
    name: "Fitbit Charge 5",
    price: 179.99,
    description: "Advanced fitness tracker with built-in GPS and stress management",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400",
    category: "Sports & Fitness"
  },
  {
    id: 18,
    name: "Yoga Mat Premium",
    price: 39.99,
    description: "Non-slip yoga mat with alignment lines and carrying strap",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    category: "Sports & Fitness"
  },
  {
    id: 19,
    name: "Wilson Tennis Racket",
    price: 89.99,
    description: "Professional tennis racket with graphite frame and synthetic strings",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
    category: "Sports & Fitness"
  },
  {
    id: 20,
    name: "The Great Gatsby",
    price: 12.99,
    description: "F. Scott Fitzgerald's classic novel about the Jazz Age",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    category: "Books & Media"
  },
  {
    id: 21,
    name: "Kindle Paperwhite",
    price: 139.99,
    description: "Waterproof e-reader with 6.8\" display and weeks of battery life",
    image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400",
    category: "Books & Media"
  },
  {
    id: 22,
    name: "Spotify Premium 12-Month",
    price: 119.88,
    description: "Annual subscription to ad-free music streaming service",
    image: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=400",
    category: "Books & Media"
  },
  {
    id: 23,
    name: "Netflix Gift Card",
    price: 50.00,
    description: "Digital gift card for Netflix streaming service",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400",
    category: "Books & Media"
  },
  {
    id: 24,
    name: "Bluetooth Speaker JBL",
    price: 79.99,
    description: "Portable waterproof speaker with 20-hour battery life",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    category: "Electronics"
  },
  {
    id: 25,
    name: "Gaming Mouse Logitech",
    price: 59.99,
    description: "High-precision gaming mouse with customizable RGB lighting",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    category: "Electronics"
  },
  {
    id: 26,
    name: "Mechanical Keyboard",
    price: 129.99,
    description: "Cherry MX Blue switches with RGB backlighting and wrist rest",
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
    category: "Electronics"
  },
  {
    id: 27,
    name: "Wireless Charger",
    price: 29.99,
    description: "Fast wireless charging pad compatible with iPhone and Samsung",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
    category: "Electronics"
  },
  {
    id: 28,
    name: "Portable Power Bank",
    price: 49.99,
    description: "20000mAh power bank with fast charging and multiple ports",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=400",
    category: "Electronics"
  },
  {
    id: 29,
    name: "Smart Watch Series 8",
    price: 399.99,
    description: "Advanced health monitoring with ECG and blood oxygen tracking",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    category: "Electronics"
  },
  {
    id: 30,
    name: "Wireless Earbuds Pro",
    price: 249.99,
    description: "Active noise cancellation with spatial audio and sweat resistance",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400",
    category: "Electronics"
  }
];

// Helper functions
const generateId = (array) => {
  return array.length > 0 ? Math.max(...array.map(item => item.id)) + 1 : 1;
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('ShopHub E-commerce API is running!');
});

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get products by category
app.get('/api/products/category/:category', (req, res) => {
  const category = req.params.category;
  const filteredProducts = products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
  res.json(filteredProducts);
});

// Get all categories
app.get('/api/categories', (req, res) => {
  const categories = [...new Set(products.map(product => product.category))];
  res.json(categories);
});

// Get a single product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// Add a new product
app.post('/api/products', (req, res) => {
  const { name, price, description, image, category } = req.body;
  
  if (!name || !price || !description) {
    return res.status(400).json({ message: 'Name, price, and description are required' });
  }

  const newProduct = {
    id: generateId(products),
    name,
    price: parseFloat(price),
    description,
    image: image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
    category: category || 'Electronics'
  };
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update a product
app.put('/api/products/:id', (req, res) => {
  const { name, price, description, image, category } = req.body;
  const productId = parseInt(req.params.id);
  
  if (!name || !price || !description) {
    return res.status(400).json({ message: 'Name, price, and description are required' });
  }

  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  products[productIndex] = {
    ...products[productIndex],
    name,
    price: parseFloat(price),
    description,
    image: image || products[productIndex].image,
    category: category || products[productIndex].category
  };
  
  res.json(products[productIndex]);
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === productId);
  
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  products.splice(productIndex, 1);
  res.json({ message: 'Product deleted successfully' });
});

// Search products
app.get('/api/products/search/:query', (req, res) => {
  const query = req.params.query.toLowerCase();
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  );
  res.json(filteredProducts);
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }
    
    if (username.length < 3) {
      return res.status(400).json({ message: 'Username must be at least 3 characters long' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = {
      id: generateId(users),
      username,
      password: hashedPassword,
      createdAt: new Date()
    };
    
    users.push(newUser);
    saveUsers(); // Save to file
    res.status(201).json({ 
      message: 'User registered successfully', 
      user: { id: newUser.id, username: newUser.username } 
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Failed to register user' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ username: user.username, userId: user.id }, SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Failed to login' });
  }
});

// Get user profile (protected route)
app.get('/api/profile', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, SECRET);
    const user = users.find(u => u.username === decoded.username);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ id: user.id, username: user.username, createdAt: user.createdAt });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Admin routes
app.get('/api/admin/users', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, SECRET);
    if (decoded.username !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const userList = users.map(user => ({
      id: user.id,
      username: user.username,
      createdAt: user.createdAt
    }));
    res.json(userList);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 ShopHub API server running on http://localhost:${PORT}`);
  console.log(`💾 Storage: In-memory (no database required)`);
  console.log(`🔐 JWT Secret: ${SECRET}`);
}); 