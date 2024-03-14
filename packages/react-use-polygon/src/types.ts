/**
 * A single point in 2D or 3D space, where 2 or more lines or curves meet.
 */
export interface Vertex {
  x: number;
  y: number;
  z?: number;
}

/**
 * A straight line segment that joins 2 or more vertices.
 */
export interface LineSegment {
  type: "line";
  start: Vertex;
  end: Vertex;
}

/**
 * A curve segment that joins 2 or more vertices.
 *
 * This is a cubic bezier curve which start, c1, c2 and end will
 * be the 4 control points of the curve.
 *
 * Imagine it is a C shorthand in svg path.
 */
export interface CurveSegment {
  type: "curve";
  start: Vertex;
  c1: Vertex;
  c2: Vertex;
  end: Vertex;
}

/**
 * A portion of circular path of a circle.
 */
export interface ArcSegment {
  type: "arc";
  start: Vertex;
  end: Vertex;
  radius: number;
  angle: number; // Use by svg path, angle of the arc
  origin: Vertex;
  startAngle: number; // Staring angle from the positive x-axis
  endAngle: number; // Ending angle from the positive x-axis
  isCrescent?: boolean; // Is an inner crescent arc
}

/**
 * An edge of a polygon or a segment of a primitive.
 *
 * It can either be a line, curve or an arc.
 */
export type Edge = LineSegment | CurveSegment | ArcSegment;

/**
 * Multiple edges combine that create a closed surface will form a face.
 */
export type Face = Edge[];

/**
 * 2D boundary of the primitive in a rectangular box.
 */
export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Utility type for config modifier of primitive hook.
 */
export interface ModifyConfig<T> {
  modifyConfig: (newConfig?: Partial<T>) => void;
}

/**
 * Provides for TS omit over union types.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DistributiveOmit<T, K extends PropertyKey> = T extends any
  ? Omit<T, K>
  : never;
