import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered animations
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Intersection threshold (0-1)
 * @param {string} options.rootMargin - Root margin for intersection observer
 * @returns {Object} - Ref and visibility state
 */
export const useScrollAnimation = (options = {}) => {
  const { threshold = 0.1, rootMargin = '0px 0px -100px 0px' } = options;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, stop observing to prevent re-triggering
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
};

/**
 * Custom hook for multiple scroll animations with stagger effect
 * @param {number} count - Number of elements to animate
 * @param {Object} options - Configuration options
 * @returns {Array} - Array of refs and visibility states
 */
export const useStaggeredScrollAnimation = (count, options = {}) => {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', staggerDelay = 100 } = options;
  const [visibleItems, setVisibleItems] = useState(new Set());
  const refs = useRef([]);

  useEffect(() => {
    const observers = [];

    for (let i = 0; i < count; i++) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, i]));
            }, i * staggerDelay);
            observer.unobserve(entry.target);
          }
        },
        {
          threshold,
          rootMargin,
        }
      );

      if (refs.current[i]) {
        observer.observe(refs.current[i]);
        observers.push(observer);
      }
    }

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [count, threshold, rootMargin, staggerDelay]);

  const getRef = (index) => (el) => {
    refs.current[index] = el;
  };

  const isVisible = (index) => visibleItems.has(index);

  return { getRef, isVisible };
};
