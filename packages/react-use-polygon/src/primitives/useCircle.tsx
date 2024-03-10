"use client";
import usePrimitive, { Primitive, PrimitiveConfig } from "./usePrimitive";
import { Edge, ModifyConfig } from "../types";
import { useCallback, useMemo, useState } from "react";
import { computeCircleEdges } from "../base/circleBase";

export interface CircleConfig
  extends Omit<PrimitiveConfig, "vertices" | "edges" | "faces" | "isClosed"> {
  radius?: number;
}

export default function useCircle(
  config?: CircleConfig
): Primitive & ModifyConfig<CircleConfig> {
  const [radius, setRadius] = useState<number>(config?.radius ?? 100);

  const edges: Edge[] = useMemo(() => {
    return computeCircleEdges({ radius });
  }, [radius]);

  const { modifyConfig: modifyPrimitiveConfig, ...primitive } = usePrimitive({
    ...config,
    vertices: [],
    edges,
    faces: [],
  });

  const modifyConfig = useCallback(
    (newConfig?: Partial<CircleConfig>) => {
      const newRadius = newConfig?.radius ?? radius;

      const newEdges = computeCircleEdges({ radius: newRadius });

      setRadius(newRadius);

      modifyPrimitiveConfig({
        ...newConfig,
        edges: newEdges,
      });
    },
    [radius, modifyPrimitiveConfig]
  );

  return {
    ...primitive,
    modifyConfig,
  };
}
