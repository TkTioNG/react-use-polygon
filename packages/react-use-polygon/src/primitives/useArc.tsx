"use client";
import usePrimitive, { Primitive, PrimitiveConfig } from "./usePrimitive";
import { Edge, Face, ModifyConfig, Vertex } from "../types";
import { useCallback, useMemo, useState } from "react";
import { computeArcEdges } from "../base/circleBase";

export interface ArcBaseConfig
  extends Omit<PrimitiveConfig, "vertices" | "edges" | "faces"> {
  vertices?: Vertex[];
  radius?: number;
  crescentRadius?: number;
  angle?: number;
}

export interface ArcConfig
  extends Omit<ArcBaseConfig, "vertices" | "crescentRadius" | "isClosed"> {}

export function useArcBase(
  config?: ArcBaseConfig
): Primitive & ModifyConfig<ArcConfig> {
  const [radius, setRadius] = useState<number>(config?.radius ?? 100);
  const [crescentRadius, setCrescentRadius] = useState<number | undefined>(
    config?.crescentRadius
  );
  const [angle, setAngle] = useState<number>(config?.angle ?? 60);
  const [isClosed, setIsClosed] = useState<boolean>(config?.isClosed ?? true);
  const [vertices, setVertices] = useState<Vertex[]>(config?.vertices ?? []);

  const edges: Edge[] = useMemo(() => {
    return computeArcEdges({
      radius,
      crescentRadius,
      angle,
      vertices,
      isClosed,
    });
  }, [radius, crescentRadius, angle, vertices, isClosed]);

  const faces: Face[] = useMemo(() => {
    return isClosed ? [edges] : [];
  }, [edges, isClosed]);

  const { modifyConfig: modifyPrimitiveConfig, ...primitive } = usePrimitive({
    ...config,
    vertices,
    edges,
    faces,
    isClosed,
  });

  const modifyConfig = useCallback(
    (newConfig?: Partial<ArcBaseConfig>) => {
      const newRadius = newConfig?.radius ?? radius;
      const newCrescentRadius = newConfig?.crescentRadius;
      const newAngle =
        typeof newConfig?.angle === "number" ? newConfig.angle : angle;
      const newVertices = newConfig?.vertices ?? vertices;

      const newEdges = computeArcEdges({
        radius: newRadius,
        angle: newAngle,
        vertices: newVertices,
      });

      setRadius(newRadius);
      setCrescentRadius(newCrescentRadius);
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
