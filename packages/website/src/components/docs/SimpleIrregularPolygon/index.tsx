import { usePolygon } from "react-use-polygon";
import DocsSVGRenderer from "../../DocsSVGRenderer";

export default function SimpleIrregularPolygon() {
  const random = usePolygon({
    vertices: [
      { x: 40, y: 0 },
      { x: 290, y: 20 },
      { x: 350, y: 200 },
      { x: 80, y: 180 },
      { x: 0, y: 250 },
    ],
    position: { x: -220, y: -120 },
  });

  return (
    <DocsSVGRenderer primitives={random}>
      <text x="210" y="-40">
        {"useLine({"}
      </text>
      <text x="210" y="-12">
        {"  vertices: ["}
      </text>
      <text x="210" y="16">
        {"    { x: 40, y: 0 },"}
      </text>
      <text x="210" y="44">
        {"    { x: 290, y: 20 },"}
      </text>
      <text x="210" y="72">
        {"    { x: 350, y: 200 },"}
      </text>
      <text x="210" y="100">
        {"    { x: 80, y: 180 },"}
      </text>
      <text x="210" y="128">
        {"    { x: 0, y: 250 },"}
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
