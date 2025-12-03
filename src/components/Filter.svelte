<script lang="ts">
    import ListItem from "./ListItem.svelte";
    type Props = {
        list: string[] | number[];
        label: string;
    };

    const props: Props = $props();
    let isOpen = $state(false);


</script>

<!-- svelte-ignore a11y_interactive_supports_focus -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div role="button" onclick={() => (isOpen = !isOpen)}>
    {props.label}
    <ul class={isOpen ? "open" : ""}>
        {#each props.list as item}
            <ListItem {item} label={props.label} />
        {/each}
    </ul>
</div>

<style>
    div {
        position: relative;
        height: 100%;
        padding: 0.5rem;
        background-color: light-dark(hsl(0, 0%, 90%), hsl(0, 0%, 25%));
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        width: fit-content;
        cursor: pointer;
    }
    ul {
        top: 100%;
        height: 0;
        left: 0;
        overflow: hidden;
        position: absolute;
        background-color: hsl(10, 1%, 20%);
        width: max-content;
        &.open {
            height: auto;
            max-height: 50vh;
            overflow: auto;
        }
    }
</style>
