import { useKite } from "react-use-polygon";
import DocsSVGRenderer from "../../DocsSVGRenderer";

export default function SimpleUseKite() {
  const convexKite = useKite({
    tLength: 120,
    bLength: 180,
    position: { x: -200, y: -30 },
  });
  const concaveKite = useKite({
    tLength: 160,
    bLength: 240,
    isConcave: true,
    position: { x: 200 },
  });

  return (
    <DocsSVGRenderer primitives={[convexKite, concaveKite]}>
      <text x="-433" y="-172">
        {"useKite({ tLength: 120, bLength: 180 });"}
      </text>
      <text x="-115" y="184">
        {"useKite({ tLength: 160, bLength: 240, isConcave: true });"}
      </text>
    </DocsSVGRenderer>
  );
}
