"use client";
import { Primitive } from "./usePrimitive";
import { useArcBase, ArcBaseConfig } from "./useArc";
import { ModifyConfig } from "../types";

export interface SectorConfig
  extends Omit<ArcBaseConfig, "vertices" | "isClosed"> {}

export default function useSector(
  config?: SectorConfig
): Primitive & ModifyConfig<SectorConfig> {
  return useArcBase({ ...config, vertices: [{ x: 0, y: 0 }], isClosed: true });
}
