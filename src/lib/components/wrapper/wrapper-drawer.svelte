<script lang="ts">
	import { Drawer } from "vaul-svelte";

	let {
		trigger,
		title,
		description,
		content,
		open = $bindable(false),
	} = $props();
</script>

<Drawer.Root bind:open shouldScaleBackground>
	<Drawer.Trigger data-props="drawer-trigger">
		{#snippet child({props})}
			{@render trigger(props)}
		{/snippet}
	</Drawer.Trigger>

	<Drawer.Portal>
		<Drawer.Overlay class="fixed inset-0 bg-black/80" />
		<Drawer.Content
			class="fixed bottom-0 left-0 right-0 mt-24 flex h-fit flex-col rounded-t-xl bg-background"
		>
			<div
				class="mx-auto mb-4 mt-4 h-1.5 w-12 shrink-0 rounded-full bg-muted"
			></div>
			<div class="flex flex-col px-4 gap-4 mx-auto w-full max-w-lg">
				<div class="flex flex-col">
					<Drawer.Title class="font-semibold text-lg capitalize text-primary"
						>{title}</Drawer.Title
					>
					<Drawer.Description class="text-sm text-primary"
						>{description}</Drawer.Description
					>
				</div>
				{@render content?.()}
			</div>
		</Drawer.Content>
	</Drawer.Portal>
</Drawer.Root>
