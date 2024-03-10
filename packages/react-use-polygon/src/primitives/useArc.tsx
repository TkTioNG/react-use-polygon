"use client";
import usePrimitive, { Primitive, PrimitiveConfig } from "./usePrimitive";
import { Edge, ModifyConfig, Vertex } from "../types";
import { useCallback, useMemo, useState } from "react";
import { normalizeDegAngle } from "../base/common";
import { computeArcEdges } from "../base/circleBase";

export interface ArcBaseConfig
  extends Omit<PrimitiveConfig, "vertices" | "edges" | "faces"> {
  vertices?: Vertex[];
  radius?: number;
  angle?: number;
}

export interface ArcConfig
  extends Omit<ArcBaseConfig, "vertices" | "isClosed"> {}

export function useArcBase(
  config?: ArcBaseConfig
): Primitive & ModifyConfig<ArcConfig> {
  const [radius, setRadius] = useState<number>(config?.radius ?? 100);
  const [angle, setAngle] = useState<number>(
    normalizeDegAngle(config?.angle ?? 60)
  );
  const [isClosed, setIsClosed] = useState<boolean>(config?.isClosed ?? true);
  const [vertices, setVertices] = useState<Vertex[]>(config?.vertices ?? []);

  const edges: Edge[] = useMemo(() => {
    return computeArcEdges({ radius, angle, vertices });
  }, [radius, angle, vertices]);

  const { modifyConfig: modifyPrimitiveConfig, ...primitive } = usePrimitive({
    ...config,
    vertices,
    edges,
    faces: [],
    isClosed,
  });

  const modifyConfig = useCallback(
    (newConfig?: Partial<ArcBaseConfig>) => {
      const newRadius = newConfig?.radius ?? radius;
      const newAngle =
        typeof newConfig?.angle === "number"
          ? normalizeDegAngle(newConfig.angle)
          : angle;
      const newVertices = newConfig?.vertices ?? vertices;

      const newEdges = computeArcEdges({
        radius: newRadius,
        angle: newAngle,
        vertices: newVertices,
      });

      setRadius(newRadius);
      setAngle(newAngle);
      setIsClosed(newConfig?.isClosed ?? isClosed);
      setVertices(newVertices);

      modifyPrimitiveConfig({
        ...newConfig,
        edges: newEdges,
      });
    },
    [radius, angle, isClosed, vertices, modifyPrimitiveConfig]
  );

  return {
    ...primitive,
    modifyConfig,
  };
}

export default function useArc(config?: ArcConfig): Primitive & {
  modifyConfig: (newConfig?: Partial<ArcConfig>) => void;
} {
  return useArcBase({ ...config, isClosed: false });
}
