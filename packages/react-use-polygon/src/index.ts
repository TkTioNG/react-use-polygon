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
import useSectorCrescent from "./primitives/useSectorCrescent";
import useSegment from "./primitives/useSegment";

import useSVGViewBox from "./utilityHooks/useSVGViewBox";

import computeSVGViewBox from "./helperFunctions/computeSVGViewBox";

import BasicSVGRenderer from "./renderers/BasicSVGRenderer";

export {
  /** Primitive */
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
  useSectorCrescent,
  useSegment,

  /** Utility hooks */
  useSVGViewBox,

  /** Helper functions */
  computeSVGViewBox,

  /** Renderers */
  BasicSVGRenderer,
};

export * from "./types";

export { ArcConfig } from "./primitives/useArc";
export { CircleConfig } from "./primitives/useCircle";
export { EllipseConfig } from "./primitives/useEllipse";
export { KiteConfig } from "./primitives/useKite";
export { LineConfig } from "./primitives/useLine";
export { PolygonConfig, NRegularPolygonConfig } from "./primitives/usePolygon";
export { RectangleConfig } from "./primitives/useRectangle";
export { SectorConfig } from "./primitives/useSector";
export { SectorCrescentConfig } from "./primitives/useSectorCrescent";
export { SegmentConfig } from "./primitives/useSegment";
