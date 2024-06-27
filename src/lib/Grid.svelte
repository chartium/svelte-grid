<script lang="ts" generics="T">
  import {
    moveItemsAroundItem,
    moveItem,
    specifyUndefinedColumns,
    getFlattenedItem,
  } from "./utils/item.js";
  import { onMount, createEventDispatcher } from "svelte";
  import {
    getCurrentBreakpoint,
    getRowsCount,
    throttle,
  } from "./utils/other.js";
  import MoveResize, { type RepaintEvent } from "./MoveResize.svelte";
  import type { Item } from "./types.js";

  const dispatch = createEventDispatcher();

  export let fillSpace = false;
  export let items: Item<T>[];
  export let rowHeight: number;
  export let cols;
  export let gap: [number, number] = [10, 10];
  export let fastStart = false;
  export let throttleUpdate = 100;
  export let throttleResize = 100;

  export let scroller = undefined;
  export let sensor = 20;

  let totalCols: number;

  let container: HTMLElement;

  let colWidth = 0;
  let containerWidth: number;

  /** The total width of the container (the number of rows * the row height) */
  $: containerHeight = getRowsCount(items, totalCols) * rowHeight;

  const onResize = throttle(() => {
    items = specifyUndefinedColumns(items, totalCols, cols);
    dispatch("resize", {
      cols: totalCols,
      xPerPx: colWidth,
      yPerPx: rowHeight,
      width: containerWidth,
    });
  }, throttleUpdate);

  onMount(() => {
    const sizeObserver = new ResizeObserver((entries) => {
      requestAnimationFrame(() => {
        let width = entries[0].contentRect.width;

        if (width === containerWidth) return;

        totalCols = getCurrentBreakpoint(width, cols);

        colWidth = width / totalCols;

        if (!containerWidth) {
          items = specifyUndefinedColumns(items, totalCols, cols);

          dispatch("mount", {
            cols: totalCols,
            colWidth,
            rowHeight,
          });
        } else {
          onResize();
        }

        containerWidth = width;
      });
    });

    sizeObserver.observe(container);

    return () => sizeObserver.disconnect();
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateMatrix = ({ detail }: CustomEvent<any>) => {
    let activeItem = items.find(({ id }) => id === detail.id);

    if (activeItem) {
      activeItem = {
        ...activeItem,
        [totalCols]: {
          ...activeItem[totalCols],
          ...detail.shadow,
        },
      };

      const flattened = getFlattenedItem(activeItem, totalCols);

      if (fillSpace) {
        items = moveItemsAroundItem(flattened, items, totalCols);
      } else {
        items = moveItem(flattened, items, totalCols);
      }

      if (detail.onUpdate) detail.onUpdate();

      dispatch("change", {
        unsafeItem: activeItem,
        id: activeItem.id,
        cols: totalCols,
      });
    }
  };

  const throttleMatrix = throttle(updateMatrix, throttleResize);

  const handleRepaint = (e: CustomEvent<RepaintEvent>) => {
    if (!e.detail.isPointerUp) {
      throttleMatrix(e);
    } else {
      updateMatrix(e);
    }
  };

  const pointerup = (ev: CustomEvent<{ id: string }>) => {
    dispatch("pointerup", {
      id: ev.detail.id,
      cols: totalCols,
    });
  };

  $: flattenedItems = items.map((value) => getFlattenedItem(value, totalCols));
</script>

<div
  class="svlt-grid-container"
  style="height: {containerHeight}px"
  bind:this={container}
>
  {#if colWidth || !fastStart}
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
        container={scroller}
        nativeContainer={container}
        let:resizePointerDown
        let:movePointerDown
      >
        <slot {movePointerDown} {resizePointerDown} {item} index={i} />
      </MoveResize>
    {/each}
  {/if}
</div>

<style>
  .svlt-grid-container {
    position: relative;
    width: 100%;
  }
</style>
