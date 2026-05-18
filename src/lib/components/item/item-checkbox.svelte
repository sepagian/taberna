<script lang="ts">
	import CheckFilledIcon from "@iconify-svelte/tabler/check-filled";
	import PencilIcon from "@iconify-svelte/tabler/pencil";
	import SquareIcon from "@iconify-svelte/tabler/square";
	import SquareCheckIcon from "@iconify-svelte/tabler/square-check";
	import TrashIcon from "@iconify-svelte/tabler/trash";
	import { Checkbox, Label, useId } from "bits-ui";
	import { deleteItem, editItem, toggleItem } from "$lib/actions/item";

	let {
		id = useId(),
		itemId,
		checked,
		labelText,
		isOwner = false,
	}: {
		id?: string;
		itemId: string;
		checked: boolean;
		labelText: string;
		isOwner?: boolean;
	} = $props();

	let isEditing = $state(false);
	let editName = $state("");
	let isPending = $state(false);

	async function onToggle() {
		isPending = true;
		try {
			await toggleItem(itemId, checked);
		} finally {
			isPending = false;
		}
	}

	function startEdit() {
		isEditing = true;
		editName = labelText;
	}

	function cancelEdit() {
		isEditing = false;
		editName = "";
	}

	async function saveEdit() {
		const trimmed = editName.trim();
		if (!trimmed || trimmed === labelText) {
			cancelEdit();
			return;
		}
		isPending = true;
		try {
			await editItem(itemId, trimmed);
			isEditing = false;
			editName = "";
		} finally {
			isPending = false;
		}
	}

	async function onDelete() {
		isPending = true;
		try {
			await deleteItem(itemId);
		} finally {
			isPending = false;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Enter") {
			e.preventDefault();
			saveEdit();
		} else if (e.key === "Escape") {
			cancelEdit();
		}
	}

	function autofocus(node: HTMLInputElement) {
		node.focus();
		node.select();
	}
</script>

<div
	class="flex gap-2 border-b h-12 px-2 border-primary border-dashed justify-between items-center"
>
	<div class="flex gap-2 items-center">
		<Checkbox.Root
			{id}
			{checked}
			onCheckedChange={onToggle}
			disabled={isPending}
		>
			{#if checked}
				<SquareCheckIcon height="1.5rem" class="text-accent-foreground" />
			{:else}
				<SquareIcon height="1.5rem" class="text-accent-foreground" />
			{/if}
		</Checkbox.Root>
		{#if isEditing}
			<input
				type="text"
				use:autofocus
				bind:value={editName}
				onkeydown={handleKeydown}
				disabled={isPending}
				class="w-full bg-transparent text-accent-foreground outline-none"
			>
		{:else}
			<Label.Root
				for={id}
				class={["capitalize font-semibold text-accent-foreground", checked && "line-through"]}
			>
				{labelText}
			</Label.Root>
		{/if}
	</div>
	{#if isOwner}
		<div class="flex gap-2 text-primary items-center">
			{#if isEditing}
				<CheckFilledIcon
					height="1.5rem"
					class={isPending ? "opacity-50" : ""}
					onclick={saveEdit}
				/>
			{:else}
				<PencilIcon
					height="1.5rem"
					class={isPending ? "opacity-50" : ""}
					onclick={startEdit}
				/>
				<TrashIcon
					height="1.5rem"
					class={isPending ? "opacity-50" : ""}
					onclick={onDelete}
				/>
			{/if}
		</div>
	{/if}
</div>
