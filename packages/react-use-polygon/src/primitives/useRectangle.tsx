"use client";
import { useCallback, useMemo, useState } from "react";
import type { Edge, Face, ModifyConfig, Vertex } from "../types";
import usePrimitive, { Primitive, PrimitiveConfig } from "./usePrimitive";
import {
  computePolygonEdges,
  computePolygonFaces,
  computeRectangleVertices,
} from "../base/polygonBase";

export interface RectangleConfig
  extends Omit<PrimitiveConfig, "vertices" | "edges" | "faces" | "isClosed"> {
  width: number;
  height: number;
}

export default function useRectangle(
  config?: RectangleConfig
): Primitive & ModifyConfig<RectangleConfig> {
  const [width, setWidth] = useState<number>(config?.width ?? 100);
  const [height, setHeight] = useState<number>(config?.height ?? 50);

  const vertices: Vertex[] = useMemo(() => {
    return computeRectangleVertices({ width, height });
  }, [width, height]);

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
    (newConfig?: Partial<RectangleConfig>) => {
      const newWidth = newConfig?.width ?? width;
      const newHeight = newConfig?.height ?? height;

      const newVertices = computeRectangleVertices({
        width: newWidth,
        height: newHeight,
      });
      const newEdges = computePolygonEdges({ vertices: newVertices });
      const newFaces = computePolygonFaces({ edges: newEdges });

      setWidth(newWidth);
      setHeight(height);
      modifyPrimitiveConfig({
        ...newConfig,
        vertices: newVertices,
        edges: newEdges,
        faces: newFaces,
      });
    },
    [width, height, modifyPrimitiveConfig]
  );

  return {
    ...primitive,
    modifyConfig,
  };
}
