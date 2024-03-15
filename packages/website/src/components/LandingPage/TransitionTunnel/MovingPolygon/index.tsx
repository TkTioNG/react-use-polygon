import { usePolygon } from "react-use-polygon";
import { motion, useAnimate } from "framer-motion";

import styles from "./styles.module.css";
import { useEffect } from "react";

interface MovingPolygonProps {
  id: number;
  n1: number;
  n2: number;
  removePolygon: (id: number) => void;
}

const ANIMATIONS = [
  {
    initial: {
      position: { x: -750, y: -120 },
    },
    enter: {
      x: [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
      y: [0, -10, -20, 0, 40, 40, 45, 65, 75, 90, 110, 120], // 120
      scale: [0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1, 1, 1, 1],
      rotate: 360,
    },
    roll: {
      x: 1100,
      y: 120,
      rotate: 540,
    },
    exit: {
      x: [1100, 1150, 1200, 1250, 1300, 1350, 1400],
      y: [120, 130, 110, 90, 60, 40, 30],
      scale: [1, 0.9, 0.8, 0.6, 0.4, 0.2, 0],
      rotate: 810,
    },
  },
  {
    initial: {
      position: { x: -750, y: -40 },
    },
    enter: {
      x: [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
      y: [0, -10, -10, 0, 10, 25, 40, 60, 70, 65, 55, 40], // 40
      scale: [0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1, 1, 1, 1],
      rotate: 360,
    },
    roll: {
      x: 1100,
      y: 40,
      rotate: 540,
    },
    exit: {
      x: [1100, 1150, 1200, 1250, 1300, 1350, 1400],
      y: [40, 10, -30, -70, -105, -135, -115],
      scale: [1, 0.9, 0.8, 0.6, 0.4, 0.2, 0],
      rotate: 810,
    },
  },
  {
    initial: {
      position: { x: -750, y: 40 },
    },
    enter: {
      x: [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
      y: [0, 10, 10, 0, 10, 25, 30, 10, -5, -35, -50, -40], // -40
      scale: [0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1, 1, 1, 1],
      rotate: 360,
    },
    roll: {
      x: 1100,
      y: -40,
      rotate: 540,
    },
    exit: {
      x: [1100, 1150, 1200, 1250, 1300, 1350, 1400],
      y: [-40, -10, 30, 70, 105, 135, 115],
      scale: [1, 0.9, 0.8, 0.6, 0.4, 0.2, 0],
      rotate: 810,
    },
  },
  {
    initial: {
      position: { x: -750, y: 120 },
    },
    enter: {
      x: [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
      y: [0, 20, 45, 80, 70, 65, 30, 20, 0, -30, -70, -120], // -120
      scale: [0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1, 1, 1, 1],
      rotate: 360,
    },
    roll: {
      x: 1100,
      y: -120,
      rotate: 540,
    },
    exit: {
      x: [1100, 1150, 1200, 1250, 1300, 1350, 1400],
      y: [-120, -130, -110, -90, -60, -40, -30],
      scale: [1, 0.9, 0.8, 0.6, 0.4, 0.2, 0],
      rotate: 810,
    },
  },
];

export default function MovingPolygon({
  id,
  n1,
  n2,
  removePolygon,
}: MovingPolygonProps) {
  const polygon = usePolygon({
    sides: n1 + 3,
    size: 90,
    ...ANIMATIONS[n2].initial,
  });

  const [scope, animate] = useAnimate();

  useEffect(() => {
    const enterAnimation = async (sc, an, n) => {
      if (sc.current) {
        await an(sc.current, ANIMATIONS[n].enter, {
          duration: 4,
          ease: "linear",
        });
        await an(
          sc.current,
          {
            ...ANIMATIONS[n].roll,
            stroke: "rgba(255, 255, 255, 0)",
            fill: "rgba(255, 255, 255, 1)",
          },
          {
            duration: 1,
            ease: "linear",
          }
        );
        await an(sc.current, ANIMATIONS[n].exit, {
          duration: 3,
          ease: "linear",
        });
        removePolygon(id);
      }
    };
    enterAnimation(scope, animate, n2);

    return () => {};
  }, []);

  return (
    <>
      <motion.path
        className={styles.movingPolygon}
        d={polygon.svgPath}
        ref={scope}
        initial={{
          stroke: "rgba(255, 255, 255, 1)",
          strokeWidth: 4,
          strokeDasharray: 12,
          strokeLinecap: "round",
          fill: "rgba(255, 255, 255, 0)",
        }}
      />
    </>
  );
}
