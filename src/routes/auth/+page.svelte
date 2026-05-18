<script lang="ts">
	import { MotionButton } from "@humanspeak/svelte-motion";
	import GoogleFilledIcon from "@iconify-svelte/tabler/brand-google-filled";
	import { _ } from "svelte-i18n";
	import { signInWithGoogle } from "$lib/actions/auth";
</script>

<svelte:head> <title>{$_('auth.page_title')}</title> </svelte:head>

<section
	class="flex flex-col text-primary text-center w-sm rounded-md px-8 py-6 border-border"
>
	<div class="flex flex-col gap-4">
		<div class="flex flex-col ">
			<h1 class="heading-3 text-primary text-[18px] font-bold">
				{$_('auth.title')}
			</h1>
			<p class="paragraph-1 text-secondary-foreground text-sm">
				{$_('auth.subtitle')}
			</p>
		</div>
		<MotionButton
			type="button"
			class="flex w-full gap-2 text-sm justify-center h-10 rounded-md items-center font-semibold bg-secondary text-secondary-foreground border border-border"
			whileTap={{scale:0.95}}
			onclick={() => signInWithGoogle()}
		>
			<GoogleFilledIcon height="1rem" />
			{$_('auth.continue_google')}
		</MotionButton>
	</div>
</section>
