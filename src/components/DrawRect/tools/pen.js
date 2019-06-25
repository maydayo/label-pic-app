export default class Pen {
  pointsToSvgRect(startPointX, startPointY, stopPointX, stopPointY) {
    props = {
      x: startPointX,
      y: startPointY,
      width: stopPointX - startPointX,
      height: stopPointY - startPointY
    };
    return props;
  }
}
