<script lang="ts">
	import { MotionDiv } from "@humanspeak/svelte-motion";
	import { _ } from "svelte-i18n";
	import { goto } from "$app/navigation";
	import ListAction from "./list-action.svelte";

	let { lists } = $props();
</script>
{#each lists as list (list.id)}
	<MotionDiv
		role="button"
		tabindex="0"
		class="border border-muted bg-card text-card-foreground rounded-md px-4 py-4 flex flex-col aspect-square justify-between"
		whileTap={{scale: 0.95}}
		onclick={() => goto(`app/list/${list.id}`)}
	>
		<div class="flex flex-col ">
			<h3 class="text-left heading-3 text-lg capitalize">{list.name}</h3>
			<span class="text-left paragraph-1 text-primary"
				>{$_('list.item_count', { values: { checked: list.checkedCount, total: list.totalCount } })}</span
			>
		</div>
		<div class="flex w-full justify-between items-center text-card-foreground">
			<p class="text-sm">
				{new Date(list.updatedAt).toLocaleDateString("id-ID", {year: "numeric", month: "short", day: "2-digit"})}
			</p>
			<div onclick={(e) => e.stopPropagation()} role="none">
				<ListAction {list} />
			</div>
		</div>
	</MotionDiv>
{/each}
