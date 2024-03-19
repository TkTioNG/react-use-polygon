import { useSegment } from "react-use-polygon";
import DocsSVGRenderer from "../../DocsSVGRenderer";

export default function SimpleUseSegment() {
  const minorSegment = useSegment({
    radius: 120,
    angle: 120,
    position: { x: -200 },
  });
  const majorSegment = useSegment({
    radius: 120,
    angle: 240,
    rotate: -120,
    position: { x: 200 },
  });

  return (
    <DocsSVGRenderer primitives={[minorSegment, majorSegment]}>
      <text x="-433" y="-172">
        {"useSegment({ radius: 120, angle: 120 });"}
      </text>
      <text x="-105" y="184">
        {"useSegment({ radius: 120, angle: 240, rotate: -120 });"}
      </text>
    </DocsSVGRenderer>
  );
}
