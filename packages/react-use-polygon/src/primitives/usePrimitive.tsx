"use client";
import { useState, useMemo, useCallback } from "react";

import type { BoundingBox, Edge, Face, ModifyConfig, Vertex } from "../types";

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
  scale?: number | Vertex;
  rotation?: number;
  position?: { x: number; y: number; z?: number };
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
  const [scale, setScale] = useState<number | Vertex>(config?.scale ?? 1);
  const [rotation, setRotation] = useState<number>(config?.rotation ?? 0);
  const [position, setPosition] = useState<{
    x: number;
    y: number;
    z?: number;
  }>(config?.position ?? { x: 0, y: 0, z: 0 });
  const [isClosed, setIsClosed] = useState<boolean>(config?.isClosed ?? true);

  const transformVertex = useCallback(
    (vertex: Vertex): Vertex => {
      // Scale first
      const scaleValue =
        typeof scale === "number"
          ? { x: scale, y: scale }
          : { x: scale.x ?? 1, y: scale.y ?? 1 };
      let newVertex: Vertex = {
        x: +(vertex.x * scaleValue.x).toFixed(3),
        y: +(vertex.y * scaleValue.y).toFixed(3),
        z: vertex.z,
      };

      // Rotate second
      const radians = rotation * (Math.PI / 180);
      newVertex = {
        x: Math.cos(radians) * newVertex.x - Math.sin(radians) * newVertex.y,
        y: Math.sin(radians) * newVertex.x + Math.cos(radians) * newVertex.y,
        z: newVertex.z,
      };

      // Translate last
      newVertex = {
        x: newVertex.x + position.x,
        y: newVertex.y + position.y,
        z: newVertex.z ? newVertex.z + (position.z ?? 0) : newVertex.z,
      };

      return newVertex;
    },
    [position.x, position.y, position.z, rotation, scale]
  );

  const newVertices: Vertex[] = useMemo(
    () => vertices.map((vertex) => transformVertex(vertex)),
    [vertices, transformVertex]
  );
  const newEdges: Edge[] = useMemo(
    () =>
      edges.map((edge) => ({
        ...edge,
        start: transformVertex(edge.start),
        end: transformVertex(edge.end),
        ...(edge.type === "curve" && {
          c1: transformVertex(edge.c1),
          c2: transformVertex(edge.c2),
        }),
      })),
    [edges, transformVertex]
  );
  /** @todo Thinking of a way to handle the faces */
  const newFaces: Face[] = useMemo(() => faces, [faces]);

  const svgPath = useMemo(() => {
    let path = "";
    if (newEdges.length > 0) {
      path += `M ${newEdges[0].start.x},${newEdges[0].start.y} `;
      newEdges.forEach((edge) => {
        if (edge.type === "line") {
          path += `L ${edge.end.x},${edge.end.y} `;
        } else if (edge.type === "curve") {
          path += `C ${edge.c1.x},${edge.c1.y} ${edge.c2.x},${edge.c2.y} ${edge.end.x},${edge.end.y} `;
        } else if (edge.type === "arc") {
          path += `A ${edge.radius},${edge.radius} 0 ${
            edge.angle > Math.PI ? 1 : 0
          } 0  ${edge.end.x},${edge.end.y} `;
        }
      });
    }
    if (isClosed && path) {
      path += "Z";
    }
    return path.trim();
  }, [newEdges, isClosed]);

  const drawOnCanvas = (ctx: CanvasRenderingContext2D) => {
    if (newEdges.length > 0) {
      ctx.beginPath();
      ctx.moveTo(newEdges[0].start.x, newEdges[0].start.y);
      newEdges.forEach((edge) => {
        if (edge.type === "line") {
          ctx.lineTo(edge.end.x, edge.end.y);
        } else if (edge.type === "curve") {
          ctx.bezierCurveTo(
            edge.c1.x,
            edge.c1.y,
            edge.c2.x,
            edge.c2.y,
            edge.end.x,
            edge.end.y
          );
        }
      });
      if (isClosed) {
        ctx.closePath();
      }
    }
  };

  const centroid: Vertex = useMemo(() => {
    return newVertices.reduce(
      (acc, v) => ({
        x: acc.x + v.x / newVertices.length,
        y: acc.y + v.y / newVertices.length,
        z: acc.z ? acc.z + (v?.z ?? 0) / newVertices.length : acc.z,
      }),
      { x: 0, y: 0, z: 0 }
    );
  }, [newVertices]);

  const boundingBox: BoundingBox = useMemo(() => {
    if (newEdges.length === 0) {
      return { x: 0, y: 0, width: 0, height: 0 };
    }
    let minX = newEdges[0].start.x;
    let minY = newEdges[0].start.y;
    let maxX = newEdges[0].start.x;
    let maxY = newEdges[0].start.y;

    newEdges.forEach((edge) => {
      const points: Vertex[] = [edge.start, edge.end];
      if (edge.type === "curve") {
        points.push(edge.c1, edge.c2);
      }
      if (edge.type === "arc") {
        // TODO: take in consideration of position, rotation and scale
        if (edge.angle > Math.PI / 2) {
          // Second, Third & Fourth quadrant
          points.push({
            x: edge.radius * Math.cos(edge.angle),
            y: -edge.radius,
          });
        }
        if (edge.angle > Math.PI) {
          // Third & Fourth quadrant
          points.push({
            x: -edge.radius,
            y: edge.radius,
          });
        }
        if (edge.angle > (Math.PI * 3) / 2) {
          // Fourth quadrant
          points.push({
            x: 0,
            y: edge.radius,
          });
        }
      }
      points.forEach((point) => {
        if (point.x < minX) minX = point.x;
        if (point.x > maxX) maxX = point.x;
        if (point.y < minY) minY = point.y;
        if (point.y > maxY) maxY = point.y;
      });
    });

    const width = maxX - minX;
    const height = maxY - minY;

    return {
      x: +minX.toFixed(5),
      y: +minY.toFixed(5),
      width: +width.toFixed(5),
      height: +height.toFixed(5),
    };
  }, [newEdges]);

  const modifyConfig = useCallback(
    (newConfig?: Partial<PrimitiveConfig>) => {
      setPosition(newConfig?.position ?? position);
      setRotation(newConfig?.rotation ?? rotation);
      setScale(newConfig?.scale ?? scale);
      setIsClosed(newConfig?.isClosed ?? isClosed);
      setVertices(newConfig?.vertices ?? vertices);
      setEdges(newConfig?.edges ?? edges);
      setFaces(newConfig?.faces ?? faces);
    },
    [position, rotation, scale, isClosed, vertices, edges, faces]
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
