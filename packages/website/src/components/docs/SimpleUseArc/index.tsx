import { useArc } from "react-use-polygon";
import DocsSVGRenderer from "../../DocsSVGRenderer";

export default function SimpleUseArc() {
  const arc1 = useArc({ angle: 120, position: { x: -200 } });
  const arc2 = useArc({ angle: 235, rotation: -108, position: { x: 200 } });

  return (
    <DocsSVGRenderer primitives={[arc1, arc2]}>
      <text x="-433" y="-172">
        {"useArc({ angle: 120 });"}
      </text>
      <text x="60" y="184">
        {"useArc({ angle: 235, rotation: -108 });"}
      </text>
    </DocsSVGRenderer>
  );
}
