import { ModifyConfig } from "../types";
import { Primitive } from "./usePrimitive";
import usePolygon, { NRegularPolygonConfig } from "./usePolygon";

export default function useTriangle(
  config?: NRegularPolygonConfig
): Primitive & ModifyConfig<NRegularPolygonConfig> {
  return usePolygon({ ...config, sides: 3 });
}
