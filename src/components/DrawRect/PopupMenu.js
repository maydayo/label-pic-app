import React, { Component } from "react";
import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";

export default class ModalExample extends Component {
  render() {
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
            backgroundColor: "white",
            margin: 70,
            alignItems: "stretch",
            flexDirection: "column"
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.onSelect("round");
            }}
          >
            <Text>round</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.onSelect("oblong");
            }}
          >
            <Text>oblong</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.onSelect("capsule");
            }}
          >
            <Text>capsule</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
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

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    alignItems: "center"
  }
});
