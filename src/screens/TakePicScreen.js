import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { RNCamera } from "react-native-camera";

export default class TakePicScreen extends Component {
  async takePicture() {
    const { uri } = await this.camera
      .takePictureAsync({ width: 720 })
      .catch(err => console.error(err));
    const type = "image/jpeg";
    console.log(uri)
    this.props.navigation.navigate("ReviewPic", {
      uri,
      type,
    }
)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topView}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            type={RNCamera.Constants.Type.back}
            style={styles.cameraContainer}
            flashMode={RNCamera.Constants.FlashMode.off}
            androidCameraPermissionOptions={{
              title: "Permission to use camera",
              message: "We need your permission to use your camera",
              buttonPositive: "Ok",
              buttonNegative: "Cancel"
            }}
          />
          <View style={styles.imageViewContainer}>
            <Image
              style={styles.imageView}
              source={require("../res/drawable/hand.png")}
            />
          </View>
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity
            style={styles.buttonViewContainer}
            onPress={() => this.takePicture()}
          >
            <Image
              style={styles.buttonView}
              source={require("../res/drawable/record-button.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  topView: {
    flex: 5
  },
  bottomView: {
    flex: 1,
    backgroundColor: "#ffffff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  cameraContainer: {
    flex: 1
  },
  imageViewContainer: {
    margin: 10,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch"
  },
  imageView: {
    flex: 5,
    width: null,
    height: null,
    resizeMode: "center"
  },
  buttonViewContainer: {
    alignItems: "center",
    margin: 10,
    width: 80,
    height: 80
  },
  buttonView: {
    flex: 1,
    resizeMode: "contain"
  }
});
