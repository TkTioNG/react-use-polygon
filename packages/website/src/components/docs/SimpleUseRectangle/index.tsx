import { BasicSVGRenderer, useRectangle } from "react-use-polygon";
import clsx from "clsx";

import styles from "./styles.module.css";

export default function SimpleUseRectangle() {
  const rectangle = useRectangle({ width: 120, height: 80 });

  return (
    <BasicSVGRenderer
      className={clsx("demo-svg", styles.simpleRectangle)}
      primitives={rectangle}
      viewBoxOptions={{ padding: { x: 350, y: 90 } }}
    >
      <text x="-430" y="-120">
        {"useRectangle({ size: 100 });"}
      </text>
    </BasicSVGRenderer>
  );
}
