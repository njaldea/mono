<script lang="ts">
    export let depth: number;
    export let name: string;
    export let expand: boolean | undefined = undefined;
</script>

<div class="override" style:padding-left={`${depth}px`} title={name}>
    <div class="icon" class:expand={expand === true}>
        <div>
            {expand === undefined ? "-" : ">"}
        </div>
    </div>
    <span>{name}</span>
</div>

<style>
    .override {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding-right: 10px;

        display: grid;
        grid-template-columns: 20px 1fr;
        align-items: center;
        box-sizing: border-box;
    }

    .icon {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 15px;
        width: 15px;
        transition: transform 350ms;
    }

    .icon.expand {
        transform: rotate(90deg);
    }

    .icon > div {
        margin: auto;
    }
</style>
