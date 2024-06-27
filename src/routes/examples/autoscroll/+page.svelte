<script lang="ts">
  import { onMount } from "svelte";
  import Grid from "$lib/Grid.svelte";
  import gridHelp from "$lib/utils/helper.js";
  import { openSource } from "../github.js";

  const id = () => "_" + Math.random().toString(36).substring(2, 9);

  let container: HTMLElement;
  let useWindow = false;
  let documentContainer;
  let scroller;
  let sensor = 20;

  onMount(() => {
    documentContainer = document.documentElement;
    scroller = container;
  });

  $: scroller = useWindow ? documentContainer : container;

  let items = [
    {
      6: gridHelp.item({
        x: 0,
        y: 0,
        w: 2,
        h: 20,
      }),
      id: id(),
    },

    {
      6: gridHelp.item({
        x: 2,
        y: 0,
        w: 2,
        h: 2,
      }),
      id: id(),
    },
  ];

  const cols = [[1100, 6]];
</script>

<svelte:head>
  <title>Example — Autoscroll</title>
  <meta name="description" content="Svelte-grid — Example — Autoscroll" />
  <meta name="keywords" content="draggable,resizable,grid,layout,responsive,breakpoints,Svelte,svelte,svelte.js,sveltejs,usage,example,examples,samples,basic,showcase,autoscroll" />
  <meta name="author" content="Vahe Araqelyan" />
</svelte:head>

<h2>Autoscroll</h2>
<small><a target="_blank" href="https://svelte.dev/repl/db448b1bbbf147bb8d63d0272a81b93b?version=latest">REPL</a></small>
<small><a target="_blank" href={`${openSource}/autoscroll.svx`}>SOURCE</a></small>

<p>Simple auto-scrolling that only requires a reference to your container > Autoscrolling occurs when the cursor is close to the edges of your container. This does not happen when the bottom or top of your widget is close to the edges</p>

<p>
  <label>
    <input type="checkbox" bind:checked={useWindow} />
    Use document
  </label>
</p>

<code>
  {`
<!-- You can use a custom container as a scroll target -->
<div bind:this={container}>
  <Grid {...} scroller={container} />
</div>

<script>
let container;
</script>
`}
</code>

<p>
  <label>
    Sensor value
    <input type="number" bind:value={sensor} />
  </label>
  > Set the distance from the cursor to the edge (The default value is 20)
</p>

<div class:container={!useWindow} bind:this={container}>
  <Grid bind:items rowHeight={100} let:item let:dataItem {cols} {scroller} {sensor}>
    <div class="demo-widget">{dataItem.id}</div>
  </Grid>
</div>

<style>
  .container {
    max-width: 300px;
    width: 100%;
    max-height: 300px;
    overflow: scroll;
    margin-top: 20px;
  }
</style>
