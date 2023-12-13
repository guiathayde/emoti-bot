import React from 'react';
import { FlatList, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Text } from 'react-native-paper';

import AppIcon from '../../assets/app_icon.png';
import { useNavigation } from '@react-navigation/native';

interface Info {
  id: string;
  title: string;
  description: string;
  image: string;
}

const infos: Info[] = [
  {
    id: '1',
    title: 'Ansiedade',
    description:
      'A ansiedade é uma reação normal do organismo e funciona como um aviso que nos alerta sobre o desconhecido ou qualquer tipo de perigo. Quando o sentimento é passageiro, não há problema algum, mas quando a ansiedade se torna constante, ela pode se transformar em uma doença.',
    image:
      'https://images.unsplash.com/photo-1613312328068-c9b6b76c9e8a?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    title: 'Depressão',
    description:
      'A depressão é uma doença psiquiátrica crônica e recorrente que produz alteração do humor caracterizada por uma tristeza profunda, sem fim, associada a sentimentos de dor, amargura, desencanto, desesperança, baixa autoestima e culpa, assim como a distúrbios do sono e do apetite.',
    image:
      'https://images.unsplash.com/photo-1613312328068-c9b6b76c9e8a?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3',
    title: 'Estresse',
    description:
      'O estresse é uma reação do organismo com componentes físicos e mentais, que ocorre quando surge a necessidade de uma adaptação muito rápida a um evento ou situação inesperada.',
    image:
      'https://images.unsplash.com/photo-1613312328068-c9b6b76c9e8a?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '4',
    title: 'Insônia',
    description:
      'A insônia é um distúrbio do sono que pode ser caracterizado pela dificuldade de adormecer ou de permanecer dormindo durante a noite, fazendo com que a pessoa não consiga ter um sono reparador e acorde cansada e com sono no dia seguinte.',
    image:
      'https://images.unsplash.com/photo-1613312328068-c9b6b76c9e8a?q=80&w=3000&auto=format&fit=crop&ixlib=rb-',
  },
];

export function About() {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <Button
          style={{ marginLeft: 16 }}
          mode="contained"
          onPress={() => navigate('FacialRecognition')}
        >
          Reconhecimento Facial
        </Button>

        <Image style={{ width: 150, height: 150 }} source={AppIcon} />

        <Button
          style={{ marginRight: 16 }}
          mode="contained"
          onPress={() => navigate('Home')}
        >
          Voltar a tela inicial
        </Button>
      </View>

      <FlatList
        data={infos}
        renderItem={({ item }) => (
          <Card mode="contained" style={{ width: 400, marginHorizontal: 8 }}>
            <Card.Title style={{ maxWidth: '100%' }} title={item.title} />
            <Card.Content style={{ maxWidth: '100%' }}>
              <Text variant="bodyMedium">{item.description}</Text>
            </Card.Content>
            <Card.Cover
              style={{
                width: 200,
                height: 200,
                alignSelf: 'center',
                marginTop: 16,
              }}
              source={{ uri: item.image }}
            />
          </Card>
        )}
        keyExtractor={item => item.id}
        horizontal
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
}
