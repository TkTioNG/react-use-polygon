import { usePolygon } from "react-use-polygon";
import DocsSVGRenderer from "../../DocsSVGRenderer";

export default function SimpleThreePolygons() {
  const triangle = usePolygon({
    sides: 3,
    size: 185,
    position: { x: -260, y: 25 },
  });
  const square = usePolygon({ sides: 4, size: 200 });
  const pentagon = usePolygon({
    sides: 5,
    size: 165,
    position: { x: 260, y: 5 },
  });

  return (
    <DocsSVGRenderer primitives={[triangle, square, pentagon]}>
      <text x="-433" y="-172">
        {"usePolygon({ sides: 3 });"}
      </text>
      <text x="-115" y="184">
        {"usePolygon({ sides: 4 });"}
      </text>
      <text x="192" y="-172">
        {"usePolygon({ sides: 5 });"}
      </text>
    </DocsSVGRenderer>
  );
}
