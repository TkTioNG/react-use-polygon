import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.css";
import WarpPipe from "./WarpPipe";
import MovingPolygon from "./MovingPolygon";
import WavyArc from "./WavyArc";

export default function TransitionTunnel() {
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
          <WavyArc />
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
