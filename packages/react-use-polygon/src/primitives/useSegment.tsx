"use client";
import { Primitive } from "./usePrimitive";
import { useArcBase, ArcBaseConfig } from "./useArc";
import { ModifyConfig } from "../types";

export interface SegmentConfig
  extends Omit<ArcBaseConfig, "vertices" | "crescentRadius" | "isClosed"> {}

export default function useSegment(
  config?: SegmentConfig
): Primitive & ModifyConfig<SegmentConfig> {
  return useArcBase({ ...config, isClosed: true });
}
