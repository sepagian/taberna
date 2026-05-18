<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import "@unocss/reset/tailwind-v4.css";
	import "uno.css";
	import { Toaster } from "svelte-sonner";

	let { children } = $props();
</script>

<svelte:head> <link rel="icon" href={favicon}> </svelte:head>

<div
	class="bg-background max-w-lg mx-auto flex min-h-svh flex-col items-center justify-center gap-6"
>
	<Toaster position="top-center" duration={1000} />
	{@render children()}
</div>
