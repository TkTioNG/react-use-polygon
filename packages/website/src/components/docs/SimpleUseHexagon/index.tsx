import { BasicSVGRenderer, useHexagon } from "react-use-polygon";
import clsx from "clsx";

import styles from "./styles.module.css";

export default function SimpleUseHexagon() {
  const hexagon = useHexagon({ size: 100 });

  return (
    <BasicSVGRenderer
      className={clsx("demo-svg", styles.simpleHexagon)}
      primitives={hexagon}
      viewBoxOptions={{ padding: { x: 350, y: 90 } }}
    >
      <text x="-430" y="-120">
        {"useHexagon({ size: 100 });"}
      </text>
    </BasicSVGRenderer>
  );
}
