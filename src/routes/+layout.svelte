<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
    import Filter from '../components/Filter.svelte';
    import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<Filter label="Years" list={data.years} />
	<Filter label="Genders" list={["Male", "Female", "Mixed"]} />
</nav>

{@render children()}

<style>
	nav {
		top: 0;
		left: 0;
		width: 100vw;
		height: var(--nav-height);
		background-color: light-dark(#222, #ddd);
		display: flex;
		align-items: center;
	}
</style>