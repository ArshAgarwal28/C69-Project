import * as React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';


import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class App extends React.Component {
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
          onBarCodeScanned={
            scanned ? undefined : this.handleBarCodeScanned
          }
        />
      );
    } else if (buttonState === "normal") {
      return (
        <View>
          <Text>
            {hasCameraPermission === true
              ? this.state.scannedData
              : "requestCameraPermissions"}
          </Text>

          <TouchableOpacity onPress={this.getPermissions}>
            <Text> Camera Permissions </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
