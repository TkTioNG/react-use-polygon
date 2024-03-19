"use client";
import { useState, useMemo, useCallback } from "react";

import type { BoundingBox, Edge, Face, ModifyConfig, Vertex } from "../types";
import computePrimitiveBoundingBox, {
  computePrimitiveCentroid,
  computePrimitiveEdges,
  computePrimitiveFaces,
  computePrimitiveSVGPath,
  computePrimitiveVertices,
  computeVertexTransformation,
  drawPrimitiveOnCanvas,
} from "../base/primitiveBase";

/**
 * Base primitive type.
 */
export interface Primitive {
  vertices: Vertex[];
  edges: Edge[];
  faces: Face[];
  centroid: Vertex;
  boundingBox: BoundingBox;
  svgPath: string;
  drawOnCanvas: (ctx: CanvasRenderingContext2D) => void;
}

/**
 * Common configurations for a base primitive.
 */
export interface PrimitiveConfig {
  vertices: Vertex[];
  edges: Edge[];
  faces: Face[];
  scale?: number | Partial<Vertex>;
  rotate?: number;
  position?: { x?: number; y?: number; z?: number };
  isClosed?: boolean;
}

/**
 * Base primitive hook where it should be used by all other primitives.
 */
export default function usePrimitive(
  config?: PrimitiveConfig
): Primitive & ModifyConfig<PrimitiveConfig> {
  const [vertices, setVertices] = useState<Vertex[]>(config?.vertices ?? []);
  const [edges, setEdges] = useState<Edge[]>(config?.edges ?? []);
  const [faces, setFaces] = useState<Face[]>(config?.faces ?? []);
  const [scale, setScale] = useState<number | Partial<Vertex>>(
    config?.scale ?? 1
  );
  const [rotate, setRotate] = useState<number>(config?.rotate ?? 0);
  const [position, setPosition] = useState<{
    x?: number;
    y?: number;
    z?: number;
  }>(config?.position ?? { x: 0, y: 0, z: 0 });
  const [isClosed, setIsClosed] = useState<boolean>(config?.isClosed ?? true);

  const transformVertex = useCallback(
    (vertex: Vertex): Vertex => {
      return computeVertexTransformation(vertex, {
        scale,
        rotate,
        position: { x: position.x, y: position.y, z: position.z },
      });
    },
    [position.x, position.y, position.z, rotate, scale]
  );

  const newVertices: Vertex[] = useMemo(
    () => computePrimitiveVertices(vertices, transformVertex),
    [vertices, transformVertex]
  );
  const newEdges: Edge[] = useMemo(
    () => computePrimitiveEdges(edges, transformVertex),
    [edges, transformVertex]
  );
  const newFaces: Face[] = useMemo(() => computePrimitiveFaces(faces), [faces]);

  const centroid: Vertex = useMemo(() => {
    return computePrimitiveCentroid(newVertices);
  }, [newVertices]);

  const boundingBox: BoundingBox = useMemo(() => {
    return computePrimitiveBoundingBox(newEdges);
  }, [newEdges]);

  const svgPath = useMemo(() => {
    return computePrimitiveSVGPath(newEdges, scale, rotate, isClosed);
  }, [newEdges, scale, rotate, isClosed]);

  const drawOnCanvas = useCallback(
    (ctx: CanvasRenderingContext2D) =>
      drawPrimitiveOnCanvas(ctx, newEdges, isClosed),
    [newEdges, isClosed]
  );

  const modifyConfig = useCallback(
    (newConfig?: Partial<PrimitiveConfig>) => {
      setPosition(newConfig?.position ?? position);
      setRotate(newConfig?.rotate ?? rotate);
      setScale(newConfig?.scale ?? scale);
      setIsClosed(newConfig?.isClosed ?? isClosed);
      setVertices(newConfig?.vertices ?? vertices);
      setEdges(newConfig?.edges ?? edges);
      setFaces(newConfig?.faces ?? faces);
    },
    [position, rotate, scale, isClosed, vertices, edges, faces]
  );

  return {
    vertices: newVertices,
    edges: newEdges,
    faces: newFaces,
    svgPath,
    drawOnCanvas,
    centroid,
    boundingBox,
    modifyConfig,
  };
}
