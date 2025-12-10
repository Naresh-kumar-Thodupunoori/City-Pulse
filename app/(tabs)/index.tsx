import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '@/contexts/AppContext';
import { NewsCard } from '@/components/NewsCard';
import { CitySelector } from '@/components/CitySelector';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { NewsArticle } from '@/types';

export default function NewsFeedScreen() {
  const router = useRouter();
  const { selectedCity, setCity, news, loading, refreshNews, toggleBookmark, isArticleBookmarked } = useApp();
  const [citySelectorVisible, setCitySelectorVisible] = useState(false);
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

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.citySelector}>
        <Ionicons name="location" size={20} color="#007AFF" />
        <TouchableOpacity
          onPress={() => setCitySelectorVisible(true)}
          style={styles.cityButton}
        >
          <Text style={[styles.cityText, isDark && styles.cityTextDark]}>{selectedCity}</Text>
          <Ionicons name="chevron-down" size={20} color={isDark ? '#fff' : '#000'} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
        Latest news from your city
      </Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="newspaper-outline" size={64} color={isDark ? '#666' : '#ccc'} />
      <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>No news available</Text>
      <Text style={[styles.emptySubtext, isDark && styles.emptySubtextDark]}>
        Pull down to refresh
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <FlatList
        data={news}
        renderItem={({ item }) => (
          <NewsCard
            article={item}
            onPress={() => handleArticlePress(item)}
            onBookmark={() => toggleBookmark(item)}
            isBookmarked={isArticleBookmarked(item.url)}
          />
        )}
        keyExtractor={(item, index) => `${item.url}-${index}`}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={!loading ? renderEmpty : null}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refreshNews} tintColor="#007AFF" />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={news.length === 0 && !loading ? styles.emptyList : undefined}
      />

      {loading && news.length === 0 && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={[styles.loadingText, isDark && styles.loadingTextDark]}>
            Loading news...
          </Text>
        </View>
      )}

      <CitySelector
        visible={citySelectorVisible}
        onClose={() => setCitySelectorVisible(false)}
        onSelectCity={setCity}
        selectedCity={selectedCity}
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
  headerContainer: {
    padding: 15,
    paddingTop: 10,
  },
  citySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  cityText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 4,
  },
  cityTextDark: {
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginLeft: 28,
  },
  subtitleDark: {
    color: '#999',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyList: {
    flexGrow: 1,
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
  },
  emptySubtextDark: {
    color: '#666',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  loadingTextDark: {
    color: '#999',
  },
});
