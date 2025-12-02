<script lang="ts">
    import type { PageProps } from "./$types";

    let {data}: PageProps = $props();
</script>

<main>
    {JSON.stringify(data.table, null, 2)}
</main>