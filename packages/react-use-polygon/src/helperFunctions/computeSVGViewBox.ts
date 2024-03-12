import { Primitive } from "../primitives/usePrimitive";
import { BoundingBox } from "../types";

export interface ComputeSVGViewBoxOptions {
  padding?:
    | number
    | { x?: number; y?: number }
    | { top?: number; left?: number; right?: number; bottom?: number };
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

// Does not take into account of stroke width, hence need padding options
export default function computeSVGViewBox(
  primitives:
    | Primitive
    | { boundingBox: BoundingBox }
    | (Primitive | { boundingBox: BoundingBox })[],
  options?: ComputeSVGViewBoxOptions
) {
  if (
    options?.x != undefined &&
    options?.y != undefined &&
    options?.width != undefined &&
    options?.height != undefined &&
    options?.width >= 0 &&
    options?.height >= 0
  ) {
    // If x, y, width, height, options are all given and valid, return them instead
    return `${options.x} ${options.y} ${options.width} ${options.height}`;
  }

  const data = Array.isArray(primitives) ? primitives : [primitives];

  let minX = 0;
  let minY = 0;
  let maxX = 0;
  let maxY = 0;

  data.forEach(({ boundingBox }) => {
    const boundingMaxX = boundingBox.x + boundingBox.width;
    const boundingMaxY = boundingBox.y + boundingBox.height;

    if (boundingBox.x < minX) minX = boundingBox.x;
    if (boundingBox.y < minY) minY = boundingBox.y;
    if (boundingMaxX > maxX) maxX = boundingMaxX;
    if (boundingMaxY > maxY) maxY = boundingMaxY;
  });

  let pt: number = 0;
  let pl: number = 0;
  let pr: number = 0;
  let pb: number = 0;

  if (options?.padding) {
    if (typeof options.padding === "number") {
      pt = pl = pr = pb = options.padding;
    } else if ("x" in options.padding || "y" in options.padding) {
      pl = pr = options.padding.x ?? 0;
      pt = pb = options.padding.y ?? 0;
    } else if (
      "top" in options.padding ||
      "left" in options.padding ||
      "right" in options.padding ||
      "bottom" in options.padding
    ) {
      pt = options.padding.top ?? 0;
      pl = options.padding.left ?? 0;
      pr = options.padding.right ?? 0;
      pb = options.padding.bottom ?? 0;
    }
  }

  const x = minX - pl;
  const y = minY - pt;
  const width = maxX - minX + pl + pr;
  const height = maxY - minY + pt + pb;

  return `${x} ${y} ${width} ${height}`;
}
