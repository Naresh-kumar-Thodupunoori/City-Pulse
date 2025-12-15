import AsyncStorage from '@react-native-async-storage/async-storage';
import { BookmarkedArticle, NewsArticle } from '@/types';

const BOOKMARKS_KEY = '@city_pulse_bookmarks';
const SELECTED_CITY_KEY = '@city_pulse_selected_city';

// Bookmarks Management
export const getBookmarks = async (): Promise<BookmarkedArticle[]> => {
  try {
    const bookmarksJson = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return bookmarksJson ? JSON.parse(bookmarksJson) : [];
  } catch (error) {
    console.error('Error getting bookmarks:', error);
    return [];
  }
};

export const addBookmark = async (article: NewsArticle): Promise<void> => {
  try {
    const bookmarks = await getBookmarks();
    const bookmarkedArticle: BookmarkedArticle = {
      ...article,
      bookmarkedAt: new Date().toISOString(),
    };
    const updatedBookmarks = [bookmarkedArticle, ...bookmarks];
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));
  } catch (error) {
    console.error('Error adding bookmark:', error);
    throw error;
  }
};

export const removeBookmark = async (articleUrl: string): Promise<void> => {
  try {
    const bookmarks = await getBookmarks();
    const updatedBookmarks = bookmarks.filter((b) => b.url !== articleUrl);
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));
  } catch (error) {
    console.error('Error removing bookmark:', error);
    throw error;
  }
};

export const isBookmarked = async (articleUrl: string): Promise<boolean> => {
  try {
    const bookmarks = await getBookmarks();
    return bookmarks.some((b) => b.url === articleUrl);
  } catch (error) {
    console.error('Error checking bookmark:', error);
    return false;
  }
};

// City Selection Management
export const getSelectedCity = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(SELECTED_CITY_KEY);
  } catch (error) {
    console.error('Error getting selected city:', error);
    return null;
  }
};

export const setSelectedCity = async (city: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(SELECTED_CITY_KEY, city);
  } catch (error) {
    console.error('Error setting selected city:', error);
    throw error;
  }
};




