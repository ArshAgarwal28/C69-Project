import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      scannedData: "",
      buttonState: "normal",
    };
  }

  getPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted",
      buttonState: "clicked",
      scanned: false,
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: "normal",
    });
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  render() {
    const { hasCameraPermission, scanned, buttonState } = this.state;

    if (buttonState === "clicked" && hasCameraPermission) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonState === "normal") {
      return (
        <View>
          <TouchableOpacity style={styles.permissionButton} onPress={this.getPermissions}>
            <Text> Camera Permissions </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  permissionButton: {
    alignItems: 'center',
    alignSelf: "center",
    backgroundColor: 'red',
    borderWidth: 2,
    marginTop: 75
  }
})