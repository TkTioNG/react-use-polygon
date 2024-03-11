import { BoundingBox } from "../types";

export interface ComputeSVGViewBoxOptions {
  padding?:
    | number
    | { x?: number; y?: number }
    | { top?: number; left?: number; right?: number; bottom?: number };
}

// Does not take into account of stroke width, hence need padding options
export default function computeSVGViewBox(
  boundingBox: BoundingBox,
  options?: ComputeSVGViewBoxOptions
) {
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

  const x = boundingBox.x - pl;
  const y = boundingBox.y - pt;
  const width = boundingBox.width + pl + pr;
  const height = boundingBox.height + pt + pb;

  return `${x} ${y} ${width} ${height}`;
}
