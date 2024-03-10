"use client";
import { useCallback, useMemo, useState } from "react";
import type { Edge, Face, Vertex } from "../types";
import usePrimitive, { Primitive, PrimitiveConfig } from "./usePrimitive";
import {
  computeKiteVertices,
  computePolygonEdges,
  computePolygonFaces,
} from "../base/polygonBase";

export interface KiteConfig
  extends Omit<PrimitiveConfig, "vertices" | "edges" | "faces" | "isClosed"> {
  tLength?: number;
  bLength?: number;
  isConcave?: boolean;
}

export default function useKite(config?: KiteConfig): Primitive & {
  modifyConfig: (newConfig?: Partial<KiteConfig>) => void;
} {
  const [tLength, setTLength] = useState<number>(config?.tLength ?? 50);
  const [bLength, setBLength] = useState<number>(config?.bLength ?? 75);
  const [isConcave, setIsConcave] = useState<boolean>(
    config?.isConcave ?? false
  );

  const vertices: Vertex[] = useMemo(() => {
    return computeKiteVertices({ tLength, bLength, isConcave });
  }, [tLength, bLength, isConcave]);

  const edges: Edge[] = useMemo(() => {
    return computePolygonEdges({ vertices });
  }, [vertices]);

  const faces: Face[] = useMemo(() => {
    return computePolygonFaces({ edges });
  }, [edges]);

  const { modifyConfig: modifyPrimitiveConfig, ...primitive } = usePrimitive({
    ...config,
    vertices,
    edges,
    faces,
  });

  const modifyConfig = useCallback(
    (newConfig?: Partial<KiteConfig>) => {
      const newTLength = newConfig?.tLength ?? tLength;
      const newBLength = newConfig?.bLength ?? bLength;
      const newIsConcave = newConfig?.isConcave ?? isConcave;

      const newVertices = computeKiteVertices({
        tLength: newTLength,
        bLength: newBLength,
        isConcave: newIsConcave,
      });
      const newEdges = computePolygonEdges({ vertices: newVertices });
      const newFaces = computePolygonFaces({ edges: newEdges });

      setTLength(newTLength);
      setBLength(newBLength);
      setIsConcave(newIsConcave);
      modifyPrimitiveConfig({
        ...newConfig,
        vertices: newVertices,
        edges: newEdges,
        faces: newFaces,
      });
    },
    [tLength, bLength, isConcave, modifyPrimitiveConfig]
  );

  return {
    ...primitive,
    modifyConfig,
  };
}
