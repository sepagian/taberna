<script lang="ts">
	import { MotionButton } from "@humanspeak/svelte-motion";
	import RefreshIcon from "@iconify-svelte/tabler/refresh";
	import XFilledIcon from "@iconify-svelte/tabler/x-filled";
	import { Tabs } from "bits-ui";
	import { _ } from "svelte-i18n";
	import { addItems } from "$lib/actions/item";
	import { refreshList } from "$lib/actions/list";
	import { authClient } from "$lib/client/auth-client";
	import { ItemCheckbox } from "$lib/components/item";
	import { WrapperNote } from "$lib/components/wrapper";

	let { data } = $props();
	let drawerOpen = $state(false);
	let newItemName = $state("");
	let searchValue = $state("");

	const session = authClient.useSession();
	const isOwner = $derived($session.data?.user?.id === data.list?.userId);

	const activeItems = $derived(data.items.filter((i) => !i.checked));
	const completedItems = $derived(data.items.filter((i) => i.checked));
	const filteredCompleted = $derived(
		searchValue.trim()
			? completedItems.filter((i) =>
					i.name.toLowerCase().includes(searchValue.toLowerCase())
				)
			: completedItems
	);

	function autofocus(node: HTMLInputElement) {
		node.focus();
		node.select();
	}

	async function handleAddItem(e: Event) {
		e.preventDefault();
		if (!(newItemName.trim() && data.list)) {
			return;
		}
		await addItems(data.list.id, newItemName.trim());
		drawerOpen = false;
		newItemName = "";
	}
</script>

<section class="px-2 max-w-lg mx-auto flex flex-col gap-2 font-sans">
	<Tabs.Root value="active" class="mt-12">
		<Tabs.List class="flex gap-2">
			<Tabs.Trigger
				value="active"
				class="w-full px-6 py-2 rounded-t-md font-medium bg-accent text-accent-foreground"
			>
				{$_('item.active')}
				({activeItems.length})
			</Tabs.Trigger>
			<Tabs.Trigger
				value="completed"
				class="w-full px-6 py-2 rounded-t-md font-medium bg-muted text-muted-foreground"
			>
				{$_('item.completed')}
				({completedItems.length})
			</Tabs.Trigger>
			<MotionButton class="flex justify-end items-center text-primary px-2">
				<RefreshIcon height="1.5rem" onclick={() => refreshList()} />
			</MotionButton>
		</Tabs.List>
		<Tabs.Content
			value="active"
			class="py-2 px-2 rounded-b-md rounded-rt-md bg-accent text-accent-foreground aspect-square"
		>
			{#if activeItems.length > 0}
				<div class="flex flex-col gap-2 px-2 py-4">
					{#each activeItems as item (item.id)}
						<ItemCheckbox
							itemId={item.id}
							labelText={item.name}
							checked={item.checked}
							{isOwner}
						/>
					{/each}
				</div>
			{:else}
				<div class="flex items-center justify-center h-full">
					<p class="text-center paragraph-1 text-secondary-foreground">
						{$_('item.no_active')}
					</p>
				</div>
			{/if}
		</Tabs.Content>
		<Tabs.Content
			value="completed"
			class="py-2 px-2 rounded-b-md rounded-rt-md bg-muted text-muted-foreground aspect-square"
		>
			{#if completedItems.length === 0}
				<div class="flex items-center justify-center h-full">
					<p class="text-center paragraph-1 text-secondary-foreground">
						{$_('item.no_completed')}
					</p>
				</div>
			{:else}
				<div class="flex flex-col gap-2 px-2 py-4 h-full">
					<div class="flex gap-4 px-2 items-center text-primary">
						<input
							type="text"
							bind:value={searchValue}
							placeholder={$_('item.search_placeholder')}
							class="flex-1 px-4 rounded-md border border-primary border-2 h-12 w-full"
						>
						<XFilledIcon height="1.5rem" onclick={() => searchValue=""} />
					</div>
					{#if filteredCompleted.length === 0}
						<div class="flex items-center justify-center h-full">
							<p class="text-center paragraph-1 text-secondary-foreground">
								{$_('item.no_match')}
							</p>
						</div>
					{:else}
						{#each filteredCompleted as item (item.id)}
							<ItemCheckbox
								itemId={item.id}
								labelText={item.name}
								checked={item.checked}
								{isOwner}
							/>
						{/each}
					{/if}
				</div>
			{/if}
		</Tabs.Content>
	</Tabs.Root>
	<div class="fixed bottom-8 inset-x-0 flex justify-center px-2">
		{#if data.list && $session.data?.user}
			<WrapperNote bind:open={drawerOpen}>
				{#snippet trigger(props)}
					<MotionButton
						{...props}
						type="button"
						class="flex w-full justify-center h-12 rounded-md items-center font-semibold bg-primary text-primary-foreground max-w-lg"
						whileTap={{scale:0.95}}
					>
						{$_('item.add_button')}
					</MotionButton>
				{/snippet}
				{#snippet content()}
					<form onsubmit={handleAddItem} class="flex flex-col gap-4 h-full">
						<input
							type="text"
							use:autofocus
							bind:value={newItemName}
							placeholder={$_('item.add_placeholder')}
							class="flex-1 px-4 py-2 rounded-md border border-border h-full text-primary font-semibold"
						>
						<MotionButton
							type="submit"
							class="flex w-full justify-center h-12 rounded-md items-center font-semibold bg-primary text-primary-foreground"
						>
							{$_('item.add_button')}
						</MotionButton>
					</form>
				{/snippet}
			</WrapperNote>
		{/if}
	</div>
</section>
