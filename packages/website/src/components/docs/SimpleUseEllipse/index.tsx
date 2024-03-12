import { BasicSVGRenderer, useEllipse } from "react-use-polygon";
import clsx from "clsx";

import styles from "./styles.module.css";

export default function SimpleUseEllipse() {
  const ellipse = useEllipse({ xRadius: 100, yRadius: 60 });

  return (
    <BasicSVGRenderer
      className={clsx("demo-svg", styles.simpleEllipse)}
      primitives={ellipse}
      viewBoxOptions={{ padding: { x: 350, y: 90 } }}
    >
      <text x="-430" y="-120">
        {"useEllipse({ xRadius: 100, yRadius: 60 });"}
      </text>
    </BasicSVGRenderer>
  );
}
