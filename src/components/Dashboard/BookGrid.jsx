import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import BookCard from './BookCard';
import { getFavorites, addFavorite, removeFavorite } from '../../utils/favouriteServices';
import Fuse from 'fuse.js';
import { extractGenres } from '../../utils/extractGenres';
const BookGrid = ({ searchTerm, selectedCategory, onShare, theme = 'dark' }) => {

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBook, setFilteredBook] = useState([]);
  const location = useLocation();
  const isFavoritesPage = location.pathname.includes('favorite');
  const queryParams = new URLSearchParams(location.search);
  const sharedBookId = queryParams.get('bookId');
  const bookRefs = useRef({});
  const loaderRef = useRef(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);

  // Theme-specific styles
  const themeStyles = {
    light: {
      container: 'bg-white/50 backdrop-blur-sm',
      backButton: 'bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-md',
      noResults: 'text-gray-600',
      loadingSpinner: 'border-purple-600 border-t-transparent',
      loadingText: 'text-purple-600'
    },
    dark: {
      container: 'bg-black/20 backdrop-blur-sm',
      backButton: 'bg-gray-700 hover:bg-gray-800 text-white',
      noResults: 'text-gray-400',
      loadingSpinner: 'border-purple-600 border-t-transparent',
      loadingText: 'text-purple-300'
    }
  };

  const currentTheme = themeStyles[theme];

  useEffect(() => {
    if (sharedBookId && bookRefs.current[sharedBookId]) {
      bookRefs.current[sharedBookId].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [books, sharedBookId]);

  
  useEffect(() => {
    if (!userId) return;
    const fetchFavorites = async () => {
      const favsObj = await getFavorites(userId);
      setFavorites(new Set(Object.keys(favsObj)));
    };
    fetchFavorites();
  }, [userId]);

   const toggleFavorite = async (bookId) => {
    if (!userId) {
      alert("Please login to save favorites.");
      return;
    }
    console.log("Toggling favorite for bookId:", bookId);
    const newFavorites = new Set(favorites);
    if (newFavorites.has(bookId)) {
      newFavorites.delete(bookId);
      await removeFavorite(userId, bookId);
    } else {
      newFavorites.add(bookId);
      await addFavorite(userId, bookId);
    }
    setFavorites(newFavorites);
    sessionStorage.removeItem('favoriteBooksCache');
  };

  const fetchBooks = async (term = '', pageNum = 1) => {
  setLoading(true);
  try {
    const res = await fetch(
      `https://gutendex.com/books?languages=en&search=${encodeURIComponent(term)}&page=${pageNum}`
    );
    if (!res.ok) {
      console.warn(`Fetch failed: ${res.status} for term "${term}" on page ${pageNum}`);
      setHasMore(false);
      setNextPageUrl(null);
      setPrevPageUrl(null);
      return;
    }
    const data = await res.json();

    if (!data.results || !Array.isArray(data.results)) {
      console.error("Invalid API response structure.");
      setHasMore(false);
      setNextPageUrl(null);
      setPrevPageUrl(null);
      return;
    }

    const newBooks = data.results.map(book => {
      const genreTags = extractGenres(book);

      return {
        id: book.id,
        title: book.title,
        author: book.authors[0]?.name || 'Unknown',
        cover: book.formats['image/jpeg'] || '',
        description: book.summaries || "No description available" ,
        // rating: Math.floor(Math.random() * 2) + 4,
        downloads: book.download_count,
        // pages: 100 + Math.floor(Math.random() * 200),
        previewUrl: book.formats['text/html'] || book.formats['text/plain; charset=utf-8'],
        categories: genreTags,
      };
    });

    setBooks(prev => {
      const combinedBooks = pageNum === 1 ? newBooks : [...prev, ...newBooks];

      // Deduplicate by book.id
      const deduplicatedBooksMap = new Map();
      combinedBooks.forEach(book => {
        deduplicatedBooksMap.set(book.id, book); // overwrites duplicates
      });

      const deduplicatedBooks = Array.from(deduplicatedBooksMap.values());

      setAllBooks(deduplicatedBooks);
      setFilteredBook(deduplicatedBooks);

      sessionStorage.setItem('bookCache', JSON.stringify({
        books: deduplicatedBooks,
        page: pageNum,
        hasMore: !!data.next,
        search: term,
      }));

      return deduplicatedBooks;
    });

    setHasMore(!!data.next);
  } catch (error) {
    console.error('Error fetching books:', error);
    setHasMore(false);
    setNextPageUrl(null);
    setPrevPageUrl(null);
  } finally {
    setLoading(false);
  }
};

  const fetchSingleBook = async (id) => {
    try {
      const res = await fetch(`https://gutendex.com/books/${id}`);
      const data = await res.json();

      const genreTags = extractGenres(data);

      const newBook = {
        id: data.id,
        title: data.title,
        author: data.authors[0]?.name || 'Unknown',
        cover: data.formats['image/jpeg'] || '',
        description: data.summaries || "No description available",
        // rating: Math.floor(Math.random() * 2) + 4,
        downloads: data.download_count,
        // pages: 100 + Math.floor(Math.random() * 200),
        previewUrl: data.formats['text/html'] || data.formats['text/plain; charset=utf-8'],
        categories: genreTags,
      };

      setBooks(prev => {
        const alreadyPresent = prev.some(book => book.id === newBook.id);
        return alreadyPresent ? prev : [newBook, ...prev];
      });
      setAllBooks(prev => {
        const alreadyPresent = prev.some(book => book.id === newBook.id);
        return alreadyPresent ? prev : [newBook, ...prev];
      });
      setFilteredBook(prev => {
        const alreadyPresent = prev.some(book => book.id === newBook.id);
        return alreadyPresent ? prev : [newBook, ...prev];
      });
    } catch (err) {
      console.error("Failed to fetch shared book:", err.message);
    }
  };


  useEffect(() => {
    if (sharedBookId && !books.find(book => String(book.id) === sharedBookId)) {
      fetchSingleBook(sharedBookId);
    }
  }, [sharedBookId, books]);

  useEffect(() => {
    const cachedData = sessionStorage.getItem('bookCache');
    const cached = cachedData && JSON.parse(cachedData);

    if (cached && cached.search === searchTerm && cached.books?.length > 0) {
      const deduped = Array.from(new Map(cached.books.map(b => [b.id, b])).values());
      setBooks(deduped);
      setAllBooks(deduped);
      setFilteredBook(deduped);
      setPage(cached.page);
      setHasMore(cached.hasMore);
      return;
    }

    setPage(1);
    fetchBooks(searchTerm, 1);
  }, [searchTerm]);


  useEffect(() => {
    if (page > 1) {
      fetchBooks(searchTerm, page);
    }
  }, [page]);

  useEffect(() => {
    if (sharedBookId || !hasMore || loading || isFavoritesPage) return;

    let observer;
    if (loaderRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !loading) {
            setPage(prev => prev + 1);
          }
        },
        { threshold: 1 }
      );
      observer.observe(loaderRef.current);
    }

    return () => {
      if (observer && loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [sharedBookId, hasMore, loading, isFavoritesPage]);



  const filteredBooks = sharedBookId
    ? filteredBook.filter(book => String(book.id) === sharedBookId)
    : filteredBook.filter(book =>
        selectedCategory === 'all' || book.categories.includes(selectedCategory)
  );
  useEffect(() => {
    if (!searchTerm || searchTerm.trim() === '') {
      setFilteredBook(allBooks);
      return;
    }
    if (location.pathname.includes('favorite')) {
    setFilteredBook(allBooks);  
    return;
  }

    const fuse = new Fuse(allBooks, {
      keys: ['title', 'author', 'categories'],
      threshold: 0.3,  
      ignoreLocation: true,
    });
    const results = fuse.search(searchTerm).map(r => r.item);

    if (results.length < 2) {
      const fallback = allBooks.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBook(fallback);
    } else {
      setFilteredBook(results);
    }
  }, [searchTerm, allBooks, location.pathname]);


  return (
    <div className="relative z-10 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {sharedBookId && (
        <div className="mb-6 text-center">
          <button
            onClick={() => window.location.href = '/dashboard'}
            className={`px-4 py-2 rounded-md transition-all duration-300 hover:scale-105 ${currentTheme.backButton}`}
          >
            ← Back to All Books
          </button>
        </div>
      )}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map(book => (
            <div
              key={book.id}
              ref={(el) => (bookRefs.current[book.id] = el)}
            >
              <BookCard
                book={book}
                favorites={favorites}
                onToggleFavorite={() => toggleFavorite(book.id)}
                onShare={onShare}
                theme={theme}
              />
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && !loading && (
          <div className="flex items-center justify-center min-h-[60vh] px-4">
            <div className={`max-w-md w-full text-center ${currentTheme.container} rounded-2xl p-8 shadow-lg border border-opacity-20`}>      
              {/* Main message */}
              <h3 className={`text-xl font-semibold  transition-colors duration-300 ${currentTheme.noResults}`}>
                No books found matching your search
              </h3>       
            </div>
          </div>
        )}
        {!sharedBookId && loading && (
          <div className="flex justify-center items-center mt-10">
            <div className={`w-6 h-6 border-4 rounded-full animate-spin ${currentTheme.loadingSpinner}`} />
            <span className={`ml-3 font-medium transition-colors duration-300 ${currentTheme.loadingText}`}>
              Loading more books...
            </span>
          </div>
        )}
        {!sharedBookId && hasMore && <div ref={loaderRef} className="h-12 mt-10" />}
        {!hasMore && !loading && (
          <div className="text-center mt-6 text-sm text-gray-400">
            No more books to load.
          </div>
        )}

      </section>
    </div>
  );
};

export default BookGrid;