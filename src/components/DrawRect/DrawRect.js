import React, { Component } from "react";
import { View, PanResponder, StyleSheet, Platform } from "react-native";
import Svg, { G, Path, Rect } from "react-native-svg";
import Pen from "./tools/pen";
import Label from "./Label"

const { OS } = Platform;

export default class Whiteboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      startPointX: null,
      startPointY: null,
      currentPointX: null,
      currentPointY: null,
      previousRects: [],
      pen: new Pen()
    };
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gs) => true,
      onMoveShouldSetPanResponder: (event, gs) => true,
      onPanResponderGrant: (event, gs) => this.onResponderGrant(event, gs),
      onPanResponderMove: (event, gs) => this.onResponderMove(event, gs),
      onPanResponderRelease: (event, gs) => this.onResponderRelease(event, gs)
    });
  }

  rewind = () => {
    if (this.state.previousRects.length < 1) return;
    let rects = this.state.previousRects;
    rects.pop();

    this.setState({
      previousRects: [...rects],
      startPointX: null,
      startPointY: null,
      currentPointX: null,
      currentPointY: null
    });
  };

  _renderRectElement = (rect, index) => {
    return (
        <Label rect={rect} key={index} pen={this.state.pen} />
    //   <Rect
    //     {...this.state.pen.pointsToSvgRect(
    //       rect.startPointX,
    //       rect.startPointY,
    //       rect.stopPointX,
    //       rect.stopPointY
    //     )}
    //     key={index}
    //     stroke={this.props.color || "#ff00ff"}
    //     strokeWidth={this.props.strokeWidth || 2}
    //     fill="none"
    //   />
    );
  };

  onTouch(event) {
    let x, y, timpstamp;
    [x, y, timestamp] = [
      event.nativeEvent.locationX,
      event.nativeEvent.locationY,
      event.nativeEvent.timestamp
    ];
    return { x, y };
  }

  onResponderGrant(event) {
    let { x, y } = this.onTouch(event);
    this.setState({ startPointX: x, startPointY: y });
  }

  onResponderMove(event) {
    let { x, y } = this.onTouch(event);
    this.setState({ currentPointX: x, currentPointY: y });
  }

  onResponderRelease() {
    let rects = this.state.previousRects;
    let newElement = {
      startPointX: this.state.startPointX,
      stopPointX: this.state.currentPointX,
      startPointY: this.state.startPointY,
      stopPointY: this.state.currentPointY
    };
    this.setState({ previousRects: [...rects, newElement] });
  }

  render() {
    return (
      <View style={styles.drawContainer} {...this._panResponder.panHandlers}>
        <Svg style={styles.drawSurface}>
          <G>
            {this.state.previousRects.map((rect, index) => {
              return this._renderRectElement(rect, index);
            })}
            <Rect
              {...this.state.pen.pointsToSvgRect(
                this.state.startPointX,
                this.state.startPointY,
                this.state.currentPointX,
                this.state.currentPointY
              )}
              stroke={this.props.color || "#ff00ff"}
              strokeWidth={this.props.strokeWidth || 2}
              fill="none"
            />
          </G>
        </Svg>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  drawContainer: {
    flex: 1,
    display: "flex"
  },
  svgContainer: {
    flex: 1
  },
  drawSurface: {
    flex: 1
  }
});
