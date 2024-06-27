<script lang="ts" context="module">
  export type RepaintEvent = {
    id: string;
    shadow: Area;
    isPointerUp?: boolean;
    onUpdate?: () => void;
  };
</script>

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Area, FlattenedItem, Position } from "./types.js";

  const dispatch = createEventDispatcher<{
    repaint: RepaintEvent;
    pointerup: { id: string };
  }>();

  export let sensor: number;

  export let colWidth: number;
  export let rowHeight: number;

  export let gap: [number, number];
  export let item: FlattenedItem;

  export let totalCols;

  export let scroller: HTMLElement | undefined;
  export let gridClientRect: DOMRect;

  $: width = Math.min(totalCols - item.x, item.w) * colWidth - gap[0] * 2;
  $: height = item.h * rowHeight - gap[1] * 2;
  $: top = item.y * rowHeight + gap[1];
  $: left = item.x * colWidth + gap[0];

  let itemElement: HTMLElement;
  let shadowElement: HTMLElement;
  let shadow: Area = { x: 0, y: 0, w: 0, h: 0 };

  let active = false;

  let capturePos: Position = { x: 0, y: 0 };

  let cordDiff: Position = { x: 0, y: 0 };

  let newSize = { width, height };
  let trans = false;

  let anima: number;

  const inActivate = () => {
    const shadowBound = shadowElement.getBoundingClientRect();
    const xdragBound = rect.left + cordDiff.x;
    const ydragBound = rect.top + cordDiff.y;

    cordDiff.x = shadow.x * colWidth + gap[0] - (shadowBound.x - xdragBound);
    cordDiff.y = shadow.y * rowHeight + gap[1] - (shadowBound.y - ydragBound);

    active = false;
    trans = true;

    clearTimeout(anima);

    anima = window.setTimeout(() => {
      trans = false;
    }, 100);

    dispatch("pointerup", {
      id: item.id,
    });
  };

  let repaint = (cb?: () => void, isPointerUp?: boolean) => {
    dispatch("repaint", {
      id: item.id,
      shadow,
      isPointerUp,
      onUpdate: cb,
    });
  };

  // Auto-scroll
  let _scrollTop = 0;
  let containerFrame: Pick<DOMRect, "top" | "bottom">;
  let rect: DOMRect;
  let scrollElement: HTMLElement;

  const getContainerFrame = (element?: HTMLElement) => {
    if (element === document.documentElement || !element) {
      const { top, bottom } = gridClientRect;

      return {
        top: Math.max(0, top),
        bottom: Math.min(window.innerHeight, bottom),
      };
    }

    return element.getBoundingClientRect();
  };

  const getScroller = (element?: HTMLElement) =>
    element ?? document.documentElement;

  let initX: number, initY: number;
  const pointerdown = ({ clientX, clientY }: PointerEvent) => {
    initX = clientX;
    initY = clientY;

    capturePos = { x: left, y: top };
    shadow = { x: item.x, y: item.y, w: item.w, h: item.h };
    newSize = { width, height };

    containerFrame = getContainerFrame(scroller);
    scrollElement = getScroller(scroller);

    cordDiff = { x: 0, y: 0 };
    rect = itemElement.getBoundingClientRect();

    active = true;
    trans = false;
    _scrollTop = scrollElement.scrollTop;

    window.addEventListener("pointermove", pointermove);
    window.addEventListener("pointerup", pointerup);
  };

  let sign = { x: 0, y: 0 };
  let vel = { x: 0, y: 0 };
  let intervalId = 0;

  const stopAutoscroll = () => {
    clearInterval(intervalId);
    intervalId = 0;
    sign = { x: 0, y: 0 };
    vel = { x: 0, y: 0 };
  };

  const update = () => {
    const _newScrollTop = scrollElement.scrollTop - _scrollTop;

    const boundX = capturePos.x + cordDiff.x;
    const boundY = capturePos.y + (cordDiff.y + _newScrollTop);

    let gridX = Math.round(boundX / colWidth);
    let gridY = Math.round(boundY / rowHeight);

    shadow.x = Math.max(Math.min(gridX, totalCols - shadow.w), 0);
    shadow.y = Math.max(gridY, 0);

    if (item.max?.y) {
      shadow.y = Math.min(shadow.y, item.max.y);
    }

    repaint();
  };

  const pointermove = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const { clientX, clientY } = event;
    cordDiff = { x: clientX - initX, y: clientY - initY };

    let velocityTop = Math.max(
      0,
      (containerFrame.top + sensor - clientY) / sensor,
    );
    let velocityBottom = Math.max(
      0,
      (clientY - (containerFrame.bottom - sensor)) / sensor,
    );

    const topSensor = velocityTop > 0 && velocityBottom === 0;
    const bottomSensor = velocityBottom > 0 && velocityTop === 0;

    sign.y = topSensor ? -1 : bottomSensor ? 1 : 0;
    vel.y = sign.y === -1 ? velocityTop : velocityBottom;

    if (vel.y > 0) {
      if (!intervalId) {
        // Start scrolling
        // TODO Use requestAnimationFrame
        intervalId = window.setInterval(() => {
          scrollElement.scrollTop += 2 * (vel.y + Math.sign(vel.y)) * sign.y;
          update();
        }, 10);
      }
    } else if (intervalId) {
      stopAutoscroll();
    } else {
      update();
    }
  };

  const pointerup = (_e: PointerEvent) => {
    stopAutoscroll();

    window.removeEventListener("pointerdown", pointerdown);
    window.removeEventListener("pointermove", pointermove);
    window.removeEventListener("pointerup", pointerup);
    repaint(inActivate, true);
  };

  // Resize

  let resizeInitPos = { x: 0, y: 0 };
  let initSize = { width: 0, height: 0 };

  const resizePointerDown = (e: PointerEvent) => {
    e.stopPropagation();

    const { pageX, pageY } = e;

    resizeInitPos = { x: pageX, y: pageY };
    initSize = { width, height };

    cordDiff = { x: 0, y: 0 };
    rect = itemElement.getBoundingClientRect();
    newSize = { width, height };

    active = true;
    trans = false;
    shadow = { x: item.x, y: item.y, w: item.w, h: item.h };

    containerFrame = getContainerFrame(scroller);
    scrollElement = getScroller(scroller);

    window.addEventListener("pointermove", resizePointerMove);
    window.addEventListener("pointerup", resizePointerUp);
  };

  const resizePointerMove = ({ pageX, pageY }: PointerEvent) => {
    newSize.width = initSize.width + pageX - resizeInitPos.x;
    newSize.height = initSize.height + pageY - resizeInitPos.y;

    // Get max col number
    let maxWidth = totalCols - shadow.x;
    maxWidth = item.max?.w ? Math.min(item.max.w, maxWidth) : maxWidth;

    // Limit bound
    newSize.width = Math.max(
      Math.min(newSize.width, maxWidth * colWidth - gap[0] * 2),
      item.min.w * colWidth - gap[0] * 2,
    );

    newSize.height = Math.max(
      newSize.height,
      item.min.h * rowHeight - gap[1] * 2,
    );

    if (item.max?.h) {
      newSize.height = Math.min(
        newSize.height,
        item.max.h * rowHeight - gap[1] * 2,
      );
    }
    // Limit col & row
    shadow.w = Math.round((newSize.width + gap[0] * 2) / colWidth);
    shadow.h = Math.round((newSize.height + gap[1] * 2) / rowHeight);

    repaint();
  };

  const resizePointerUp = (e: PointerEvent) => {
    e.stopPropagation();

    repaint(inActivate, true);

    window.removeEventListener("pointermove", resizePointerMove);
    window.removeEventListener("pointerup", resizePointerUp);
  };
</script>

{#if active || trans}
  <div
    class="svlt-grid-shadow shadow-active"
    style:width="{shadow.w * colWidth - gap[0] * 2}px"
    style:height="{shadow.h * rowHeight - gap[1] * 2}px"
    style="transform: translate({shadow.x * colWidth + gap[0]}px, {shadow.y *
      rowHeight +
      gap[1]}px); "
    bind:this={shadowElement}
  />
{/if}

<div
  draggable={false}
  on:pointerdown={item.customDragger || item.draggable ? null : pointerdown}
  class="svlt-grid-item"
  class:svlt-grid-active={active || (trans && rect)}
  style:width="{active ? newSize.width : width}px"
  style:height="{active ? newSize.height : height}px"
  style="{active
    ? `transform: translate(${cordDiff.x}px, ${cordDiff.y}px);top:${rect.top}px;left:${rect.left}px;`
    : trans
      ? `transform: translate(${cordDiff.x}px, ${cordDiff.y}px); position:absolute; transition: width 0.2s, height 0.2s;`
      : `transition: transform 0.2s, opacity 0.2s; transform: translate(${left}px, ${top}px); `} "
  bind:this={itemElement}
>
  <slot movePointerDown={pointerdown} {resizePointerDown} />
  {#if item.resizable && !item.customResizer}
    <div class="svlt-grid-resizer" on:pointerdown={resizePointerDown} />
  {/if}
</div>

<style>
  .svlt-grid-item {
    touch-action: none;
    position: absolute;
    will-change: auto;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .svlt-grid-resizer {
    user-select: none;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: se-resize;
  }

  .svlt-grid-resizer::after {
    content: "";
    position: absolute;
    right: 3px;
    bottom: 3px;
    width: 5px;
    height: 5px;
    border-right: 2px solid rgba(0, 0, 0, 0.4);
    border-bottom: 2px solid rgba(0, 0, 0, 0.4);
  }

  .svlt-grid-active {
    z-index: 3;
    cursor: grabbing;
    position: fixed;
    opacity: 0.5;

    /*No user*/
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -o-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    user-select: none;
  }

  .shadow-active {
    z-index: 2;
    transition: all 0.2s;
  }

  .svlt-grid-shadow {
    position: absolute;
    background: red;
    will-change: transform;
    background: pink;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
</style>
