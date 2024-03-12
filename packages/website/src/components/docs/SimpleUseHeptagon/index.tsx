import { BasicSVGRenderer, useHeptagon } from "react-use-polygon";
import clsx from "clsx";

import styles from "./styles.module.css";

export default function SimpleUseHeptagon() {
  const heptagon = useHeptagon({ size: 100 });

  return (
    <BasicSVGRenderer
      className={clsx("demo-svg", styles.simpleHeptagon)}
      primitives={heptagon}
      viewBoxOptions={{ padding: { x: 350, y: 90 } }}
    >
      <text x="-430" y="-120">
        {"useHeptagon({ size: 100 });"}
      </text>
    </BasicSVGRenderer>
  );
}
