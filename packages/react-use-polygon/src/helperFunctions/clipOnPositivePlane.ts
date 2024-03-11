import { Primitive } from "../primitives/usePrimitive";
import { Vertex } from "../types";

export default function clipOnPositivePlane(vertices: Vertex[]): Vertex[];
export default function clipOnPositivePlane(primitive: Primitive): Primitive;
export default function clipOnPositivePlane(data: Vertex[] | Primitive) {
  return data;
}
