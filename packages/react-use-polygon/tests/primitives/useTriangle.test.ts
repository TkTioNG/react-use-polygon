import { renderHook } from "@testing-library/react";
import { useTriangle } from "../../src";

describe("useTriangle", () => {
  it("should be defined", () => {
    expect(useTriangle).toBeDefined();
  });

  it("should have 3 vertices", () => {
    const { result } = renderHook(() => useTriangle());
    const triangle = result.current;
    expect(triangle.vertices.length).toBe(3);
  });

  it("should have 3 edge", () => {
    const { result } = renderHook(() => useTriangle());
    const triangle = result.current;
    expect(triangle.edges.length).toBe(3);
  });

  it("should have 1 face", () => {
    const { result } = renderHook(() => useTriangle());
    const triangle = result.current;
    expect(triangle.faces.length).toBe(1);
  });
});
