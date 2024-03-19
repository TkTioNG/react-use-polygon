import { renderHook } from "@testing-library/react";
import { useKite } from "../../src";

describe("useKite", () => {
  it("should be defined", () => {
    expect(useKite).toBeDefined();
  });

  it("should have 4 vertices", () => {
    const { result } = renderHook(() => useKite());
    const kite = result.current;
    expect(kite.vertices.length).toBe(4);
  });

  it("should have 4 edge", () => {
    const { result } = renderHook(() => useKite());
    const kite = result.current;
    expect(kite.edges.length).toBe(4);
  });

  it("should have 1 face", () => {
    const { result } = renderHook(() => useKite());
    const kite = result.current;
    expect(kite.faces.length).toBe(1);
  });

  /**
   * @todo check concave kite
   */
});
