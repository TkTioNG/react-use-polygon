import { ModifyConfig } from "../types";
import { Primitive } from "./usePrimitive";
import usePolygon, { NRegularPolygonConfig } from "./usePolygon";

export default function usePentagon(
  config?: NRegularPolygonConfig
): Primitive & ModifyConfig<NRegularPolygonConfig> {
  return usePolygon({ ...config, sides: 5 });
}
