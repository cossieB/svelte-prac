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
    <ul class={isOpen ? "open" : ""}>
        {#each props.list as item}
            <li>
                {item}
            </li>
        {/each}
    </ul>
</button>

<style>
    button {
        position: relative;
        height: 100%;
        padding: 0.5rem;
    }
    ul {
        top: 100%;
        height: 0;
        left: 0;
        overflow: hidden;
        transition: height 250ms ease;
        position: absolute;
        background-color: #222;
        &.open {
            height: auto;
        }
    }
    li {
        padding: 1rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            background-color: #3a3636;
            border-radius: 0.5rem;
        }
    }
</style>
