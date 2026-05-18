<script lang="ts">
	import { MotionButton } from "@humanspeak/svelte-motion";

	let { action, onComplete } = $props();
	let open = $state(false);
</script>

<MotionButton
	class="text-left hover:bg-secondary text-secondary-foreground font-medium flex gap-2 items-center rounded-sm px-2 py-1 w-full"
	onclick={() => { open = false; onComplete?.()}}
>
	<action.icon height="1rem" />
	{action.name}
</MotionButton>
