import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { Button } from 'react-native-paper';

import AppIcon from '../../assets/app_icon.png';

export function Home() {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', gap: 16 }}>
      <Image
        style={{ marginTop: 32, marginBottom: 24, width: 200, height: 200 }}
        source={AppIcon}
      />
      <Button
        mode="contained"
        style={{ width: 200 }}
        onPress={() => navigate('Classes')}
      >
        Agora no DC
      </Button>
      <Button
        mode="contained"
        style={{ width: 200 }}
        onPress={() => navigate('FacialRecognition')}
      >
        Reconhecimento Facial
      </Button>
      <Button
        mode="contained"
        style={{ width: 200 }}
        onPress={() => navigate('About')}
      >
        Conheça o DC
      </Button>
    </SafeAreaView>
  );
}
