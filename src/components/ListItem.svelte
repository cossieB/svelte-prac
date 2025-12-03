<script lang="ts">
    import { goto } from '$app/navigation';
    import {page} from '$app/state';
    function handleFilterChange(key: string) {
        key = key.toLowerCase();
        const params = page.url.searchParams.getAll(key);
        if (params.includes(String(props.item))) {
            const newParams = params.filter((p) => p !== String(props.item));
            page.url.searchParams.delete(key);
            newParams.forEach((p) => page.url.searchParams.append(key, p));
        } else {
            page.url.searchParams.append(key, String(props.item));
        }
        goto(`${page.url.pathname}?${page.url.searchParams.toString()}`, { invalidate: ['app:results'] });
    }

    let isSelected = $derived(() => {
        const key = props.label.toLowerCase();
        const params = page.url.searchParams.getAll(key);
        return params.includes(String(props.item));
    });

    type Props = {
        item: string | number;
        label: string;
    };
    let props: Props = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<li class={isSelected() ? "selected" : ""} onclick={() => handleFilterChange(props.label)}>
    {props.item}
</li>

<style>
    li {
        padding: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            background-color: #3a3636;
            border-radius: 0.5rem;
        }
        &.selected {
            background-color: hsl(10, 1%, 40%);
            border-radius: 0.5rem;
        }
    }
</style>
