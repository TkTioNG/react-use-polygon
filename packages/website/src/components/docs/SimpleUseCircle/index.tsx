import { useCircle } from "react-use-polygon";
import DocsSVGRenderer from "../../DocsSVGRenderer";

export default function SimpleUseCircle() {
  const circle = useCircle({ radius: 120 });

  return (
    <DocsSVGRenderer primitives={circle}>
      <text x="-433" y="-172">
        {"useCircle({ radius: 120 });"}
      </text>
    </DocsSVGRenderer>
  );
}
