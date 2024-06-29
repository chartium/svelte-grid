<script>
  import { CodeBlock } from "@skeletonlabs/skeleton";
  import Link from "../(components)/Link.svelte";
</script>

<svelte:head>
  <title>svelte-grid — Usage</title>
  <!-- <meta name="description" content=""/> -->
  <meta
    name="keywords"
    content="draggable,resizable,grid,layout,responsive,breakpoints,Svelte,svelte,svelte.js,sveltejs,usage"
  />
  <meta name="author" content="Vahe Araqelyan" />
</svelte:head>

<h1 class="h1">Usage</h1>

<p>
  Use <code class="code">Grid</code> like any other component.
</p>

<p>A basic example:</p>

<CodeBlock
  language="html"
  code={`
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
/>

<h2 class="h2">How to style</h2>

<p>
  You can apply styles to a selector globally, use the, <code class="code"
    >:global(...)</code
  >
  modifier, for example
</p>

<CodeBlock
  language="css"
  code={`
:global(.svelte-grid) {
  /* Container color */
  background: #eee;
}

:global(.svlt-grid-shadow) {
  /* Back shadow */
  background: pink;
}

:global(.svlt-grid-resizer::after) {
  /* Resizer color */
  border-color: white !important;
}
`}
/>

<p>Here are the class names:</p>

<ul class="list-disc pl-8">
  <li>
    <span>
      <emph class="italic">.svelte-grid</emph> - class name of the container grid
    </span>
  </li>
  <li>
    <span>
      <emph class="italic">.svlt-grid-item</emph> - slot shell class name
    </span>
  </li>
  <li>
    <span>
      <emph class="italic">.svlt-grid-shadow</emph> - class name for the back shadow
      moving an element
    </span>
  </li>
  <li>
    <emph class="italic">.svlt-grid-resizer</emph> - class name for resizer
  </li>
</ul>

<h2 class="h2">Helper functions</h2>

<CodeBlock
  language="javascript"
  code={`import { gridHelp } from 'svelte-grid'`}
/>

<h3 class="h3">What's in there?</h3>

<p>
  Well, there are several functions that will help you manage the grid elements
</p>

<CodeBlock language="typescript" code={`gridHelp.item(item: Object)`} />

<p>
  Returns an object with the properties necessary to create a widget. This is an
  object for a single widget
</p>

<CodeBlock
  language="typescript"
  code={`{
  x: number,
  y: number,
  w: number,
  h: number,
  fixed: boolean,
  resizable: boolean,
  draggable: boolean,
  min: {
    w: number,
    h: number,
  },
  max: {
    w: number,
    h: number,
  },
  customDragger: boolean,
  customResizer: boolean,
}`}
/>

<p>Example of use</p>

<CodeBlock
  language="html"
  code={`
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
/>

<ul>
  <li>
    <emph>dataItem</emph> - Returns your item, you can use it to access your data
  </li>
  <li><emph>item</emph> - Returns the item for the current breakpoint</li>
</ul>

<h2 class="h2">Responsiveness</h2>

<p>
  > See this <Link href="/examples/responsive">demo</Link>
</p>

<p>You can specify an item for the right column</p>

<CodeBlock
  language="html"
  code={`
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

<Grid {items} {cols} rowHeight={150} />
`}
/>

<CodeBlock
  language="typescript"
  code={`
gridHelp.findSpace(item: Object, items: Array<Object>, cols: Number)
`}
/>

<p>
  Find out where to place the widget in the grid by calculating from left to
  right returns an object of two properties x and y.
</p>

<h2>How to disable opacity animation ?</h2>

<CodeBlock
  language="css"
  code={`
:global(.svlt-grid-active) {
  opacity: 1!important;
}
`}
/>

<h2>Props</h2>

<div class="table-container">
  <!-- Native Table Element -->
  <table class="table table-hover">
    <thead>
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Description</th>
        <th>Required</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>items</td>
        <td><code class="code">Array&lt;Object&gt;</code></td>
        <td
          >items is an array of objects, see the demos for more complete usage</td
        >
        <td>Yes</td>
      </tr>
      <tr>
        <td>cols</td>
        <td><code class="code">Array&lt;Array&lt;Number&gt;&gt;</code></td>
        <td>Specify columns, e.g. [[1400, 300]]</td>
        <td>Yes</td>
      </tr>
      <tr>
        <td>gap</td>
        <td><code class="code">Array&lt;Number&gt;</code></td>
        <td>Margin between items in px</td>
        <td>No</td>
      </tr>
      <tr>
        <td>rowHeight</td>
        <td><code class="code">Number</code></td>
        <td>Rows have a static height</td>
        <td>No</td>
      </tr>
      <tr>
        <td>throttleUpdate</td>
        <td><code class="code">Number</code></td>
        <td
          >Throttle grid recalculation, default value is <code class="code"
            >100</code
          ></td
        >
        <td>No</td>
      </tr>
      <tr>
        <td>throttleResize</td>
        <td><code class="code">Number</code></td>
        <td
          >Throttle grid recalculation, when the container changes its width.
          default value is <code class="code">100</code></td
        >
        <td>No</td>
      </tr>
      <tr>
        <td>on:resize</td>
        <td><code class="code">Function&lt;void&gt;</code></td>
        <td
          >The event is triggered when the grid is resized. There are a couple
          of properties in the detail property.</td
        >
        <td>No</td>
      </tr>
      <tr>
        <td>on:change</td>
        <td><code class="code">Function&lt;void&gt;</code></td>
        <td>The event is triggered when an element is resized or moved</td>
        <td>No</td>
      </tr>
      <tr>
        <td>on:mount</td>
        <td><code class="code">Function&lt;void&gt;</code></td>
        <td
          >The event is triggered when the grid is mounted. There are a couple
          of properties in the detail property.</td
        >
        <td>No</td>
      </tr>
      <tr>
        <td>on:pointerup</td>
        <td><code class="code">Function&lt;void&gt;</code></td>
        <td>The event is fired when a pointer is no longer active</td>
        <td>No</td>
      </tr>
      <tr>
        <td>fastStart</td>
        <td><code class="code">Boolean</code></td>
        <td>Removes transition onload</td>
        <td>No</td>
      </tr>
      <tr>
        <td>fillSpace</td>
        <td><code class="code">Boolean</code></td>
        <td
          >Each grid element (except active element) finds its own position.</td
        >
        <td>No</td>
      </tr>
      <tr>
        <td>sensor</td>
        <td><code class="code">Number</code></td>
        <td>Set the distance from the cursor to the edge</td>
        <td>No</td>
      </tr>
      <tr>
        <td>scroller</td>
        <td><code class="code">Element</code></td>
        <td
          >Element reference for setting <code class="code"
            >Element.scrollTop</code
          >. The default is
          <code class="code">document.documentElement</code></td
        >
        <td>No</td>
      </tr>
    </tbody>
  </table>
</div>

<p>
  Have questions ?

  <Link href="https://github.com/vaheqelyan/svelte-grid/issues/new" external>
    Open an issue
  </Link>

  <style>
    .table {
      overflow-x: auto;
    }
  </style>
</p>
