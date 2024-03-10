"use client";
import { useState, useMemo, useCallback } from "react";

import type {
  DistributiveOmit,
  Edge,
  Face,
  ModifyConfig,
  Vertex,
} from "../types";
import usePrimitive, { Primitive, PrimitiveConfig } from "./usePrimitive";
import {
  computePolygonEdges,
  computePolygonFaces,
  computePolygonVertices,
} from "../base/polygonBase";

interface PolygonVerticesConfig
  extends Omit<PrimitiveConfig, "vertices" | "edges" | "faces" | "isClosed"> {
  vertices: Vertex[];
}

interface PolygonSideLengthConfig
  extends Omit<PrimitiveConfig, "vertices" | "edges" | "faces" | "isClosed"> {
  sides: number;
  sideLength?: number;
}

interface PolygonCircleSizeConfig
  extends Omit<PrimitiveConfig, "vertices" | "edges" | "faces" | "isClosed"> {
  sides: number;
  size?: number;
}

export type PolygonConfig =
  | PolygonVerticesConfig
  | PolygonSideLengthConfig
  | PolygonCircleSizeConfig;

export type NRegularPolygonConfig = DistributiveOmit<PolygonConfig, "sides">;

export default function usePolygon(
  config?: PolygonConfig
): Primitive & ModifyConfig<PolygonConfig> {
  const [userVertices, setUserVertices] = useState<Vertex[]>(
    config && "vertices" in config ? config.vertices : []
  );
  const [sides, setSides] = useState<number>(
    config && "sides" in config ? config.sides : 4
  );
  const [sideLength, setSideLength] = useState<number | undefined>(
    config && "sideLength" in config ? config.sideLength : undefined
  );
  const [size, setSize] = useState<number | undefined>(
    config && "size" in config ? config.size : undefined
  );

  const vertices = useMemo<Vertex[]>(() => {
    return computePolygonVertices({
      vertices: userVertices,
      sides,
      sideLength,
      size,
    });
  }, [userVertices, sides, sideLength, size]);

  const edges = useMemo<Edge[]>(() => {
    return computePolygonEdges({ vertices });
  }, [vertices]);

  const faces = useMemo<Face[]>(() => computePolygonFaces({ edges }), [edges]);

  const { modifyConfig: modifyPrimitiveConfig, ...primitive } = usePrimitive({
    ...config,
    vertices,
    edges,
    faces,
  });

  const modifyConfig = useCallback(
    (newConfig?: Partial<PolygonConfig>) => {
      const newUserVertices =
        newConfig && "vertices" in newConfig ? newConfig.vertices ?? [] : [];
      const newSides =
        newConfig && "sides" in newConfig ? newConfig.sides ?? sides : sides;
      const newSideLength =
        newConfig && "sideLength" in newConfig
          ? newConfig.sideLength
          : sideLength;
      const newSize = newConfig && "size" in newConfig ? newConfig.size : size;

      const newVertices = computePolygonVertices({
        vertices: newUserVertices,
        sides: newSides,
        sideLength: newSideLength,
        size: newSize,
      });
      const newEdges = computePolygonEdges({ vertices: newVertices });
      const newFaces = computePolygonFaces({ edges: newEdges });

      setUserVertices(newUserVertices);
      setSides(newSides);
      setSideLength(newSideLength);
      setSize(newSize);
      modifyPrimitiveConfig({
        ...newConfig,
        vertices: newVertices,
        edges: newEdges,
        faces: newFaces,
      });
    },
    [sides, sideLength, size, modifyPrimitiveConfig]
  );

  return { ...primitive, modifyConfig };
}
