# Design Guidelines: Forge & Formula - Premium Medical E-Commerce

## Design Approach
**Premium Medical Clinical Aesthetic** - Drawing inspiration from high-end pharmaceutical and clinical supplement retailers. The design emphasizes professionalism, trust, and scientific precision with a sophisticated dark theme.

## Color Palette

### Primary Theme (Dark Clinical)
- **Background**: Deep Charcoal (#0A0A0B) - Near black, clinical, premium
- **Card/Surface**: Charcoal (#121214) - Slightly elevated surfaces
- **Borders**: Dark Gray (#1E1E22) - Subtle definition
- **Text Primary**: Off-White (#F5F5F7) - High contrast, readable
- **Text Secondary**: Gray (#A1A1AA) - Supporting information
- **Text Muted**: Dark Gray (#71717A) - Tertiary info

### Accent Colors
- **Gold/Amber**: (#D4AF37) - Premium accent for CTAs, highlights, prices
- **Medical Blue**: (#3B82F6) - Trust, clinical, links
- **Success Green**: (#22C55E) - In stock, positive
- **Warning Amber**: (#F59E0B) - Low stock
- **Error Red**: (#EF4444) - Out of stock, errors

## Typography System

### Font Stack
- **Primary**: Inter - Clean, modern, medical-grade clarity
- **Headings**: Montserrat Bold - Strong, professional presence

### Type Scale
- **H1**: 3xl-5xl (48-64px) - Bold, gold accent optional
- **H2**: 2xl-4xl (36-48px) - Section headers
- **H3**: xl-2xl (24-32px) - Subsection headers
- **Body**: 16px (base) - Primary content
- **Small**: 14px - Labels, metadata
- **Caption**: 12px - Fine print, badges

## Spacing System
Tailwind units for consistent rhythm: 2, 4, 6, 8, 12, 16, 20, 24
- **Tight**: gap-2 to gap-4 (dense info)
- **Normal**: gap-4 to gap-8 (standard spacing)
- **Spacious**: gap-8 to gap-12 (section separation)
- **Section padding**: py-16 to py-24

## Core Components

### Navigation
- Dark header with subtle border bottom
- Logo prominently displayed
- Category navigation: Injectables, Orals, PCT/Pharma, Peptides, Growth Hormone
- Right side: Account, Contact icons
- Mobile: Hamburger with dark slide-out menu

### Product Cards
- Dark card background with subtle border
- Product image with clinical/vial appearance
- Product name (bold, white)
- Dosage/concentration (muted text)
- Price in gold accent color
- "Contact for Order" button (gold accent or outline)
- Hover: Subtle lift with gold border glow

### Category Cards
- Large icon or representative image
- Category name in white
- Product count in muted text
- Dark background with gold/blue accent on hover

### Trust Elements
- Pharmaceutical-grade quality badges
- Discrete, professional shipping icons
- Clinical lab/quality certifications
- No customer reviews displayed publicly

## Page Layouts

### Homepage
1. **Hero Section**
   - Full-width dark background
   - Bold headline: "Premium Pharmaceutical Grade Products"
   - Subtext emphasizing quality and discretion
   - CTA: "Browse Catalog" with gold accent
   
2. **Category Grid**
   - 5 categories in responsive grid (1 mobile, 3 tablet, 5 desktop)
   - Each with icon and category name
   - Clean, minimal design

3. **Featured Products**
   - Grid of 8-12 popular items
   - Dark cards with gold price highlights

4. **Trust Section**
   - Quality guarantee badges
   - Discrete shipping
   - Lab-tested quality

### Shop Page
- Sidebar filtering (categories, price range)
- Product grid (2 mobile, 3 tablet, 4 desktop)
- Sort options (price, name)
- Dark theme throughout

### Product Detail
- Large product image
- Product name, dosage, concentration
- Price prominently displayed
- "Contact for Order" button
- Product description
- Related products grid

## Button Styles

### Primary CTA
- Gold background (#D4AF37) with dark text
- Use for main actions: "Contact for Order", "Browse Catalog"

### Secondary
- Outline with gold border
- White text
- Use for secondary actions

### Ghost
- Transparent with white text
- Subtle hover state
- Use for navigation, tertiary actions

## Form Styling
- Dark input backgrounds (#121214)
- Subtle border (#1E1E22)
- White text, gray placeholder
- Gold focus ring
- Error states in red

## Contact/Order Flow
Products use "Contact for Order" instead of add-to-cart:
- Button links to contact page or opens inquiry modal
- Pre-fills product name in inquiry form
- Professional, discrete approach

## Responsive Design
- Mobile-first approach
- Breakpoints: sm(640), md(768), lg(1024), xl(1280)
- Product grids collapse gracefully
- Touch-friendly spacing on mobile
- Navigation collapses to hamburger

## Dark Mode
The site uses dark theme as default and primary mode:
- No light mode toggle needed
- Consistent dark aesthetic throughout
- Gold accents provide visual interest without light mode

## Images Strategy
- Product images: Clinical vial/bottle on dark or gradient background
- Placeholders: Medical-grade aesthetic with product type indicators
- Icons: Lucide React for consistency
- All images: Optimized, lazy-loaded
