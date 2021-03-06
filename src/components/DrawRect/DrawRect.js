import React, { Component } from "react";
import { View, PanResponder, StyleSheet, BackHandler } from "react-native";
import Svg, { G, Rect } from "react-native-svg";
import Pen from "./tools/pen";
import LabelItem from "./LabelItem";
import PopupMenu from "./PopupMenu";

export default class Whiteboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      viewWidth: null,
      viewHeight: null,
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

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress = () => {
    if (this.state.previousRects.length != 0) {
      this.rewind();
      this.props.onUpdateLabelInfo(this.state.previousRects);
      return true;
    } else return false;
  };

  handleDrawPopup = () => {
    if (this.state.isPopup) return false;
    return true;
  };

  handleCancelPopup = () => {
    this.clearCurrent();
    this.setState({ isPopup: false });
  };

  handleSelectPopup = labelTag => {
    this.clearCurrent();
    this.addNewLabelItem(labelTag);
    this.setState({ isPopup: false });
  };

  rewind = () => {
    let rects = this.state.previousRects;
    rects.pop();
    this.setState({
      previousRects: [...rects]
    });
    this.clearCurrent();
  };

  clearCurrent = () => {
    this.setState({
      startPointX: null,
      startPointY: null,
      currentPointX: null,
      currentPointY: null,
      labelTag: ""
    });
  };
  renderRectElement = (rect, index) => {
    return <LabelItem rect={rect} key={index} pen={this.state.pen} />;
  };

  addNewLabelItem = labelTag => {
    let rects = this.state.previousRects;
    let newElement = {
      viewWidth: this.state.viewWidth,
      viewHeight: this.state.viewHeight,
      startPointX: this.state.startPointX,
      stopPointX: this.state.currentPointX,
      startPointY: this.state.startPointY,
      stopPointY: this.state.currentPointY,
      labelTag
    };
    this.setState({ previousRects: [...rects, newElement] }, () =>
      this.props.onUpdateLabelInfo(this.state.previousRects)
    );
  };

  onTouch(event) {
    let x, y;
    [x, y] = [event.nativeEvent.locationX, event.nativeEvent.locationY];
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
    this.setState({ isPopup: true });
  }

  render() {
    return (
      <View
        style={styles.drawContainer}
        onLayout={event => {
          let { width, height } = event.nativeEvent.layout;
          this.setState({ viewWidth: width, viewHeight: height });
        }}
        {...this._panResponder.panHandlers}
      >
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
              stroke={this.props.color || "#ffb10a"}
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
