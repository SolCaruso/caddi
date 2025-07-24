# Stripe Checkout Setup

## Overview
This e-commerce site uses Stripe Checkout for secure payment processing. Stripe handles:
- ✅ Payment processing
- ✅ Shipping address collection
- ✅ Tax calculation
- ✅ Email receipts to customers
- ✅ Order management
- ✅ Fraud protection

## Setup Instructions

### 1. Create a Stripe Account
1. Go to [stripe.com](https://stripe.com) and create an account
2. Complete your business verification
3. Get your API keys from the Stripe Dashboard

### 2. Environment Variables
Create a `.env.local` file in your project root with:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# App Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Get Your Stripe Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to Developers → API Keys
3. Copy your publishable key and secret key
4. Replace the placeholder values in `.env.local`

### 4. Test the Integration
1. Start your development server: `npm run dev`
2. Add items to cart
3. Click the cart icon to navigate to the cart page
4. Click "Proceed to Checkout"
5. You'll be redirected to Stripe's hosted checkout page

## Features

### Cart Management
- ✅ Add items to cart (with variants)
- ✅ Remove items from cart
- ✅ Update quantities
- ✅ Cart page with item count badge
- ✅ Persistent cart state

### Checkout Flow
- ✅ Stripe Checkout integration
- ✅ Shipping address collection
- ✅ Free shipping (configurable)
- ✅ Success/cancel page handling
- ✅ Email receipts (handled by Stripe)

### Product Variants
- ✅ Color and size selection
- ✅ Variant-specific images
- ✅ Variant-specific pricing
- ✅ Proper cart item identification

## Customization

### Shipping Options
Edit the shipping options in `/src/app/api/create-checkout-session/route.ts`:

```typescript
shipping_options: [
  {
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: {
        amount: 0, // Free shipping
        currency: 'usd',
      },
      display_name: 'Free shipping',
      // ... other options
    },
  },
],
```

### Allowed Countries
Update the allowed countries for shipping:

```typescript
shipping_address_collection: {
  allowed_countries: ['US', 'CA'], // Add more countries
},
```

### Success/Cancel URLs
Update the redirect URLs in the API route:

```typescript
success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop`,
```

## Production Deployment

### 1. Update Environment Variables
- Use production Stripe keys (remove `_test` suffix)
- Update `NEXT_PUBLIC_BASE_URL` to your production domain

### 2. Webhook Setup (Optional)
For order fulfillment, set up Stripe webhooks:
1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events: `checkout.session.completed`
4. Create webhook handler in your app

### 3. Domain Verification
- Add your domain to Stripe Dashboard
- Verify domain for enhanced security

## Security Notes
- ✅ Secret key is server-side only
- ✅ Publishable key is safe for client-side
- ✅ Stripe handles all sensitive payment data
- ✅ No credit card data stored on your server

## Support
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Checkout Guide](https://stripe.com/docs/payments/checkout)
- [Stripe Support](https://support.stripe.com) 