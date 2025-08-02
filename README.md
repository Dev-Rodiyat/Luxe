## Luxe - E-commerce Application

Welcome to **Luxe**, a modern e-commerce platform designed to provide a seamless shopping and selling experience. Built with a focus on user-friendly interfaces and robust backend functionality, Luxe allows users to browse products, manage carts, and sellers to list and track their products and orders. This README provides an overview, setup instructions, and usage details for the project.

# Overview

Luxe is an e-commerce application featuring:

- User Features: Browse products, add to cart, and proceed to checkout.
- Seller Features: List products, view listed products, and track ordered products with buyer details.
- Responsive Design: Styled with Tailwind CSS, featuring a sleek aesthetic (e.g., bg-white/80, backdrop-blur-lg, purple/pink gradients).
- State Management: Utilizes Redux for managing product and cart states.
- Authentication: JWT-based authentication for secure user and seller actions.
- Real-time Updates: Local storage synchronization for offline access.

**The project is divided into a frontend (React) and backend (Node.js/Express with MongoDB), with APIs for product and order management.**

**Prerequisites**

- Node.js + Express.js
- React.js + Vite
- npm 
- MongoDB (local or remote instance)
- Git (for cloning the repository)

```

### 📦 Installation & Setup

> Clone the repo and install dependencies:

```bash
git clone https://github.com/Dev-Rodiyat/Luxe.git
cd Luxe
npm install
```

> Create `.env` file in root (sample below):

```env
VITE_BACKEND_URL=http://localhost:5000
```

> Start the development server:

```bash
npm run dev
```

# Usage

**User Features**

1. **Browse Products:** Visit the shop page to view available products.
2. **Cart Management:** Open the cart modal (via the shopping cart icon) to add, remove, or adjust product quantities. A single toast notification will appear for each action (e.g., "Product 'Laptop' added to cart").
3. **Checkout:** Proceed to the checkout page from the cart to complete an order.

**Seller Features**

1. **Add Products:** Use the "Add New Product" button on the seller products page to create listings.
2. **View Listed Products:** Access the "Listed Products" tab to see and manage your products (edit or delete).
3. **View Ordered Products:** Switch to the "Ordered Products" tab to see details of purchased items, including buyer name, email, quantity, order status, and date.

# Authentication

Log in to access cart management and seller features. Unauthorized users are redirected to the login page with a toast notification.

# Project Structure

- **backend/:** Contains Express.js server, MongoDB models (e.g., Product, Order), and routes (e.g., /products/seller, /products/seller/ordered).
- **frontend/:** Contains React components (e.g., CartModal.jsx, SellerProducts.jsx), Redux slices (e.g., productSlice.js, cartSlice.js), and utilities (e.g., utils/api.js).

# **Features**

1. **Product Management:** Sellers can create, update, and delete products with categories (Electronics, Clothing, Books, Beauty, Home, Toys, Other).
2. **Cart System:** Real-time cart updates with quantity adjustments and removal, synced to local storage.
3. **Order Tracking:** Sellers view ordered products with buyer details and order status.
4. **Responsive UI:** Grid layouts for products and vertical lists for orders, optimized for mobile and desktop.
5. **Error Handling:** Toast notifications for success (e.g., "Product deleted successfully") and errors (e.g., "Please log in").

# Technologies

- Frontend: React, Redux, Tailwind CSS, React Router, react-toastify
- Backend: Node.js, Express.js, Mongoose, JWT
- Database: MongoDB
- Other: Local storage for offline data, Axios for API calls

# Contributing

**Fork the repository.**
```
Create a new branch:git checkout -b feature/your-feature

```
Commit your changes:git commit -m "Add your message"

```
Push to the branch:git push origin feature/your-feature

````
Open a pull request.

```

# License

This project is licensed under the MIT License - see the LICENSE.md file for details.

# Contact

For questions or support, please open an issue or reach out via the project maintainers.

**Last updated: August 02, 2025**