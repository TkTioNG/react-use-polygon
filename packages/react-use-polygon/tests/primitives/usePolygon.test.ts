import { renderHook } from "@testing-library/react";
import { usePolygon } from "../../src";

describe("usePolygon", () => {
  it("should be defined", () => {
    expect(usePolygon).toBeDefined();
  });

  it("should be nanogon when sides is 9", () => {
    const { result } = renderHook(() => usePolygon({ sides: 9 }));
    const polygon = result.current;

    expect(polygon.vertices.length).toBe(9);
    expect(polygon.edges.length).toBe(9);
    expect(polygon.faces.length).toBe(1);
  });
});
