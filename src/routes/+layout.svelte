<script lang="ts">
  import Nav from "./(components)/Nav.svelte";
  import Footer from "./(components)/Footer.svelte";
  import { page } from "$app/stores";
  import { AppShell, storeHighlightJs } from "@skeletonlabs/skeleton";
  import hljs from "highlight.js/lib/core";

  import "../app.css";
  import "highlight.js/styles/github-dark.css";

  import xml from "highlight.js/lib/languages/xml";
  import javascript from "highlight.js/lib/languages/javascript";
  import typescript from "highlight.js/lib/languages/typescript";
  import css from "highlight.js/lib/languages/css";

  hljs.registerLanguage("html", xml);
  hljs.registerLanguage("javascript", javascript);
  hljs.registerLanguage("typescript", typescript);
  hljs.registerLanguage("css", css);

  storeHighlightJs.set(hljs);
</script>

<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4 min-h-screen">
  <Nav slot="sidebarLeft" segment={$page.url.pathname} />

  <main class="container h-screen mx-auto py-6 px-12 relative flex flex-col">
    <article class="space-y-6">
      <slot />
    </article>
    <Footer />
  </main>
</AppShell>
