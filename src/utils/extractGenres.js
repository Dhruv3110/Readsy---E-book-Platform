export const extractGenres = (data) => {
  const subjects = data.subjects?.map(s => s.toLowerCase()) || [];
  const bookshelves = data.bookshelves?.map(s => s.toLowerCase()) || [];
  const title = data.title?.toLowerCase() || '';

  const genreTags = new Set();

  // Genre mappings based on keywords
  const keywordMap = [
    { keyword: 'history', genre: 'history' },
    { keyword: 'science', genre: 'sci-fi' },
    { keyword: 'romance', genre: 'romance' },
    { keyword: 'biography', genre: 'biography' },
    { keyword: 'mystery', genre: 'mystery' },
    { keyword: 'detective', genre: 'mystery' },
    { keyword: 'non-fiction', genre: 'non-fiction' },
    { keyword: 'philosophy', genre: 'non-fiction' },
    { keyword: 'self-help', genre: 'self-help' },
    { keyword: 'guidance', genre: 'self-help' },
    { keyword: 'adventure', genre: 'adventure' },
    { keyword: 'children', genre: 'children' },
    { keyword: 'fantasy', genre: 'fantasy' },
    { keyword: 'psychological', genre: 'psychological' },
    { keyword: 'horror', genre: 'horror' },
    { keyword: 'classic', genre: 'classic' },
    { keyword: 'literature', genre: 'literature' },
    { keyword: 'humor', genre: 'humor' },
    { keyword: 'poetry', genre: 'poetry' }
  ];

  // Scan all data sources (subjects, bookshelves, title) for keywords
  keywordMap.forEach(({ keyword, genre }) => {
    if (
      subjects.some(s => s.includes(keyword)) ||
      bookshelves.some(b => b.includes(keyword)) ||
      title.includes(keyword)
    ) {
      genreTags.add(genre);
    }
  });

  // Default to fiction if no match
  if (genreTags.size === 0) {
    genreTags.add('fiction');
  }

  return Array.from(genreTags);
};
