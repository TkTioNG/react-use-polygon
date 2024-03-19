import { useSector } from "react-use-polygon";
import DocsSVGRenderer from "../../DocsSVGRenderer";

export default function SimpleUseSector() {
  const minorSector = useSector({
    radius: 120,
    angle: 75,
    position: { x: -200 },
  });
  const majorSector = useSector({
    radius: 120,
    angle: 285,
    rotate: -75,
    position: { x: 200 },
  });

  return (
    <DocsSVGRenderer primitives={[minorSector, majorSector]}>
      <text x="-433" y="-172">
        {"useSector({ radius: 120, angle: 75 });"}
      </text>
      <text x="-85" y="184">
        {"useSector({ radius: 120, angle: 285, rotate: -75 });"}
      </text>
    </DocsSVGRenderer>
  );
}
