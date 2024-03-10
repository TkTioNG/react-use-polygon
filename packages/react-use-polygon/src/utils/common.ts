import { BoundingBox } from "../types";

// Does not take into account of stroke width
export function boundingBoxToSVGViewBox(boundingBox: BoundingBox) {
  return `${boundingBox.x} ${boundingBox.y} ${boundingBox.width} ${boundingBox.height}`;
}
