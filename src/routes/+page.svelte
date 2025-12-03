<script lang="ts">
    import type { PageProps } from "./$types";

    let {data}: PageProps = $props();

</script>

<main>
    <h1>Olympic Games Results</h1>
    <table>
        <thead>
            <tr>
                <th>NOC</th>
                <th>Gold</th>
                <th>Silver</th>
                <th>Bronze</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            {#each data.results as row}
                <tr>
                    <td>{row.NOC}</td>
                    <td>{row.gold}</td>
                    <td>{row.silver}</td>
                    <td>{row.bronze}</td>
                    <td>{row.total}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</main>