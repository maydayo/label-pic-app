import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Rect } from "react-native-svg";

export default props => {
  return (
    <View style={styles.container}>
      <Rect
        {...props.pen.pointsToSvgRect(
          props.rect.startPointX,
          props.rect.startPointY,
          props.rect.stopPointX,
          props.rect.stopPointY
        )}
        stroke={this.props.color || "#ff00ff"}
        strokeWidth={this.props.strokeWidth || 2}
        fill="none"
      />
      <Text style={{ color: "#ff00ff", top: props.rect.startPointY, left: props.rect.startPointX }}>
        label
      </Text>
    </View>
  );
};

let styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
