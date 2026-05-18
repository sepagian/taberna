<script lang="ts">
	import { Dialog } from "bits-ui";

	let {
		title,
		description,
		trigger,
		content,
		open = $bindable(false),
		interactOutsideBehavior,
	} = $props();
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class="w-full">
		{#snippet child({props})}
			{@render trigger(props)}
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-50 bg-black/60" />
		<Dialog.Content
			{interactOutsideBehavior}
			class="rounded-2xl bg-background fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 border border-border py-4 px-6 shadow-xl flex flex-col items-center gap-4"
		>
			<div class="w-fit flex flex-col gap-2 ">
				<div class="justify-center flex flex-col text-center text-foreground">
					<Dialog.Title class="heading-4"> {title} </Dialog.Title>
					<Dialog.Description class="paragraph-1"
						>{description}</Dialog.Description
					>
				</div>
				{@render content()}
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
