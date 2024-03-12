import { BasicSVGRenderer, useSquare } from "react-use-polygon";
import clsx from "clsx";

import styles from "./styles.module.css";

export default function SimpleUseSquare() {
  const square = useSquare({ size: 100 });

  return (
    <BasicSVGRenderer
      className={clsx("demo-svg", styles.simpleSquare)}
      primitives={square}
      viewBoxOptions={{ padding: { x: 350, y: 90 } }}
    >
      <text x="-430" y="-120">
        {"useSquare({ size: 100 });"}
      </text>
    </BasicSVGRenderer>
  );
}
