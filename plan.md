You are a senior full-stack software architect, UI/UX designer, React engineer, Laravel engineer, database architect, security engineer, and DevOps engineer.

I want you to build a complete, production-ready website and e-commerce ordering platform for a café called:

L’OVEN COFFEE

The attached/reference logo is the official brand identity for the project. USE THE LOGO AS THE PRIMARY VISUAL BRAND REFERENCE.

IMPORTANT:
Do not treat this as a generic restaurant template.

This should feel like a professionally designed, premium modern coffee/café brand with a strong visual identity, excellent mobile experience, extremely fast performance, and a simple but powerful ordering system.

==================================================
1. BRAND IDENTITY
==================================================

The official brand is:

Cafe L’OVEN

The logo uses the following primary visual direction:

- Dark chocolate brown
- Bright warm orange
- Cream/off-white
- White as a supporting neutral

Use the logo and these colors consistently throughout the entire application.

PRIMARY BRAND COLOR:
Dark Chocolate Brown
Approximate reference: #2B1B12

SECONDARY / ACCENT:
Warm Bright Orange
Approximate reference: #F28C13

BACKGROUND / LIGHT:
Warm Cream
Approximate reference: #FFF4E6

SUPPORTING:
White
#FFFFFF

Do NOT introduce random colors.

The visual identity should communicate:

- Coffee
- Warmth
- Premium quality
- Comfort
- Energy
- Modern African café culture
- Friendly hospitality
- Contemporary e-commerce

The design must feel premium without becoming overly complicated.

==================================================
2. DESIGN DIRECTION
==================================================

Create a highly polished modern café website.

Design characteristics:

- Premium
- Warm
- Elegant
- Modern
- Clean
- Minimal but visually rich
- Strong typography
- High-quality food/product photography
- Smooth animations
- Excellent spacing
- Strong visual hierarchy
- Mobile-first
- Conversion-focused

Avoid:

- Generic Bootstrap-looking layouts
- Overcrowded pages
- Excessive animations
- Excessive gradients
- Neon colors
- Cheap-looking card designs
- Excessive rounded corners
- Template-like UI
- Unnecessary dashboards on the customer side

The website should look like a real established café brand.

==================================================
3. TECHNOLOGY STACK
==================================================

Use the following architecture unless the existing project already has an equivalent production-ready implementation.

FRONTEND:
- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Framer Motion where appropriate

BACKEND:
- Laravel
- PHP
- REST API architecture
- Laravel Sanctum for authentication where required

DATABASE:
- MySQL

CACHE / QUEUES:
- Redis

SERVER:
- Linux VPS compatible
- Nginx
- PHP-FPM
- MySQL
- Redis

The architecture must be deployment-friendly for an all-in-one VPS environment such as Hostinger VPS.

IMPORTANT:

Keep frontend and backend logically separated.

The frontend must communicate with Laravel through REST APIs.

Do NOT put business logic inside React components.

Do NOT put important business logic directly inside controllers.

Use:

Controllers
→ Form Requests
→ Services
→ Models
→ API Resources
→ Database

where appropriate.

==================================================
4. BEFORE WRITING CODE
==================================================

FIRST inspect the existing project/repository.

Determine:

- Existing frontend structure
- Existing backend structure
- Existing dependencies
- Existing database configuration
- Existing routes
- Existing authentication
- Existing components
- Existing styling system
- Existing environment configuration

DO NOT destroy an existing working implementation unnecessarily.

If the repository is empty, establish the architecture cleanly.

Before implementing each major phase:

1. Inspect existing implementation.
2. Identify what already exists.
3. Determine what needs to be added.
4. Implement incrementally.
5. Test the implementation.
6. Fix errors.
7. Continue to the next phase.

Do not blindly rewrite the entire application.

==================================================
5. CUSTOMER WEBSITE
==================================================

Build the public-facing L’Oven Coffee website.

Main navigation:

HOME
MENU
ABOUT
OFFERS
CONTACT

Also include:

CART
ACCOUNT / MY ORDERS

The navigation should be responsive.

Desktop:
- Elegant horizontal navigation
- Strong CTA such as "Order Now"

Mobile:
- Clean hamburger menu
- Sticky mobile ordering/cart experience
- Easy thumb navigation

==================================================
6. HOMEPAGE
==================================================

Create a visually impressive homepage.

SECTION 1 — HERO

Large premium café hero section.

Content direction:

"Good Coffee. Great Moments."

or another strong café-oriented headline.

Supporting text should communicate that L’Oven offers quality coffee, drinks, snacks and treats.

Primary CTA:

"Order Now"

Secondary CTA:

"Explore Menu"

Use high-quality café/coffee imagery.

The hero should immediately communicate what L’Oven Coffee is.

Do not make the hero excessively tall on mobile.

==================================================
7. FEATURED PRODUCTS
==================================================

Create a Featured Products section.

Display products such as:

- Coffee
- Latte
- Cappuccino
- Iced Coffee
- Ice Cream
- Cocktails
- Mocktails
- Chicken
- Skewers
- Snacks

Products must come dynamically from the backend.

Do NOT hard-code products into the frontend.

Each product should support:

- Name
- Description
- Price
- Image
- Category
- Availability
- Featured status
- Stock status
- Options/add-ons where applicable

==================================================
8. MENU PAGE
==================================================

Create a complete digital café menu.

Categories should include at minimum:

Coffee
Lattes
Iced Coffee
Ice Cream
Cocktails
Mocktails
Snacks
Chicken
Skewers

The admin must be able to create additional categories.

Menu interface should include:

- Category filtering
- Search
- Product cards
- Product images
- Price
- Availability
- Add to cart
- Product details

Make the menu extremely easy to browse on mobile.

==================================================
9. PRODUCT DETAILS
==================================================

When a customer selects a product, show:

- Large product image
- Product name
- Description
- Price
- Availability
- Quantity selector
- Options
- Add-ons
- Special instructions
- Add to Cart

Example:

Latte
UGX 8,000

Size:
Small
Medium
Large

Add-ons:
Extra Shot
Vanilla
Caramel

Special instructions:
"Less sugar"

The product configuration should be flexible enough for future products.

==================================================
10. SHOPPING CART
==================================================

Build a complete shopping cart.

Cart must show:

- Product
- Quantity
- Unit price
- Selected options
- Add-ons
- Subtotal
- Total

Allow:

- Increase quantity
- Decrease quantity
- Remove item
- Clear cart
- Continue shopping
- Proceed to checkout

The cart should persist appropriately so customers do not easily lose their order.

==================================================
11. CHECKOUT
==================================================

Create a simple, fast checkout experience.

DO NOT make checkout unnecessarily complicated.

Customer information:

- Full name
- Phone number
- Email (optional if appropriate)
- Order notes

Order information:

- Selected products
- Quantities
- Add-ons
- Subtotal
- Total

Payment method:

MOBILE MONEY ONLY.

IMPORTANT:

DO NOT ADD:

- Visa
- Mastercard
- American Express
- PayPal
- Stripe card checkout
- Any card payment interface

The payment architecture must be designed specifically around mobile money.

Support the architecture for:

- MTN Mobile Money
- Airtel Money

The exact payment provider/API credentials will be configured later.

Never invent API credentials.

==================================================
12. MOBILE MONEY PAYMENT FLOW
==================================================

Implement the payment architecture properly.

Expected flow:

CUSTOMER
↓
CART
↓
CHECKOUT
↓
SELECT MOBILE MONEY
↓
ENTER PHONE NUMBER
↓
PAYMENT REQUEST
↓
MOBILE MONEY PROVIDER
↓
CUSTOMER APPROVES PAYMENT
↓
PAYMENT CALLBACK / WEBHOOK
↓
LARAVEL VERIFIES PAYMENT
↓
ORDER MARKED PAID
↓
CUSTOMER RECEIVES CONFIRMATION
↓
ADMIN SEES ORDER

Payment status should support:

PENDING
PROCESSING
SUCCESS
FAILED
CANCELLED
REFUNDED

IMPORTANT SECURITY REQUIREMENTS:

- Never trust frontend payment status.
- Payment confirmation must happen server-side.
- Verify provider callbacks/webhooks.
- Prevent duplicate payment processing.
- Store transaction/reference IDs.
- Use idempotent payment handling.
- Log payment events.
- Never expose secret API credentials to React.

Build the payment system so a provider can be added/configured without rewriting the entire checkout.

==================================================
13. ORDER SYSTEM
==================================================

Orders must have clear statuses.

Required statuses:

NEW
PROCESSING
COMPLETED
CANCELLED

Payment status is separate from order status.

Example:

Order Status:
PROCESSING

Payment Status:
PAID

Customers should be able to view:

- Order number
- Date
- Products
- Quantities
- Total
- Payment status
- Order status

==================================================
14. CUSTOMER ACCOUNTS
==================================================

Support both:

GUEST CHECKOUT

and

CUSTOMER ACCOUNTS.

Customers should be able to create an account and view:

- Profile
- Previous orders
- Order details
- Current order status

Do not force customers to create an account before ordering.

Guest checkout should remain available.

==================================================
15. ADMIN PANEL
==================================================

Build a completely separate professional admin interface.

Admin navigation:

Dashboard
Orders
Products
Categories
Inventory
Customers
Payments
Promotions
Sales
Reports
Settings

The admin UI should be functional and clean.

==================================================
16. ADMIN DASHBOARD
==================================================

Dashboard should display:

- Today's orders
- Today's sales
- Pending orders
- Processing orders
- Completed orders
- Low-stock products
- Popular products
- Recent orders

Include useful visual statistics.

Avoid meaningless decorative charts.

==================================================
17. ORDER MANAGEMENT
==================================================

Admin must be able to:

- View orders
- Search orders
- Filter orders
- Open order details
- View customer information
- View purchased products
- View payment information
- Mark order as Processing
- Mark order as Completed
- Cancel order where appropriate

IMPORTANT:

There is NO:

- Kitchen dashboard
- Delivery dashboard
- Driver dashboard

This system is intentionally simple.

The café/admin receives the order and processes it.

==================================================
18. PRODUCT MANAGEMENT
==================================================

Admin can:

- Create products
- Edit products
- Delete products
- Enable/disable products
- Set prices
- Upload images
- Assign categories
- Mark products as featured
- Configure stock
- Configure options
- Configure add-ons

Product fields:

- Name
- Slug
- Description
- Price
- Category
- Image
- Gallery
- SKU
- Stock quantity
- Availability
- Featured
- Options
- Add-ons

==================================================
19. INVENTORY MANAGEMENT
==================================================

Build a lightweight inventory system.

Admin should see:

- Current stock
- Low stock
- Out of stock
- Stock in
- Stock out
- Stock adjustment

Track inventory movement.

Example:

Latte Syrup
Stock: 15

Chicken Skewers
Stock: 42

Ice Cream
Stock: 8

Create low-stock alerts.

The system should be extensible enough for more advanced inventory management later.

==================================================
20. SALES MANAGEMENT
==================================================

Create sales reporting.

Reports:

- Today's sales
- Daily sales
- Weekly sales
- Monthly sales
- Product sales
- Category sales
- Best-selling products
- Order count
- Average order value

Use useful charts and tables.

Allow filtering by date.

==================================================
21. CUSTOMER MANAGEMENT
==================================================

Admin can:

- View customers
- Search customers
- View customer profile
- View order history
- View total spending
- View number of orders

Do not expose unnecessary sensitive information.

==================================================
22. PROMOTIONS
==================================================

Create a basic promotions system.

Admin can create:

- Discount codes
- Product discounts
- Category discounts
- Featured offers

Support:

- Percentage discount
- Fixed amount discount
- Start date
- End date
- Usage limits
- Active/inactive

Make the promotion engine extensible.

==================================================
23. NOTIFICATIONS
==================================================

Create a notification architecture.

Possible notifications:

- Order received
- Payment successful
- Payment failed
- Order processing
- Order completed

The system should be structured so future integrations can include:

- SMS
- WhatsApp
- Email

Do not hard-code external credentials.

==================================================
24. DATABASE DESIGN
==================================================

Design a normalized MySQL database.

Core tables should include approximately:

users
customers
categories
products
product_images
product_options
product_addons
orders
order_items
order_item_options
payments
payment_transactions
inventory
inventory_movements
promotions
promotion_products
promotion_categories
notifications
settings

Use:

- Foreign keys
- Proper indexes
- Unique constraints
- Timestamps
- Soft deletes where appropriate

Orders and payment records must preserve historical information.

Do not allow deleting important historical order/payment records in a way that destroys accounting history.

==================================================
25. API ARCHITECTURE
==================================================

Create clean REST APIs.

Example:

GET /api/products
GET /api/products/{id}
GET /api/categories

POST /api/cart

POST /api/orders

POST /api/payments/mobile-money/initiate

POST /api/payments/mobile-money/callback

GET /api/orders/{id}

Admin:

GET /api/admin/orders
PATCH /api/admin/orders/{id}/status

GET /api/admin/products
POST /api/admin/products
PUT /api/admin/products/{id}
DELETE /api/admin/products/{id}

GET /api/admin/inventory
GET /api/admin/reports

Use proper:

- HTTP status codes
- Validation
- API Resources
- Error responses
- Authentication
- Authorization

==================================================
26. SECURITY
==================================================

Security is a major requirement.

Implement:

- HTTPS-ready architecture
- Laravel Sanctum
- Role-based access control
- Strong validation
- API rate limiting
- Secure password hashing
- Secure file uploads
- Input sanitization
- Authorization checks
- Payment webhook verification
- CSRF protection where applicable
- SQL injection protection through Eloquent/query builder
- Secure environment variables
- No secrets in frontend code
- Secure CORS configuration
- Audit logging for sensitive admin actions

Roles should support at least:

ADMIN
STAFF
CUSTOMER

Only authorized staff/admin users can access administrative functions.

==================================================
27. PERFORMANCE
==================================================

The website must be VERY FAST.

Prioritize:

- Vite production builds
- Code splitting
- Lazy loading
- Optimized images
- WebP/AVIF
- Responsive image sizes
- Browser caching
- API caching where appropriate
- Database indexing
- Laravel query optimization
- Eager loading
- Pagination
- Redis caching
- Queue jobs
- Minimal JavaScript
- Minimal unnecessary dependencies

Do not load huge images unnecessarily.

The homepage should feel extremely fast even on mobile networks.

==================================================
28. RESPONSIVE DESIGN
==================================================

The site must work beautifully on:

- Mobile phones
- Tablets
- Laptops
- Desktop monitors

Prioritize mobile because many customers will order using phones.

Pay special attention to:

- Product cards
- Menu navigation
- Cart
- Checkout
- Mobile Money payment
- Buttons
- Forms
- Image sizing
- Sticky elements

Buttons must be large enough for touch interaction.

==================================================
29. ANIMATIONS
==================================================

Use subtle animations.

Examples:

- Hero entrance
- Product hover
- Add-to-cart animation
- Cart count animation
- Page transitions
- Modal transitions
- Loading states

Animations must NEVER make the website feel slow.

Respect prefers-reduced-motion where practical.

==================================================
30. CUSTOMER EXPERIENCE
==================================================

The customer journey should be:

HOME
↓
MENU
↓
PRODUCT
↓
ADD TO CART
↓
CHECKOUT
↓
MOBILE MONEY PAYMENT
↓
ORDER CONFIRMED
↓
ORDER PROCESSING
↓
ORDER COMPLETED

The process should be obvious to a first-time customer.

Minimize unnecessary clicks.

==================================================
31. ORDER CONFIRMATION
==================================================

After successful payment:

Show a professional confirmation page.

Example:

ORDER CONFIRMED

Thank you for ordering from L’Oven Coffee.

Order #LOV-000123

Payment:
PAID

Status:
PROCESSING

Show:

- Order summary
- Total
- Order number
- Date/time
- Customer information

Allow customer to view order status.

==================================================
32. BRAND COMPONENT SYSTEM
==================================================

Create reusable design components.

Examples:

Button
ProductCard
CategoryCard
Navbar
Footer
Modal
Drawer
Input
Select
Badge
Price
CartItem
OrderCard
OrderStatusBadge
LoadingState
EmptyState
ErrorState
Toast
Pagination
Table
StatCard

Use the L’Oven color system consistently.

==================================================
33. TYPOGRAPHY
==================================================

Use typography that feels premium and modern.

Suggested direction:

Headings:
Elegant display font or strong modern font

Body:
Clean readable sans-serif

Typography should create hierarchy.

Do not use too many fonts.

Maximum:

- One display font
- One body font

==================================================
34. IMAGERY
==================================================

Use high-quality images that match the café brand.

Visual themes:

- Fresh coffee
- Espresso
- Latte art
- Cappuccino
- Iced coffee
- Ice cream
- Cocktails
- Mocktails
- Chicken
- Skewers
- Café atmosphere
- Warm lighting
- Premium food photography

Images should feel cohesive.

Avoid random stock imagery that clashes with the brand.

==================================================
35. SEO
==================================================

Implement proper SEO.

Include:

- Page titles
- Meta descriptions
- Open Graph metadata
- Proper headings
- Semantic HTML
- Image alt text
- Canonical URLs
- Sitemap
- Robots configuration

Structure pages so they can rank for relevant searches such as:

L’Oven Coffee
Coffee in Uganda
Cafe
Coffee shop
Coffee delivery/order
Ice cream
Cocktails
Mocktails
Cafe menu

==================================================
36. ACCESSIBILITY
==================================================

Follow good accessibility practices.

Include:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Accessible forms
- Proper labels
- Alt text
- ARIA only where necessary
- Good contrast
- Screen-reader-friendly status messages

==================================================
37. ADMIN UX
==================================================

Admin interface should prioritize productivity.

Use:

- Clean sidebar
- Top navigation
- Breadcrumbs
- Tables
- Filters
- Search
- Modals/drawers where useful
- Confirmation dialogs
- Toast notifications

Admin should be able to process an order quickly.

Example:

NEW ORDER

Order #LOV-000123

2 × Cappuccino
1 × Chocolate Ice Cream
1 × Chicken Skewer

Total:
UGX 32,000

Payment:
MTN Mobile Money — PAID

Actions:

[MARK PROCESSING]

[MARK COMPLETED]

==================================================
38. HOSTING ARCHITECTURE
==================================================

The application must be designed to run on a single VPS initially.

Target architecture:

INTERNET
↓
DOMAIN
↓
CLOUDFLARE
↓
HOSTINGER VPS
↓
NGINX
├── React/Vite frontend
├── Laravel API
├── MySQL
└── Redis

Use queues for:

- Notifications
- Background processing
- Non-critical tasks

Use scheduled Laravel jobs where appropriate.

The system must remain portable.

Do not build anything that makes the application permanently dependent on one hosting provider.

==================================================
39. ENVIRONMENT CONFIGURATION
==================================================

Use environment variables.

Examples:

APP_URL
API_URL
DB_HOST
DB_DATABASE
DB_USERNAME
DB_PASSWORD
REDIS_HOST

Payment:

MTN_MOMO_API_URL
MTN_MOMO_API_KEY
MTN_MOMO_SECRET
AIRTEL_MONEY_API_URL
AIRTEL_MONEY_CLIENT_ID
AIRTEL_MONEY_CLIENT_SECRET

These are placeholders only.

DO NOT invent credentials.

==================================================
40. BACKUP AND RECOVERY
==================================================

Prepare the system for:

- Database backups
- Uploaded image backups
- Configuration backup
- Log management

Important customer/order/payment data must be recoverable.

==================================================
41. ERROR HANDLING
==================================================

Create professional error states.

Examples:

Payment failed:
"Your payment could not be completed. Please try again."

Product unavailable:
"This item is currently unavailable."

Network error:
"We couldn't connect to L’Oven Coffee. Please check your connection and try again."

Never expose:

- SQL errors
- Stack traces
- API secrets
- Internal server details

to customers.

==================================================
42. LOADING STATES
==================================================

Every important async operation needs a loading state.

Examples:

- Loading products
- Adding to cart
- Checkout
- Payment processing
- Loading orders
- Admin tables
- Reports

Avoid blank screens.

==================================================
43. EMPTY STATES
==================================================

Create beautiful empty states.

Examples:

Cart empty:

"Your cart is waiting for something delicious."

CTA:
"Explore Menu"

No orders:

"You haven't placed an order yet."

CTA:
"Start Ordering"

==================================================
44. MOBILE EXPERIENCE
==================================================

This is extremely important.

The mobile version should feel like a polished mobile ordering application.

Consider:

- Sticky cart button
- Sticky checkout summary
- Large product images
- Easy quantity controls
- Large mobile-money payment button
- Minimal form fields
- Smooth navigation

Do not simply shrink the desktop website.

Design mobile intentionally.

==================================================
45. CODE QUALITY
==================================================

Follow professional software engineering practices.

Frontend:

- Reusable components
- Hooks
- Services
- API abstraction
- State management appropriate to project complexity
- No unnecessary duplication

Backend:

- Controllers remain thin
- Services contain business logic
- Form Requests handle validation
- Policies handle authorization
- API Resources format responses
- Events/listeners where useful
- Jobs for background processing

Use meaningful names.

Avoid:

- Giant components
- Giant controllers
- Duplicate business logic
- Hard-coded product data
- Hard-coded payment responses
- Hard-coded admin statistics

==================================================
46. TESTING
==================================================

Create tests for critical functionality.

Backend tests should cover:

- Authentication
- Product retrieval
- Cart/order creation
- Order totals
- Inventory changes
- Payment initiation
- Payment callback
- Duplicate payment prevention
- Order status changes
- Authorization

Frontend should at minimum be manually verified through production build and browser testing.

Run:

Laravel tests

and:

npm run build

Fix all errors before considering a phase complete.

==================================================
47. DEVELOPMENT PHASES
==================================================

Do NOT attempt to create everything blindly in one pass.

Build in phases.

PHASE 1:
Project foundation
- Architecture
- Database
- Laravel API
- React/Vite
- Tailwind
- Authentication
- Admin foundation
- Branding

PHASE 2:
Products and menu
- Categories
- Products
- Images
- Options
- Add-ons
- Customer menu

PHASE 3:
Cart and checkout
- Cart
- Customer information
- Checkout
- Order creation

PHASE 4:
Mobile Money
- Payment abstraction
- MTN Mobile Money
- Airtel Money architecture
- Callback/webhook handling
- Payment verification

PHASE 5:
Order management
- Customer order tracking
- Admin order management
- Processing
- Completed

PHASE 6:
Inventory and sales
- Stock
- Inventory movements
- Low stock
- Sales
- Reports

PHASE 7:
Promotions and customer management
- Customers
- Discounts
- Offers
- Reporting

PHASE 8:
Performance, security and production
- SEO
- Security hardening
- Caching
- Redis
- Queues
- Backups
- Logging
- Production configuration
- Final testing

==================================================
48. IMPORTANT IMPLEMENTATION RULE
==================================================

Do not proceed to another major phase if the current phase contains obvious errors.

After each phase:

1. Run backend tests.
2. Run frontend production build.
3. Inspect the application.
4. Fix errors.
5. Verify API endpoints.
6. Verify database migrations.
7. Verify responsive UI.
8. Document what was completed.

==================================================
49. FINAL QUALITY STANDARD
==================================================

The finished application should NOT look like an AI-generated template.

It should look like a real commercial product developed for a serious café.

The customer should immediately understand:

WHAT L’OVEN SELLS
HOW TO ORDER
HOW MUCH PRODUCTS COST
HOW TO PAY
WHAT HAPPENS AFTER ORDERING

The administrator should immediately understand:

WHAT ORDERS ARE NEW
WHICH ORDERS ARE PROCESSING
WHICH ORDERS ARE COMPLETED
HOW MUCH HAS BEEN SOLD
WHICH PRODUCTS ARE LOW IN STOCK
WHICH PRODUCTS SELL THE MOST

==================================================
50. FINAL INSTRUCTION
==================================================

Start by inspecting the existing repository and attached L’Oven Coffee brand reference.

Do NOT immediately generate a huge amount of code.

First provide a concise implementation assessment:

- Current project state
- Existing architecture
- What can be reused
- What needs to be built
- Recommended implementation order
- Any blockers

Then begin PHASE 1.

As you implement, keep the architecture clean, scalable, secure, fast, and portable.

Most importantly:

BUILD THE PRODUCT, NOT JUST THE UI.

The frontend, backend, database, authentication, ordering, payments, inventory, administration, and reporting must work together as one coherent production system.

Use the attached L’Oven Coffee logo as the visual source of truth for branding.