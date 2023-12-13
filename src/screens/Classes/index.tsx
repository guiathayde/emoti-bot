import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Card, Avatar, Button } from 'react-native-paper';
import { FlatList, View } from 'react-native';

interface Class {
  id: string;
  title: string;
  subtitle: string;
}

const LeftComponent = (props: { size: number }) => (
  <Avatar.Icon {...props} icon="google-classroom" />
);

export function Classes() {
  const { navigate } = useNavigation();

  const [classes] = useState<Class[]>([
    {
      id: '1',
      title: 'IHC - Sala LE1',
      subtitle: 'Professora Vania',
    },
    {
      id: '2',
      title: 'PSD - Sala LE2',
      subtitle: 'Professora Vania',
    },
    {
      id: '3',
      title: 'Controle 2 - Sala LE3',
      subtitle: 'Professora Vania',
    },
  ]);

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'row', padding: 16 }}>
      <View style={{ maxWidth: '55%' }}>
        <Text variant="displayLarge">Informações sobre as aulas</Text>
        <Text variant="headlineMedium">
          Confira quais aulas estão acontecendo no DC agora
        </Text>

        <FlatList
          data={classes}
          renderItem={({ item }) => (
            <Card.Title
              title={item.title}
              subtitle={item.subtitle}
              left={LeftComponent}
              style={{
                marginVertical: 8,
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 8,
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.4,
                shadowRadius: 8,
              }}
            />
          )}
          keyExtractor={item => item.id}
          style={{ flex: 1, marginTop: 16 }}
        />
      </View>

      <View style={{ flex: 1, alignItems: 'center', gap: 16 }}>
        <Button
          mode="contained"
          style={{ width: 200 }}
          onPress={() => navigate('Home')}
        >
          Voltar a tela inicial
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
      </View>
    </SafeAreaView>
  );
}
