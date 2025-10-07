const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Data file path
const PRODUCTS_FILE = path.join(__dirname, 'data', 'products.json');

// Initialize data directory and file
const initializeData = () => {
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
  if (!fs.existsSync(PRODUCTS_FILE)) {
    const sampleProducts = [
      {
        id: 1,
        name: 'Laptop Computer',
        description: 'High-performance laptop with 16GB RAM and 512GB SSD',
        price: 999.99,
        image: 'laptop.jpg',
        stock: 15
      },
      {
        id: 2,
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with long battery life',
        price: 29.99,
        image: 'mouse.jpg',
        stock: 50
      },
      {
        id: 3,
        name: 'Mechanical Keyboard',
        description: 'RGB mechanical keyboard with Cherry MX switches',
        price: 149.99,
        image: 'keyboard.jpg',
        stock: 30
      },
      {
        id: 4,
        name: 'USB-C Hub',
        description: '7-in-1 USB-C hub with HDMI and USB 3.0 ports',
        price: 49.99,
        image: 'hub.jpg',
        stock: 25
      },
      {
        id: 5,
        name: 'Wireless Headphones',
        description: 'Noise-canceling wireless headphones with 30-hour battery',
        price: 199.99,
        image: 'headphones.jpg',
        stock: 20
      }
    ];
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(sampleProducts, null, 2));
  }
};

// Read products from file
const readProducts = () => {
  const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
  return JSON.parse(data);
};

// Write products to file
const writeProducts = (products) => {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
};

// Routes

// Home page - Product listing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Product management page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// API: Get all products
app.get('/api/products', (req, res) => {
  try {
    const products = readProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read products' });
  }
});

// API: Get single product
app.get('/api/products/:id', (req, res) => {
  try {
    const products = readProducts();
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to read product' });
  }
});

// API: Create product
app.post('/api/products', (req, res) => {
  try {
    const products = readProducts();
    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      name: req.body.name,
      description: req.body.description,
      price: parseFloat(req.body.price),
      image: req.body.image || 'default.jpg',
      stock: parseInt(req.body.stock) || 0
    };
    products.push(newProduct);
    writeProducts(products);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// API: Update product
app.put('/api/products/:id', (req, res) => {
  try {
    const products = readProducts();
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
      products[index] = {
        ...products[index],
        name: req.body.name || products[index].name,
        description: req.body.description || products[index].description,
        price: req.body.price !== undefined ? parseFloat(req.body.price) : products[index].price,
        image: req.body.image || products[index].image,
        stock: req.body.stock !== undefined ? parseInt(req.body.stock) : products[index].stock
      };
      writeProducts(products);
      res.json(products[index]);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// API: Delete product
app.delete('/api/products/:id', (req, res) => {
  try {
    const products = readProducts();
    const filteredProducts = products.filter(p => p.id !== parseInt(req.params.id));
    if (filteredProducts.length < products.length) {
      writeProducts(filteredProducts);
      res.json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Initialize data and start server
initializeData();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
