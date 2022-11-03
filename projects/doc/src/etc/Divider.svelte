<script lang="ts">
	export let offset_x = 0;
	export let offset_y = 0;
	export let min_offset_x = 0;
	export let min_offset_y = 0;
	export let max_offset_x = 0;
	export let max_offset_y = 0;
	export let translate_x = false;
	export let translate_y = false;

	let current_x = offset_x;
	let current_y = offset_y;

	function resolve(enabled: boolean, value: number, min: number, max: number) {
		return enabled ? Math.max(Math.min(value, max), min) : 0;
	}

	function draggable(div: HTMLDivElement) {
		let moving = false;
		current_x = offset_x;
		current_y = offset_y;
		let current_page_x = 0;
		let current_page_y = 0;

		function engage(e: MouseEvent) {
			moving = true;
			current_x = offset_x;
			current_y = offset_y;
			current_page_x = e.pageX;
			current_page_y = e.pageY;
		}

		function disengage() {
			moving = false;
		}

		function move(e: MouseEvent) {
			if (moving) {
				current_x = current_x + (e.pageX - current_page_x);
				current_page_x = e.pageX;

				current_y = current_y + (e.pageY - current_page_y);
				current_page_y = e.pageY;
			}
		}

		div.addEventListener('mousedown', engage);
		document.addEventListener('mouseup', disengage);
		document.addEventListener('mousemove', move);
		return {
			destroy: () => {
				div.removeEventListener('mousedown', engage);
				document.removeEventListener('mouseup', disengage);
				document.removeEventListener('mousemove', move);
			}
		};
	}

	$: offset_x = resolve(translate_x, current_x, min_offset_x, max_offset_x);
	$: offset_y = resolve(translate_y, current_y, min_offset_y, max_offset_y);
</script>

<div style={`transform: translate(${offset_x}px, ${offset_y}px)`} use:draggable />

<style>
	div {
		user-select: none;
		position: absolute;
		cursor: col-resize;
		left: 0;
		top: 0;
		height: var(--height);
		width: var(--width);
		margin-left: var(--margin-left, 0px);
		margin-right: var(--margin-right, 0px);
		margin-top: var(--margin-top, 0px);
		margin-bottom: var(--margin-bottom, 0px);
	}
</style>
