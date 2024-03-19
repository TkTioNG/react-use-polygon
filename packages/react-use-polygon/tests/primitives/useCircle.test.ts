import { renderHook } from "@testing-library/react";
import { useCircle } from "../../src";

describe("useCircle", () => {
  it("should be defined", () => {
    expect(useCircle).toBeDefined();
  });

  it("should have 0 vertices", () => {
    const { result } = renderHook(() => useCircle());
    const circle = result.current;
    expect(circle.vertices.length).toBe(0);
  });

  /**
   * @todo check if return 1 edge better
   */
  it("should have 4 edge", () => {
    const { result } = renderHook(() => useCircle());
    const circle = result.current;
    expect(circle.edges.length).toBe(4);
  });

  /**
   * @todo should be 1 face
   */
  it("should have 0 face", () => {
    const { result } = renderHook(() => useCircle());
    const circle = result.current;
    expect(circle.faces.length).toBe(0);
  });
});
