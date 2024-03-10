import { Edge, Vertex } from "../types";

export function computeLineEdges({
  vertices,
  length,
}: {
  vertices?: Vertex[];
  length?: number;
}) {
  const edges: Edge[] = [];

  if (vertices?.length) {
    for (let i = 0; i < vertices.length - 1; i++) {
      edges.push({
        type: "line",
        start: vertices[i],
        end: vertices[i + 1],
      });
    }
  }
  if (length) {
    edges.push({
      type: "line",
      start: {
        x: -length * 0.5,
        y: 0,
      },
      end: {
        x: length * 0.5,
        y: 0,
      },
    });
  }
  return edges;
}
