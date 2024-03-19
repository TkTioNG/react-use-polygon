import { BasicSVGRenderer, useCircle } from "react-use-polygon";

import styles from "./styles.module.css";

export default function SVGPartiallySeen() {
  const circle = useCircle();

  return (
    <BasicSVGRenderer
      className={styles.partiallySeen}
      primitives={circle}
      viewBoxOptions={{ x: 0, y: 0, width: 400, height: 200 }}
    />
  );
}
