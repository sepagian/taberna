<script lang="ts">
	import { MotionButton } from "@humanspeak/svelte-motion";
	import { goto } from "$app/navigation";
</script>

<MotionButton
	type="button"
	class="flex w-full justify-center h-12 rounded-md items-center font-semibold bg-primary text-primary-foreground"
	onclick={() => goto("/app")}
>
	Go to App
</MotionButton>
