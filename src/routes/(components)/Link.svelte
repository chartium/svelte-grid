<script lang="ts">
  export let href: string;
  export let className: string;
  export let external = false;
</script>

<a
  {href}
  class="underline hover:decoration-transparent {className}"
  target={external ? "_blank" : "_self"}
>
  <slot />
</a>
