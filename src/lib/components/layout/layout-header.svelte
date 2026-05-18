<script lang="ts">
	import ChevronLeftIcon from "@iconify-svelte/tabler/chevron-left";
	import { Button } from "bits-ui";
	import { get } from "svelte/store";
	import { _ } from "svelte-i18n";
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import { authClient } from "$lib/client/auth-client";
	import { ListAction } from "$lib/components/list";
	import { UserButton } from "$lib/components/user";

	const session = authClient.useSession();

	let isDetailPage = $derived(page.url.pathname.startsWith("/app/list/"));
	let isSettingPage = $derived(page.url.pathname.startsWith("/app/setting"));
	let isHomePage = $derived(
		page.url.pathname === "/app" || page.url.pathname.startsWith("/app/list/")
	);
	let isOwner = $derived($session.data?.user?.id === page.data.list?.userId);
	let headerTitle = $derived(
		page.data.list?.name ??
			($session.data?.user?.name
				? get(_)("app.hi", { values: { name: $session.data.user.name } })
				: get(_)("app.brand"))
	);
</script>

<header class="h-[72px] content-center py-4">
	<div class="max-w-lg mx-auto px-2 flex justify-between text-primary">
		{#if isHomePage}
			<div class="flex gap-1 items-center">
				{#if isDetailPage}
					<ChevronLeftIcon
						height="1.5rem"
						onclick={() => goto("/app")}
						class="flex items-center ml-[-0.5rem]"
					/>
				{/if}
				<h4 class="font-sans heading-4 capitalize">{headerTitle}</h4>
			</div>
			{#if isDetailPage && page.data.list}
				{#if isOwner}
					<ListAction list={page.data.list} />
				{/if}
			{:else}
				<UserButton />
			{/if}
		{:else if isSettingPage}
			<Button.Root class="flex gap-1 items-center" onclick={() => goto("/app")}>
				<ChevronLeftIcon
					height="1.5rem"
					class="flex items-center ml-[-0.5rem]"
				/>
				<h4 class="font-sans heading-4 capitalize">
					{$_('setting.back_to_app')}
				</h4>
			</Button.Root>
		{/if}
	</div>
</header>
