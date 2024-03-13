import { useTriangle } from "react-use-polygon";
import DocsSVGRenderer from "../../DocsSVGRenderer";

export default function SimpleDemoLogo() {
  const triangle = useTriangle({ sideLength: 200, position: { y: 30 } });

  return (
    <DocsSVGRenderer primitives={triangle}>
      <text x="-433" y="-172">
        {"useTriangle({ sideLength: 200 });"}
      </text>
    </DocsSVGRenderer>
  );
}
