import { useSquare } from "react-use-polygon";
import DocsSVGRenderer from "../../DocsSVGRenderer";

export default function SimpleUseSquare() {
  const square = useSquare({ size: 250 });

  return (
    <DocsSVGRenderer primitives={square}>
      <text x="-433" y="-172">
        {"useSquare({ size: 250 });"}
      </text>
    </DocsSVGRenderer>
  );
}
