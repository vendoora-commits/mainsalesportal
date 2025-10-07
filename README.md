# Main Sales Portal

A modern e-commerce sales portal built with Node.js and Express.

## Features

- **Product Catalog**: Browse and view product details
- **Shopping Cart**: Add products to cart, adjust quantities, and checkout
- **Product Management**: Admin interface to add, edit, and delete products
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Dynamic product listing and cart management

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Pages

- **Home** (`/`): Browse products and add them to cart
- **Admin** (`/admin`): Manage products (add, edit, delete)

## Technology Stack

- **Backend**: Node.js, Express
- **Frontend**: HTML, CSS, JavaScript
- **Data Storage**: JSON file-based storage

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a single product
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product