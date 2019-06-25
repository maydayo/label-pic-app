import React, { Component } from "react";
import { Modal, Text, TouchableOpacity, View, Alert } from "react-native";

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
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: "blue"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.onSelect("round");
            }}
          >
            <Text>round</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.onSelect("oblong");
            }}
          >
            <Text>oblong</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.onSelect("capsule");
            }}
          >
            <Text>capsule</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.onSelect("other");
            }}
          >
            <Text>other</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
