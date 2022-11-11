<script lang="ts">
    import { getProps, getStories, getActiveStory } from '$lib/context';
    const props = getProps();
    const stories = getStories();
    const activeStory = getActiveStory();
</script>

<div class="wrapper">
    {#each $stories as key (key)}
        <div class="story" on:click={() => ($activeStory = key)} on:keypress={null}>
            <slot props={$props[key]} />
        </div>
    {/each}
</div>

<style>
    .wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .story {
        width: 500px;
        height: 500px;
    }
</style>
