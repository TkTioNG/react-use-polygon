// highlight-next-line
import { BasicSVGRenderer, useTriangle } from "react-use-polygon";

import styles from "./styles.module.css";

export default function SimpleDemo() {
  // highlight-next-line
  const triangle = useTriangle();

  return (
    <BasicSVGRenderer
      className={styles.simpleDemo}
      primitives={triangle}
      viewBoxOptions={{ padding: { x: 150, y: 40 } }} // Not required, depends on how you render
    />
  );
}
