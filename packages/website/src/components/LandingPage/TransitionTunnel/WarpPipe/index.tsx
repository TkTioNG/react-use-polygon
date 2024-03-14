import {
  useEllipse,
  useRectangle,
  useSector,
  useSectorCrescent,
  useSegment,
} from "react-use-polygon";
import { motion } from "framer-motion";

import styles from "./styles.module.css";

export default function WarpPipe({ isFront, isBack, ...otherProps }: any) {
  // Back
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

  // Front
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
    // <svg viewBox="-400 -200 800 400">
    //   <WarpPipeBack />
    //   <WarpPipeFront />
    // </svg>
    <motion.g {...otherProps}>
      {/* Back */}
      <motion.path
        className={isFront ? styles.hide : styles.pipeBody}
        d={backPipeBody.svgPath}
      />
      <motion.path
        className={isFront ? styles.hide : styles.pipeRing}
        d={headPipeRingBody.svgPath}
      />
      <motion.path
        className={isFront ? styles.hide : styles.backInnerFace}
        d={headInnerFace.svgPath}
      />
      <motion.path
        className={isFront ? styles.hide : styles.backInnerShadow}
        d={headInnerShadow.svgPath}
      />
      <motion.path
        className={isFront ? styles.hide : styles.backOpening}
        d={headBackRingFace.svgPath}
      />
      {/* Front */}
      <motion.path
        className={isBack ? styles.hide : styles.backOpening}
        d={backBackRingFace.svgPath}
      />
      <motion.path
        className={isBack ? styles.hide : styles.pipeRing}
        d={backPipeRingBody.svgPath}
      />
      <motion.path
        className={isBack ? styles.hide : styles.pipeRing}
        d={backPipeRingEnd.svgPath}
      />
      <motion.path
        className={isBack ? styles.hide : styles.frontOpening}
        d={backFrontRingFace.svgPath}
      />
      <motion.path
        className={isBack ? styles.hide : styles.pipeBody}
        d={mainPipeBody.svgPath}
      />
      <motion.path
        className={isBack ? styles.hide : styles.pipeEnd}
        d={mainPipeEnd.svgPath}
      />
      <motion.path
        className={isBack ? styles.hide : styles.pipeRing}
        d={headPipeRingEnd.svgPath}
      />
      <motion.path
        className={isBack ? styles.hide : styles.frontOpening}
        d={headFrontRingFace.svgPath}
      />
    </motion.g>
  );
}
