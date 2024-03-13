import { useOctagon } from "react-use-polygon";
import DocsSVGRenderer from "../../DocsSVGRenderer";

export default function SimpleUseOctagon() {
  const octagon = useOctagon({ sideLength: 100 });

  return (
    <DocsSVGRenderer primitives={octagon}>
      <text x="-433" y="-172">
        {"useOctagon({ sideLength: 100 });"}
      </text>
    </DocsSVGRenderer>
  );
}
