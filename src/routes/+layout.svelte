<script lang="ts">
	import "$lib/i18n";
	import "@unocss/reset/tailwind-v4.css";
	import "uno.css";
	import { ModeWatcher } from "mode-watcher";

	let { children } = $props();
</script>
<ModeWatcher />

{@render children()}
