<script lang="ts">
	import { Popover } from "bits-ui";

	let { trigger, content, open = $bindable(false) } = $props();
</script>

<Popover.Root bind:open>
	<Popover.Trigger>
		{#snippet child({props})}
			{@render trigger(props)}
		{/snippet}
	</Popover.Trigger>
	<Popover.Portal>
		<Popover.Content
			class="border-border bg-background text-foreground z-50 max-w-sm rounded-md border p-1 flex flex-col shadow-sm gap-1"
			sideOffset={8}
			align="end"
		>
			{@render content()}
		</Popover.Content>
	</Popover.Portal>
</Popover.Root>
