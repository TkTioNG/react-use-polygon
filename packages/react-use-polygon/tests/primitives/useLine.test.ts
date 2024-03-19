import { renderHook } from "@testing-library/react";
import { useLine } from "../../src";

describe("useLine", () => {
  it("should be defined", () => {
    expect(useLine).toBeDefined();
  });

  it("should have 0 vertices", () => {
    const { result } = renderHook(() => useLine({ length: 100 }));
    const line = result.current;
    expect(line.vertices.length).toBe(0);
  });

  it("should have 1 edge", () => {
    const { result } = renderHook(() => useLine({ length: 100 }));
    const line = result.current;
    expect(line.edges.length).toBe(1);
  });

  it("should have 0 face", () => {
    const { result } = renderHook(() => useLine({ length: 100 }));
    const line = result.current;
    expect(line.faces.length).toBe(0);
  });

  it("should accept multiple lines", () => {
    const vertices = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 50, y: 100 },
    ];
    const { result } = renderHook(() => useLine({ vertices }));
    const line = result.current;

    expect(line.vertices.length).toBe(3);
    expect(line.edges.length).toBe(2);
    expect(line.faces.length).toBe(0);
  });
});
