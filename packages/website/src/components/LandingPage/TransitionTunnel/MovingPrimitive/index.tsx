import { usePolygon } from "react-use-polygon";
import { motion, useAnimate } from "framer-motion";

import styles from "./styles.module.css";
import { useEffect } from "react";

interface MovingPolygonProps {
  sides: number;
}

export default function MovingPolygon({ sides }: MovingPolygonProps) {
  const polygon = usePolygon({ sides, position: { x: -600 } });

  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      scope.current,
      { x: 400, y: 100 },
      { duration: 4, repeat: Infinity }
    );
  }, []);

  return (
    <>
      <motion.path
        className={styles.movingPolygon}
        d={polygon.svgPath}
        ref={scope}
      />
    </>
  );
}
