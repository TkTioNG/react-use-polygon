import clsx from "clsx";
import { BasicSVGRenderer } from "react-use-polygon";

import styles from "./styles.module.css";

export default function DocsSVGRenderer(
  props: Parameters<typeof BasicSVGRenderer>[0]
) {
  const { children, className, ...otherProps } = props;
  return (
    <BasicSVGRenderer
      className={clsx(styles.demoSVG, className)}
      {...otherProps}
      viewBoxOptions={{ x: -450, y: -200, width: 900, height: 400 }}
    >
      {children}
    </BasicSVGRenderer>
  );
}
