<script lang="ts">
	import { MotionButton } from "@humanspeak/svelte-motion";

	let { menu, onComplete } = $props();
</script>

<MotionButton
	class="text-left text-sm hover:bg-secondary text-secondary-foreground font-medium flex gap-2 items-center rounded-sm px-2 py-1 w-full font-sans"
	onclick={() => { onComplete?.()}}
>
	<menu.icon height="1rem" />
	{menu.name}
</MotionButton>
