<script lang="ts">
    import Filter from "../components/Filter.svelte";

    type P = {
        years: number[];
        disciplines: string[];
    };

    let data: P = $props();

    let filters = $state({
        years: [] as number[],
        disciplines: [] as string[],
        genders: [] as string[],
    });
</script>

<nav>
    <Filter label="Years" list={data.years} />
    <Filter label="Disciplines" list={data.disciplines} />
    <Filter label="Genders" list={["Male", "Female", "Mixed"]} />
</nav>

<style>
    nav {
        top: 0;
        left: 0;
        width: 100vw;
        height: var(--nav-height);
        background-color: light-dark(hsl(0, 0%, 87%), hsl(0, 0%, 15%));
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
</style>
