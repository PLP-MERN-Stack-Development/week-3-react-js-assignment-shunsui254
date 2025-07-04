/**
 * API service for fetching external data
 */

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Generic fetch function with error handling
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Promise} - Promise resolving to response data
 */
const apiFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};

/**
 * Fetch posts from JSONPlaceholder API
 * @param {number} limit - Number of posts to fetch
 * @returns {Promise<Array>} - Array of posts
 */
export const fetchPosts = async (limit = 10) => {
  const url = `${API_BASE_URL}/posts${limit ? `?_limit=${limit}` : ''}`;
  return apiFetch(url);
};

/**
 * Fetch users from JSONPlaceholder API
 * @returns {Promise<Array>} - Array of users
 */
export const fetchUsers = async () => {
  const url = `${API_BASE_URL}/users`;
  return apiFetch(url);
};

/**
 * Fetch comments for a specific post
 * @param {number} postId - Post ID
 * @returns {Promise<Array>} - Array of comments
 */
export const fetchComments = async (postId) => {
  const url = `${API_BASE_URL}/posts/${postId}/comments`;
  return apiFetch(url);
};

/**
 * Fetch albums from JSONPlaceholder API
 * @param {number} limit - Number of albums to fetch
 * @returns {Promise<Array>} - Array of albums
 */
export const fetchAlbums = async (limit = 10) => {
  const url = `${API_BASE_URL}/albums${limit ? `?_limit=${limit}` : ''}`;
  return apiFetch(url);
};

/**
 * Fetch photos from JSONPlaceholder API
 * @param {number} albumId - Album ID (optional)
 * @param {number} limit - Number of photos to fetch
 * @returns {Promise<Array>} - Array of photos
 */
export const fetchPhotos = async (albumId = null, limit = 12) => {
  let url = `${API_BASE_URL}/photos`;
  const params = new URLSearchParams();
  
  if (albumId) params.append('albumId', albumId);
  if (limit) params.append('_limit', limit);
  
  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  
  return apiFetch(url);
};

/**
 * Search posts by title
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Filtered array of posts
 */
export const searchPosts = async (query) => {
  const posts = await fetchPosts(100); // Fetch more posts for better search results
  return posts.filter(post => 
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.body.toLowerCase().includes(query.toLowerCase())
  );
};

// Alternative API endpoints (in case JSONPlaceholder is down)
const BACKUP_APIS = {
  quotes: 'https://dummyjson.com/quotes',
  products: 'https://dummyjson.com/products',
};

/**
 * Fetch quotes from DummyJSON API as backup
 * @param {number} limit - Number of quotes to fetch
 * @returns {Promise<Array>} - Array of quotes
 */
export const fetchQuotes = async (limit = 10) => {
  try {
    const response = await apiFetch(`${BACKUP_APIS.quotes}?limit=${limit}`);
    return response.quotes || response;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw error;
  }
};

/**
 * Fetch products from DummyJSON API as backup
 * @param {number} limit - Number of products to fetch
 * @returns {Promise<Array>} - Array of products
 */
export const fetchProducts = async (limit = 12) => {
  try {
    const response = await apiFetch(`${BACKUP_APIS.products}?limit=${limit}`);
    return response.products || response;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export default {
  fetchPosts,
  fetchUsers,
  fetchComments,
  fetchAlbums,
  fetchPhotos,
  searchPosts,
  fetchQuotes,
  fetchProducts,
};
