<script lang="ts">
  export let segment: string;

  const items = [
    { name: "Home", href: "/" },
    { name: "Usage", href: "/usage" },
    { name: "Features", href: "/features" },
  ];

  const examples = [
    { name: "Basic", href: "/examples/basic" },
    { name: "Add/Remove", href: "/examples/add-remove" },
    { name: "Auto-scroll", href: "/examples/autoscroll" },
    { name: "Gap", href: "/examples/gap" },
    { name: "Responsive", href: "/examples/responsive" },
    { name: "Min/Max size", href: "/examples/min_max" },
    { name: "Fixed", href: "/examples/fixed" },
    { name: "Local storage", href: "/examples/local-storage" },
    { name: "Events", href: "/examples/events" },
    {
      name: "Responsive - Serialize/Restore",
      href: "/examples/responsive-local-storage",
    },
    { name: "Custom dragger", href: "/examples/custom-dragger" },
    { name: "Custom resizer", href: "/examples/custom-resizer" },
    { name: "Fast start", href: "/examples/fast-start" },
    { name: "Fill space", href: "/examples/fill-space" },
  ];
</script>

<section class="max-h-screen pb-20">
  <p class="font-bold pl-4 text-3xl mb-4">svelte-grid</p>
  <nav class="list-nav">
    <ul>
      {#each items as item}
        <li>
          <a
            href={item.href}
            class:bg-primary-active-token={segment === item.href}
          >
            {item.name}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
  <hr class="my-4" />
  <p class="font-bold pl-4 text-2xl mb-2">Examples</p>
  <nav class="list-nav">
    <ul>
      {#each examples as item}
        <li>
          <a
            href={item.href}
            class:bg-primary-active-token={segment === item.href}
          >
            {item.name}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</section>
