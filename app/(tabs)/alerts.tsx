import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EmergencyAlertCard } from '@/components/EmergencyAlertCard';
import { EMERGENCY_ALERTS } from '@/constants/emergencyAlerts';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AlertsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filteredAlerts =
    filter === 'all'
      ? EMERGENCY_ALERTS
      : EMERGENCY_ALERTS.filter((alert) => alert.severity === filter);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={[styles.title, isDark && styles.titleDark]}>Emergency Alerts</Text>
      <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
        Stay informed about important updates
      </Text>
      <View style={styles.filterContainer}>
        {['all', 'critical', 'high', 'medium', 'low'].map((severity) => (
          <TouchableOpacity
            key={severity}
            style={[
              styles.filterButton,
              filter === severity && styles.filterButtonActive,
              isDark && styles.filterButtonDark,
            ]}
            onPress={() => setFilter(severity)}
          >
            <Text
              style={[
                styles.filterText,
                filter === severity && styles.filterTextActive,
                isDark && styles.filterTextDark,
              ]}
            >
              {severity.charAt(0).toUpperCase() + severity.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="shield-checkmark-outline" size={64} color={isDark ? '#666' : '#ccc'} />
      <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>No alerts</Text>
      <Text style={[styles.emptySubtext, isDark && styles.emptySubtextDark]}>
        You're all caught up!
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <FlatList
        data={filteredAlerts}
        renderItem={({ item }) => <EmergencyAlertCard alert={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#007AFF" />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          filteredAlerts.length === 0 ? styles.emptyList : styles.listContent
        }
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
    paddingBottom: 20,
  },
  headerContainer: {
    padding: 15,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  titleDark: {
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  subtitleDark: {
    color: '#999',
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  filterButtonDark: {
    backgroundColor: '#2c2c2e',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterTextDark: {
    color: '#999',
  },
  filterTextActive: {
    color: '#fff',
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
});




