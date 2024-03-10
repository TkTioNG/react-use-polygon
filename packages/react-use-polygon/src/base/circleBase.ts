import { ArcSegment, CurveSegment, Edge, Vertex } from "../types";
import { normalizeRadAngle } from "./common";
import { computePolygonEdges } from "./polygonBase";

export function computeArcEdges({
  radius,
  angle,
  vertices,
}: {
  radius: number;
  angle: number;
  vertices?: Vertex[];
}): Edge[] {
  const normalizedAngle = normalizeRadAngle(angle);

  const edges: Edge[] = [];

  const arcSegment: ArcSegment = {
    type: "arc",
    start: { x: radius, y: 0 },
    end: {
      x: radius * Math.cos(normalizedAngle),
      y: -radius * Math.sin(normalizedAngle),
    },
    radius,
    angle: normalizedAngle,
  };

  if (vertices?.length) {
    const preEdges = computePolygonEdges({ vertices });
    preEdges.pop();
    // Connect previous vertex to the arc
    preEdges.push({
      type: "line",
      start: vertices[vertices.length - 1],
      end: { x: radius, y: 0 },
    });
    edges.push(...preEdges);
  }

  edges.push(arcSegment);

  return edges;
}

export function computeCircleEdges({ radius }: { radius: number }): Edge[] {
  const edges: Edge[] = [];
  const angles = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5];
  const controlDistance = radius * ((4 * (Math.sqrt(2) - 1)) / 3);

  const getPointOnCircle = (angle: number) => ({
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle),
  });

  for (let i = 0; i < angles.length; i++) {
    const startAngle = angles[i];
    const endAngle = angles[(i + 1) % angles.length];
    const start = getPointOnCircle(startAngle);
    const end = getPointOnCircle(endAngle);
    const c1 = {
      x: start.x - controlDistance * Math.sin(startAngle),
      y: -(start.y + controlDistance * Math.cos(startAngle)),
    };
    const c2 = {
      x: end.x + controlDistance * Math.sin(endAngle),
      y: -(end.y - controlDistance * Math.cos(endAngle)),
    };
    edges.push({
      type: "curve",
      start: { ...start, y: -start.y },
      c1,
      c2,
      end: { ...end, y: -end.y },
    } as CurveSegment);
  }
  return edges;
}

export function computeEllipseRatio({
  xRadius,
  yRadius,
}: {
  xRadius: number;
  yRadius: number;
}): Vertex {
  const a = xRadius > 0 ? xRadius : 1;
  const b = yRadius > 0 ? yRadius : 1;
  return {
    x: 1,
    y: b / a,
  };
}
