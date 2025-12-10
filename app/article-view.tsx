import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { WebView } from 'react-native-webview';

export default function ArticleViewScreen() {
  const params = useLocalSearchParams();
  const { url, title } = params;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: typeof title === 'string' ? title : 'Article',
          headerBackTitle: 'Back',
        }}
      />
      <WebView
        source={{ uri: typeof url === 'string' ? url : '' }}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        )}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});


