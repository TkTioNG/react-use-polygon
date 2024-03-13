import { useHexagon } from "react-use-polygon";
import DocsSVGRenderer from "../../DocsSVGRenderer";

export default function SimpleUseHexagon() {
  const hexagon = useHexagon({ size: 240 });

  return (
    <DocsSVGRenderer primitives={hexagon}>
      <text x="-433" y="-172">
        {"useHexagon({ size: 240 });"}
      </text>
    </DocsSVGRenderer>
  );
}
