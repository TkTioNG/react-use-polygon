import { BasicSVGRenderer, useTriangle } from "react-use-polygon";
import clsx from "clsx";

import styles from "./styles.module.css";

export default function SimpleUseTriangle() {
  const triangle = useTriangle({ size: 100 });

  return (
    <BasicSVGRenderer
      className={clsx("demo-svg", styles.simpleTriangle)}
      primitives={triangle}
      viewBoxOptions={{ padding: { x: 350, y: 90 } }}
    >
      <text x="-430" y="-120">
        {"useTriangle({ size: 100 });"}
      </text>
    </BasicSVGRenderer>
  );
}
