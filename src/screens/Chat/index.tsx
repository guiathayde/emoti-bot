import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Message {
  id: string;
  message: string;
  option?: string;
  from: 'user' | 'bot';
  type: 'text' | 'button';
}

export function Chat() {
  const { navigate } = useNavigation();

  const [messages] = useState<Message[]>([
    {
      id: '1',
      message: 'Selecione uma opção para continuarmos com nossa conversa:',
      from: 'bot',
      type: 'text',
    },
    {
      id: '2',
      message: 'Gostaria de conversar sobre',
      option: 'Ansiedade',
      from: 'bot',
      type: 'button',
    },
    {
      id: '3',
      message: 'Gostaria de conversar sobre',
      option: 'Nervosismo',
      from: 'bot',
      type: 'button',
    },
  ]);

  return (
    <SafeAreaView
      style={{ flex: 1, paddingVertical: 16, paddingHorizontal: 24 }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <Button mode="contained" onPress={() => navigate('FacialRecognition')}>
          Reconhecimento facial
        </Button>
        <Button mode="contained" onPress={() => navigate('Home')}>
          Voltar a tela inicial
        </Button>
      </View>

      <FlatList
        data={messages}
        renderItem={({ item, index }) => {
          let previousMessage: Message | null = null;
          if (index > 0) {
            previousMessage = messages[index - 1];
          }

          if (item.from === 'bot') {
            if (item.type === 'button') {
              return (
                <TouchableOpacity
                  style={{
                    width: '65%',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    backgroundColor: '#6750A4',
                    borderRadius: 12,
                    marginTop:
                      previousMessage && previousMessage.from === 'bot'
                        ? 8
                        : 16,
                  }}
                >
                  <Text style={{ maxWidth: '85%', color: 'white' }}>
                    {item.message} {item.option}
                  </Text>
                </TouchableOpacity>
              );
            }

            return (
              <View
                style={{
                  width: '65%',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  backgroundColor: '#6750A4',
                  borderRadius: 12,
                  marginTop:
                    previousMessage && previousMessage.from === 'bot' ? 8 : 16,
                }}
              >
                <Text style={{ maxWidth: '85%', color: 'white' }}>
                  {item.message}
                </Text>
              </View>
            );
          }

          return (
            <View
              style={{
                width: '65%',
                flexDirection: 'row',
                alignItems: 'flex-end',
                paddingVertical: 8,
                paddingHorizontal: 16,
                backgroundColor: '#FEF7FF',
                borderRadius: 12,
                marginTop:
                  previousMessage && previousMessage.from === 'user' ? 8 : 16,
              }}
            >
              <Text style={{ maxWidth: '85%', color: 'black' }}>
                {item.message}
              </Text>
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}
