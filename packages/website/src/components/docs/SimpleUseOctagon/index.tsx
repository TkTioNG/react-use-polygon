import { BasicSVGRenderer, useOctagon } from "react-use-polygon";
import clsx from "clsx";

import styles from "./styles.module.css";

export default function SimpleUseOctagon() {
  const octagon = useOctagon({ size: 100 });

  return (
    <BasicSVGRenderer
      className={clsx("demo-svg", styles.simpleOctagon)}
      primitives={octagon}
      viewBoxOptions={{ padding: { x: 350, y: 90 } }}
    >
      <text x="-430" y="-120">
        {"useOctagon({ size: 100 });"}
      </text>
    </BasicSVGRenderer>
  );
}
