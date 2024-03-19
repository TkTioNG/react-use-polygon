import { renderHook } from "@testing-library/react";
import { usePentagon } from "../../src";

describe("usePentagon", () => {
  it("should be defined", () => {
    expect(usePentagon).toBeDefined();
  });

  it("should have 5 vertices", () => {
    const { result } = renderHook(() => usePentagon());
    const pentagon = result.current;
    expect(pentagon.vertices.length).toBe(5);
  });

  it("should have 5 edge", () => {
    const { result } = renderHook(() => usePentagon());
    const pentagon = result.current;
    expect(pentagon.edges.length).toBe(5);
  });

  it("should have 1 face", () => {
    const { result } = renderHook(() => usePentagon());
    const pentagon = result.current;
    expect(pentagon.faces.length).toBe(1);
  });
});
