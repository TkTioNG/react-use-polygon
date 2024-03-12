import { BasicSVGRenderer, usePolygon } from "react-use-polygon";

import styles from "./styles.module.css";

export default function SimpleThreePolygons() {
  const triangle = usePolygon({ sides: 3, size: 92, position: { y: 12 } });
  const square = usePolygon({ sides: 4, position: { x: 150 } });
  const pentagon = usePolygon({
    sides: 5,
    size: 80,
    position: { x: 300, y: 3 },
  });

  return (
    <BasicSVGRenderer
      className={styles.simplePolygon}
      primitives={[triangle, square, pentagon]}
      viewBoxOptions={{ padding: 50 }}
    />
  );
}
