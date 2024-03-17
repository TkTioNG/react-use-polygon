import { ForwardedRef, SVGProps, forwardRef } from "react";
import { Primitive } from "../primitives/usePrimitive";
import useSVGViewBox from "../utilityHooks/useSVGViewBox";
import { ComputeSVGViewBoxOptions } from "../helperFunctions/computeSVGViewBox";

export default forwardRef(function BasicSVGRenderer(
  {
    primitives,
    pathProps = {},
    viewBoxOptions = {},
    children,
    ...svgProps
  }: {
    primitives: Primitive | Primitive[];
    pathProps?: SVGProps<SVGPathElement>;
    viewBoxOptions?: ComputeSVGViewBoxOptions;
  } & SVGProps<SVGSVGElement>,
  ref?: ForwardedRef<SVGSVGElement>
) {
  const svgViewBox = useSVGViewBox(primitives, viewBoxOptions);

  return (
    <svg viewBox={svgViewBox} {...svgProps} ref={ref}>
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
});
