<script lang="ts">
	import { MotionButton } from "@humanspeak/svelte-motion";

	let { session, userInitials } = $props();
</script>

<MotionButton class="px-1 py-2 flex gap-2 items-center">
	<img
		src={$session.data?.user.image}
		class="rounded-full h-8 p-0.5"
		aria-label={userInitials}
		alt={userInitials}
	>
	<div class="flex flex-col text-left">
		<p class="text-sm font-semibold">{$session.data?.user.name}</p>
		<p class="text-xs">{$session.data?.user.email}</p>
	</div>
</MotionButton>
