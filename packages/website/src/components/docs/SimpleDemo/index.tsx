import { BasicSVGRenderer, useTriangle } from "react-use-polygon";
import clsx from "clsx";

import styles from "./styles.module.css";

export default function SimpleDemo() {
  const triangle = useTriangle();

  return (
    <BasicSVGRenderer
      className={clsx("demo-svg", styles.simpleDemo)}
      primitives={triangle}
      viewBoxOptions={{ padding: { x: 150, y: 40 } }}
    />
  );
}
