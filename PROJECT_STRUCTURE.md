# L'Oven Coffee & Bakery - Project Structure

## Overview
Full-stack application with Laravel API backend and React frontend.

## Architecture

```
L-oven/
├── backend/                    # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── Api/
│   │   │   │   │   ├── Auth/
│   │   │   │   │   │   ├── LoginController.php
│   │   │   │   │   │   ├── RegisterController.php
│   │   │   │   │   │   └── LogoutController.php
│   │   │   │   │   ├── CategoryController.php
│   │   │   │   │   ├── ProductController.php
│   │   │   │   │   ├── OrderController.php
│   │   │   │   │   ├── CartController.php
│   │   │   │   │   ├── LoyaltyController.php
│   │   │   │   │   ├── ReviewController.php
│   │   │   │   │   ├── CouponController.php
│   │   │   │   │   └── AddressController.php
│   │   │   ├── Middleware/
│   │   │   │   └── CheckRole.php
│   │   │   └── Requests/
│   │   ├── Models/
│   │   │   ├── User.php
│   │   │   ├── Category.php
│   │   │   ├── Product.php
│   │   │   ├── ProductVariant.php
│   │   │   ├── OptionGroup.php
│   │   │   ├── OptionItem.php
│   │   │   ├── Order.php
│   │   │   ├── OrderItem.php
│   │   │   ├── Address.php
│   │   │   ├── LoyaltyAccount.php
│   │   │   ├── Reward.php
│   │   │   ├── Payment.php
│   │   │   ├── Coupon.php
│   │   │   └── Review.php
│   │   ├── Services/
│   │   │   ├── OrderService.php
│   │   │   ├── PaymentService.php
│   │   │   └── LoyaltyService.php
│   │   └── Repositories/
│   ├── config/
│   ├── database/
│   │   ├── migrations/
│   │   ├── seeders/
│   │   └── factories/
│   ├── routes/
│   │   └── api.php
│   ├── .env
│   └── composer.json
│
├── frontend/                   # React SPA
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Loading.jsx
│   │   │   │   └── ErrorBoundary.jsx
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   └── RegisterForm.jsx
│   │   │   ├── menu/
│   │   │   │   ├── CategoryList.jsx
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   ├── ProductDetail.jsx
│   │   │   │   └── ProductCustomizer.jsx
│   │   │   ├── cart/
│   │   │   │   ├── Cart.jsx
│   │   │   │   └── CartItem.jsx
│   │   │   ├── checkout/
│   │   │   │   ├── CheckoutForm.jsx
│   │   │   │   ├── PaymentMethod.jsx
│   │   │   │   └── OrderSummary.jsx
│   │   │   ├── orders/
│   │   │   │   ├── OrderHistory.jsx
│   │   │   │   └── OrderDetails.jsx
│   │   │   ├── loyalty/
│   │   │   │   ├── LoyaltyDashboard.jsx
│   │   │   │   └── RewardsList.jsx
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── ProductManagement.jsx
│   │   │       └── OrderManagement.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Menu.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Orders.jsx
│   │   │   └── Admin.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── productService.js
│   │   │   ├── orderService.js
│   │   │   └── cartService.js
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── CartContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useCart.js
│   │   │   └── useProducts.js
│   │   ├── utils/
│   │   │   ├── formatters.js
│   │   │   └── validators.js
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
├── database/                   # Shared database files
│   ├── migrations/
│   └── schema.sql
├── architechure.md
├── plan.md
└── PROJECT_STRUCTURE.md
```

## Technology Stack

### Backend
- **Framework**: Laravel 11.x
- **Database**: MySQL 8.0+ (via XAMPP)
- **Authentication**: Laravel Sanctum (API tokens)
- **API Style**: RESTful JSON API

### Frontend
- **Framework**: React 18+ with Vite
- **Routing**: React Router v6
- **State Management**: Context API + React Query
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **UI Components**: Custom + Headless UI

## API Endpoints Structure

### Authentication
- POST `/api/register` - Register new user
- POST `/api/login` - User login
- POST `/api/logout` - User logout
- GET `/api/user` - Get authenticated user

### Products & Menu
- GET `/api/categories` - List all categories
- GET `/api/products` - List all products (with filters)
- GET `/api/products/{id}` - Get single product with variants/options

### Orders
- GET `/api/orders` - User order history
- POST `/api/orders` - Create new order
- GET `/api/orders/{id}` - Get order details
- PATCH `/api/orders/{id}/status` - Update order status (admin/staff)

### Cart (Session-based or persisted)
- GET `/api/cart` - Get current cart
- POST `/api/cart/items` - Add item to cart
- PATCH `/api/cart/items/{id}` - Update cart item
- DELETE `/api/cart/items/{id}` - Remove cart item

### Loyalty & Rewards
- GET `/api/loyalty/account` - Get user loyalty account
- GET `/api/loyalty/rewards` - List available rewards
- POST `/api/loyalty/redeem` - Redeem reward points

### User Profile
- GET `/api/addresses` - List user addresses
- POST `/api/addresses` - Add new address
- PATCH `/api/addresses/{id}` - Update address
- DELETE `/api/addresses/{id}` - Delete address

### Coupons
- POST `/api/coupons/validate` - Validate coupon code
- POST `/api/coupons/apply` - Apply coupon to order

### Reviews
- GET `/api/products/{id}/reviews` - Get product reviews
- POST `/api/products/{id}/reviews` - Add product review

### Admin/Staff
- GET `/api/admin/dashboard` - Admin dashboard stats
- GET `/api/admin/orders` - All orders (with filters)
- PATCH `/api/admin/products/{id}` - Update product
- POST `/api/admin/products` - Create product

## Environment Setup

### Backend (.env)
```
APP_NAME="L'Oven API"
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=loven_db
DB_USERNAME=root
DB_PASSWORD=1234

SANCTUM_STATEFUL_DOMAINS=localhost:5173
SESSION_DOMAIN=localhost
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=L'Oven Coffee & Bakery
```

## Development Workflow

1. **Start XAMPP** - MySQL and Apache
2. **Backend**: `cd backend && php artisan serve` (runs on :8000)
3. **Frontend**: `cd frontend && npm run dev` (runs on :5173)
4. **Access**: http://localhost:5173

## Next Steps

1. Initialize Laravel project in backend/
2. Initialize React + Vite project in frontend/
3. Move database migrations to backend/database/
4. Configure CORS for API access
5. Set up Laravel Sanctum for authentication
6. Create API routes and controllers
7. Build React components and pages
8. Integrate API calls in frontend
9. Test end-to-end flows
