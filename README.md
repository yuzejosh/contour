# Contour Education Website

Hi! 👋  
This is a website I built for Contour Education over the last couple of days. It's deployed on Vercel and can be found [here](https://contour-devzagc16-yuzejoshs-projects.vercel.app)

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** for styling
- **Supabase** for authentication
- **Vercel** for deployment

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
