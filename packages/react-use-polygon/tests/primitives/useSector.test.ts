import { renderHook } from "@testing-library/react";
import { useSector } from "../../src";

describe("useSector", () => {
  it("should be defined", () => {
    expect(useSector).toBeDefined();
  });

  it("should have 1 vertices", () => {
    const { result } = renderHook(() => useSector());
    const sector = result.current;
    expect(sector.vertices.length).toBe(1);
  });

  it("should have 3 edge", () => {
    const { result } = renderHook(() => useSector());
    const sector = result.current;
    expect(sector.edges.length).toBe(3);
  });

  it("should have 1 face", () => {
    const { result } = renderHook(() => useSector());
    const sector = result.current;
    expect(sector.faces.length).toBe(1);
  });
});
