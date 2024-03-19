import { renderHook } from "@testing-library/react";
import usePrimitive from "../../src/primitives/usePrimitive";
import * as hooks from "../../src";

describe("usePrimitive", () => {
  it("should not be exposed in src", () => {
    // @ts-expect-error usePrimitive shouldn't exist in exports
    expect(hooks.usePrimitive).toBeUndefined();
  });

  it("should have all Primitive properties", () => {
    const { result } = renderHook(() => usePrimitive());
    const primitive = result.current;

    expect(Array.isArray(primitive.vertices)).toBe(true);
    expect(Array.isArray(primitive.edges)).toBe(true);
    expect(Array.isArray(primitive.faces)).toBe(true);

    // centroid
    expect(typeof primitive.centroid.x).toBe("number");
    expect(typeof primitive.centroid.y).toBe("number");

    // boundingBox
    expect(typeof primitive.boundingBox.x).toBe("number");
    expect(typeof primitive.boundingBox.y).toBe("number");
    expect(typeof primitive.boundingBox.width).toBe("number");
    expect(typeof primitive.boundingBox.height).toBe("number");

    // svgPath
    expect(typeof primitive.svgPath).toBe("string");

    // drawOnCanvas
    expect(typeof primitive.drawOnCanvas).toBe("function");

    // modifyConfig
    expect(typeof primitive.modifyConfig).toBe("function");
  });
});
