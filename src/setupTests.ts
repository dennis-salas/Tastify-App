import "@testing-library/jest-dom";

if (typeof window !== "undefined" && !window.PointerEvent) {
  // @ts-expect-error PointerEvent no existe en jsdom
  window.PointerEvent = MouseEvent;
}