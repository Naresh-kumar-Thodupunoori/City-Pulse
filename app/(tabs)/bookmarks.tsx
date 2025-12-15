import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '@/contexts/AppContext';
import { NewsCard } from '@/components/NewsCard';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { NewsArticle } from '@/types';

export default function BookmarksScreen() {
  const router = useRouter();
  const { bookmarks, toggleBookmark, isArticleBookmarked } = useApp();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleArticlePress = (article: NewsArticle) => {
    router.push({
      pathname: '/article-view',
      params: {
        url: article.url,
        title: article.title,
      },
    });
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="bookmark-outline" size={64} color={isDark ? '#666' : '#ccc'} />
      <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>No bookmarks yet</Text>
      <Text style={[styles.emptySubtext, isDark && styles.emptySubtextDark]}>
        Bookmark articles to read them later
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <FlatList
        data={bookmarks}
        renderItem={({ item }) => (
          <NewsCard
            article={item}
            onPress={() => handleArticlePress(item)}
            onBookmark={() => toggleBookmark(item)}
            isBookmarked={isArticleBookmarked(item.url)}
          />
        )}
        keyExtractor={(item, index) => `${item.url}-${index}`}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={bookmarks.length === 0 ? styles.emptyList : styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containerDark: {
    backgroundColor: '#000',
  },
  listContent: {
    paddingVertical: 10,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptyTextDark: {
    color: '#999',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  emptySubtextDark: {
    color: '#666',
  },
});




