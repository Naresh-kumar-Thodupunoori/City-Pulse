import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NewsArticle } from '@/types';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface NewsCardProps {
  article: NewsArticle;
  onPress: () => void;
  onBookmark: () => void;
  isBookmarked: boolean;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  article,
  onPress,
  onBookmark,
  isBookmarked,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, isDark && styles.cardDark]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image source={{ uri: article.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.sourceContainer}>
            <Text style={[styles.source, isDark && styles.textSecondaryDark]}>{article.source}</Text>
            <Text style={[styles.date, isDark && styles.textSecondaryDark]}>
              • {formatDate(article.date)}
            </Text>
          </View>
          <TouchableOpacity onPress={onBookmark} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color={isBookmarked ? '#007AFF' : isDark ? '#999' : '#666'}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.title, isDark && styles.textDark]} numberOfLines={2}>
          {article.title}
        </Text>
        <Text style={[styles.description, isDark && styles.textSecondaryDark]} numberOfLines={3}>
          {article.description}
        </Text>
        {article.author && (
          <Text style={[styles.author, isDark && styles.textSecondaryDark]}>By {article.author}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 15,
    marginVertical: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: '#1c1c1e',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
  },
  content: {
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  source: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  textSecondaryDark: {
    color: '#999',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    lineHeight: 24,
  },
  textDark: {
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  author: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});




