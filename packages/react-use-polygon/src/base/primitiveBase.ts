import { BoundingBox, Edge, Face, Vertex } from "../types";

export function computeVertexTransformation(
  vertex: Vertex,
  {
    scale,
    rotation,
    position,
  }: {
    scale?: number | Partial<Vertex>;
    rotation?: number;
    position?: { x?: number; y?: number; z?: number };
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

export function computePrimitiveVertices(
  vertices: Vertex[],
  transformVertex: (vertex: Vertex) => Vertex
): Vertex[] {
  return vertices.map((vertex) => transformVertex(vertex));
}

export function computePrimitiveEdges(
  edges: Edge[],
  transformVertex: (vertex: Vertex) => Vertex
): Edge[] {
  return edges.map((edge) => ({
    ...edge,
    start: transformVertex(edge.start),
    end: transformVertex(edge.end),
    ...(edge.type === "curve" && {
      c1: transformVertex(edge.c1),
      c2: transformVertex(edge.c2),
    }),
    ...(edge.type === "arc" && {
      origin: transformVertex(edge.origin),
    }),
  }));
}

/**
 * @todo Thinking of better way to handling faces of different primitives
 */
export function computePrimitiveFaces(faces: Face[]): Face[] {
  return faces;
}

export function computePrimitiveCentroid(vertices: Vertex[]): Vertex {
  return vertices.reduce(
    (acc, v) => ({
      x: acc.x + v.x / vertices.length,
      y: acc.y + v.y / vertices.length,
      z: acc.z ? acc.z + (v?.z ?? 0) / vertices.length : acc.z,
    }),
    { x: 0, y: 0, z: 0 }
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isVertexArray(someArray: Vertex[] | any[]): someArray is Vertex[] {
  return "x" in someArray[0] && "y" in someArray[0];
}

export default function computePrimitiveBoundingBox(
  vertices: Vertex[]
): BoundingBox;
export default function computePrimitiveBoundingBox(edges: Edge[]): BoundingBox;
export default function computePrimitiveBoundingBox(
  data: Vertex[] | Edge[]
): BoundingBox {
  if (data.length === 0) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }
  if (isVertexArray(data)) {
    const vertices = data;

    let minX = vertices[0].x;
    let minY = vertices[0].y;
    let maxX = vertices[0].x;
    let maxY = vertices[0].y;

    vertices.forEach((vertex) => {
      if (vertex.x < minX) minX = vertex.x;
      if (vertex.x > maxX) maxX = vertex.x;
      if (vertex.y < minY) minY = vertex.y;
      if (vertex.y > maxY) maxY = vertex.y;
    });

    const width = maxX - minX;
    const height = maxY - minY;

    return {
      x: +minX.toFixed(4),
      y: +minY.toFixed(4),
      width: +width.toFixed(4),
      height: +height.toFixed(4),
    };
  }
  const edges = data;
  let minX = edges[0].start.x;
  let minY = edges[0].start.y;
  let maxX = edges[0].start.x;
  let maxY = edges[0].start.y;

  edges.forEach((edge) => {
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
    x: +minX.toFixed(4),
    y: +minY.toFixed(4),
    width: +width.toFixed(4),
    height: +height.toFixed(4),
  };
}

export function computePrimitiveSVGPath(
  edges: Edge[],
  scale: number | Partial<Vertex>,
  isClosed: boolean = true
): string {
  let path = "";
  if (edges.length > 0) {
    path += `M ${edges[0].start.x},${edges[0].start.y} `;
    edges.forEach((edge) => {
      if (edge.type === "line") {
        path += `L ${edge.end.x},${edge.end.y} `;
      } else if (edge.type === "curve") {
        path += `C ${edge.c1.x},${edge.c1.y} ${edge.c2.x},${edge.c2.y} ${edge.end.x},${edge.end.y} `;
      } else if (edge.type === "arc") {
        const scaleValue =
          typeof scale === "number"
            ? { x: scale, y: scale }
            : { x: scale?.x ?? 1, y: scale?.y ?? 1 };
        path += `A ${edge.radius * scaleValue.y},${
          edge.radius * scaleValue.x
        } 0 ${edge.angle > Math.PI ? 1 : 0} ${edge.isCrescent ? 1 : 0}  ${
          edge.end.x
        },${edge.end.y} `;
      }
    });
  }
  if (isClosed && path) {
    path += "Z";
  }
  return path.trim();
}

export function drawPrimitiveOnCanvas(
  ctx: CanvasRenderingContext2D,
  edges: Edge[],
  isClosed: boolean = true
) {
  if (edges.length > 0) {
    ctx.beginPath();
    ctx.moveTo(edges[0].start.x, edges[0].start.y);
    edges.forEach((edge) => {
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
      } else if (edge.type === "arc") {
        ctx.arc(
          edge.origin.x,
          edge.origin.y,
          edge.radius,
          edge.startAngle,
          edge.endAngle,
          edge.isCrescent ? false : true
        );
      }
    });
    if (isClosed) {
      ctx.closePath();
    }
  }
}
