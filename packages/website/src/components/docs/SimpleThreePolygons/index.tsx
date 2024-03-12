import { BasicSVGRenderer, usePolygon } from "react-use-polygon";
import clsx from "clsx";

import styles from "./styles.module.css";

export default function SimpleThreePolygons() {
  const triangle = usePolygon({ sides: 3, size: 136, position: { y: 15 } });
  const square = usePolygon({ sides: 4, size: 150, position: { x: 250 } });
  const pentagon = usePolygon({
    sides: 5,
    size: 120,
    position: { x: 500, y: 5 },
  });

  return (
    <BasicSVGRenderer
      className={clsx("demo-svg", styles.simplePolygon)}
      primitives={[triangle, square, pentagon]}
      viewBoxOptions={{ padding: { x: 100, y: 80 } }}
    >
      <text x="-140" y="-105">
        {"usePolygon({ sides: 3 });"}
      </text>
      <text x="250" y="30">
        {"usePolygon({ sides: 4 });"}
      </text>
      <text x="250" y="-20">
        {"usePolygon({ sides: 5 });"}
      </text>
    </BasicSVGRenderer>
  );
}
