import React, { Component } from "react";
import { Modal, Text, TouchableHighlight, View, Alert } from "react-native";

export default class ModalExample extends Component {
  render() {
    console.log(this.props);
    return (
      <Modal
        transparent={true}
        animationType="none"
        visible={this.props.isVisible}
        onRequestClose={() => {
          this.props.onCancel();
        }}
      >
        <View
          style={{
            margin: 50,
            alignItems: "stretch",
            justifyContent:"center",
            flexDirection: "column",
            backgroundColor: "blue"
          }}
        >
          <Text>Hello World!</Text>

          <Text>Hello World!</Text>
          <Text>Hello World!</Text>
          <Text>Hello World!</Text>
          <Text>Hello World!</Text>
          <Text>Hello World!</Text>
          <Text>Hello World!</Text>
          <Text>Hello World!</Text>
          <Text>Hello World!</Text>
          <TouchableHighlight
            onPress={() => {
              this.props.onConfirm();
            }}
          >
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </View>
      </Modal>
    );
  }
}
