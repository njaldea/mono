<script lang="ts">
    export let depth: number;
    export let name: string;
    export let expand: boolean | undefined = undefined;
</script>

<div class="override" style:padding-left={`${depth}rem`} title={name}>
    <div class="icon" class:expand={true === expand}>
        <div>
            {undefined === expand ? "-" : ">"}
        </div>
    </div>
    <span>{name}</span>
</div>

<style>
    .override {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding-right: 0.5rem;

        display: grid;
        grid-template-columns: 1.25rem 1fr;
        align-items: center;
    }

    .icon {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 1rem;
        width: 1rem;
        transition: transform var(--i-nil-doc-transition-time);
    }

    .icon.expand {
        transform: rotate(90deg);
    }

    .icon > div {
        margin: auto;
    }
</style>
