import { useLine } from "react-use-polygon";
import DocsSVGRenderer from "../../DocsSVGRenderer";

export default function SimpleUseLine() {
  const line = useLine({ length: 200, position: { x: -240 } });

  const zigZag = useLine({
    vertices: [
      { x: 0, y: 0 },
      { x: 0, y: -140 },
      { x: 80, y: -100 },
      { x: 80, y: -240 },
    ],
    position: { x: 10, y: 110 },
  });

  return (
    <DocsSVGRenderer primitives={[line, zigZag]}>
      <text x="-433" y="-172">
        {"useLine({ length: 200 });"}
      </text>
      <text x="210" y="-12">
        {"useLine({"}
      </text>
      <text x="210" y="16">
        {"  vertices: ["}
      </text>
      <text x="210" y="44">
        {"    { x: 0, y: 0 },"}
      </text>
      <text x="210" y="72">
        {"    { x: 0, y: -140 },"}
      </text>
      <text x="210" y="100">
        {"    { x: 80, y: -100 },"}
      </text>
      <text x="210" y="128">
        {"    { x: 80, y: -240 },"}
      </text>
      <text x="210" y="156">
        {"  ],"}
      </text>
      <text x="210" y="184">
        {"});"}
      </text>
    </DocsSVGRenderer>
  );
}
