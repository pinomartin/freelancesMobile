import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { View, Text, Image, StyleSheet, Animated, ActivityIndicator } from 'react-native';

interface CardGPTProps {
  imagenHeader: string;
  logotipo: string;
  titulo: string;
  subtitulo: string;
  textoDescriptivo: string;
}

const CardGPT = memo(({ imagenHeader, logotipo, titulo, subtitulo, textoDescriptivo }: CardGPTProps) => {
  const [headerLoaded, setHeaderLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = useCallback(() => {
    if (headerLoaded && logoLoaded) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [headerLoaded, logoLoaded, fadeAnim]);

  useEffect(() => {
    fadeIn();
  }, [fadeIn]);

  return (
    <View style={styles.container}>
      <Image
        style={[styles.imagenHeader, !headerLoaded && styles.placeholder]}
        source={{ uri: imagenHeader }}
        onLoad={() => setHeaderLoaded(true)}
      />
      {!headerLoaded && (
        <View style={[styles.placeholder, styles.imagenHeader]}>
          <ActivityIndicator size="small" color="#ccc" />
        </View>
      )}
      <View style={styles.content}>
        <Image
          style={[styles.logotipo, !logoLoaded && styles.placeholder]}
          source={{ uri: logotipo }}
          onLoad={() => setLogoLoaded(true)}
        />
        {!logoLoaded && (
          <View style={[styles.placeholder, styles.logotipo]}>
            <ActivityIndicator size="small" color="#ccc" />
          </View>
        )}
        <View style={styles.textContainer}>
          <Animated.Text style={[styles.titulo, { opacity: fadeAnim }]}>{titulo}</Animated.Text>
          <Text style={styles.subtitulo}>{subtitulo}</Text>
          <Text style={styles.textoDescriptivo}>{textoDescriptivo}</Text>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  imagenHeader: {
    height: 200,
  },
  logotipo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  content: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 16,
    marginBottom: 4,
    color: '#666',
  },
  textoDescriptivo: {
    fontSize: 14,
    color: '#999',
  },
  placeholder: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CardGPT;
