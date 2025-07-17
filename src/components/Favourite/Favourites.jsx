import React, { useState, useEffect } from 'react';
import BookGridFavorite from './BookGridFavourite';
import { getFavorites, addFavorite, removeFavorite } from '../../utils/favouriteServices';
import Fuse from 'fuse.js';
import HeroSection from '../Dashboard/HeroSection';
import { extractGenres} from '../../utils/extractGenres'
const Favourites = ({ theme = 'dark' }) => {

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const [favorites, setFavorites] = useState(new Set());
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const isDark = theme === 'dark';

    const categories = [
    'all',
    'fiction',
    'non-fiction',
    'romance',
    'mystery',
    'sci-fi',
    'biography',
    'history',
    'adventure',
    'children',
    'fantasy',
    'psychological',
    'horror',
    'classic',
    'literature',
    'humor',
    'poetry',
  ];

  useEffect(() => {
    if (!userId) return;

    const cachedBooks = sessionStorage.getItem('favoriteBooksCache');
    if (cachedBooks) {
      const parsedBooks = JSON.parse(cachedBooks);
      setFavoriteBooks(parsedBooks);
      setFavorites(new Set(parsedBooks.map(book => book.id.toString())));
    }

    const fetchFavoritesAndBooks = async () => {
      setLoading(true);
      try {
        const favsObj = await getFavorites(userId);
        const favIds = Object.keys(favsObj).filter(id => id && !isNaN(id));
        setFavorites(new Set(favIds));

        const booksPromises = favIds.map(async (id) => {
          try {
            const res = await fetch(`https://gutendex.com/books/${id}`);
            if (!res.ok) throw new Error(`Failed to fetch book ${id}`);
            const data = await res.json();

            return {
              id: data.id,
              title: data.title,
              author: Array.isArray(data.authors) && data.authors[0]?.name
                ? data.authors[0].name
                : "Unknown",
              cover: data.formats["image/jpeg"] || "",
              description: data.summaries || "No description available",
              // rating: Math.floor(Math.random() * 2) + 4,
              downloads: data.download_count,
              // pages: 100 + Math.floor(Math.random() * 200),
              previewUrl: data.formats["text/html"] || data.formats["text/plain; charset=utf-8"],
              categories: extractGenres(data),

            };
          } catch (err) {
            console.warn("Failed to load book:", id, err.message);
            return null;
          }
        });

        const freshBooks = (await Promise.all(booksPromises)).filter(Boolean);
        setFavoriteBooks(freshBooks);
        sessionStorage.setItem('favoriteBooksCache', JSON.stringify(freshBooks));
      } catch (error) {
        console.error("Error fetching favorite books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritesAndBooks();
  }, [userId]);

  const toggleFavorite = async (bookId) => {
    if (!userId) {
      alert("Please login to save favorites.");
      return;
    }
    const newFavorites = new Set(favorites);
    let updatedBooks = [...favoriteBooks];

    if (newFavorites.has(bookId.toString())) {
      newFavorites.delete(bookId.toString());
      updatedBooks = updatedBooks.filter(book => book.id !== bookId);
      await removeFavorite(userId, bookId);
    } else {
      newFavorites.add(bookId.toString());
      try {
        const res = await fetch(`https://gutendex.com/books/${bookId}`);
        if (res.ok) {
          const data = await res.json();
          const newBook = {
            id: data.id,
            title: data.title,
            author: Array.isArray(data.authors) && data.authors[0]?.name
              ? data.authors[0].name
              : "Unknown",
            cover: data.formats["image/jpeg"] || "",
            description: data.summaries || "No description available",
            rating: Math.floor(Math.random() * 2) + 4,
            downloads: data.download_count,
            pages: 100 + Math.floor(Math.random() * 200),
            previewUrl: data.formats["text/html"] || data.formats["text/plain; charset=utf-8"],
            categories: extractGenres(data),

          };
          updatedBooks.push(newBook);
        }
      } catch (err) {
        console.warn("Failed to fetch new favorite book:", err.message);
      }
      await addFavorite(userId, bookId);
    }

    setFavorites(newFavorites);
    setFavoriteBooks(updatedBooks);
    sessionStorage.setItem('favoriteBooksCache', JSON.stringify(updatedBooks));
  };

  const handleShare = (book) => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `Check out "${book.title}" by ${book.author}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`Check out "${book.title}" by ${book.author} at ${window.location.href}`);
    }
  };

  let searchResults = favoriteBooks;

  if (searchTerm.trim()) {
    const fuse = new Fuse(favoriteBooks, {
      keys: ['title', 'author', 'categories'],
      threshold: 0.3,
    });
    searchResults = fuse.search(searchTerm).map(res => res.item);
  }

  const filteredFavoriteBooks = searchResults.filter(book =>
    selectedCategory === 'all' || book.categories.includes(selectedCategory)
  );


  return (
    <div className={`min-h-screen relative overflow-hidden ${
      isDark
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
        : 'bg-gradient-to-br from-gray-100 via-purple-100 to-gray-100'
    }`}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
        <HeroSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          theme={theme}
          customTitle="My Favorite Books"
          customSubtitle="Books that touched my heart and mind"
        />
        <div>
          <BookGridFavorite
            books={filteredFavoriteBooks}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onShare={handleShare}
            theme={theme} // pass theme to BookCard through this
          />
        </div>
      </div>
    </div>
  );
};

export default Favourites;
