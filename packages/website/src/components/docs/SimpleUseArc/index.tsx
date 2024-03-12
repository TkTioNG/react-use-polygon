import { BasicSVGRenderer, useArc } from "react-use-polygon";

import styles from "./styles.module.css";

export default function SimpleUseArc() {
  const arc1 = useArc({ angle: 120 });
  const arc2 = useArc({ angle: 235, rotation: -108, position: { x: 350 } });

  return (
    <BasicSVGRenderer
      className={styles.simpleArc}
      primitives={[arc1, arc2]}
      viewBoxOptions={{ padding: { x: 100, y: 60 } }}
    >
      <text
        x="15"
        y="25"
        fill="white"
        fontFamily="Spline Sans Mono"
        fontSize="16px"
      >
        useArc(&lbrace; angle: 120 &rbrace;)
      </text>
    </BasicSVGRenderer>
  );
}
