import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
} from 'react';
import { NativeModules, PermissionsAndroid } from 'react-native';

interface BluetoothContextData {
  requestBluetoothPermission: () => Promise<boolean>;
  connectBluetooth: () => Promise<void>;
  sendData: (data: number) => Promise<void>;
}

const BluetoothContext = createContext<BluetoothContextData>(
  {} as BluetoothContextData,
);

interface BluetoothProviderProps {
  children: ReactNode;
}

export function BluetoothProvider({ children }: BluetoothProviderProps) {
  const { BluetoothModule } = NativeModules;

  const requestBluetoothPermission = useCallback(async () => {
    const isBluetoothConnectAvailable = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    );
    const isBluetoothScanAvailable = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    );
    const isBluetoothAdvertiseAvailable = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
    );

    if (
      !isBluetoothConnectAvailable ||
      !isBluetoothScanAvailable ||
      !isBluetoothAdvertiseAvailable
    ) {
      try {
        const permissionsStatus = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
        ]);

        if (
          permissionsStatus['android.permission.BLUETOOTH_CONNECT'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          permissionsStatus['android.permission.BLUETOOTH_SCAN'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          permissionsStatus['android.permission.BLUETOOTH_ADVERTISE'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Bluetooth permissions granted');
          return true;
        } else {
          console.log('Bluetooth permissions denied');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return false;
    }
  }, []);

  const connectBluetooth = useCallback(async () => {
    BluetoothModule.getPairedDevices()
      .then((devices: any[]) => {
        console.log('Dispositivos pareados:', devices);

        BluetoothModule.startBluetoothServer(
          devices[0].address,
          devices[0].name,
        )
          .then((response: any) => {
            console.log('Conexão estabelecida:', response);
          })
          .catch((error: any) => {
            console.error('Erro ao estabelecer conexão:', error);
          });
      })
      .catch((error: any) => {
        console.error('Erro ao obter dispositivos pareados:', error);
      });
  }, [BluetoothModule]);

  const sendData = useCallback(
    async (data: number) => {
      BluetoothModule.sendData(data)
        .then((response: any) => {
          console.log('Dados enviados:', response);
        })
        .catch((error: any) => {
          console.error('Erro ao enviar dados:', error);
        });
    },
    [BluetoothModule],
  );

  return (
    <BluetoothContext.Provider
      value={{ requestBluetoothPermission, connectBluetooth, sendData }}
    >
      {children}
    </BluetoothContext.Provider>
  );
}

export function useBluetooth(): BluetoothContextData {
  const context = useContext(BluetoothContext);

  if (!context) {
    throw new Error('useBluetooth must be used within an BluetoothProvider');
  }

  return context;
}
