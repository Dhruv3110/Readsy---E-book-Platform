import BookCard from '../Dashboard/BookCard';
import { Heart } from 'lucide-react';

const BookGridFavorite = ({ books, favorites, onToggleFavorite, onShare, theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <div className="relative z-10 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {books.length > 0 ? (
        <section className="mb-12">
          <h2
            className={`text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}
          >
            <Heart className="w-6 h-6 text-red-500" />
            My Favorite Books
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map(book => (
              <BookCard
                key={book.id}
                book={book}
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
                onShare={onShare}
                theme={theme} // Pass the theme to BookCard
              />
            ))}
          </div>
        </section>
      ) : (
        <div className={`text-center py-16 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>No favorite books yet.</p>
        </div>
      )}
    </div>
  );
};

export default BookGridFavorite;
