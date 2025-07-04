import React, { useState, useEffect } from 'react';
import { fetchPosts, fetchPhotos, searchPosts } from '../api/jsonPlaceholder';
import Card, { ImageCard } from './Card';
import Button from './Button';

/**
 * Component for displaying API data with search and pagination
 */
const ApiDataDisplay = () => {
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('posts');
  const itemsPerPage = 6;

  // Fetch data on component mount and tab change
  useEffect(() => {
    loadData();
  }, [activeTab]);

  // Handle search with debouncing
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery && activeTab === 'posts') {
        handleSearch();
      } else if (!searchQuery && activeTab === 'posts') {
        loadData();
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (activeTab === 'posts') {
        const postsData = await fetchPosts(50);
        setPosts(postsData);
      } else if (activeTab === 'photos') {
        const photosData = await fetchPhotos(null, 24);
        setPhotos(photosData);
      }
    } catch (err) {
      setError(`Failed to fetch ${activeTab}. Please try again.`);
      console.error(`Error fetching ${activeTab}:`, err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const searchResults = await searchPosts(searchQuery);
      setPosts(searchResults);
      setCurrentPage(1);
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get current items for pagination
  const getCurrentItems = () => {
    const items = activeTab === 'posts' ? posts : photos;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  // Calculate total pages
  const totalPages = Math.ceil((activeTab === 'posts' ? posts : photos).length / itemsPerPage);

  const renderPosts = () => {
    const currentPosts = getCurrentItems();
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <Card
            key={post.id}
            title={`Post #${post.id}`}
            className="h-full"
            hover={true}
          >
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 capitalize">
              {post.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
              {post.body}
            </p>
            <div className="mt-4 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
              <span>User ID: {post.userId}</span>
              <span>{post.body.length} chars</span>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const renderPhotos = () => {
    const currentPhotos = getCurrentItems();
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentPhotos.map((photo) => (
          <ImageCard
            key={photo.id}
            imageUrl={photo.thumbnailUrl}
            imageAlt={photo.title}
            title={`Photo #${photo.id}`}
            className="h-full"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
              {photo.title}
            </p>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Album: {photo.albumId}
            </div>
          </ImageCard>
        ))}
      </div>
    );
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex justify-center items-center space-x-2 mt-8">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        
        {pages.map(page => (
          <Button
            key={page}
            variant={currentPage === page ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setCurrentPage(page)}
            className="min-w-[2.5rem]"
          >
            {page}
          </Button>
        ))}
        
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-6" id="api-data">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          API Data Integration
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Data fetched from JSONPlaceholder API with search and pagination
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
          <Button
            variant={activeTab === 'posts' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => {
              setActiveTab('posts');
              setCurrentPage(1);
            }}
          >
            Posts ({posts.length})
          </Button>
          <Button
            variant={activeTab === 'photos' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => {
              setActiveTab('photos');
              setCurrentPage(1);
            }}
          >
            Photos ({photos.length})
          </Button>
        </div>
      </div>

      {/* Search Bar (only for posts) */}
      {activeTab === 'posts' && (
        <div className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <Card className="max-w-md mx-auto text-center">
          <div className="text-red-600 dark:text-red-400">
            <svg className="h-12 w-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mb-4">{error}</p>
            <Button variant="primary" onClick={loadData}>
              Try Again
            </Button>
          </div>
        </Card>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
          {activeTab === 'posts' && renderPosts()}
          {activeTab === 'photos' && renderPhotos()}
          {renderPagination()}
        </>
      )}

      {/* Data Stats */}
      {!loading && !error && (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Showing {getCurrentItems().length} of {activeTab === 'posts' ? posts.length : photos.length} {activeTab}
          {searchQuery && ` (filtered by "${searchQuery}")`}
        </div>
      )}
    </div>
  );
};

export default ApiDataDisplay;
