import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NewsArticle, BookmarkedArticle } from '@/types';
import { getBookmarks, addBookmark, removeBookmark, getSelectedCity, setSelectedCity } from '@/services/storageService';
import { fetchNewsByCity } from '@/services/newsService';

interface AppContextType {
  selectedCity: string;
  setCity: (city: string) => Promise<void>;
  news: NewsArticle[];
  loading: boolean;
  refreshNews: () => Promise<void>;
  bookmarks: BookmarkedArticle[];
  toggleBookmark: (article: NewsArticle) => Promise<void>;
  isArticleBookmarked: (url: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCity, setSelectedCityState] = useState<string>('New York');
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkedArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Fetch news when city changes
  useEffect(() => {
    if (selectedCity) {
      loadNews();
    }
  }, [selectedCity]);

  const loadInitialData = async () => {
    try {
      const savedCity = await getSelectedCity();
      if (savedCity) {
        setSelectedCityState(savedCity);
      }
      const savedBookmarks = await getBookmarks();
      setBookmarks(savedBookmarks);
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  };

  const setCity = async (city: string) => {
    try {
      await setSelectedCity(city);
      setSelectedCityState(city);
    } catch (error) {
      console.error('Error setting city:', error);
    }
  };

  const loadNews = async () => {
    try {
      setLoading(true);
      const articles = await fetchNewsByCity(selectedCity);
      setNews(articles);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshNews = async () => {
    await loadNews();
  };

  const toggleBookmark = async (article: NewsArticle) => {
    try {
      const isBookmarked = bookmarks.some((b) => b.url === article.url);
      if (isBookmarked) {
        await removeBookmark(article.url);
        setBookmarks(bookmarks.filter((b) => b.url !== article.url));
      } else {
        await addBookmark(article);
        const updatedBookmarks = await getBookmarks();
        setBookmarks(updatedBookmarks);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const isArticleBookmarked = (url: string): boolean => {
    return bookmarks.some((b) => b.url === url);
  };

  return (
    <AppContext.Provider
      value={{
        selectedCity,
        setCity,
        news,
        loading,
        refreshNews,
        bookmarks,
        toggleBookmark,
        isArticleBookmarked,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};


