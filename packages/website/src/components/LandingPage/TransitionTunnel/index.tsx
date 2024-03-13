import { useCircle } from "react-use-polygon";

import styles from "./styles.module.css";

const circles = Array(40)
  .fill(0)
  .map((v, i) => i);

const midpoint = circles.length / 2;

export default function TransitionTunnel() {
  const { svgPath } = useCircle({ radius: 120 });

  console.log({ circles });

  return (
    <div className={styles.transitionTunnel}>
      <svg className={styles.tunnelLane} viewBox="-600 -200 1200 400">
        <g>
          {circles.map((circle) => (
            <path
              key={circle}
              d={svgPath}
              className={styles.tunnelRing}
              style={{ transform: `translateX(${(circle - midpoint) * 20}px)` }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
