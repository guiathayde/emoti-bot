package com.emotibot

import android.Manifest
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothManager
import android.bluetooth.BluetoothDevice
import android.bluetooth.BluetoothServerSocket
import android.bluetooth.BluetoothSocket
import android.content.Context
import android.content.pm.PackageManager
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import java.io.IOException
import java.util.*
import java.io.OutputStream
import java.nio.charset.StandardCharsets

class BluetoothModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private var bluetoothManager: BluetoothManager = reactApplicationContext.getSystemService(Context.BLUETOOTH_SERVICE) as BluetoothManager
    private var bluetoothAdapter: BluetoothAdapter? = bluetoothManager.adapter
    private var serverSocket: BluetoothServerSocket? = null
    private var socket: BluetoothSocket? = null

    override fun getName(): String {
        return "BluetoothModule"
    }

    @ReactMethod
    fun isBluetoothEnabled(promise: Promise) {
        if (bluetoothAdapter != null) {
            promise.resolve(bluetoothAdapter!!.isEnabled)
        } else {
            promise.reject("bluetooth_unavailable", "Bluetooth não está disponível neste dispositivo.")
        }
    }

    @ReactMethod
    fun getPairedDevices(promise: Promise) {
        if (bluetoothAdapter == null) {
            promise.reject("bluetooth_unavailable", "Bluetooth não está disponível.")
            return
        }

        if (ContextCompat.checkSelfPermission(reactApplicationContext, Manifest.permission.BLUETOOTH) != PackageManager.PERMISSION_GRANTED) {
            promise.reject("permission_denied", "Permissão de Bluetooth negada.")
            return
        }

        val pairedDevices = bluetoothAdapter!!.bondedDevices
        val deviceList: WritableArray = Arguments.createArray()

        if (pairedDevices.size > 0) {
            for (device in pairedDevices) {
                val deviceInfo: WritableMap = Arguments.createMap()
                deviceInfo.putString("name", device.name)
                deviceInfo.putString("address", device.address)
                deviceList.pushMap(deviceInfo)
            }
        }

        promise.resolve(deviceList)
    }

    @ReactMethod
    fun startBluetoothServer(deviceAddress: String, deviceName: String, promise: Promise) {
        if (bluetoothAdapter == null) {
            promise.reject("bluetooth_unavailable", "Bluetooth não está disponível.")
            return
        }

        val device: BluetoothDevice? = bluetoothAdapter!!.getRemoteDevice(deviceAddress)
        if (device == null) {
            promise.reject("device_not_found", "Dispositivo não encontrado.")
            return
        }

        if (ContextCompat.checkSelfPermission(reactApplicationContext, Manifest.permission.BLUETOOTH) != PackageManager.PERMISSION_GRANTED ||
            ContextCompat.checkSelfPermission(reactApplicationContext, Manifest.permission.BLUETOOTH_ADMIN) != PackageManager.PERMISSION_GRANTED ||
            ContextCompat.checkSelfPermission(reactApplicationContext, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            promise.reject("permission_denied", "Permissões necessárias não concedidas.")
            return
        }

        val uuid = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB") // Exemplo de UUID genérico
        try {
            serverSocket = bluetoothAdapter!!.listenUsingRfcommWithServiceRecord(deviceName, uuid)
            socket = serverSocket?.accept()
            // A partir deste ponto, você precisa gerenciar a comunicação através do socket
            promise.resolve("Conexão estabelecida com sucesso.")
        } catch (e: IOException) {
            promise.reject("socket_error", "Erro ao abrir o socket Bluetooth.")
        }
    }

    @ReactMethod
    fun sendData(data: String, promise: Promise) {
        if (socket == null) {
            promise.reject("connection_error", "Nenhuma conexão Bluetooth estabelecida.")
            return
        }

        try {
            val outputStream: OutputStream = socket!!.outputStream
            outputStream.write(data.toByteArray(StandardCharsets.UTF_8))
            promise.resolve("Dados enviados com sucesso.")
        } catch (e: IOException) {
            promise.reject("io_exception", "Erro ao enviar dados: ${e.message}")
        }
    }
}