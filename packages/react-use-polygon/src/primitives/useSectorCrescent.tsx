"use client";
import { Primitive } from "./usePrimitive";
import { useArcBase, ArcBaseConfig } from "./useArc";
import { ModifyConfig } from "../types";

export interface SectorCrescentConfig
  extends Omit<ArcBaseConfig, "vertices" | "isClosed"> {}

export default function useSector(
  config?: SectorCrescentConfig
): Primitive & ModifyConfig<SectorCrescentConfig> {
  return useArcBase({
    ...config,
    crescentRadius:
      config?.crescentRadius ?? (config?.radius ? config.radius * 0.6 : 80),
    isClosed: true,
  });
}
