<script lang="ts">
  import Nav from "./(components)/Nav.svelte";
  import Ribbon from "./(components)/Ribbon.svelte";
  import Footer from "./(components)/Footer.svelte";
  import { page } from "$app/stores";
</script>

<Ribbon />

<Nav segment={$page.url.pathname} />

<div class="content">
  <div class="container">
    <slot />
  </div>
</div>

<Footer />

<style>
  :global(#sapper) {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
  .content {
    flex: 1;
    padding-left: 10px;
    padding-right: 10px;
  }
  .container {
    max-width: 1100px;
    width: 100%;
    margin: 0 auto;
  }

  @media (max-width: 700px) {
    :global(.github-corner) {
      display: none;
    }
  }
</style>
