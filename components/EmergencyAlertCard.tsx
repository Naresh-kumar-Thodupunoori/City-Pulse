import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EmergencyAlert } from '@/types';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface EmergencyAlertCardProps {
  alert: EmergencyAlert;
}

export const EmergencyAlertCard: React.FC<EmergencyAlertCardProps> = ({ alert }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return { bg: '#fee2e2', border: '#dc2626', text: '#991b1b', icon: 'alert-circle' };
      case 'high':
        return { bg: '#fed7aa', border: '#ea580c', text: '#9a3412', icon: 'warning' };
      case 'medium':
        return { bg: '#fef3c7', border: '#f59e0b', text: '#92400e', icon: 'alert' };
      case 'low':
        return { bg: '#dbeafe', border: '#3b82f6', text: '#1e40af', icon: 'information-circle' };
      default:
        return { bg: '#e5e7eb', border: '#6b7280', text: '#374151', icon: 'information-circle' };
    }
  };

  const severityStyle = getSeverityColor(alert.severity);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <View
      style={[
        styles.card,
        { borderLeftColor: severityStyle.border },
        isDark && styles.cardDark,
      ]}
    >
      <View style={styles.header}>
        <Ionicons name={severityStyle.icon as any} size={24} color={severityStyle.border} />
        <View style={styles.headerText}>
          <Text style={[styles.category, { color: severityStyle.text }]}>{alert.category}</Text>
          <Text style={[styles.severity, { color: severityStyle.text }]}>
            {alert.severity.toUpperCase()}
          </Text>
        </View>
        <Text style={[styles.time, isDark && styles.timeDark]}>{formatDate(alert.date)}</Text>
      </View>
      <Text style={[styles.title, isDark && styles.titleDark]}>{alert.title}</Text>
      <Text style={[styles.description, isDark && styles.descriptionDark]}>{alert.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 8,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: '#1c1c1e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    flex: 1,
    marginLeft: 10,
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  severity: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  timeDark: {
    color: '#666',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    lineHeight: 22,
  },
  titleDark: {
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  descriptionDark: {
    color: '#999',
  },
});


