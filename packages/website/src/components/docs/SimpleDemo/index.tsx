import { BasicSVGRenderer, useTriangle } from "react-use-polygon";

import styles from "./styles.module.css";

export default function SimpleTriangle() {
  const triangle = useTriangle();

  return (
    <BasicSVGRenderer
      className={styles.simpleTriangle}
      primitives={triangle}
      viewBoxOptions={{ padding: { x: 150, y: 40 } }}
    />
  );
}
