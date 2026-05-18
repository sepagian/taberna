<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import "@unocss/reset/tailwind-v4.css";
	import "uno.css";
	import { _ } from "svelte-i18n";
	import { Toaster } from "svelte-sonner";
	import { page } from "$app/state";

	let isPrivacy = $derived(page.url.pathname.startsWith("/privacy"));
	let isService = $derived(page.url.pathname.startsWith("/service"));

	let { children } = $props();
</script>

<svelte:head> <link rel="icon" href={favicon}> </svelte:head>

<div
	class="bg-background max-w-lg mx-auto flex min-h-svh flex-col items-center justify-center gap-6"
>
	<Toaster position="top-center" duration={1000} />
	<div class="w-full px-8 py-6">
		{@render children()}
		<nav
			class="mt-10 pt-6 border-t border-border flex justify-center gap-4 text-sm"
		>
			{#if isPrivacy}
				<span class="text-muted-foreground">{$_('legal.privacy')}</span>
			{:else}
				<a href="/privacy" class="text-primary underline"
					>{$_('legal.privacy')}</a
				>
			{/if}
			<span class="text-border">|</span>
			{#if isService}
				<span class="text-muted-foreground">{$_('legal.terms')}</span>
			{:else}
				<a href="/service" class="text-primary underline"
					>{$_('legal.terms')}</a
				>
			{/if}
		</nav>
	</div>
</div>
