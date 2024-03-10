import { ModifyConfig } from "../types";
import { Primitive } from "./usePrimitive";
import usePolygon, { NRegularPolygonConfig } from "./usePolygon";

export default function useHexagon(
  config?: NRegularPolygonConfig
): Primitive & ModifyConfig<NRegularPolygonConfig> {
  return usePolygon({ ...config, sides: 6 });
}
