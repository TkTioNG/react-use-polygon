import { useArc, useCircle, useSquare } from "react-use-polygon";
import { animate, delay, motion, transform } from "framer-motion";

import styles from "./styles.module.css";
import WarpPipe, { WarpPipeBack, WarpPipeFront } from "./WarpPipe";

const circles = Array(40)
  .fill(0)
  .map((v, i) => i);
const circleCount = circles.length;
const midpoint = (circleCount - 1) / 2;

export default function TransitionTunnel() {
  const { svgPath } = useCircle({ radius: 120 });
  const { svgPath: backArcPath } = useArc({
    radius: 120,
    angle: 180,
    rotation: -90,
  });
  const { svgPath: frontArcPath } = useArc({
    radius: 120,
    angle: 180,
    rotation: 90,
  });
  const square = useSquare();

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

  const primitiveVariants = {
    initial: (custom) => ({
      x: -600,
      scale: 0.8,
    }),
    animate: (custom: number) => ({
      x: 600,
      scale: 1.0,
      transition: {
        repeat: Infinity,
        repeatDelay: 0.5,
        duration: 3.5,
      },
    }),
  };

  const warpPipeVariants = {
    animate: {
      scale: [1.0, 0.5, 1.02, 1.0],
      transition: {
        repeat: Infinity,
        repeatDelay: 0.5,
        duration: 3.5,
      },
    },
  };

  return (
    <div className={styles.transitionTunnel}>
      <svg className={styles.tunnelLane} viewBox="-600 -200 1200 400">
        <g>
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
          <WarpPipeBack animate="animate" variants={warpPipeVariants} />
          <motion.path
            d={square.svgPath}
            variants={primitiveVariants}
            initial="initial"
            animate="animate"
          />
          <WarpPipeFront animate="animate" variants={warpPipeVariants} />
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
        </g>
      </svg>
      <WarpPipe />
    </div>
  );
}
