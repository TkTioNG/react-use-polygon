import { BasicSVGRenderer, useCircle, useSVGViewBox } from "react-use-polygon";

import styles from "./styles.module.css";

export default function SVGPartiallySeenFixed() {
  const circle = useCircle();
  // highlight-next-line
  const viewBox = useSVGViewBox(circle, { padding: { x: 100, y: 25 } });

  return (
    <BasicSVGRenderer
      className={styles.partiallySeenFixed}
      primitives={circle}
      // highlight-next-line
      viewBox={viewBox}
    />
  );
}
