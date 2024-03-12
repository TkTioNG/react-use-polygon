import { BasicSVGRenderer, useCircle } from "react-use-polygon";
import clsx from "clsx";

import styles from "./styles.module.css";

export default function SimpleUseCircle() {
  const circle = useCircle({ radius: 100 });

  return (
    <BasicSVGRenderer
      className={clsx("demo-svg", styles.simpleCircle)}
      primitives={circle}
      viewBoxOptions={{ padding: { x: 350, y: 90 } }}
    >
      <text x="-430" y="-160">
        {"useCircle({ radius: 100 });"}
      </text>
    </BasicSVGRenderer>
  );
}
