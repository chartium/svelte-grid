<script lang="ts">
  import Grid from "$lib/Grid.svelte";
  import type { Breakpoint } from "$lib/types.js";
  import gridHelp from "$lib/utils/helper.js";

  const id = () => "_" + Math.random().toString(36).substring(2, 9);

  const randomHexColorCode = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return "#" + n.slice(0, 6);
  };

  function generateLayout(col: number) {
    return new Array(10).fill(null).map(function (item, i) {
      const y = Math.ceil(Math.random() * 4) + 1;
      return {
        16: gridHelp.item({
          x: (i * 2) % col,
          y: Math.floor(i / 6) * y,
          w: 2,
          h: y,
          draggable: true,
          resizable: true,
        }),
        id: id(),
        data: { start: randomHexColorCode(), end: randomHexColorCode() },
      };
    });
  }

  let cols: Breakpoint[] = [[1287, 16]];

  let items = gridHelp.adjust(generateLayout(16), 16);
</script>

<svelte:head>
  <title>
    svelte-grid — A draggable and resizable grid layout with responsive
    breakpoints, for Svelte.
  </title>
  <meta
    name="description"
    content="A draggable and resizable grid layout with responsive breakpoints, for Svelte."
  />
  <meta
    name="keywords"
    content="draggable,resizable,grid,layout,responsive,breakpoints,Svelte,svelte,svelte.js,sveltejs"
  />
  <meta name="author" content="Vahe Araqelyan" />
</svelte:head>

<div class="text-center space-y-4">
  <h1 class="h1">svelte-grid</h1>
  <p>
    A draggable and resizable grid layout with responsive breakpoints, for
    Svelte.
  </p>
</div>

<Grid bind:items breakpoints={cols} rowHeight={100} let:item fillSpace={true}>
  <div
    class="h-full"
    style="background-image: linear-gradient({item.data.start}, {item.data
      .end});"
  />
</Grid>

<style>
  :global(.svelte-grid__resizer::after) {
    border-color: white !important;
  }

  :global(.svelte-grid__shadow) {
    border-radius: 6px;
  }

  :global(.svelte-grid__item) {
    border-radius: 6px;
    overflow: hidden;
  }
</style>
