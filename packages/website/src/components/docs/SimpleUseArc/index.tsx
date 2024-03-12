import { BasicSVGRenderer, useArc } from "react-use-polygon";
import clsx from "clsx";

import styles from "./styles.module.css";

export default function SimpleUseArc() {
  const arc1 = useArc({ angle: 120 });
  const arc2 = useArc({ angle: 235, rotation: -108, position: { x: 400 } });

  return (
    <BasicSVGRenderer
      className={clsx("demo-svg", styles.simpleArc)}
      primitives={[arc1, arc2]}
      viewBoxOptions={{ padding: { x: 150, y: 100 } }}
    >
      <text x="-230" y="-170">
        {"useArc({ angle: 120 });"}
      </text>
      <text x="250" y="180">
        {"useArc({ angle: 235, rotation: -108 });"}
      </text>
    </BasicSVGRenderer>
  );
}
