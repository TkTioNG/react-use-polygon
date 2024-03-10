import { Primitive } from "../primitives/usePrimitive";
import { boundingBoxToSVGViewBox } from "../utils/common";

export default function BasicSVGRenderer({
  primitive,
}: {
  primitive: Primitive;
}) {
  return (
    <svg viewBox={boundingBoxToSVGViewBox(primitive.boundingBox)}>
      <path d={primitive.svgPath} fill="green" />
    </svg>
  );
}
