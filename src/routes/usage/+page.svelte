<svelte:head>
  <title>Svelte-grid — Usage</title>
  <!-- <meta name="description" content=""/> -->
  <meta name="keywords" content="draggable,resizable,grid,layout,responsive,breakpoints,Svelte,svelte,svelte.js,sveltejs,usage" />
  <meta name="author" content="Vahe Araqelyan" />
</svelte:head>

<h3>Usage</h3>

<p>Use `Grid` like any other component.</p>

<p>The basic example</p>

{`
<script>
import { Grid, gridHelp } from "svelte-grid";

const id = () => "_" + Math.random().toString(36).substring(2, 9);

let items = [
  {
    6: gridHelp.item({
      x: 0,
      y: 0,
      w: 2,
      h: 2,
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
]

const breakpoint = 1200
const column = 6

const cols = [[breakpoint, column]]
</script>

<Grid {cols} bind:items={items} let:item={item}>
  <div>{item.id}</div>
</Grid>
`}

<a href="/examples" target="_blank">See more examples</a>

<h3>How to style</h3>

<p>Right now this is a problem for svelte</p>

<p>But you can apply styles to a selector globally, use the, `:global(...)` modifier, for example</p>

{`
<style>
  :global(.svlt-grid-shadow) {
    /* Back shadow */
    background: pink;
  }
  :global(.svlt-grid-container) {
    /* Container color */
    background: #eee;
  }
  :global(.svlt-grid-resizer::after) {
    /* Resizer color */
    border-color: white !important;
  }
</style>
`}

<p>Here are the class names</p>

<ul>
  <li><emph>.svlt-grid-container</emph> Class name for container grid</li>
  <li><emph>.svlt-grid-item</emph> Slot shell class name</li>
  <li><emph>.svlt-grid-shadow</emph> Class name for the back shadow when resizing or moving an element</li>
  <li><emph>.svlt-grid-resizer</emph> Class name for resizer</li>
</ul>

<h3>Helper functions</h3>

<p>The helper function is located in `svelte-grid/build/helper/index.mjs`</p>

{`
import gridHelp from 'svelte-grid/build/helper'
`}

<h3>What's in there?</h3>

<p>Well, there are several functions that will help you manage the grid elements</p>

{`
gridHelp.item(item: Object)
`}

<p>Returns an object with the properties necessary to create a widget. This is an object for a single widget</p>

{`
  x: Number,
  y: Number,
  w: Number,
  h: Number,
  fixed: Boolean,
  resizable: Boolean,
  draggable: Boolean,
  min: {
    w: Number,
    h: Number,
  },
  max: {
    w: Number,
    h: Number,
  },
  customDragger: Boolean,
  customResizer: Boolean,
`}

<p>Example of use</p>

{`
<script>
const items = [
  {
    6: gridHelp.item({
      x: 0,
      y: 0,
      w: 2,
      h: 2,
      draggable: false,
      max: { w: 2 },
    }),
    data: {/*YOUR DATE GOES HERE*/}
  },
];

const cols = [[1200, 6]];
</script>
<Grid gap={[10, 5]} {items} {cols} rowHeight={150} let:item let:dataItem>
  <div>{item.data}</div>
</Grid>
`}

<ul>
  <li><emph>dataItem</emph> - Returns your item, you can use it to access your data</li>
  <li><emph>item</emph> - Returns the item for the current breakpoint</li>
</ul>

<h3>Responsiveness</h3>

<p>
  > See this <a href="/examples/responsive">demo</a>
</p>

<p>You can specify an item for the right column</p>

{`
<Grid {items} {cols} rowHeight={150} />

<script>
let items = [
  {
    5: gridHelp.item({ x: 0, y: 0, w: 2, h: 2 }),
    2: gridHelp.item({ x: 0, y: 0, w: 1, h: 2 }),
  },
  {/*..*/}
];

const cols = [
  [1600, 5],
  [1024, 2],
];
</script>
`}

{`
gridHelp.findSpace(item: Object, items: Array<Object>, cols: Number)
`}

<p>Find out where to place the widget in the grid by calculating from left to right returns an object of two properties x and y.</p>

<h3>How to disable opacity animation ?</h3>

{`
:global(.svlt-grid-active) {
  opacity: 1!important;
}
`}

<h3>Props</h3>

<div class="table">
  {`
  Prop | Type | Description | Required
  --- | --- | --- | --- |
  items | \`Array<Object>\` | items is an array of objects, see the demos for more complete usage | Yes items
  cols | \`Array<Array<Number>>\` | Specify columns, e.g. [[1400, 300]] | Yes
  gap | \`Array<Number>\` | Margin between items in px | No
  rowHeight | \`Number\` | Rows have a static height | No
  throttleUpdate | \`Number\` | Throttle grid recalculation, default value is \`100\` | No
  throttleResize | \`Number\` | Throttle grid recalculation, when the container changes its width. default value is \`100\` | No
  on:resize | \`Function<void>\` | The event is triggered when the grid is resized. There are a couple of properties in the detail property. | No
  on:change | \`Function<void>\` | The event is triggered when an element is resized or moved | No
  on:mount | \`Function<void>\` | The event is triggered when the grid is mounted. There are a couple of properties in the detail property.
  on:pointerup | \`Function<void>\` | The event is fired when a pointer is no longer active| No
  fastStart | \`Boolean\` | Removes transition onload | No
  fillSpace | \`Boolean\` | Each grid element (except active element) finds its own position.
  sensor | \`Number\` | Set the distance from the cursor to the edge | No
  scroller | \`Element\` | Element reference for setting \`Element.scrollTop\`. The default is \`document.documentElement\` | No
  `}
</div>

<p>Have questions ?</p>

<a href="https://github.com/vaheqelyan/svelte-grid/issues/new" target="_blank">Open an issue</a>

<style>
  .table {
    overflow-x: auto;
  }
</style>
