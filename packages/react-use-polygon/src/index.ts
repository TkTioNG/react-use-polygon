import usePolygon from "./primitives/usePolygon";
import useTriangle from "./primitives/useTriangle";
import useSquare from "./primitives/useSquare";
import useRectangle from "./primitives/useRectangle";
import usePentagon from "./primitives/usePentagon";
import useHexagon from "./primitives/useHexagon";
import useHeptagon from "./primitives/useHeptagon";
import useOctagon from "./primitives/useOctagon";
import useKite from "./primitives/useKite";
import useLine from "./primitives/useLine";
import useArc from "./primitives/useArc";
import useCircle from "./primitives/useCircle";
import useEllipse from "./primitives/useEllipse";
import useSector from "./primitives/useSector";
import useSegment from "./primitives/useSegment";
import BasicSVGRenderer from "./renderers/BasicSVGRenderer";

export {
  usePolygon,
  useTriangle,
  useSquare,
  useRectangle,
  usePentagon,
  useHexagon,
  useHeptagon,
  useOctagon,
  useKite,
  useLine,
  useArc,
  useCircle,
  useEllipse,
  useSector,
  useSegment,
  BasicSVGRenderer,
};

export type * from "./types";

export type { ArcConfig } from "./primitives/useArc";
export type { CircleConfig } from "./primitives/useCircle";
export type { EllipseConfig } from "./primitives/useEllipse";
export type { KiteConfig } from "./primitives/useKite";
export type { LineConfig } from "./primitives/useLine";
export type {
  PolygonConfig,
  NRegularPolygonConfig,
} from "./primitives/usePolygon";
export type { RectangleConfig } from "./primitives/useRectangle";
export type { SectorConfig } from "./primitives/useSector";
export type { SegmentConfig } from "./primitives/useSegment";
