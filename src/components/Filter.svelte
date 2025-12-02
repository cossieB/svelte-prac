<script lang="ts">
    type Props = {
        list: (string | number)[];
        label: string;
    };
    const props: Props = $props();
    let isOpen = $state(false);
</script>

<button onclick={() => (isOpen = !isOpen)}>
    {props.label}
</button>

<ul class={isOpen ? "open" : ""}>
    {#each props.list as item}
        <li>
            {item}
        </li>
    {/each}
</ul>

<style>
    ul {
        height: 0;
        overflow: hidden;
        transition: height 250ms ease;
        &.open {
            height: auto;
        }
    }
</style>