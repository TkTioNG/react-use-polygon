import { ArcSegment, CurveSegment, Edge, LineSegment, Vertex } from "../types";
import { normalizeDegAngle } from "./common";
import { computePolygonEdges } from "./polygonBase";

export function computeArcEdges({
  radius,
  crescentRadius,
  angle,
  vertices,
  rotation,
}: {
  radius: number;
  crescentRadius?: number;
  angle: number;
  vertices?: Vertex[];
  rotation?: number;
}): Edge[] {
  // Convert angles to radian
  const normalizedAngle = normalizeDegAngle(angle);
  const normalizeRotation = normalizeDegAngle(rotation ?? 0);

  const edges: Edge[] = [];

  const arcSegment: ArcSegment = {
    type: "arc",
    start: { x: radius, y: 0 },
    end: {
      x: radius * Math.cos(normalizedAngle),
      y: -radius * Math.sin(normalizedAngle),
    },
    radius,
    angle: normalizedAngle, // Use by svg path, angle of the arc
    origin: { x: 0, y: 0 },
    startAngle: 0 + normalizeRotation, // Staring angle from the positive x-axis
    endAngle: normalizedAngle + normalizeRotation, // Ending angle from the positive x-axis
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

  if (crescentRadius) {
    const crescentStart = {
      x: crescentRadius * Math.cos(normalizedAngle),
      y: -crescentRadius * Math.sin(normalizedAngle),
    };
    const connectLine: LineSegment = {
      type: "line",
      start: { ...arcSegment.end },
      end: { ...crescentStart },
    };
    const crescentArcSegment: ArcSegment = {
      type: "arc",
      start: crescentStart,
      end: { x: crescentRadius, y: 0 },
      radius: crescentRadius,
      angle: normalizedAngle, // Use by svg path, angle of the arc
      origin: { x: 0, y: 0 },
      startAngle: 0 + normalizeRotation, // Staring angle from the positive x-axis
      endAngle: normalizedAngle + normalizeRotation, // Ending angle from the positive x-axis
      isCrescent: true,
    };
    edges.push(connectLine, crescentArcSegment);
  }
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
