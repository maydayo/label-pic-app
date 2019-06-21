export default class Pen {
  constructor(strokes) {
    this.strokes = strokes || [];
    this._offsetX = 0;
    this._offsetY = 0;
  }

  addStroke(points) {
    if (points.length > 0) {
      this.strokes.push(points);
    }
  }

  rewindStroke() {
    if (this.strokes.length < 1) return;
    this.strokes.pop();
  }

  setOffset(options) {
    if (!options) return;
    this._offsetX = options.x;
    this._offsetY = options.y;
  }

  pointsToSvg(points) {
    let offsetX = this._offsetX;
    let offsetY = this._offsetY;
    if (points.length > 0) {
      var path = `M ${points[0].x},${points[0].y}`;
      points.forEach(point => {
        path = path + ` L ${point.x},${point.y}`;
      });
      return path;
    } else {
      return "";
    }
  }

  pointsToSvgRect(startPointX, startPointY, stopPointX, stopPointY) {
    if (true) {
        props = {
            x:startPointX,
            y:startPointY,
            width:stopPointX - startPointX,
            height: stopPointY - startPointY
        }
    //   props = {
    //     x: startPoint.x,
    //     y: startPoint.y,
    //     width: stopPoint.x - startPoint.x,
    //     height: stopPoint.y - startPoint.y
    //   };
      return props;
    }
    return null;
  }

  clear = () => {
    this.strokes = [];
  };

  copy() {
    return new Reaction(this.strokes.slice());
  }
}
