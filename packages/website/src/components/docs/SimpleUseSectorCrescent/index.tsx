import { useSectorCrescent } from "react-use-polygon";
import DocsSVGRenderer from "../../DocsSVGRenderer";

export default function SimpleUseSectorCrescent() {
  const minorSector = useSectorCrescent({
    radius: 120,
    angle: 75,
    position: { x: -200 },
  });
  const majorSector = useSectorCrescent({
    radius: 120,
    angle: 285,
    rotate: -75,
    position: { x: 200 },
  });

  return (
    <DocsSVGRenderer primitives={[minorSector, majorSector]}>
      <text x="-433" y="-172">
        {"useSectorCrescent({ radius: 120, angle: 75 });"}
      </text>
      <text x="-165" y="184">
        {"useSectorCrescent({ radius: 120, angle: 285, rotate: -75 });"}
      </text>
    </DocsSVGRenderer>
  );
}
