<script lang="ts">
	import { _ } from "svelte-i18n";
	import { ListCard, ListEmpty, ListNew } from "$lib/components/list";

	let { lists } = $props();
</script>
{#if lists.length > 0}
	<section class="space-y-2">
		<div class="flex gap-2 items-start">
			<h2 class="font-sans heading-3 text-foreground">{$_('list.label')}</h2>
			<span class="font-sans heading-3 text-accent">{lists.length}</span>
		</div>
		<div class="grid grid-cols-2 gap-1">
			<ListNew />
			<ListCard {lists} />
		</div>
	</section>
{:else}
	<ListEmpty />
{/if}
