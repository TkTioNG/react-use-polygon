import {
  useEllipse,
  useRectangle,
  useSector,
  useSectorCrescent,
  useSegment,
} from "react-use-polygon";
import { motion } from "framer-motion";

import styles from "./styles.module.css";

export function WarpPipeBack(props: any) {
  const headBackRingFace = useSectorCrescent({
    radius: 125,
    crescentRadius: 70,
    angle: 180,
    scale: { y: 0.4 },
    rotation: -90,
    position: { x: -150 },
  });
  const headPipeRingBody = useRectangle({
    width: 40,
    height: 250,
    position: { x: -130 },
  });
  const headInnerFace = useEllipse({
    xRadius: 28,
    yRadius: 70,
    position: { x: -150 },
  });
  const headInnerShadow = useSegment({
    radius: 50,
    angle: 135,
    scale: { y: 0.4 },
    rotation: -30,
    position: { x: -150 },
  });
  const backPipeBody = useRectangle({
    width: 300,
    height: 200,
  });

  return (
    <motion.g viewBox="-400 -200 800 400">
      <motion.path
        {...props}
        className={styles.pipeBody}
        d={backPipeBody.svgPath}
      />
      <motion.path
        {...props}
        className={styles.pipeRing}
        d={headPipeRingBody.svgPath}
      />
      <motion.path
        {...props}
        className={styles.backInnerFace}
        d={headInnerFace.svgPath}
      />
      <motion.path
        {...props}
        className={styles.backInnerShadow}
        d={headInnerShadow.svgPath}
      />
      <motion.path
        {...props}
        className={styles.backOpening}
        d={headBackRingFace.svgPath}
      />
    </motion.g>
  );
}

export function WarpPipeFront(props: any) {
  const headFrontRingFace = useSectorCrescent({
    radius: 125,
    crescentRadius: 70,
    angle: 180,
    scale: { y: 0.4 },
    rotation: 90,
    position: { x: -150.5 },
  });
  const headPipeRingEnd = useSector({
    radius: 125,
    angle: 180,
    scale: { y: 0.4 },
    rotation: 90,
    position: { x: -110.5 },
  });
  const mainPipeBody = useRectangle({
    width: 250,
    height: 200,
    position: { x: 25 },
  });
  const mainPipeEnd = useSector({
    radius: 100,
    angle: 180,
    scale: { y: 0.3 },
    rotation: 90,
    position: { x: 149 },
  });
  const backBackRingFace = useSectorCrescent({
    radius: 125,
    crescentRadius: 70,
    angle: 180,
    scale: { y: 0.4 },
    rotation: -90,
    position: { x: 150 },
  });
  const backFrontRingFace = useSectorCrescent({
    radius: 125,
    crescentRadius: 70,
    angle: 180,
    scale: { y: 0.4 },
    rotation: 90,
    position: { x: 149.5 },
  });
  const backPipeRingBody = useRectangle({
    width: 40,
    height: 250,
    position: { x: 170 },
  });
  const backPipeRingEnd = useSector({
    radius: 125,
    angle: 180,
    scale: { y: 0.4 },
    rotation: 90,
    position: { x: 190 },
  });

  return (
    <motion.g viewBox="-400 -200 800 400">
      <motion.path
        {...props}
        className={styles.backOpening}
        d={backBackRingFace.svgPath}
      />
      <motion.path
        {...props}
        className={styles.pipeRing}
        d={backPipeRingBody.svgPath}
      />
      <motion.path
        {...props}
        className={styles.pipeRing}
        d={backPipeRingEnd.svgPath}
      />
      <motion.path
        {...props}
        className={styles.frontOpening}
        d={backFrontRingFace.svgPath}
      />
      <motion.path
        {...props}
        className={styles.pipeBody}
        d={mainPipeBody.svgPath}
      />
      <motion.path
        {...props}
        className={styles.pipeEnd}
        d={mainPipeEnd.svgPath}
      />
      <motion.path
        {...props}
        className={styles.pipeRing}
        d={headPipeRingEnd.svgPath}
      />
      <motion.path
        {...props}
        className={styles.frontOpening}
        d={headFrontRingFace.svgPath}
      />
    </motion.g>
  );
}

export default function WarpPipe() {
  return (
    <svg viewBox="-400 -200 800 400">
      <WarpPipeBack />
      <WarpPipeFront />
    </svg>
  );
}
