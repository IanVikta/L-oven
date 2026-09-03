# L'Oven Coffee & Bakery — Currency Architecture & Migration Roadmap

## Phase 1: Preparation & Safety (Current State)

### Current Architecture
- **Database Baseline**: The database currently holds USD development/template figures (`3.75`, `4.25`, `4.50`, `4.95`, `8.95`).
- **Client Pricing Status**: Final client menu prices for the Kampala flagship store have not yet been formally confirmed by the business.
- **Tax Policy**: Active tax calculation has been disabled (`tax_amount = 0.00`) until official tax / VAT requirements are provided.
- **Fulfilment Fees**: Base development delivery fee is currently set at `3.00`.
- **Coupons & Loyalty**: Rewards and coupon discounts currently reflect development template values (`$5.00` fixed discount, `$5.00` minimum order).
- **Safety Precaution**: The system does **not** assume `4.50` translates to `UGX 4,500` or apply arbitrary multiplier heuristics (`×1000`).

### Central Currency Utility
- [`src/utils/currency.js`](file:///c:/xampp/htdocs/AdvancedPHP/OVEN/L-oven/frontend/src/utils/currency.js) serves as the single source of truth for customer-facing monetary formatting.
- `PRICING_FINALIZED = false`: Customer-facing presentation safely outputs `"Price to be confirmed"` to avoid exposing unapproved development prices to end users.
- Business logic and backend calculations remain uncoupled from presentation formatting.

---

## Phase 2: Production UGX Migration (Target State)

When approved menu pricing is officially received from L'Oven, the application will be updated across all layers in a single coordinated migration:

### 1. Database & Seeders
- `products.price`: Seeded with exact integer UGX amounts (e.g. `16000.00`).
- `product_variants.price_modifier`: Real UGX modifiers (e.g. `2000.00`).
- `option_items.price_modifier`: Real UGX modifiers (e.g. `1500.00`, `2000.00`).
- `rewards` & `coupons`: Aligned with Ugandan purchasing power (e.g. minimum order `25,000 UGX`).

### 2. Ordering & Payment Pipeline
- `OrderController`: Delivery fee updated to standard local rate (e.g. `5,000 UGX`), VAT configured if required.
- `MobileMoneyService`: MTN & Airtel Mobile Money transactions initialized directly with real UGX order totals.
- `AdminReportController`: Revenue analytics calculated and reported in UGX.

### 3. Frontend Activation
- Set `PRICING_FINALIZED = true` in [`src/utils/currency.js`](file:///c:/xampp/htdocs/AdvancedPHP/OVEN/L-oven/frontend/src/utils/currency.js).
- All customer touchpoints (Featured Menu, Menu catalog, Product modal, Cart drawer, Checkout review, Live Order tracker, and Receipts) will automatically render clean, formatted Ugandan Shilling amounts (e.g. `UGX 16,000`).
