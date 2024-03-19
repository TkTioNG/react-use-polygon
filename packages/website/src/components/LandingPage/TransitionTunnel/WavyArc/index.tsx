import { useArc } from "react-use-polygon";
import { motion } from "framer-motion";

import styles from "./styles.module.css";

const waves = Array(50)
  .fill(0)
  .map((v, i) => i);
const waveCount = waves.length;
const midpoint = (waveCount - 1) / 2;

export default function WavyArc() {
  const { svgPath: a1 } = useArc({
    radius: 50,
    angle: 180,
    rotate: 90,
    scale: { y: 0.2 },
    position: { y: -150 },
  });
  const { svgPath: a2 } = useArc({
    radius: 50,
    angle: 180,
    rotate: -90,
    scale: { y: 0.2 },
    position: { y: -50 },
  });
  const { svgPath: a3 } = useArc({
    radius: 50,
    angle: 180,
    rotate: 90,
    scale: { y: 0.2 },
    position: { y: 50 },
  });
  const { svgPath: a4 } = useArc({
    radius: 50,
    angle: 180,
    rotate: -90,
    scale: { y: 0.2 },
    position: { y: 150 },
  });

  const gap = 20;
  const pushOffset = 25;
  const pullOffset = 5;

  const variants = {
    initial: (custom) => ({
      x: custom * gap,
    }),
    animate: (custom) => ({
      x: [
        custom * gap,
        custom * gap + pushOffset,
        custom * gap - pullOffset,
        custom * gap,
      ],
      scale: [1.0, 1.1, 0.96, 1.0],
      opacity: [0.35, 0.9, 0.75, 0.35],
      transition: {
        delay: custom * 0.05,
        repeat: Infinity,
        duration: 1.5,
        repeatDelay: 1.0,
      },
    }),
  };

  return (
    <motion.g>
      {waves.map((i) => (
        <motion.g
          key={i}
          custom={i - midpoint}
          variants={variants}
          initial="initial"
          animate="animate"
        >
          <motion.path d={a1} className={styles.ringChain} />
          <motion.path d={a2} className={styles.ringChain} />
          <motion.path d={a3} className={styles.ringChain} />
          <motion.path d={a4} className={styles.ringChain} />
        </motion.g>
      ))}
    </motion.g>
  );
}
