import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Text, Button } from 'react-native-paper';
import { Asset, launchCamera } from 'react-native-image-picker';
import { Image, View } from 'react-native';

export function FacialRecognition() {
  const { navigate } = useNavigation();

  const [image, setImage] = useState<Asset | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
      quality: 1,
    })
      .then(response => {
        if (response.assets && response.assets.length > 0) {
          setImage(response.assets[0]);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  if (isLoading || !image) {
    return (
      <SafeAreaView
        style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}
      >
        <ActivityIndicator size="large" color="#6750A4" />
        <View
          style={{
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 8,
            paddingHorizontal: 16,
          }}
        >
          <Text variant="displayMedium">Identificando emoção...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (image) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', gap: 8 }}>
        <Text style={{ width: 425 }} variant="displayMedium">
          Emoção identificada
        </Text>

        <Image
          style={{ width: 300, height: 300, borderRadius: 12 }}
          source={{ uri: image.uri }}
        />

        <View>
          <Text style={{ width: 50 }} variant="titleLarge">
            Feliz
          </Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button mode="elevated" onPress={() => navigate('Home')}>
            Voltar
          </Button>
          <Button mode="contained" onPress={() => navigate('Chat')}>
            Prosseguir ao chat
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
