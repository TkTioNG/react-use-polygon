import { renderHook } from "@testing-library/react";
import { useEllipse } from "../../src";

describe("useEllipse", () => {
  it("should be defined", () => {
    expect(useEllipse).toBeDefined();
  });

  it("should have 0 vertices", () => {
    const { result } = renderHook(() => useEllipse());
    const ellipse = result.current;
    expect(ellipse.vertices.length).toBe(0);
  });

  /**
   * @todo check if return 1 edge better
   */
  it("should have 4 edge", () => {
    const { result } = renderHook(() => useEllipse());
    const ellipse = result.current;
    expect(ellipse.edges.length).toBe(4);
  });

  /**
   * @todo should be 1 face
   */
  it("should have 0 face", () => {
    const { result } = renderHook(() => useEllipse());
    const ellipse = result.current;
    expect(ellipse.faces.length).toBe(0);
  });
});
