# Overview

Focara is a modern single-page landing website for a mobile app focused on digital wellbeing and focus management. The application is built as a full-stack web application using React frontend with Express.js backend, designed to collect waitlist registrations for the upcoming mobile app. The project emphasizes a bold, serious, and empowering brand persona with clean, minimalist design aesthetics.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design system variables and shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Components**: Radix UI primitives with custom styling for accessible, composable components

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful endpoints with JSON responses
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Development**: Hot reloading with tsx for TypeScript execution

## Data Storage
- **Database**: PostgreSQL hosted on Neon (serverless)
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Management**: Code-first approach with migrations in `/migrations` directory
- **Tables**: 
  - `users` table for basic user authentication
  - `waitlist_registrations` table for collecting email signups with first name, last name, and email
- **Validation**: Drizzle-Zod integration for runtime type checking and validation

## External Dependencies
- **Database**: Neon Database (serverless PostgreSQL) via `@neondatabase/serverless`
- **UI Framework**: shadcn/ui component system built on Radix UI primitives
- **Styling**: Tailwind CSS with PostCSS for processing
- **Animation**: Framer Motion for smooth interactions and animations
- **Icons**: Lucide React for consistent iconography
- **Fonts**: Google Fonts (Inter, Architects Daughter, DM Sans, Fira Code, Geist Mono)
- **Development Tools**: Replit integration for cloud development environment
- **Form Validation**: Zod for schema validation and type inference
- **Date Handling**: date-fns for date manipulation and formatting