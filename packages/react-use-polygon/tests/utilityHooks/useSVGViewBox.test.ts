import { renderHook } from "@testing-library/react";
import { useRectangle, useSVGViewBox } from "../../src";

describe("useSVGViewBox", () => {
  it("should be defined", () => {
    expect(useSVGViewBox).toBeDefined();
  });

  it("should have correct viewBox", () => {
    const { result: rectResult } = renderHook(() =>
      useRectangle({ width: 200, height: 100 })
    );
    const primitive = rectResult.current;
    const { result } = renderHook(() => useSVGViewBox(primitive));
    const viewBox = result.current;
    expect(viewBox).toBe("-100 -50 200 100");
  });

  it("should have correct padding", () => {
    const { result: rectResult } = renderHook(() =>
      useRectangle({ width: 200, height: 100 })
    );
    const primitive = rectResult.current;
    const { result } = renderHook(() =>
      useSVGViewBox(primitive, { padding: { x: 100, y: 50 } })
    );
    const viewBox = result.current;
    expect(viewBox).toBe("-200 -100 400 200");
  });

  it("should allow override", () => {
    const { result: rectResult } = renderHook(() =>
      useRectangle({ width: 200, height: 100 })
    );
    const primitive = rectResult.current;
    const { result } = renderHook(() =>
      useSVGViewBox(primitive, { x: 0, y: 50, width: 250, height: 150 })
    );
    const viewBox = result.current;
    expect(viewBox).toBe("0 50 250 150");
  });
});
