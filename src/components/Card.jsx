import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card component for displaying content in a boxed layout
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.title - Optional card title
 * @param {React.ReactNode} props.actions - Optional action buttons/elements
 * @param {boolean} props.hover - Whether to show hover effects
 * @param {string} props.size - Card size (sm, md, lg)
 * @returns {JSX.Element} - Card component
 */
const Card = ({ 
  children, 
  className = '', 
  title, 
  actions, 
  hover = true,
  size = 'md',
  ...rest 
}) => {
  // Base classes
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-200';
  
  // Size classes
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  // Hover effect classes
  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-0.5' : '';
  
  // Combine all classes
  const cardClasses = `${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${hoverClasses} ${className}`;
  
  return (
    <div className={cardClasses} {...rest}>
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      )}
      <div className="text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
};

/**
 * Simple card variant for minimal content
 */
export const SimpleCard = ({ children, className = '', ...rest }) => (
  <div 
    className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 ${className}`} 
    {...rest}
  >
    {children}
  </div>
);

/**
 * Image card variant with image header
 */
export const ImageCard = ({ 
  children, 
  className = '', 
  imageUrl, 
  imageAlt = '',
  title,
  ...rest 
}) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`} {...rest}>
    {imageUrl && (
      <div className="aspect-w-16 aspect-h-9">
        <img 
          src={imageUrl} 
          alt={imageAlt}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </div>
    )}
    <div className="p-6">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h3>
      )}
      <div className="text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  actions: PropTypes.node,
  hover: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

SimpleCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ImageCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
  title: PropTypes.string,
};

export default Card;
