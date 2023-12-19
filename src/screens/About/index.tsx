import React from 'react';
import { FlatList, Image, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Text } from 'react-native-paper';

import AppIcon from '../../assets/app_icon.png';
import { useNavigation } from '@react-navigation/native';

interface Info {
  id: string;
  title: string;
  description: string;
  image: any;
}

const infos: Info[] = [
  {
    id: '1',
    title: 'UFSCar',
    description:
      'A Universidade Federal de São Carlos (UFSCar), estabelecida em 1968, é reconhecida como uma das principais instituições de ensino superior do Brasil. Com um campus vibrante e diversificado, a UFSCar oferece uma variedade de cursos em diferentes áreas do conhecimento, promovendo um ambiente de aprendizado dinâmico e inclusivo. A universidade se destaca pela excelência em pesquisa, ensino e extensão, contribuindo significativamente para o desenvolvimento científico, tecnológico e social. Além de sua infraestrutura de ponta, a UFSCar é conhecida por seu compromisso com a sustentabilidade e a responsabilidade social, buscando constantemente maneiras de melhorar a vida na comunidade local e global.',
    image: require('../../assets/logo_ufscar.png'),
  },
  {
    id: '2',
    title: 'Curso de Interação Humano-Computador',
    description:
      'A disciplina de Interação Humano-Computador (IHC) na UFSCar é parte fundamental do currículo do Departamento de Computação. Este curso explora os princípios e práticas de design de interfaces de usuário, centrando-se na criação de sistemas computacionais que sejam tanto funcionais quanto intuitivos. Através de uma combinação de teoria e prática, os alunos aprendem a projetar, avaliar e implementar interfaces de usuário eficazes, considerando a experiência e a perspectiva do usuário final. O curso enfatiza a importância da empatia e do entendimento das necessidades humanas no processo de design, preparando os alunos para enfrentar desafios reais e inovar na área de tecnologia.',
    image: require('../../assets/ihc.png'),
  },
  {
    id: '3',
    title: 'Desenvolvimento de um Aplicativo para Saúde Emocional dos Alunos',
    description:
      'Em resposta aos crescentes desafios de saúde mental enfrentados pelos alunos, a UFSCar está explorando o desenvolvimento de um aplicativo destinado a apoiar a saúde emocional dos estudantes do Departamento de Computação. Este aplicativo visa oferecer recursos como dicas de gerenciamento de estresse, exercícios de mindfulness, e um espaço seguro para expressar e entender emoções. A iniciativa reflete o compromisso da universidade em apoiar o bem-estar de seus alunos, reconhecendo a importância da saúde mental na educação superior.',
    image: require('../../assets/mental_health.png'),
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

      <ScrollView>
        <FlatList
          data={infos}
          renderItem={({ item }) => (
            <Card
              mode="contained"
              style={{
                width: 400,
                marginHorizontal: 8,
                paddingTop: 16,
                paddingBottom: 24,
              }}
            >
              <Card.Title title={item.title} titleNumberOfLines={2} />
              <Card.Content>
                <Text variant="bodyMedium">{item.description}</Text>
              </Card.Content>
              <Card.Cover
                style={{
                  width: 200,
                  height: 200,
                  alignSelf: 'center',
                  marginTop: 16,
                }}
                source={item.image}
              />
            </Card>
          )}
          keyExtractor={item => item.id}
          horizontal
          style={{ flex: 1 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
