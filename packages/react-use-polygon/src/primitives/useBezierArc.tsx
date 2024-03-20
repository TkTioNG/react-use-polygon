"use client";
import usePrimitive, { Primitive, PrimitiveConfig } from "./usePrimitive";
import { CurveSegment, Edge } from "../types";
import useCircle from "./useCircle";
import { useCallback, useMemo } from "react";
import { CubicBezier } from "../base/bezierBase";

interface BezierArcConfig
  extends Omit<PrimitiveConfig, "vertices" | "edges" | "faces" | "isClosed"> {
  radius?: number;
  startAngle?: number;
  endAngle?: number;
}

export default function useBezierArc(config?: BezierArcConfig): Primitive & {
  modifyConfig: (newConfig?: Partial<BezierArcConfig>) => void;
} {
  const radius = config?.radius ?? 100;
  const circlePrimitive = useCircle({ radius: config?.radius });
  const startAngleRadians = (((config?.startAngle ?? 0) % 360) * Math.PI) / 180;
  let endAngleRadians = (((config?.endAngle ?? 360) % 360) * Math.PI) / 180;

  if (endAngleRadians < startAngleRadians) {
    endAngleRadians += 2 * Math.PI;
  }

  const edges: Edge[] = useMemo(() => {
    const includedSegments: CurveSegment[] = [];

    if (
      (config?.startAngle ?? 0) % 360 === 0 &&
      (config?.endAngle ?? 360) % 360 === 0
    ) {
      return circlePrimitive.edges.map((segment) => ({ ...segment }));
    }

    if ((config?.startAngle ?? 0) % 360 === (config?.endAngle ?? 360) % 360) {
      return [];
    }
    const startQuadrant = Math.floor(startAngleRadians / (Math.PI / 2));
    const endQuadrant = Math.floor(endAngleRadians / (Math.PI / 2));
    (circlePrimitive.edges as CurveSegment[]).forEach((segment, index) => {
      if (index >= startQuadrant && index <= endQuadrant) {
        if (index > startQuadrant && index < endQuadrant) {
          includedSegments.push(segment);
        } else {
          const bezier = new CubicBezier(
            segment.start,
            segment.c1,
            segment.c2,
            segment.end
          );
          let t0 = 0,
            t1 = 1;
          if (index === startQuadrant) {
            t0 = bezier.project({
              x: radius * Math.cos(startAngleRadians),
              y: radius * Math.sin(startAngleRadians),
            }).t;
          }
          if (index === endQuadrant) {
            t1 = bezier.project({
              x: radius * Math.cos(endAngleRadians),
              y: radius * Math.sin(endAngleRadians),
            }).t;
          }
          if (startQuadrant === endQuadrant && t0 > t1) {
            [t0, t1] = [t1, t0];
          }
          if (t0 < t1) {
            const { points } = bezier.split(t0, t1);
            includedSegments.push({
              type: "curve",
              start: points[0],
              c1: points[1],
              c2: points[2],
              end: points[3],
            } as CurveSegment);
          }
        }
      }
    });
    return includedSegments;
  }, []);

  const { modifyConfig: modifyPrimitiveConfig, ...primitive } = usePrimitive({
    ...config,
    vertices: [],
    edges,
    faces: [],
    isClosed: false,
  });

  const modifyConfig = useCallback(
    (newConfig?: Partial<BezierArcConfig>) => {
      modifyPrimitiveConfig({
        ...newConfig,
      });
    },
    [modifyPrimitiveConfig]
  );

  return {
    ...primitive,
    modifyConfig,
  };
}
