"use client";
import { Primitive, PrimitiveConfig } from "./usePrimitive";
import { useCallback, useMemo, useState } from "react";
import { computeEllipseRatio } from "../base/circleBase";
import { ModifyConfig, Vertex } from "../types";
import useCircle from "./useCircle";

export interface EllipseConfig
  extends Omit<PrimitiveConfig, "vertices" | "edges" | "faces" | "isClosed"> {
  xRadius: number;
  yRadius: number;
}

export default function useEllipse(
  config?: EllipseConfig
): Primitive & ModifyConfig<EllipseConfig> {
  const [xRadius, setXRadius] = useState(config?.xRadius ?? 100);
  const [yRadius, setYRadius] = useState(config?.yRadius ?? 60);

  // Calculate the ratio of longest and shortest "radius" of the ellipse
  const ratio: Vertex = useMemo(() => {
    return computeEllipseRatio({ xRadius, yRadius });
  }, [xRadius, yRadius]);

  // Create a circle (and scale it to the ratio of the ellipse)
  const { modifyConfig: modifyCircleConfig, ...circle } = useCircle({
    ...config,
    radius: xRadius,
    scale: ratio,
  });

  const modifyConfig = useCallback(
    (newConfig?: Partial<EllipseConfig>) => {
      const newXRadius = newConfig?.xRadius ?? xRadius;
      const newYRadius = newConfig?.yRadius ?? yRadius;

      const newRatio = computeEllipseRatio({
        xRadius: newXRadius,
        yRadius: newYRadius,
      });

      setXRadius(newXRadius);
      setYRadius(newYRadius);

      modifyCircleConfig({
        ...newConfig,
        radius: newXRadius,
        scale: newRatio,
      });
    },
    [xRadius, yRadius, modifyCircleConfig]
  );

  return {
    ...circle,
    modifyConfig,
  };
}
