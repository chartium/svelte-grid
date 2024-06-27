export const makeMatrix = <T>(rows: number, cols: number) => Array.from(Array(rows), () => new Array(cols)) as T[][]; // make 2d array

export function makeMatrixFromItems(items: unknown[], rows: number, cols: number) {
  const matrix = makeMatrix(rows, cols);

  for (const item of items) {
    const value = item[cols];

    if (value) {
      const { x, y, h } = value;
      const { id } = item;
      const w = Math.min(cols, value.w);

      for (let j = y; j < y + h; j++) {
        for (let k = x; k < x + w; k++) {
          matrix[j][k] = { ...value, id };
        }
      }
    }
  }

  return matrix;
}

export function findCloseBlocks(items, matrix, curObject) {
  const { h, x, y } = curObject;

  const w = Math.min(matrix[0].length, curObject.w);
  const tempR = matrix.slice(y, y + h);

  let result = [];
  for (var i = 0; i < tempR.length; i++) {
    let tempA = tempR[i].slice(x, x + w);
    result = [...result, ...tempA.map((val) => val.id && val.id !== curObject.id && val.id).filter(Boolean)];
  }

  return [...new Set(result)];
}

export function makeMatrixFromItemsIgnore(items, ignoreList, _row, _col) {
  let matrix = makeMatrix(_row, _col);

  for (const item of items) {
    const value = item[_col];
    const id = item.id;
    const { x, y, h } = value;
    const w = Math.min(_col, value.w);

    if (ignoreList.indexOf(id) === -1) {
      for (let j = y; j < y + h; j++) {
        const row = matrix[j];

        if (!row) continue;

        for (let k = x; k < x + w; k++) {
          row[k] = { ...value, id };
        }
      }
    }
  }
  return matrix;
}

export function findItemsById(closeBlocks, items) {
  return items.filter((item) => closeBlocks.indexOf(item.id) !== -1);
}
