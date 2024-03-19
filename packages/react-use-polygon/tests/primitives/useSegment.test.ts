import { renderHook } from "@testing-library/react";
import { useSegment } from "../../src";

describe("useSegment", () => {
  it("should be defined", () => {
    expect(useSegment).toBeDefined();
  });

  it("should have 0 vertices", () => {
    const { result } = renderHook(() => useSegment());
    const segment = result.current;
    expect(segment.vertices.length).toBe(0);
  });

  it("should have 2 edge", () => {
    const { result } = renderHook(() => useSegment());
    const segment = result.current;
    expect(segment.edges.length).toBe(2);
  });

  it("should have 1 face", () => {
    const { result } = renderHook(() => useSegment());
    const segment = result.current;
    expect(segment.faces.length).toBe(1);
  });
});
