import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CITIES } from '@/constants/cities';
import { City } from '@/types';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface CitySelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelectCity: (city: string) => void;
  selectedCity: string;
}

export const CitySelector: React.FC<CitySelectorProps> = ({
  visible,
  onClose,
  onSelectCity,
  selectedCity,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const filteredCities = CITIES.filter(
    (city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCity = (cityName: string) => {
    onSelectCity(cityName);
    onClose();
    setSearchQuery('');
  };

  const renderCityItem = ({ item }: { item: City }) => {
    const isSelected = item.name === selectedCity;
    return (
      <TouchableOpacity
        style={[
          styles.cityItem,
          isDark && styles.cityItemDark,
          isSelected && styles.cityItemSelected,
        ]}
        onPress={() => handleSelectCity(item.name)}
      >
        <View style={styles.cityInfo}>
          <Text style={[styles.cityName, isDark && styles.textDark]}>{item.name}</Text>
          <Text style={[styles.cityCountry, isDark && styles.textSecondaryDark]}>{item.country}</Text>
        </View>
        {isSelected && <Ionicons name="checkmark-circle" size={24} color="#007AFF" />}
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <View style={[styles.container, isDark && styles.containerDark]}>
        <View style={styles.header}>
          <Text style={[styles.title, isDark && styles.textDark]}>Select City</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={28} color={isDark ? '#fff' : '#000'} />
          </TouchableOpacity>
        </View>

        <View style={[styles.searchContainer, isDark && styles.searchContainerDark]}>
          <Ionicons name="search" size={20} color={isDark ? '#999' : '#666'} />
          <TextInput
            style={[styles.searchInput, isDark && styles.searchInputDark]}
            placeholder="Search cities..."
            placeholderTextColor={isDark ? '#999' : '#666'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <FlatList
          data={filteredCities}
          renderItem={renderCityItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  containerDark: {
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  textDark: {
    color: '#fff',
  },
  textSecondaryDark: {
    color: '#999',
  },
  closeButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    margin: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  searchContainerDark: {
    backgroundColor: '#1c1c1e',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  searchInputDark: {
    color: '#fff',
  },
  list: {
    flex: 1,
  },
  cityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  cityItemDark: {
    borderBottomColor: '#2c2c2e',
  },
  cityItemSelected: {
    backgroundColor: '#f0f8ff',
  },
  cityInfo: {
    flex: 1,
  },
  cityName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  cityCountry: {
    fontSize: 14,
    color: '#666',
  },
});




