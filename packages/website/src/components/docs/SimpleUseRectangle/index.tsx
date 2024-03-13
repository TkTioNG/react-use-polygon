import { useRectangle } from "react-use-polygon";
import DocsSVGRenderer from "../../DocsSVGRenderer";

export default function SimpleUseRectangle() {
  const rectangle = useRectangle({ width: 250, height: 150 });

  return (
    <DocsSVGRenderer primitives={rectangle}>
      <text x="-433" y="-172">
        {"useRectangle({ width: 250, height: 150 });"}
      </text>
    </DocsSVGRenderer>
  );
}
