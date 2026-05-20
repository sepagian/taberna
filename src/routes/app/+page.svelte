<script lang="ts">
	import { LayoutHero } from "$lib/components/layout";
	import { ListContainer } from "$lib/components/list";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
</script>

<section class="px-2 max-w-lg mx-auto font-sans">
	<LayoutHero />
	<ListContainer lists={data.lists} />
</section>
