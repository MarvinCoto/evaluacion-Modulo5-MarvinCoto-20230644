import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Puedes cambiar esta imagen por la que necesites */}
        <View style={styles.imageContainer}>
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>LOGO</Text>
          </View>
        </View>
        
        <Text style={styles.title}>Mi Aplicación</Text>
        <Text style={styles.subtitle}>Cargando...</Text>
        
        <ActivityIndicator 
          size="large" 
          color="#B91C1C" 
          style={styles.loader}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 30,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    backgroundColor: '#B91C1C',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 30,
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;