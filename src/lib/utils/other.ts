import type { Breakpoint, Item } from "../types.ts";

/**
 * Throttles a function call to not repeat in a given number of milliseconds.
 *
 * @param func The function to be throttled.
 * @param timeFrame The number of milliseconds before the function can be called again.
 * @returns The throttled function.
 */
export function throttle<T extends unknown[]>(
  func: (...args: T) => void,
  timeFrame: number,
) {
  let lastTime = new Date(0);

  return function (...args: T) {
    const now = new Date();

    if (+now - +lastTime >= timeFrame) {
      lastTime = now;
      func(...args);
    }
  };
}

/**
 * Calculates the total number of rows, which is equal to the maximum `y + h` of all items.
 *
 * @param items All of the items.
 * @param totalCols Current total number of columns.
 * @returns Current total number of rows.
 */
export function getRowsCount(
  items: Item<unknown>[],
  totalCols: number,
): number {
  return items.reduce((acc, item) => {
    if (!item[totalCols]) return acc;

    const { y, h } = item[totalCols];

    return Math.max(acc, y + h);
  }, 1);
}

/**
 * Calculates the current number of columns based on the container width and the list of breakpoints.
 *
 * @param containerWidth The current container width.
 * @param breakpoints The list of breakpoints. __It is assumed to be sorted in ascending order!__
 * @returns The `numberOfColumns` of the current breakpoint.
 */
export const getCurrentBreakpoint = (
  containerWidth: number,
  breakpoints: Breakpoint[],
) => {
  const breakpoint = breakpoints.find(([breakpointWidth]) => {
    return containerWidth <= breakpointWidth;
  });

  return (breakpoint ?? breakpoints.at(-1)!)[1];
};
