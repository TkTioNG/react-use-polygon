import { BasicSVGRenderer, usePentagon } from "react-use-polygon";
import clsx from "clsx";

import styles from "./styles.module.css";

export default function SimpleUsePentagon() {
  const pentagon = usePentagon({ size: 100 });

  return (
    <BasicSVGRenderer
      className={clsx("demo-svg", styles.simplePentagon)}
      primitives={pentagon}
      viewBoxOptions={{ padding: { x: 350, y: 90 } }}
    >
      <text x="-430" y="-120">
        {"usePentagon({ size: 100 });"}
      </text>
    </BasicSVGRenderer>
  );
}
