<script lang="ts">
  export let segment: string;

  const items = [
    { name: "Home", href: "/" },
    { name: "Examples", href: "/examples" },
    { name: "Usage", href: "/usage" },
    { name: "Features", href: "/features" },
  ];
</script>

<div class="nav">
  {#each items as item}
    <a href={item.href} class="nav-i" class:active={segment === item.href}>{item.name}</a>
  {/each}
</div>

<style>
  @media only screen and (max-width: 530px) {
    .nav {
      justify-content: normal !important;
    }
    .nav-i {
      margin: auto !important;
    }
  }

  @media only screen and (max-width: 260px) {
    .nav {
      overflow-x: scroll;
      overflow-y: hidden;
    }
    .nav-i {
      margin: 0 !important;
      padding: 0 10px;
    }
  }

  .nav {
    width: 100%;
    display: flex;
    padding: 10px 0;
    justify-content: center;
  }
  .nav-i {
    margin: 0 2em;
    cursor: pointer;
    text-decoration: none;
  }
  .active {
    font-weight: 500;
    text-decoration: underline;
  }
</style>
