<script lang="ts">
  import { page } from "$app/stores";

  import { KitDocs, createSidebarContext, type MarkdownMeta, type ResolvedSidebarConfig } from "@svelteness/kit-docs";

  export let meta: MarkdownMeta | null = null;

  export let sidebar: ResolvedSidebarConfig | null = null;

  const { activeCategory } = createSidebarContext(sidebar);

  $: category = $activeCategory ? `${$activeCategory}: ` : "";
  $: title = meta ? `${category}${meta.title} | KitDocs` : null;
  $: description = meta?.description;
</script>

<svelte:head>
  {#key $page.url.pathname}
    {#if title}
      <title>{title}</title>
    {/if}
    {#if description}
      <meta name="description" content={description} />
    {/if}
  {/key}
</svelte:head>

<KitDocs {meta}>
  <slot />
</KitDocs>
