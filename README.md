# DineNote - Personal Recipe & Meal Planning App

## Introduction

DineNote is a cozy and intuitive web application designed to help users document favorite recipes, plan meals effortlessly, and share culinary creations with friends. The app offers a complete solution for home cooks of all skill levels, combining recipe management, meal planning, and social sharing in one elegant package.

<img width="720" alt="Landing Page" src="https://github.com/user-attachments/assets/d19ea854-f5dc-4b1d-afcd-d70b3ee20601" />

## Live Demo & Testing Access

Live demo: <https://dine-note-web.vercel.app/>

A test account is available for reviewers:
* Email: test@test.com
* Password: Password123？

## Tech Stack

* **Frontend**:
  * Next.js 15
  * React 19
  * TypeScript
  * Tailwind CSS
  * Headless UI
* **Backend**:
  * Supabase (Authentication, Database, Storage)
  * Next.js API Routes
* **State Management & Data Fetching**:
  * TanStack React Query
  * Context API
* **AI Integration**:
  * OpenAI API (GPT-4o-mini for recipe generation)
* **Date Handling**:
  * date-fns
* **UI Components**:
  * React Calendar Heatmap
  * Heroicons

## Key Features

### Recipe Management
* Create, read, update, and delete recipes
* Organize recipes with categories and tags
* Search and filter functionality
* Mark recipes as "tried" to keep track of favorites
<img width="720" alt="Recipes Page" src="https://github.com/user-attachments/assets/03167f71-7bfb-47e5-974e-31e2f8b0a528" />

### AI Recipe Generator
* Generate personalized recipes based on available ingredients
* Customize based on cuisine type and dietary requirements
* Session-based usage limits (3 per session)
<img width="720" alt="AI Page" src="https://github.com/user-attachments/assets/debd0086-0a97-43c1-a949-db1e93fd4218"/>

### Dashboard Analytics
* Recipe statistics and trends
* Cooking streaks tracking
* Weekly ingredient shopping lists
* Category distribution charts
<img width="720" alt="Dashboard Page" src="https://github.com/user-attachments/assets/125a76d5-f082-48d2-aba7-4ac999c066e6" />


### Meal Planning
* Interactive calendar for planning meals
* Assign recipes to different meal types (breakfast, lunch, dinner, snacks)
* Track completed meals
* Visualize cooking activity with a heatmap
<img width="720" alt="Meal Plan Page" src="https://github.com/user-attachments/assets/6b7fdfa9-5624-4b6c-b63a-5622bad65a97"/>

### Recipe Sharing
* Share recipes with unique public links
* Allow friends to "order" from your personal menu
* Guest order functionality without account requirement
<img width="720" alt="Recipes Page" src="https://github.com/user-attachments/assets/87f8e76d-ac86-48ae-a29a-f5123f4de877"/>

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run the development server: `npm run dev`
5. Access the application at: `http://localhost:3000`

## Future Enhancements

* Grocery list generation based on meal plans
* Social following system
* Recipe import from external websites
* Mobile app using React Native
