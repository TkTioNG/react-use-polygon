import { renderHook } from "@testing-library/react";
import { useHexagon } from "../../src";

describe("useHexagon", () => {
  it("should be defined", () => {
    expect(useHexagon).toBeDefined();
  });

  it("should have 6 vertices", () => {
    const { result } = renderHook(() => useHexagon());
    const hexagon = result.current;
    expect(hexagon.vertices.length).toBe(6);
  });

  it("should have 6 edge", () => {
    const { result } = renderHook(() => useHexagon());
    const hexagon = result.current;
    expect(hexagon.edges.length).toBe(6);
  });

  it("should have 1 face", () => {
    const { result } = renderHook(() => useHexagon());
    const hexagon = result.current;
    expect(hexagon.faces.length).toBe(1);
  });
});
