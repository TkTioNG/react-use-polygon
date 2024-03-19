import { useArc } from "react-use-polygon";
import { motion } from "framer-motion";

import styles from "./styles.module.css";

const circles = Array(40)
  .fill(0)
  .map((v, i) => i);
const circleCount = circles.length;
const midpoint = (circleCount - 1) / 2;

export default function RingChain() {
  const { svgPath: backArcPath } = useArc({
    radius: 120,
    angle: 180,
    rotate: -90,
  });
  const { svgPath: frontArcPath } = useArc({
    radius: 120,
    angle: 180,
    rotate: 90,
  });

  const tunnelRingVariants = {
    initial: (custom) => ({
      x: (custom - midpoint) * 20,
    }),
    animate: (custom: number) => ({
      x: [
        (custom - midpoint) * 20,
        (custom - midpoint) * 19,
        (custom - midpoint) * 20.5,
        (custom - midpoint) * 20,
      ],
      scale: [1.0, 0.96, 1.02, 1.0],
      opacity: [0.35, 0.85, 0.45, 0.35],
      transition: {
        repeat: Infinity,
        repeatDelay: 0.5,
        duration: 3.5,
        delay: custom * 0.04,
      },
    }),
  };

  return (
    <motion.g>
      {circles.map((circle) => (
        <motion.path
          key={circle + circleCount}
          d={frontArcPath}
          className={styles.tunnelRingFront}
          custom={circle}
          initial="initial"
          animate="animate"
          variants={tunnelRingVariants}
        />
      ))}
      {circles.map((circle) => (
        <motion.path
          key={circle}
          d={backArcPath}
          className={styles.tunnelRingBack}
          custom={circle}
          initial="initial"
          animate="animate"
          variants={tunnelRingVariants}
        />
      ))}
    </motion.g>
  );
}
