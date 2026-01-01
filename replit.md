# Forge & Formula E-Commerce Platform

## Overview

A full-stack e-commerce platform for a dual-brand supplement company featuring two distinct product lines: **Forge** (performance/injectables) and **Formula** (oral/lifestyle products). The application provides complete shopping functionality including product browsing, cart management, checkout, order tracking, and user authentication via Replit Auth.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

- **Framework**: React with TypeScript, bundled via Vite
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **State Management**: 
  - Zustand for cart state (persisted to localStorage)
  - TanStack Query for server state and API data fetching
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming (supports light/dark modes)

The frontend follows a page-based architecture with shared layout components (Navbar, Footer, CartDrawer). Pages are located in `client/src/pages/` and components in `client/src/components/`.

### Backend Architecture

- **Framework**: Express.js with TypeScript
- **API Design**: RESTful JSON API endpoints under `/api/*`
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Authentication**: Replit Auth integration using OpenID Connect with Passport.js
- **Session Storage**: PostgreSQL-backed sessions via connect-pg-simple

The server entry point is `server/index.ts`, with routes defined in `server/routes.ts` and database operations abstracted through `server/storage.ts`.

### Data Storage

- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` - contains all table definitions
- **Key Tables**:
  - `users` and `sessions` - Authentication (required for Replit Auth)
  - `categories` - Product categories with brand association
  - `products` - Product catalog with pricing, stock, and images
  - `orders` and `orderItems` - Order management
  - `reviews` - Product reviews

### Authentication

- **Provider**: Replit Auth via OpenID Connect
- **Implementation**: Located in `server/replit_integrations/auth/`
- **Session Management**: Express sessions stored in PostgreSQL
- **Protected Routes**: Use `isAuthenticated` middleware for API protection

### Build System

- **Development**: Vite dev server with HMR proxied through Express
- **Production**: 
  - Frontend built with Vite to `dist/public`
  - Backend bundled with esbuild to `dist/index.cjs`
  - Selective dependency bundling to optimize cold starts

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle Kit**: Database migrations via `npm run db:push`

### Authentication Services
- **Replit Auth**: OpenID Connect provider at `https://replit.com/oidc`
- **Required Environment Variables**: `SESSION_SECRET`, `REPL_ID`, `ISSUER_URL`

### UI/Frontend Libraries
- **Radix UI**: Accessible component primitives (dialogs, dropdowns, forms)
- **Embla Carousel**: Product image carousels
- **React Hook Form + Zod**: Form handling with validation
- **Lucide React**: Icon library

### Development Tools
- **Vite Plugins**: Replit-specific plugins for error overlay, cartographer, and dev banner
- **TypeScript**: Full type coverage across client and server