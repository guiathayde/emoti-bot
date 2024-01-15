import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, FlatList } from 'react-native';
import { Button, Menu, Icon, ActivityIndicator } from 'react-native-paper';
import Modal from 'react-native-modal';

import { PairedDevice, useBluetooth } from '../../hooks/bluetooth';

import AppIcon from '../../assets/app_icon.png';

export function Home() {
  const { requestBluetoothPermission, getPairedDevices, startBluetoothServer } =
    useBluetooth();
  const { navigate } = useNavigation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBluetoothModalVisible, setIsBluetoothModalVisible] = useState(false);
  const [isBluetoothConnected, setIsBluetoothConnected] = useState(false);

  const [pairedDevices, setPairedDevices] = useState<PairedDevice[]>([
    {
      address: '00:00:00:00:00:00',
      name: 'Nome do dispositivo',
    },
  ]);

  useEffect(() => {
    requestBluetoothPermission()
      .then(permission => console.log('Bluetooth permission:', permission))
      .catch(error => console.error(error));
  }, [requestBluetoothPermission]);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', gap: 16 }}>
      <View
        style={{
          position: 'absolute',
          top: 24,
          left: 32,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Icon
          source={isBluetoothConnected ? 'bluetooth' : 'bluetooth-off'}
          color={isBluetoothConnected ? '#6750A4' : '#c30010'}
          size={32}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          top: 16,
          right: 32,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Menu
          visible={isMenuOpen}
          onDismiss={() => setIsMenuOpen(false)}
          anchor={
            <Button onPress={() => setIsMenuOpen(true)}>
              <Icon source="dots-vertical" color="#6750A4" size={32} />
            </Button>
          }
        >
          <Menu.Item
            onPress={async () => {
              setIsBluetoothModalVisible(true);

              const devices = await getPairedDevices();
              setPairedDevices(devices);
            }}
            title="Configurar Bluetooth"
          />
        </Menu>
      </View>

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

      <Modal
        isVisible={isBluetoothModalVisible}
        onBackdropPress={() => setIsBluetoothModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {pairedDevices.length === 0 ? (
            <ActivityIndicator animating color="#6750A4" size={64} />
          ) : (
            <View
              style={{
                paddingVertical: 16,
                paddingHorizontal: 32,
                backgroundColor: '#fff',
                marginBottom: 64,
              }}
            >
              <FlatList
                style={{ maxHeight: 300 }}
                data={pairedDevices}
                renderItem={({ item }) => (
                  <Button
                    style={{ width: 256, marginBottom: 8 }}
                    mode="outlined"
                    onPress={() => {
                      startBluetoothServer(item.address, item.name)
                        .then(() => {
                          console.log(
                            'Bluetooth server started with ',
                            item.name,
                          );

                          setIsBluetoothConnected(true);
                        })
                        .catch(error => {
                          console.error(error);
                          setIsBluetoothConnected(false);
                        });
                    }}
                  >
                    {item.name}
                  </Button>
                )}
                keyExtractor={item => item.address}
              />
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}
