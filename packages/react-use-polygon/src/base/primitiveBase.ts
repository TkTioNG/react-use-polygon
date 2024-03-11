import { Vertex } from "../types";

export function computeVertexTransformation(
  vertex: Vertex,
  {
    scale,
    rotation,
    position,
  }: {
    scale?: number | Vertex;
    rotation?: number;
    position?: { x: number; y: number; z?: number };
  } = {}
): Vertex {
  // Scale first
  const scaleValue =
    typeof scale === "number"
      ? { x: scale, y: scale }
      : { x: scale?.x ?? 1, y: scale?.y ?? 1 };
  let newVertex: Vertex = {
    x: +(vertex.x * scaleValue.x).toFixed(3),
    y: +(vertex.y * scaleValue.y).toFixed(3),
    z: vertex.z,
  };

  // Rotate second
  const radians = (rotation ?? 0) * (Math.PI / 180);
  newVertex = {
    x: Math.cos(radians) * newVertex.x - Math.sin(radians) * newVertex.y,
    y: Math.sin(radians) * newVertex.x + Math.cos(radians) * newVertex.y,
    z: newVertex.z,
  };

  // Translate last
  newVertex = {
    x: newVertex.x + (position?.x ?? 0),
    y: newVertex.y + (position?.y ?? 0),
    z: newVertex.z ? newVertex.z + (position?.z ?? 0) : newVertex.z,
  };

  return newVertex;
}
