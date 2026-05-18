<script lang="ts">
	import { MotionButton } from "@humanspeak/svelte-motion";
	import { _ } from "svelte-i18n";
	import { WrapperDialog } from "$lib/components/wrapper";

	let { action, onComplete, triggerClass = "" } = $props();
	let open = $state(false);
</script>

<WrapperDialog
	bind:open
	title={$_('list.delete')}
	description={$_('list.delete_confirm')}
	interactOutsideBehavior="ignore"
>
	{#snippet trigger(props)}
		<MotionButton
			{...props}
			class="text-left hover:bg-secondary text-secondary-foreground font-medium flex gap-2 items-center rounded-sm px-2 py-1 w-full {triggerClass}"
		>
			<action.icon height="1rem" />
			{action.name}
		</MotionButton>
	{/snippet}
	{#snippet content()}
		<div class="flex gap-2">
			<MotionButton
				class="rounded-md bg-accent text-accent-foreground px-4 py-2"
				onclick={() => { open = false; onComplete?.()}}
				>{$_('list.delete')}</MotionButton
			>
			<MotionButton
				class="rounded-md border border-border px-4 py-2"
				onclick={() => open = false}
				>{$_('list.cancel')}</MotionButton
			>
		</div>
	{/snippet}
</WrapperDialog>
