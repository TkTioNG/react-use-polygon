import { renderHook } from "@testing-library/react";
import { useSectorCrescent } from "../../src";

describe("useSectorCrescent", () => {
  it("should be defined", () => {
    expect(useSectorCrescent).toBeDefined();
  });

  it("should have 0 vertices", () => {
    const { result } = renderHook(() => useSectorCrescent());
    const sectorCrescent = result.current;
    expect(sectorCrescent.vertices.length).toBe(0);
  });

  it("should have 4 edge", () => {
    const { result } = renderHook(() => useSectorCrescent());
    const sectorCrescent = result.current;
    expect(sectorCrescent.edges.length).toBe(4);
  });

  it("should have 1 face", () => {
    const { result } = renderHook(() => useSectorCrescent());
    const sectorCrescent = result.current;
    expect(sectorCrescent.faces.length).toBe(1);
  });
});
