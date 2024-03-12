import { useMemo } from "react";
import computeSVGViewBox, {
  ComputeSVGViewBoxOptions,
} from "../helperFunctions/computeSVGViewBox";
import { BoundingBox } from "../types";
import { Primitive } from "../primitives/usePrimitive";

export default function useSVGViewBox(
  primitives:
    | Primitive
    | { boundingBox: BoundingBox }
    | (Primitive | { boundingBox: BoundingBox })[],
  { padding, x, y, width, height }: ComputeSVGViewBoxOptions = {}
) {
  return useMemo(
    () => computeSVGViewBox(primitives, { padding, x, y, width, height }),
    [primitives, padding, x, y, width, height]
  );
}
