<script lang="ts">
	import { MotionButton } from "@humanspeak/svelte-motion";
	import DotsVerticalFilledIcon from "@iconify-svelte/tabler/dots-vertical-filled";
	import PencilIcon from "@iconify-svelte/tabler/pencil";
	import Share2Icon from "@iconify-svelte/tabler/share-2";
	import TrashIcon from "@iconify-svelte/tabler/trash";
	import { get } from "svelte/store";
	import { _ } from "svelte-i18n";
	import { page } from "$app/state";
	import { deleteList, renameList, shareList } from "$lib/actions/list";
	import { ListDelete, ListRename, ListShare } from "$lib/components/action";
	import { WrapperDrawer } from "$lib/components/wrapper";

	let { list } = $props();
	let drawerOpen = $state(false);

	const actions = [
		{
			name: get(_)("list.rename"),
			icon: PencilIcon,
			onComplete: async (newName: string) => {
				drawerOpen = false;
				await renameList(list.id, newName);
			},
			component: ListRename,
		},
		{
			name: get(_)("list.share"),
			icon: Share2Icon,
			onComplete: () => {
				drawerOpen = false;
				const url = `${page.url.origin}/app/list/${list.id}`;
				shareList(list.name, url);
			},
			component: ListShare,
		},
		{
			name: get(_)("list.delete"),
			icon: TrashIcon,
			onComplete: () => {
				drawerOpen = false;
				deleteList(list.id, list.name);
			},
			component: ListDelete,
		},
	];
</script>
<WrapperDrawer title={list.name} description="" bind:open={drawerOpen}>
	{#snippet trigger(props)}
		<MotionButton {...props} class="flex items-center p-1 mr-[-0.5rem]">
			<DotsVerticalFilledIcon height="1.5rem" />
		</MotionButton>
	{/snippet}
	{#snippet content()}
		<div class="flex flex-col gap-1 justify-start pb-8">
			{#each actions as action}
				{@const Component = action.component}
				<Component {action} onComplete={action.onComplete} />
			{/each}
		</div>
	{/snippet}
</WrapperDrawer>
