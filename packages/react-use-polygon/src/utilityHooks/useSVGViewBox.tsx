import { useMemo } from "react";
import computeSVGViewBox, {
  ComputeSVGViewBoxOptions,
} from "../helperFunctions/computeSVGViewBox";
import { BoundingBox } from "../types";

export default function useSVGViewBox(
  boundingBox: BoundingBox,
  { padding }: ComputeSVGViewBoxOptions = {}
) {
  return useMemo(
    () => computeSVGViewBox(boundingBox, { padding }),
    [boundingBox, padding]
  );
}
