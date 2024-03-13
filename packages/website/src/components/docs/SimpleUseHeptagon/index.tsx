import { useHeptagon } from "react-use-polygon";
import DocsSVGRenderer from "../../DocsSVGRenderer";

export default function SimpleUseHeptagon() {
  const heptagon = useHeptagon({ sideLength: 100 });

  return (
    <DocsSVGRenderer primitives={heptagon}>
      <text x="-433" y="-172">
        {"useHeptagon({ sideLength: 100 });"}
      </text>
    </DocsSVGRenderer>
  );
}
