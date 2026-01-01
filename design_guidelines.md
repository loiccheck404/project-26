# Design Guidelines: Forge & Formula E-Commerce Platform

## Design Approach
**Reference-Based E-Commerce Approach** - Drawing from high-end e-commerce platforms (Shopify, premium supplement sites) with a focus on trust, professionalism, and product showcasing. Dual-brand architecture requires sophisticated visual separation while maintaining cohesive user experience.

## Brand Architecture

### Forge (Performance & Injectables)
- **Colors**: Charcoal (#2D2D2D), Steel Gray (#6B7280), Deep Crimson (#991B1B)
- **Personality**: Bold, powerful, industrial, premium
- **Visual Treatment**: Sharp edges, strong contrasts, metallic accents

### Formula (Oral & Lifestyle)
- **Colors**: White (#FFFFFF), Slate (#475569), Electric Blue (#3B82F6)
- **Personality**: Clean, scientific, accessible, modern
- **Visual Treatment**: Smooth edges, bright highlights, clinical precision

## Typography System
- **Headings**: Bold industrial sans-serif (Inter Bold/Black, Montserrat Bold, or similar)
  - H1: 3xl to 5xl (48-64px desktop)
  - H2: 2xl to 4xl (36-48px desktop)
  - H3: xl to 2xl (24-32px desktop)
- **Body**: Clean modern sans-serif (Inter Regular, system-ui)
  - Base: 16px (text-base)
  - Small: 14px (text-sm)
  - Large: 18px (text-lg)

## Spacing System
Use Tailwind units: **2, 4, 6, 8, 12, 16, 20, 24** for consistent rhythm
- Component padding: p-4 to p-8
- Section spacing: py-12 to py-24
- Element gaps: gap-4 to gap-8

## Core Components

### Navigation
- Sticky header with brand logo switcher (Forge/Formula toggle)
- Primary navigation: Shop (mega-menu), About, Contact, Track Order
- Secondary: Account, Cart icon with badge
- Mobile: Hamburger menu with full-screen overlay

### Product Cards
- High-quality product images (square ratio, 1:1)
- Product name, category badge, price prominently displayed
- Stock indicator (In Stock/Low Stock/Out of Stock)
- Quick add-to-cart button
- Hover: Subtle lift effect, secondary image reveal

### Cart Drawer
- Slide-in from right
- Product thumbnails with quantity controls
- Real-time total calculations
- Clear progress to checkout CTA
- Empty state with category suggestions

### Trust Elements
- Badge icons: Free Shipping, Quality Guaranteed, 24/7 Support, Secure Checkout
- Customer review stars and counts
- Security certifications (payment badges)
- Testimonial cards with customer photos

## Homepage Layout

### Hero Section (Full viewport)
**Images**: Large hero image showcasing both Forge and Formula products in premium setting - dramatic lighting, professional product photography against clean background. Overlay both brand products with clear visual separation.
- Headline: "Premium Performance. Scientific Precision."
- Dual CTAs: "Shop Forge" (crimson) + "Shop Formula" (blue)
- Buttons with blurred backgrounds (backdrop-blur-sm bg-black/30)

### Category Grid (Below fold)
6 main categories with icon + image cards in 2-column mobile, 3-column tablet, 6-column desktop grid
Icons: Use Heroicons for category representations

### Featured Products Carousel
Horizontal scroll of 8-12 featured items
Auto-play with manual controls
Product cards with hover effects

### Trust Section
4-column grid of trust badges with icons and short descriptions

### Testimonials
3-column grid (1 on mobile) with customer photos, quotes, star ratings

### Footer
Multi-column layout:
- Brand info + newsletter signup
- Shop links (all categories)
- Support (FAQ, Shipping, How to Pay, Track Order)
- Legal (Terms, Privacy, Refund Policy)
- Social icons + payment badges

## Product Page Structure
- Image gallery (main + 4 thumbnails, lightbox on click)
- Product details sidebar: Name, price, category, stock, description
- Quantity selector + Add to Cart (prominent CTA)
- Tabs: Description, How to Use, Reviews
- Related Products grid below

## Images Strategy
- **Hero**: 1 large dual-brand hero image
- **Category cards**: Representative product images for each category
- **Product images**: Professional product photography on white/gray background
- **Testimonials**: Customer headshots (placeholder avatars)
- **About page**: Lab/facility images, team photos
- All images optimized, lazy-loaded, with alt text

## Form Styling
- Input fields: border-2, rounded-md, focus:ring-2
- Labels: text-sm font-medium above inputs
- Buttons: Full-width on mobile, auto-width desktop
- Validation: Inline error messages in red
- Checkout: Multi-step with progress indicator

## Animations
Minimal, purposeful only:
- Page transitions: fade-in
- Product cards: subtle hover lift
- Cart badge: bounce on add
- Loading states: spinner only
No scroll-triggered or excessive motion

## Responsive Breakpoints
- Mobile: base (< 640px)
- Tablet: md (640px+)
- Desktop: lg (1024px+)
- Wide: xl (1280px+)

All components stack to single column on mobile, multi-column on desktop. Product grids: 1 → 2 → 3 → 4 columns across breakpoints.