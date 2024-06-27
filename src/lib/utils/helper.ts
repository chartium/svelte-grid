import { makeMatrix, makeMatrixFromItems } from "../utils/matrix.js";
import {
  findFreeSpaceForItem,
  getFlattenedItem,
  moveItem,
} from "../utils/item.js";
import { getRowsCount } from "./other.js";
import type {
  FlattenedItem,
  Item,
  ItemLayout,
  ItemLayoutScaffold,
} from "../types.ts";

const gridHelp = {
  normalize<T>(items: Item<T>[], col: number) {
    let result = [...items];

    result.forEach((value) => {
      const item = getFlattenedItem(value, col);

      if (!item.fixed) result = moveItem(item, result, col);
    });

    return result;
  },

  adjust<T>(items: Item<T>[], col: number) {
    let matrix = makeMatrix<FlattenedItem>(getRowsCount(items, col), col);

    const order = items.toSorted((a, b) => {
      const aItem = a[col];
      const bItem = b[col];

      return aItem.x - bItem.x || aItem.y - bItem.y;
    });

    return order.reduce((acc, item) => {
      const position = findFreeSpaceForItem(matrix, item[col]);

      acc.push({
        ...item,
        [col]: {
          ...item[col],
          ...position,
        },
      });

      matrix = makeMatrixFromItems(acc, getRowsCount(acc, col), col);

      return acc;
    }, [] as Item<T>[]);
  },

  item(item: ItemLayoutScaffold): ItemLayout {
    const { min, max } = item;

    return {
      fixed: false,
      resizable: !item.fixed,
      draggable: !item.fixed,
      customDragger: false,
      customResizer: false,
      min: min
        ? {
            ...min,
            w: Math.max(1, min?.w ?? 1),
            h: Math.max(1, min?.h ?? 1),
          }
        : { w: 1, h: 1 },
      max: max ?? {},
      ...item,
    };
  },

  findSpace(item: Item<unknown>, items: Item<unknown>[], cols: number) {
    const matrix = makeMatrixFromItems(items, getRowsCount(items, cols), cols);

    return findFreeSpaceForItem(matrix, item[cols]);
  },
};

export default gridHelp;
