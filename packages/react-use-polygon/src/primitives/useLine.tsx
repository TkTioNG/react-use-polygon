"use client";
import { useCallback, useMemo, useState } from "react";
import type { Edge, Vertex } from "../types";
import usePrimitive, { Primitive, PrimitiveConfig } from "./usePrimitive";
import { computeLineEdges } from "../base/lineBase";

interface LineVerticesConfig
  extends Omit<PrimitiveConfig, "vertices" | "edges" | "faces" | "isClosed"> {
  vertices: Vertex[];
}

interface LineLengthConfig
  extends Omit<PrimitiveConfig, "vertices" | "edges" | "faces" | "isClosed"> {
  length: number;
}

export type LineConfig = LineVerticesConfig | LineLengthConfig;

export default function useLine(config?: LineConfig): Primitive & {
  modifyConfig: (newConfig?: Partial<LineConfig>) => void;
} {
  const [vertices, setVertices] = useState<Vertex[]>(
    config && "vertices" in config ? config.vertices : []
  );
  const [length, setLength] = useState<number | undefined>(
    config && "length" in config ? config.length : undefined
  );

  const edges: Edge[] = useMemo(() => {
    return computeLineEdges({ vertices, length });
  }, [vertices, length]);

  const { modifyConfig: modifyPrimitiveConfig, ...primitive } = usePrimitive({
    ...config,
    vertices,
    edges,
    faces: [],
    isClosed: false,
  });

  const modifyConfig = useCallback(
    (newConfig?: Partial<LineConfig>) => {
      const newVertices =
        newConfig && "vertices" in newConfig
          ? newConfig?.vertices ?? vertices
          : vertices;
      const newLength =
        newConfig && "length" in newConfig
          ? newConfig?.length ?? length
          : length;
      const newEdges = computeLineEdges({
        vertices: newVertices,
        length: newLength,
      });

      setVertices(newVertices);
      setLength(newLength);
      modifyPrimitiveConfig({
        ...newConfig,
        vertices: newVertices,
        edges: newEdges,
      });
    },
    [vertices, length, modifyPrimitiveConfig]
  );

  return {
    ...primitive,
    modifyConfig,
  };
}
