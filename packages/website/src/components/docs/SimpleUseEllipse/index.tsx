import { useEllipse } from "react-use-polygon";
import DocsSVGRenderer from "../../DocsSVGRenderer";

export default function SimpleUseEllipse() {
  const ellipse = useEllipse({ xRadius: 150, yRadius: 80 });

  return (
    <DocsSVGRenderer primitives={ellipse}>
      <text x="-433" y="-172">
        {"useEllipse({ xRadius: 150, yRadius: 80 });"}
      </text>
    </DocsSVGRenderer>
  );
}
