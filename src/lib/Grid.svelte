<script lang="ts" generics="T">
  import {
    moveItemsAroundItem,
    moveItem,
    specifyUndefinedColumns,
    getFlattenedItem,
  } from "./utils/item.js";
  import { createEventDispatcher } from "svelte";
  import {
    getCurrentBreakpoint,
    getRowsCount,
    throttle,
  } from "./utils/other.js";
  import MoveResize, { type RepaintEvent } from "./GridItem.svelte";
  import type { Breakpoint, Item } from "./types.js";

  const dispatch = createEventDispatcher();

  export let fillSpace = false;
  export let items: Item<T>[];
  export let rowHeight: number;
  export let breakpoints: Breakpoint[];
  export let gap: [number, number] = [10, 10];
  export let fastStart = false;
  export let throttleUpdate = 100;
  export let throttleResize = 100;

  export let scroller = undefined;
  export let sensor = 20;

  let totalCols: number;

  let colWidth = 0;

  let realContainerSize: DOMRect;

  /** The total number of columns in the current breakpoint */
  $: totalCols = getCurrentBreakpoint(
    realContainerSize?.width ?? 0,
    breakpoints,
  );

  /** The pixel width of a column */
  $: colWidth = (realContainerSize?.width ?? 0) / totalCols;

  /** The total width of the container (the number of rows * the row height) */
  $: containerHeight = getRowsCount(items, totalCols) * rowHeight;

  const onResize = throttle(() => {
    items = specifyUndefinedColumns(items, totalCols, breakpoints);
    dispatch("resize", {
      cols: totalCols,
      xPerPx: colWidth,
      yPerPx: rowHeight,
      width: realContainerSize?.width,
    });
  }, throttleUpdate);

  $: realContainerSize?.width, onResize();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateMatrix = ({ detail }: CustomEvent<any>) => {
    let activeItem = items.find(({ id }) => id === detail.id);

    if (!activeItem) return;

    activeItem = {
      ...activeItem,
      [totalCols]: {
        ...activeItem[totalCols],
        ...detail.shadow,
      },
    };

    const flattened = getFlattenedItem(activeItem, totalCols);

    if (fillSpace) items = moveItemsAroundItem(flattened, items, totalCols);
    else items = moveItem(flattened, items, totalCols);

    if (detail.onUpdate) detail.onUpdate();

    dispatch("change", {
      unsafeItem: activeItem,
      id: activeItem.id,
      cols: totalCols,
    });
  };

  const throttleMatrix = throttle(updateMatrix, throttleResize);

  const handleRepaint = (e: CustomEvent<RepaintEvent>) => {
    if (!e.detail.isPointerUp) throttleMatrix(e);
    else updateMatrix(e);
  };

  const pointerup = (ev: CustomEvent<{ id: string }>) => {
    dispatch("pointerup", {
      id: ev.detail.id,
      cols: totalCols,
    });
  };

  $: flattenedItems = items
    .filter((item) => item[totalCols])
    .map((item) => getFlattenedItem(item, totalCols));
</script>

<div
  class="svelte-grid"
  style:height="{containerHeight}px"
  bind:contentRect={realContainerSize}
>
  {#if colWidth || fastStart}
    {#each flattenedItems as item, i (item.id)}
      <MoveResize
        on:repaint={handleRepaint}
        on:pointerup={pointerup}
        {colWidth}
        {rowHeight}
        {totalCols}
        {item}
        {gap}
        {sensor}
        {scroller}
        gridClientRect={realContainerSize}
        let:resizePointerDown
        let:movePointerDown
      >
        <slot {movePointerDown} {resizePointerDown} {item} index={i} />
      </MoveResize>
    {/each}
  {/if}
</div>

<style>
  .svelte-grid {
    position: relative;
    width: 100%;
  }
</style>
