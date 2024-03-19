import { renderHook } from "@testing-library/react";
import { useRectangle } from "../../src";

describe("useRectangle", () => {
  it("should be defined", () => {
    expect(useRectangle).toBeDefined();
  });

  it("should have 4 vertices", () => {
    const { result } = renderHook(() => useRectangle());
    const rectangle = result.current;
    expect(rectangle.vertices.length).toBe(4);
  });

  it("should have 4 edge", () => {
    const { result } = renderHook(() => useRectangle());
    const rectangle = result.current;
    expect(rectangle.edges.length).toBe(4);
  });

  it("should have 1 face", () => {
    const { result } = renderHook(() => useRectangle());
    const rectangle = result.current;
    expect(rectangle.faces.length).toBe(1);
  });
});
