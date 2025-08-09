# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server
npm run dev

# Build the application
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## Tech Stack & Architecture

**Core Technologies:**
- Next.js 15+ with React 19
- TypeScript
- Supabase (auth, database, storage)
- Tailwind CSS
- React Query (@tanstack/react-query) for server state
- React Hook Form for forms

**Key Dependencies:**
- OpenAI API for AI recipe generation
- Headless UI + Heroicons for components
- React Hot Toast for notifications
- Recharts for data visualization
- React Calendar Heatmap for cooking activity display

## Project Structure

**Authentication Flow:**
- Uses Supabase auth with custom UserContext (`context/UserContext.tsx`)
- Three layout types: Public (`Layout.tsx`), Private (`PrivateLayout.tsx`), Auth pages
- Route protection handled in `_app.tsx` with AUTH_PAGES and PRIVATE_PAGES arrays

**Data Layer:**
- Services in `lib/services/` handle all data operations
- Supabase clients: API routes (`lib/supabase/api.ts`), components (`lib/supabase/component.ts`)
- Custom hooks in `hooks/` for component-level state management with React Query

**Core Features:**
- **Recipes**: Full CRUD with ingredients, steps, categories, image upload
- **Meal Planning**: Calendar-based meal planning system
- **Dashboard**: Analytics, cooking heatmaps, statistics
- **AI Recipe Generation**: OpenAI integration with rate limiting (3 per session)
- **Orders**: Guest ordering system with QR code sharing

## Database Schema

Key entities managed through Supabase:
- `recipes`: Core recipe data with steps array and imageUrl
- `ingredients`: Normalized ingredient names
- `recipe_ingredients`: Junction table with quantities
- `categories`: Recipe categorization with colors
- `recipe_categories`: Junction table for recipe categorization
- `meal_plans`: Meal planning entries
- `orders`: Guest ordering system

## Development Patterns

**Component Organization:**
- Feature-based folders (`components/recipe/`, `components/dashboard/`, etc.)
- Shared components at root level
- Form components use React Hook Form with TypeScript

**State Management:**
- React Query for server state (see custom hooks)
- React Context for user authentication
- Local component state for UI interactions

**Styling:**
- Tailwind with custom gradient background
- Lexend font family configured in `_app.tsx`
- Toast notifications styled to match theme

## Environment Setup

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`

Test credentials (from README):
- Email: test@test.com
- Password: Password123?

## Development Notes

- No need to run `npm run dev` as I will do it myself.