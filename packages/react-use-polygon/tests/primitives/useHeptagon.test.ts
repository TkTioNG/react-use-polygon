import { renderHook } from "@testing-library/react";
import { useHeptagon } from "../../src";

describe("useHeptagon", () => {
  it("should be defined", () => {
    expect(useHeptagon).toBeDefined();
  });

  it("should have 7 vertices", () => {
    const { result } = renderHook(() => useHeptagon());
    const heptagon = result.current;
    expect(heptagon.vertices.length).toBe(7);
  });

  it("should have 7 edge", () => {
    const { result } = renderHook(() => useHeptagon());
    const heptagon = result.current;
    expect(heptagon.edges.length).toBe(7);
  });

  it("should have 1 face", () => {
    const { result } = renderHook(() => useHeptagon());
    const heptagon = result.current;
    expect(heptagon.faces.length).toBe(1);
  });
});
