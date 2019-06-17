import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
export default class ReviewPicScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: false
    };
  }

  uploading() {
    const { uri, type } = this.props.navigation.state.params;
    console.log(uri);
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topView}>
          <View style={styles.imageViewContainer}>
            <Image
              style={styles.imageView}
              source={{ uri: this.props.navigation.state.params.uri }}
            />
          </View>
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity
            style={styles.buttonViewContainer}
            onPress={() => this.uploading()}
          >
            <Text>ส่งวิดีโอ</Text>
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
