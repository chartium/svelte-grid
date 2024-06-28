<script>
  import Link from "../(components)/Link.svelte";
</script>

<svelte:head>
  <title>Svelte-grid — Features</title>
  <!-- <meta name="description" content=""/> -->
  <meta
    name="keywords"
    content="draggable,resizable,grid,layout,responsive,breakpoints,Svelte,svelte,svelte.js,sveltejs,features"
  />
  <meta name="author" content="Vahe Araqelyan" />
</svelte:head>

<h1 class="h1">Features</h1>

<ul class="list-disc pl-8">
  <li>Compatible with SvelteKit</li>
  <li>Draggable widgets</li>
  <li>Resizable widgets</li>
  <li>Static widgets</li>
  <li>Layout can be serialized and restored</li>
  <li>Responsive breakpoints</li>
  <li>Limit the minimum and maximum width / height when resizing</li>
  <li>Provide helper functions</li>
  <li>Soft auto-scroll</li>
</ul>

<br />

<Link href="https://github.com/chartium/svelte-grid/issues/new" external
  >Suggest your feature</Link
>

<style>
  @media only screen and (max-width: 400px) {
    ul {
      padding-left: 25px;
    }
  }
  @media only screen and (max-width: 242px) {
    ul {
      padding-left: 13px;
    }
  }
</style>
