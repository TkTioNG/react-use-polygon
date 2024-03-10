import { ModifyConfig } from "../types";
import { Primitive } from "./usePrimitive";
import usePolygon, { NRegularPolygonConfig } from "./usePolygon";

export default function useSquare(
  config?: NRegularPolygonConfig
): Primitive & ModifyConfig<NRegularPolygonConfig> {
  return usePolygon({ ...config, sides: 4 });
}
