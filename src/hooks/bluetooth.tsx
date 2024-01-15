import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
} from 'react';
import { NativeModules, PermissionsAndroid } from 'react-native';

export interface PairedDevice {
  address: string;
  name: string;
}

interface BluetoothContextData {
  requestBluetoothPermission: () => Promise<boolean>;
  getPairedDevices: () => Promise<PairedDevice[]>;
  startBluetoothServer: (address: string, name: string) => Promise<void>;
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

  return (
    <BluetoothContext.Provider
      value={{
        requestBluetoothPermission,
        getPairedDevices: BluetoothModule.getPairedDevices,
        startBluetoothServer: BluetoothModule.startBluetoothServer,
        sendData: BluetoothModule.sendData,
      }}
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
