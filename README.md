# L'Oven Coffee - E-Commerce Platform

**Premium Coffee & Bakery Ordering System**  
Built with Laravel API + React Frontend

---

## 🎉 Project Status

**Current Phase**: Phase 1A Complete ✅  
**Branch**: develop  
**Last Updated**: September 2, 2026

---

## 📋 Quick Start

### Prerequisites
- PHP 8.3+
- Composer 2.x
- Node.js 22.x+
- MySQL 8.0+
- XAMPP (or standalone MySQL)

### Backend Setup
```bash
cd backend
composer install
cp .env.example .env
# Update .env with your MySQL credentials
php artisan key:generate
php artisan serve
```
Backend runs on: `http://localhost:8000`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## 🏗️ Architecture

### Backend (Laravel 13.x)
- **API**: RESTful JSON API
- **Authentication**: Laravel Sanctum
- **Database**: MySQL
- **Location**: `/backend`

### Frontend (React 18+ with Vite)
- **Framework**: React
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Location**: `/frontend`

### Database
- **Name**: loven_db
- **Tables**: 21 tables with full relationships
- **Seed Data**: Categories, products, rewards
- **Location**: `/database`

---

## 🎨 Brand Identity

### Colors
- **Primary**: Dark Chocolate Brown (#2B1B12)
- **Accent**: Warm Bright Orange (#F28C13)
- **Background**: Warm Cream (#FFF4E6)
- **Supporting**: White (#FFFFFF)

### Typography
- **Display**: Playfair Display (headings)
- **Body**: Inter (text)

---

## 📦 Features Implemented (Phase 1A)

✅ Laravel backend with MySQL configuration  
✅ Laravel Sanctum for API authentication  
✅ React frontend with Tailwind CSS  
✅ Brand identity (colors, typography)  
✅ Responsive navigation with mobile menu  
✅ Shopping cart context  
✅ Authentication context  
✅ API service layer with Axios  
✅ Reusable component library  
✅ All main routes configured  
✅ Production-ready build system  

---

## 🚀 Coming Next (Phase 1B)

- Laravel Models with relationships
- API Controllers
- Authentication endpoints (login, register)
- API Resources for JSON responses
- Form Request validation
- Frontend auth UI (login/register forms)
- API testing

---

## 📂 Project Structure

```
L-oven/
├── backend/              # Laravel 13.x API
│   ├── app/
│   ├── config/
│   ├── database/
│   │   └── migrations/
│   ├── routes/
│   └── .env
│
├── frontend/             # React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── .env
│   └── package.json
│
├── database/             # Database files
│   ├── migrations/
│   └── schema.sql
│
└── Documentation/
    ├── IMPLEMENTATION_ASSESSMENT.md
    ├── PHASE_1A_COMPLETE.md
    └── PROJECT_STRUCTURE.md
```

---

## 🔧 Configuration

### Backend Environment (.env)
```env
APP_NAME="L'Oven Coffee API"
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=loven_db
DB_USERNAME=root
DB_PASSWORD=1234

FRONTEND_URL=http://localhost:5173
SANCTUM_STATEFUL_DOMAINS=localhost:5173
```

### Frontend Environment (.env)
```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=L'Oven Coffee
VITE_APP_TAGLINE=Good Coffee. Great Moments.
```

---

## 🧪 Testing

### Backend
```bash
cd backend
php artisan test
```

### Frontend
```bash
cd frontend
npm run build  # Production build test
npm run dev    # Development server
```

---

## 📱 Features Roadmap

### Phase 2: Products & Menu
- Product catalog
- Category filtering
- Product details
- Search functionality

### Phase 3: Cart & Checkout
- Shopping cart
- Checkout flow
- Order creation
- Guest checkout

### Phase 4: Mobile Money Payment
- MTN Mobile Money integration
- Airtel Money integration
- Payment verification
- Webhook handling

### Phase 5: Order Management
- Customer order tracking
- Admin order management
- Order status updates
- Order history

### Phase 6: Inventory & Sales
- Stock management
- Low stock alerts
- Sales reporting
- Dashboard analytics

### Phase 7: Promotions
- Discount codes
- Coupon system
- Featured offers

### Phase 8: Production
- Performance optimization
- Security hardening
- Redis caching
- Queue setup
- Production deployment

---

## 👥 Team

- **Branch**: newton (developer branch)
- **Main Branch**: develop
- **Production**: main

---

## 📄 License

Proprietary - L'Oven Coffee

---

## 📞 Support

For development questions, check documentation in:
- `/IMPLEMENTATION_ASSESSMENT.md`
- `/PHASE_1A_COMPLETE.md`
- `/PROJECT_STRUCTURE.md`

---

**Built with ☕ for L'Oven Coffee**
