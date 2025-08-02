# Contour Education Website

Hi! 👋  
This is a website I built for Contour Education over the last couple of days. It's deployed on Vercel and can be found [here](https://contour-33n6cyixw-yuzejoshs-projects.vercel.app)

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** for styling
- **Supabase** for authentication
- **Vercel** for deployment and CI/CD

## Features

- ✨ Responsive design with dark mode support (work in progress)
- 🔐 Authentication system with Supabase
- 🎨 Clean, modern UI with Contour Education branding
- ✔️ Ability to check and uncheck lessons when complete

## Quick Start

1. **Clone and install dependencies:**
```bash
git clone <repo-url>
cd contour
npm install
```

2. **Run the development server:**
```bash
npm run dev
```

3. **Open [http://localhost:3000](http://localhost:3000)** to view the site

## 📘 Database Overview  
Schema can be found in the repository at 

- **Tables**:
  - `users` – Authenticated users (managed by Supabase Auth)
  - `lessons` – Lesson metadata (title, date, start time, etc.)
  - `user_lessons` – Join table mapping users to their assigned lessons
    - Includes `is_completed` boolean field to track completion

- **Relationships**:
  - `user_lessons.user_id → users.id` (FK)
  - `user_lessons.lesson_id → lessons.id` (FK)

## Project Structure

```
src/app/
├── page.tsx              # Root page, redirects accordingly
├── login/
│   └── page.tsx          # Login page
├── reset-password/
│   └── page.tsx          # Password reset page
├── error/
│   └── page.tsx          # Error page
└── dashboard/
    └── page.tsx          # User dashboard (protected)
```
