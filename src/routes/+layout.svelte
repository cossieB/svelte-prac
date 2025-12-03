<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import type { LayoutProps } from "./$types";
    import Bar from "../components/Bar.svelte";

	let { children, data }: LayoutProps = $props();

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Bar {...data} />

{@render children()}

<style>

</style>
