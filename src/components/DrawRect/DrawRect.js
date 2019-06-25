import React, { Component } from "react";
import { View, PanResponder, StyleSheet, Platform } from "react-native";
import Svg, { G, Path, Rect } from "react-native-svg";
import Pen from "./tools/pen";
import LabelItem from "./LabelItem";
import PopupMenu from "./PopupMenu";

export default class Whiteboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      startPointX: null,
      startPointY: null,
      currentPointX: null,
      currentPointY: null,
      previousRects: [],
      pen: new Pen(),
      isPopup: false
    };
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => this.handleDrawPopup(),
      onMoveShouldSetPanResponder: () => this.handleDrawPopup(),
      onPanResponderGrant: (event, gs) => this.onResponderGrant(event, gs),
      onPanResponderMove: (event, gs) => this.onResponderMove(event, gs),
      onPanResponderRelease: (event, gs) => this.onResponderRelease(event, gs)
    });
  }

  handleDrawPopup = () => {
    if (this.state.isPopup) return false;
    return true;
  };

  handleCancelPopup = () => {
    this.rewind();
    this.setState({ isPopup: false });
  };

  handleSelectPopup = labelTag => {
    this.addNewLabelItem(labelTag)
    this.setState({ isPopup: false });
  };

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

  renderRectElement = (rect, index) => {
    return <LabelItem rect={rect} key={index} pen={this.state.pen} />;
  };

  addNewLabelItem = (labelTag) =>{
    let rects = this.state.previousRects;
    let newElement = {
      startPointX: this.state.startPointX,
      stopPointX: this.state.currentPointX,
      startPointY: this.state.startPointY,
      stopPointY: this.state.currentPointY,
      labelTag
    };
    this.setState({ previousRects: [...rects, newElement] });
  }

  onTouch(event) {
    let x, y;
    [x, y] = [
      event.nativeEvent.locationX,
      event.nativeEvent.locationY,
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
    this.setState({isPopup: true})
  }

  render() {
    return (
      <View style={styles.drawContainer} {...this._panResponder.panHandlers}>
        <PopupMenu
          style={styles.drawSurface}
          isVisible={this.state.isPopup}
          onCancel={this.handleCancelPopup}
          onSelect={this.handleSelectPopup}
        />
        <Svg style={styles.drawSurface}>
          <G>
            {this.state.previousRects.map((rect, index) => {
              return this.renderRectElement(rect, index);
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
