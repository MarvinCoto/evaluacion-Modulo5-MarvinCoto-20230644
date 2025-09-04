import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

const SplashScreen = () => {
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../assets/ues.png')}
            style={styles.logo}
          />
        </View>
        
        <Text style={styles.title}>Gestión de perfil universitario</Text>
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
  logo: {
    width: 160,              
    height: 160,             
    resizeMode: 'contain',  
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