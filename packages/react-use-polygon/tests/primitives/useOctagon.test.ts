import { renderHook } from "@testing-library/react";
import { useOctagon } from "../../src";

describe("useOctagon", () => {
  it("should be defined", () => {
    expect(useOctagon).toBeDefined();
  });

  it("should have 8 vertices", () => {
    const { result } = renderHook(() => useOctagon());
    const octagon = result.current;
    expect(octagon.vertices.length).toBe(8);
  });

  it("should have 8 edge", () => {
    const { result } = renderHook(() => useOctagon());
    const octagon = result.current;
    expect(octagon.edges.length).toBe(8);
  });

  it("should have 1 face", () => {
    const { result } = renderHook(() => useOctagon());
    const octagon = result.current;
    expect(octagon.faces.length).toBe(1);
  });
});
