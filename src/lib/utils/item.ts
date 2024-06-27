import type { FlattenedItem, Item, ItemLayout, Position } from "../types.ts";
import { findCollidingBlocks, makeMatrixFromItems } from "./matrix.js";
import { getRowsCount } from "./other.js";

export const getFlattenedItem = <T>(
  item: Item<T>,
  col: number,
): FlattenedItem<T> => {
  return { ...item[col], id: item.id, data: item.data };
};

export function findFreeSpaceForItem(
  matrix: FlattenedItem[][],
  item: ItemLayout,
): Position {
  const cols = matrix[0].length;
  const w = Math.min(cols, item.w);
  const xNtime = cols - w;

  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];

    for (let j = 0; j < xNtime + 1; j++) {
      const sliceA = row.slice(j, j + w);
      const empty = sliceA.every((val) => val === undefined);
      if (empty) {
        const isEmpty = matrix
          .slice(i, i + item.h)
          .every((a) => a.slice(j, j + w).every((n) => n === undefined));

        if (isEmpty) {
          return { y: i, x: j };
        }
      }
    }
  }

  return {
    y: matrix.length,
    x: 0,
  };
}

const updateItem = <T>(
  items: Item<T>[],
  itemId: string,
  position: Partial<ItemLayout>,
  col: number,
) => {
  return items.map((value) => {
    if (value.id === itemId) {
      return { ...value, [col]: { ...value[col], ...position } };
    }
    return value;
  });
};

export function moveItemsAroundItem<T>(
  active: FlattenedItem,
  items: Item<T>[],
  cols: number,
): Item<T>[] {
  // Get current item from the breakpoint
  const ids = items
    .map((value) => value.id)
    .filter((value) => value !== active.id);

  const els = items.filter((value) => value.id !== active.id);

  // Update items
  const newItems = updateItem(items, active.id, active, cols);

  let matrix = makeMatrixFromItems(
    newItems,
    getRowsCount(newItems, cols),
    cols,
    ids,
  );
  let tempItems = newItems;

  // Exclude resolved elements ids in array
  const exclude: string[] = [];

  els.forEach((item) => {
    // Find position for element
    const position = findFreeSpaceForItem(matrix, item[cols]);
    // Exclude item
    exclude.push(item.id);

    tempItems = updateItem(tempItems, item.id, position, cols);

    // Recreate ids of elements
    const getIgnoreItems = ids.filter((value) => exclude.indexOf(value) === -1);

    // Update matrix for next iteration
    matrix = makeMatrixFromItems(
      tempItems,
      getRowsCount(tempItems, cols),
      cols,
      getIgnoreItems,
    );
  });

  // Return result
  return tempItems;
}

export function moveItem<T>(
  item: FlattenedItem,
  items: Item<T>[],
  totalCols: number,
): Item<T>[] {
  // Create matrix from the items except the active
  let matrix = makeMatrixFromItems(
    items,
    getRowsCount(items, totalCols),
    totalCols,
    [item.id],
  );

  // Getting the ids of items under active Array<String>
  const closeItems = findCollidingBlocks(matrix, item);
  const closeItemIds = closeItems.map((value) => value.id);

  // Getting whenever of these items is fixed
  const fixed = closeItems.some((value) => value.fixed);

  // If found fixed, reset the active to its original position
  if (fixed) return items;

  // Update items
  items = updateItem(items, item.id, item, totalCols);

  // Create matrix of items expect close elements
  matrix = makeMatrixFromItems(
    items,
    getRowsCount(items, totalCols),
    totalCols,
    closeItemIds,
  );

  // Create temp vars
  let tempItems = [...items];
  const tempCloseBlocks = closeItemIds;

  // Exclude resolved elements ids in array
  const exclude: string[] = [];

  // Iterate over close elements under active item
  closeItems.forEach((item) => {
    // Find position for element
    const position = findFreeSpaceForItem(matrix, item);
    // Exclude item
    exclude.push(item.id);

    // Assign the position to the element in the column
    tempItems = updateItem(tempItems, item.id, position, totalCols);

    // Recreate ids of elements
    const getIgnoreItems = tempCloseBlocks.filter(
      (value) => exclude.indexOf(value) === -1,
    );

    // Update matrix for next iteration
    matrix = makeMatrixFromItems(
      tempItems,
      getRowsCount(tempItems, totalCols),
      totalCols,
      getIgnoreItems,
    );
  });

  // Return result
  return tempItems;
}

export function getUndefinedItemIds(items: Item[], col: number): string[] {
  return items.filter((value) => !value[col]).map((value) => value.id);
}

export function getClosestColumn(
  items: Item[],
  item: Item,
  col: number,
  breakpoints: [number, number][],
) {
  return breakpoints
    .map(([_, column]) => item[column] && column)
    .filter(Boolean)
    .reduce(function (acc, value) {
      const isLower = Math.abs(value - col) < Math.abs(acc - col);

      return isLower ? value : acc;
    });
}

export function specifyUndefinedColumns<T>(
  items: Item<T>[],
  col: number,
  breakpoints: [number, number][],
): Item<T>[] {
  let matrix = makeMatrixFromItems(items, getRowsCount(items, col), col);

  const getUndefinedElements = getUndefinedItemIds(items, col);

  let newItems = [...items];

  getUndefinedElements.forEach((elementId) => {
    const item = items.find((item) => item.id === elementId)!;

    const closestColumn = getClosestColumn(items, item, col, breakpoints);
    const position = findFreeSpaceForItem(matrix, item[closestColumn]);

    const newItem = {
      ...item,
      [col]: {
        ...item[closestColumn],
        ...position,
      },
    };

    newItems = newItems.map((value) =>
      value.id === elementId ? newItem : value,
    );

    matrix = makeMatrixFromItems(newItems, getRowsCount(newItems, col), col);
  });
  return newItems;
}
