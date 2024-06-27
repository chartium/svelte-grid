import type { FlattenedItem, Item } from "../types.ts";
import { getFlattenedItem } from "./item.js";

/**
 * Create an empty matrix of the given dimensions.
 *
 * @param rows The number of rows.
 * @param cols The number of columns.
 * @returns An empty rows * columns matrix.
 */
export const makeMatrix = <T>(rows: number, cols: number) =>
  Array.from(Array(rows), () => new Array(cols)) as T[][]; // make 2d array

/**
 * Create a matrix of flattened items from the current configuration of the grid.
 * Useful for lookup based on position.
 *
 * @param items All of the items in the grid.
 * @param rows The total number of rows the grid currently has.
 * @param cols The total number of columns the grid currently has.
 * @param ignoreIdList An optional list of ids to ignore.
 * @returns A matrix of items, an item at position `(x, y)` is at `matrix[y][x]`.
 */
export function makeMatrixFromItems(
  items: Item[],
  rows: number,
  cols: number,
  ignoreIdList?: string[],
): FlattenedItem[][] {
  const matrix = makeMatrix<FlattenedItem>(rows, cols);

  for (const item of items) {
    const flattened = getFlattenedItem(item, cols);

    if (!flattened || ignoreIdList?.includes(flattened.id)) continue;

    const { x, y, h } = flattened;
    const w = Math.min(cols, flattened.w);

    for (let j = y; j < y + h; j++) {
      for (let k = x; k < x + w; k++) {
        matrix[j][k] = flattened;
      }
    }
  }

  return matrix;
}

/**
 * Find all items that collide with the given item.
 *
 * @param matrix The current matrix of items.
 * @param item The item to check for collisions.
 * @returns A list of items that collide with the given item.
 */
export function findCollidingBlocks(
  matrix: FlattenedItem[][],
  item: FlattenedItem,
): FlattenedItem[] {
  const { x, y } = item;

  const w = Math.min(matrix[0].length - x, item.w);
  const h = Math.min(matrix.length - y, item.h);

  const result = new Set<FlattenedItem>();

  for (let j = y; j < y + h; j++)
    for (let k = x; k < x + w; k++) result.add(matrix[j][k]);

  return [...result];
}
