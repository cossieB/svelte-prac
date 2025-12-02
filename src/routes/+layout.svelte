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
</nav>

{@render children()}
