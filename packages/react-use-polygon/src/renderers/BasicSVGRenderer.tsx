import { SVGProps } from "react";
import { Primitive } from "../primitives/usePrimitive";
import useSVGViewBox from "../utilityHooks/useSVGViewBox";
import { ComputeSVGViewBoxOptions } from "../helperFunctions/computeSVGViewBox";

export default function BasicSVGRenderer({
  primitives,
  pathProps = {},
  viewBoxOptions = {},
  children,
  ...svgProps
}: {
  primitives: Primitive | Primitive[];
  pathProps?: SVGProps<SVGPathElement>;
  viewBoxOptions?: ComputeSVGViewBoxOptions;
} & SVGProps<SVGSVGElement>) {
  const svgViewBox = useSVGViewBox(primitives, viewBoxOptions);

  return (
    <svg viewBox={svgViewBox} {...svgProps}>
      {Array.isArray(primitives) ? (
        <>
          {primitives.map((primitive) => (
            <path
              key={primitive.svgPath}
              {...pathProps}
              d={primitive.svgPath}
            />
          ))}
        </>
      ) : (
        <path {...pathProps} d={primitives.svgPath} />
      )}
      {children}
    </svg>
  );
}
