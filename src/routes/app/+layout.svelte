<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import "uno.css";
	import { ModeWatcher } from "mode-watcher";
	import { _ } from "svelte-i18n";
	import { Toaster } from "svelte-sonner";
	import { LayoutHeader } from "$lib/components/layout";

	let { children } = $props();
</script>

<svelte:head>
	<title>{$_('app.brand')}</title>
	<link rel="icon" href={favicon}>
</svelte:head>

<ModeWatcher />
<div
	class="mx-auto bg-background min-h-[100vh] min-w-[100vw] font-sans"
	data-vaul-drawer-wrapper
>
	<Toaster position="top-center" duration={1000} />
	<LayoutHeader />
	{@render children()}
</div>
