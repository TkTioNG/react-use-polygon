import { renderHook } from "@testing-library/react";
import { useSquare } from "../../src";

describe("useSquare", () => {
  it("should be defined", () => {
    expect(useSquare).toBeDefined();
  });

  it("should have 4 vertices", () => {
    const { result } = renderHook(() => useSquare());
    const square = result.current;
    expect(square.vertices.length).toBe(4);
  });

  it("should have 4 edge", () => {
    const { result } = renderHook(() => useSquare());
    const square = result.current;
    expect(square.edges.length).toBe(4);
  });

  it("should have 1 face", () => {
    const { result } = renderHook(() => useSquare());
    const square = result.current;
    expect(square.faces.length).toBe(1);
  });
});
