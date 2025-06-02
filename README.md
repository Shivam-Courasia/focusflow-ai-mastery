# FocusFlow AI Mastery

A modern web application built with React, TypeScript, and Shadcn UI, designed to help users master their focus and productivity using AI-powered features.

## 📋 Project Overview

FocusFlow is a comprehensive productivity tool designed to help knowledge workers maintain focus in today's distraction-filled digital environment. It combines the Pomodoro technique with website blocking and detailed analytics to create an effective focus management system.

### 🎯 Core Objectives
- Help users maintain focus through structured work sessions
- Block distracting websites and applications during work time
- Provide detailed analytics on focus patterns and productivity
- Create a seamless and intuitive user experience

## 🚀 Features

### ⏱️ Timer & Workflow
- Customizable Pomodoro timer (default: 25 min work + 5 min break)
- Flexible interval customization
- Session tracking with start/end timestamps
- Manual session abort with reason logging

### 🛡️ Distraction Management
- Website and application blocking during work sessions
- Smart blocking system that activates only during work periods
- Automatic unblocking during breaks
- Customizable blocklist management

### 📊 Analytics Dashboard
- Daily and weekly Pomodoro session tracking
- Focus time analytics and trends
- Session completion vs. interruption ratio
- Interactive charts and visualizations
- Focus pattern insights

### 🔔 Notifications & Alerts
- In-app notifications for session events
- Desktop notifications support
- Customizable sound alerts
- Volume and mute controls

### 🎨 User Experience
- Modern, responsive UI built with Shadcn UI components
- Dark/Light mode support
- Intuitive session controls
- Real-time progress indicators

### 🔐 Security & Authentication
- Email/password authentication
- Secure session management
- User-specific data isolation
- Protected settings and analytics

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI (Radix UI)
- **Backend:** Supabase
- **State Management:** React Query
- **Form Handling:** React Hook Form + Zod
- **Routing:** React Router DOM
- **Charts:** Recharts
- **Date Handling:** date-fns
- **Icons:** Lucide React

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/focusflow-ai-mastery.git
cd focusflow-ai-mastery
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```


## 📝 Available Scripts

- `dev` - Start development server
- `build` - Create production build
- `build:dev` - Create development build
- `preview` - Preview production build
- `lint` - Run ESLint

## 🎨 UI Components

This project uses Shadcn UI, which provides a collection of reusable components built with Radix UI and Tailwind CSS. The components are highly customizable and accessible.

## 🔒 Environment Variables

Make sure to set up the following environment variables:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## 📚 Documentation

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Shadcn UI Documentation](https://ui.shadcn.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)


