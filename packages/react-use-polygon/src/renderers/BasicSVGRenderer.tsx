import computeSVGViewBox from "../helperFunctions/computeSVGViewBox";
import { Primitive } from "../primitives/usePrimitive";

export default function BasicSVGRenderer({
  primitive,
}: {
  primitive: Primitive;
}) {
  return (
    <svg viewBox={computeSVGViewBox(primitive.boundingBox)}>
      <path d={primitive.svgPath} fill="green" />
    </svg>
  );
}
