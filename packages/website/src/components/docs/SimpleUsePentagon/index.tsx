import { usePentagon } from "react-use-polygon";
import DocsSVGRenderer from "../../DocsSVGRenderer";

export default function SimpleUsePentagon() {
  const pentagon = usePentagon({ size: 220 });

  return (
    <DocsSVGRenderer primitives={pentagon}>
      <text x="-433" y="-172">
        {"usePentagon({ size: 220 });"}
      </text>
    </DocsSVGRenderer>
  );
}
