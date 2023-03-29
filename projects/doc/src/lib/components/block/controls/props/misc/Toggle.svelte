<script lang="ts">
    import { getTheme } from "$lib/components/context";

    export let disabled = false;
    export let toggled = false;

    const click = () => {
        if (!disabled) {
            toggled = !toggled;
        }
    };

    const dark = getTheme();
</script>

<div>
    <svg
        viewBox="-30 -30 60 60"
        on:click|stopPropagation={click}
        on:keypress
        class:disabled
        class:dark={$dark}
    >
        <rect width="80" height="40" x="-40" y="-20" rx="20" ry="20" />
        <circle r="16" cx={toggled ? 20 : -20} />
    </svg>
</div>

<style>
    div {
        width: 2.5rem;
        height: 1.25rem;
    }

    svg {
        cursor: pointer;
        width: 100%;
        height: 100%;
    }

    rect {
        stroke-width: 2;
    }

    .disabled {
        cursor: not-allowed;
        filter: opacity(0.5);
    }

    circle {
        transition: cx 175ms;
    }

    rect {
        stroke: hsl(0, 0%, 70%);
        fill: hsl(0, 0%, 90%);
    }

    .dark > rect {
        stroke: hsl(0, 0%, 52%);
        fill: hsl(0, 0%, 23%);
    }

    .disabled > rect {
        stroke: hsl(210, 2%, 81%);
        fill: hsl(220, 14%, 96%);
    }

    .dark.disabled > rect {
        stroke: hsl(0, 0%, 38%);
        fill: hsl(0, 0%, 21%);
    }

    circle {
        fill: hsl(212, 100%, 50%);
    }

    .dark > circle {
        fill: hsl(212, 100%, 80%);
    }

    .disabled > circle {
        fill: hsl(0, 0%, 80%);
    }

    .dark.disabled > circle {
        fill: hsl(0, 0%, 46%);
    }
</style>
