import { renderHook } from "@testing-library/react";
import { useArc } from "../../src";

describe("useArc", () => {
  it("should be defined", () => {
    expect(useArc).toBeDefined();
  });

  it("should have 0 vertices", () => {
    const { result } = renderHook(() => useArc());
    const arc = result.current;
    expect(arc.vertices.length).toBe(0);
  });

  it("should have 1 edge", () => {
    const { result } = renderHook(() => useArc());
    const arc = result.current;
    expect(arc.edges.length).toBe(1);
  });

  it("should have 0 face", () => {
    const { result } = renderHook(() => useArc());
    const arc = result.current;
    expect(arc.faces.length).toBe(0);
  });
});
