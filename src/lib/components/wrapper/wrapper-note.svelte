<script lang="ts">
	import { Drawer } from "vaul-svelte";

	let { trigger, content, open = $bindable(false) } = $props();
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
			class="fixed bottom-0 left-1/2 -translate-x-1/2 justify-center p-8 flex flex-col rounded-t-md bg-accent aspect-square h-[50%]"
		>
			{@render content?.()}
		</Drawer.Content>
	</Drawer.Portal>
</Drawer.Root>
