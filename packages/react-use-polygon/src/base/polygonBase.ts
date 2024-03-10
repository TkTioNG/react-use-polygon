import { Edge, Face, Vertex } from "../types";

function computeVertexLocations({
  radius,
  sides,
}: {
  sides: number;
  radius: number;
}): Vertex[] {
  // Although you can form a vertex with 2 sides,
  // but polygon need at least 3 lines.
  if (sides <= 2) {
    return [];
  }
  const angleStep = (Math.PI * 2) / sides;
  const vertices: Vertex[] = [];
  let initialRotation = -Math.PI / 2;
  if (sides % 2 === 0) {
    initialRotation += angleStep / 2;
  }
  for (let i = 0; i < sides; i++) {
    vertices.push({
      x: radius * Math.cos(initialRotation + angleStep * i),
      y: radius * Math.sin(initialRotation + angleStep * i),
    });
  }
  return vertices;
}

export function computePolygonVertices({
  vertices,
  sides,
  sideLength,
  size,
}: {
  vertices?: Vertex[];
  sides: number;
  sideLength?: number;
  size?: number;
}): Vertex[] {
  if (vertices?.length) {
    return vertices;
  } else if (size !== undefined) {
    // Calculate vertices with size
    return computeVertexLocations({ radius: size / 2, sides });
  } else if (sideLength !== undefined) {
    // Calculate vertices with side length
    return computeVertexLocations({
      radius: (sideLength * 0.5) / Math.sin(Math.PI / sides),
      sides,
    });
  }
  // Default to inscribe polygon in circle with radius of 100
  return computeVertexLocations({
    radius: 100 / 2,
    sides,
  });
}

export function computeRectangleVertices({
  width,
  height,
}: {
  width: number;
  height: number;
}): Vertex[] {
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  return [
    { x: -halfWidth, y: -halfHeight, z: 0 },
    { x: halfWidth, y: -halfHeight, z: 0 },
    { x: halfWidth, y: halfHeight, z: 0 },
    { x: -halfWidth, y: halfHeight, z: 0 },
  ];
}

export function computeKiteVertices({
  tLength,
  bLength,
  isConcave,
}: {
  tLength: number;
  bLength: number;
  isConcave: boolean;
}): Vertex[] {
  const isUpsideDown = bLength < tLength;
  const short = isUpsideDown ? bLength : tLength;
  const long = isUpsideDown ? tLength : bLength;
  const angle = (short / long) * Math.PI * 0.25;

  const tx = short * Math.cos(angle);
  const ty = short * Math.sin(angle);
  const by = Math.sqrt(long ** 2 - tx ** 2);

  const baseKite = [
    { x: 0, y: -ty, z: 0 },
    { x: tx, y: 0, z: 0 },
    { x: 0, y: by, z: 0 },
    { x: -tx, y: 0, z: 0 },
  ];

  if (isConcave) {
    baseKite[0].y = 0;
    baseKite[1].y -= ty;
    baseKite[2].y -= ty;
    baseKite[3].y -= ty;
  }

  if (isUpsideDown) {
    return baseKite.map(({ x, y, z }) => ({
      x: -x,
      y: -y,
      z,
    }));
  }

  return baseKite;
}

export function computePolygonEdges({
  vertices,
}: {
  vertices?: Vertex[];
}): Edge[] {
  const edges: Edge[] = [];

  if (vertices) {
    const vertexCount = vertices.length;
    for (let i = 0; i < vertexCount; i++) {
      edges.push({
        type: "line",
        start: vertices[i],
        end: vertices[(i + 1) % vertexCount], // Use modulo to loop back to the first vertex
      });
    }
  }
  return edges;
}

export function computePolygonFaces({ edges }: { edges?: Edge[] }): Face[] {
  return [edges ?? []];
}
