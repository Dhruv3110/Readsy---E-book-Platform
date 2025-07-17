// favoriteService.js
import { db } from '../firebase';
import { ref, set, get, remove } from 'firebase/database';

export const getFavorites = async (userId) => {
  const snapshot = await get(ref(db, `favorites/${userId}`));
  return snapshot.exists() ? snapshot.val() : {};
};

export const addFavorite = async (userId, bookId) => {
  await set(ref(db, `favorites/${userId}/${bookId}`), true);
};

export const removeFavorite = async (userId, bookId) => {
  await remove(ref(db, `favorites/${userId}/${bookId}`));
};
