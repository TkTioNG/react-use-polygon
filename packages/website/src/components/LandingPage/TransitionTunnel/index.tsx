import { useArc } from "react-use-polygon";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.css";
import WarpPipe from "./WarpPipe";
import MovingPolygon from "./MovingPolygon";

const circles = Array(40)
  .fill(0)
  .map((v, i) => i);
const circleCount = circles.length;
const midpoint = (circleCount - 1) / 2;

export default function TransitionTunnel() {
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

  const [polygons, setPolygons] = useState([]);
  const polygonCount = useRef(0);
  const polygonTimeout = useRef(null);

  useEffect(() => {
    const createMovingPrimitive = () => {
      const n1 = Math.floor(Math.random() * 4);
      const n2 = Math.floor(Math.random() * 4);

      polygonCount.current += 1;
      setPolygons((prevPrimitives) => [
        ...prevPrimitives,
        { key: polygonCount.current, n1, n2 },
      ]);
      polygonTimeout.current = setTimeout(
        () => createMovingPrimitive(),
        Math.random() * 2500 + 500
      );
    };
    createMovingPrimitive();

    return () => {
      clearTimeout(polygonTimeout.current);
    };
  }, []);

  const removePolygon = (key) => {
    setPolygons((oldPolygons) =>
      oldPolygons.filter(({ key: polygonKey }) => polygonKey !== key)
    );
  };

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

  const warpPipeVariants = {
    animate: {
      scale: [1.0, 0.85, 1.05, 1.0],
      transition: {
        repeat: Infinity,
        repeatDelay: 0.5,
        duration: 1.5,
      },
    },
  };
  return (
    <div className={styles.transitionTunnel}>
      <svg className={styles.tunnelLane} viewBox="-600 -200 1200 400">
        <g>
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
          <WarpPipe isBack animate="animate" variants={warpPipeVariants} />
          {polygons.map(({ key, n1, n2 }) => (
            <MovingPolygon
              key={key}
              id={key}
              n1={n1}
              n2={n2}
              removePolygon={removePolygon}
            />
          ))}
          <WarpPipe isFront animate="animate" variants={warpPipeVariants} />
        </g>
      </svg>
    </div>
  );
}
