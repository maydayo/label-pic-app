import React, { Component } from "react";
import { View, PanResponder, StyleSheet, Platform } from "react-native";
import Svg, { G, Path, Rect } from "react-native-svg";
import Pen from "./tools/pen";
import Point from './tools/point'

const { OS } = Platform;

export default class Whiteboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        startPointX: null,
        startPointY: null,
        currentPointX: null,
        currentPointY: null,
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

  onTouch(event) {
    let x, y, timpstamp;
    [x, y, timestamp] = [
      event.nativeEvent.locationX,
      event.nativeEvent.locationY,
      event.nativeEvent.timestamp
    ];
    return {x, y};
  }

  onResponderGrant(event) {
    let {x, y} = this.onTouch(event);
    this.setState({ startPointX:x, startPointY:y });
  }

  onResponderMove(event) {
    let {x, y} = this.onTouch(event);
    this.setState({ currentPointX:x, currentPointY:y });
  }

  onResponderRelease() {
    // let strokes = this.state.previousStrokes;
    // if (this.state.currentPoints.length < 1) return;
    // let points = this.state.currentPoints;
    // if (points.length === 1) {
    //   let p = points[0];
    //   let distance = parseInt(Math.sqrt(this.props.strokeWidth || 4) / 2);
    //   points.push(new Point(p.x + distance, p.y + distance, p.time));
    // }
    // let newElement = {
    //   type: "Path",
    //   attributes: {
    //     d: this.state.pen.pointsToSvg(points),
    //     stroke: this.props.color || "#000000",
    //     strokeWidth: this.props.strokeWidth || 4,
    //     fill: "none",
    //     strokeLinecap: "round",
    //     strokeLinejoin: "round"
    //   }
    // };
    // this.state.pen.addStroke(points);
    // this.setState(
    //   {
    //     previousStrokes: [...this.state.previousStrokes, newElement],
    //     currentPoints: []
    //   },
    //   () => {
    //     this._onChangeStrokes(this.state.previousStrokes);
    //   }
    // );
  }

  render() {
      console.log(this.state.startPointX,this.state.startPointY)
    return (
      <View style={styles.drawContainer} {...this._panResponder.panHandlers}>
        <Svg style={styles.drawSurface}>
          <G>
            <Rect
              {...this.state.pen.pointsToSvgRect(
                this.state.startPointX,
                this.state.startPointY,
                this.state.currentPointX,
                this.state.currentPointY
              )}
              stroke={this.props.color || "#000000"}
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
