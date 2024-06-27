export function throttle<T extends unknown[]>(func: (...args: T) => void, timeFrame: number) {
  let lastTime = new Date(0);

  return function (...args: T) {
    const now = new Date();

    if (+now - +lastTime >= timeFrame) {
      func(...args);
      lastTime = now;
    }
  };
}

export function getRowsCount(items: unknown[], cols: number) {
  const getItemsMaxHeight = items.map((val) => {
    const item = val[cols];

    return (item && item.y) + (item && item.h) || 0;
  });

  return Math.max(...getItemsMaxHeight, 1);
}

export const getColumn = (containerWidth: number, columns: [number, number][]) => {
  const sortColumns = columns.slice().sort((a, b) => a[0] - b[0]);

  const breakpoint = sortColumns.find((value) => {
    const [width] = value;
    return containerWidth <= width;
  });

  if (breakpoint) {
    return breakpoint[1];
  } else {
    return sortColumns[sortColumns.length - 1][1];
  }
};
