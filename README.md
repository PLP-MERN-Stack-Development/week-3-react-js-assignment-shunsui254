[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19894973&assignment_repo_type=AssignmentRepo)

# 📋 The Task Manager - React.js & Tailwind CSS

A modern, responsive React application showcasing advanced component architecture, state management with hooks, API integration, and beautiful Tailwind CSS styling with dark/light theme support. Built by Cecil Bezalel.

## 🌟 Live Demo

Visit the live application: [http://localhost:3000](http://localhost:3000) (after running `npm run dev`)

## 🎯 Assignment Overview

This project fulfills all requirements for the Week 3 React.js assignment:

### ✅ Completed Tasks

1. **Project Setup** ✓
   - ✅ React application with Vite
   - ✅ Tailwind CSS configuration
   - ✅ Organized project structure

2. **Component Architecture** ✓
   - ✅ Button component with multiple variants
   - ✅ Footer component with links and social media
   - ✅ Card components (regular, image, simple variants)
   - ✅ Navbar with responsive mobile menu

3. **State Management & Hooks** ✓
   - ✅ TaskManager with full CRUD operations
   - ✅ useState for component state management
   - ✅ Custom hook `useLocalStorage` for persistence
   - ✅ Context API for theme management

4. **API Integration** ✓
   - ✅ JSONPlaceholder API integration
   - ✅ Loading and error states
   - ✅ Search functionality
   - ✅ Pagination implementation

5. **Tailwind CSS Styling** ✓
   - ✅ Responsive design (mobile, tablet, desktop)
   - ✅ Dark/light theme switcher
   - ✅ Custom animations and transitions

## 🚀 Features

### 📱 Core Functionality
- **Task Management**: Create, edit, complete, and delete tasks
- **Task Filtering**: View all, active, or completed tasks
- **Progress Tracking**: Visual progress bar and statistics
- **Data Persistence**: Tasks saved to localStorage
- **Theme Switching**: Toggle between light and dark modes

### 🌐 API Integration
- **Real-time Data**: Fetch posts and photos from JSONPlaceholder
- **Search Capability**: Filter posts by title and content
- **Pagination**: Navigate through large datasets
- **Error Handling**: Graceful error states and retry functionality

## 🛠️ Technologies Used

- **React 18.2** - Component-based UI library
- **Vite 5.0** - Fast build tool and dev server
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **JavaScript ES6+** - Modern JavaScript features

## 📦 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   - Navigate to `http://localhost:3000`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx      # Multi-variant button component
│   ├── Card.jsx        # Card layouts (regular, image, simple)
│   ├── Footer.jsx      # Site footer with links
│   ├── Navbar.jsx      # Navigation with mobile menu
│   ├── TaskManager.jsx # Complete task management
│   └── ApiDataDisplay.jsx # API data with search/pagination
├── context/            # React Context providers
│   └── ThemeContext.jsx # Theme management (light/dark)
├── hooks/              # Custom React hooks
│   └── useLocalStorage.js # localStorage and task management
├── api/                # API integration layer
│   └── jsonPlaceholder.js # External API calls
├── utils/              # Utility functions
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```
├── api/             # API integration functions
├── utils/           # Utility functions
└── App.jsx          # Main application component
```

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all required components and features
2. Implement proper state management with hooks
3. Integrate with at least one external API
4. Style your application with Tailwind CSS
5. Deploy your application and add the URL to your README.md

## Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Router Documentation](https://reactrouter.com/) 