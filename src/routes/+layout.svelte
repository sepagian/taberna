<script lang="ts">
	import "$lib/i18n";
	import favicon from "$lib/assets/favicon.svg";
	import "@unocss/reset/tailwind-v4.css";
	import "uno.css";
	import { ModeWatcher } from "mode-watcher";

	let { children } = $props();
</script>
<ModeWatcher />

<svelte:head> <link rel="icon" href={favicon}> </svelte:head>

{@render children()}
