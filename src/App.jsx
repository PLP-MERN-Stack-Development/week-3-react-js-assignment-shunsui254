import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TaskManager from './components/TaskManager';
import ApiDataDisplay from './components/ApiDataDisplay';
import Card from './components/Card';
import Button from './components/Button';
import { useScrollAnimation, useStaggeredScrollAnimation } from './hooks/useScrollAnimation';

function App() {
  // Scroll animation hooks
  const heroAnimation = useScrollAnimation({ threshold: 0.2 });
  const buttonsAnimation = useScrollAnimation({ threshold: 0.3 });
  const featuresAnimation = useStaggeredScrollAnimation(3, { staggerDelay: 150 });
  const taskManagerAnimation = useScrollAnimation({ threshold: 0.2 });
  const apiDataAnimation = useScrollAnimation({ threshold: 0.2 });
  const aboutAnimation = useScrollAnimation({ threshold: 0.2 });
  const techFeaturesAnimation = useScrollAnimation({ threshold: 0.3 });
  const keyFeaturesAnimation = useScrollAnimation({ threshold: 0.3 });
  const technologiesAnimation = useScrollAnimation({ threshold: 0.3 });

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section id="home" className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <div 
                ref={heroAnimation.ref}
                className={`scroll-fade-in ${heroAnimation.isVisible ? 'visible' : ''}`}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                  Welcome to{' '}
                  <span className="text-blue-600 dark:text-blue-400">
                    The Task Manager
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
                  Organize your tasks efficiently and explore real-time data with our intuitive 
                  task management system featuring dark/light themes and seamless API integration.
                </p>
              </div>
              
              <div 
                ref={buttonsAnimation.ref}
                className={`scroll-scale ${buttonsAnimation.isVisible ? 'visible' : ''} flex flex-wrap justify-center gap-4 mb-12`}
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => scrollToSection('tasks')}
                  className="pulse-on-hover"
                >
                  Get Started with Tasks
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => scrollToSection('api-data')}
                  className="pulse-on-hover"
                >
                  Explore API Data
                </Button>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <div
                  ref={featuresAnimation.getRef(0)}
                  className={`scroll-slide-left stagger-1 ${featuresAnimation.isVisible(0) ? 'visible' : ''}`}
                >
                  <Card
                    title="🎨 Modern Design"
                    className="text-center"
                    hover={true}
                  >
                    <p className="text-gray-600 dark:text-gray-400">
                      Beautiful, responsive design with dark/light theme support 
                      using Tailwind CSS utilities and custom animations.
                    </p>
                  </Card>
                </div>
                
                <div
                  ref={featuresAnimation.getRef(1)}
                  className={`scroll-fade-in stagger-2 ${featuresAnimation.isVisible(1) ? 'visible' : ''}`}
                >
                  <Card
                    title="⚛️ React Hooks"
                    className="text-center"
                    hover={true}
                  >
                    <p className="text-gray-600 dark:text-gray-400">
                      Advanced state management using useState, useEffect, and 
                      custom hooks for localStorage persistence.
                    </p>
                  </Card>
                </div>
                
                <div
                  ref={featuresAnimation.getRef(2)}
                  className={`scroll-slide-right stagger-3 ${featuresAnimation.isVisible(2) ? 'visible' : ''}`}
                >
                  <Card
                    title="🌐 API Integration"
                    className="text-center"
                    hover={true}
                  >
                    <p className="text-gray-600 dark:text-gray-400">
                      Real-time data fetching from external APIs with loading states, 
                      error handling, and search functionality.
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Task Manager Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
            <div 
              ref={taskManagerAnimation.ref}
              className={`max-w-4xl mx-auto scroll-fade-in ${taskManagerAnimation.isVisible ? 'visible' : ''}`}
            >
              <TaskManager />
            </div>
          </section>

          {/* API Data Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div 
              ref={apiDataAnimation.ref}
              className={`max-w-7xl mx-auto scroll-slide-right ${apiDataAnimation.isVisible ? 'visible' : ''}`}
            >
              <ApiDataDisplay />
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
            <div className="max-w-4xl mx-auto text-center">
              <div 
                ref={aboutAnimation.ref}
                className={`scroll-fade-in ${aboutAnimation.isVisible ? 'visible' : ''}`}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                  About This Project
                </h2>
                
                <div className="prose prose-lg dark:prose-invert mx-auto">
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    This project demonstrates advanced React.js concepts and modern web development 
                    practices. Built by Cecil Bezalel, it showcases:
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-8">
                <div 
                  ref={techFeaturesAnimation.ref}
                  className={`scroll-slide-left ${techFeaturesAnimation.isVisible ? 'visible' : ''}`}
                >
                  <Card title="🔧 Technical Features" size="sm">
                    <ul className="space-y-2 text-sm">
                      <li>• Component architecture with reusable UI components</li>
                      <li>• State management using React hooks</li>
                      <li>• Custom hooks for localStorage persistence</li>
                      <li>• Context API for theme management</li>
                      <li>• API integration with error handling</li>
                      <li>• Responsive design with Tailwind CSS</li>
                    </ul>
                  </Card>
                </div>
                
                <div 
                  ref={keyFeaturesAnimation.ref}
                  className={`scroll-slide-right ${keyFeaturesAnimation.isVisible ? 'visible' : ''}`}
                >
                  <Card title="🎯 Key Functionalities" size="sm">
                    <ul className="space-y-2 text-sm">
                      <li>• Task creation, editing, and completion tracking</li>
                      <li>• Task filtering (All, Active, Completed)</li>
                      <li>• Dark/light theme toggle</li>
                      <li>• Real-time API data fetching and display</li>
                      <li>• Search functionality for API data</li>
                      <li>• Pagination for large datasets</li>
                    </ul>
                  </Card>
                </div>
              </div>
              
              <div 
                ref={technologiesAnimation.ref}
                className={`mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg scroll-scale ${technologiesAnimation.isVisible ? 'visible' : ''}`}
              >
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['React.js', 'Vite', 'Tailwind CSS', 'JSX', 'React Hooks', 'Context API', 'localStorage', 'JSONPlaceholder API'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium pulse-on-hover"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App; 