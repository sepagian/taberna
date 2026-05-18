<script lang="ts">
	import { MotionButton } from "@humanspeak/svelte-motion";
	import LogoutIcon from "@iconify-svelte/tabler/logout";
	import SunMoonIcon from "@iconify-svelte/tabler/sun-moon";
	import UserIcon from "@iconify-svelte/tabler/user";
	import UserCircleIcon from "@iconify-svelte/tabler/user-circle";
	import { Separator } from "bits-ui";
	import { toggleMode } from "mode-watcher";
	import { get } from "svelte/store";
	import { _ } from "svelte-i18n";
	import { goto } from "$app/navigation";
	import { signOut } from "$lib/actions/auth";
	import { authClient } from "$lib/client/auth-client";
	import { UserMenu, UserProfile } from "$lib/components/user";
	import { WrapperPopover } from "$lib/components/wrapper";

	const session = authClient.useSession();

	let userInitials = $derived(
		$session.data?.user?.name
			?.split(/\s+/)
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2) ?? "U"
	);

	let popoverOpen = $state(false);

	const menus = [
		{
			name: get(_)("user.manage"),
			icon: UserIcon,
			onComplete: () => {
				goto("/app/setting");
				popoverOpen = false;
			},
		},
		{
			name: get(_)("user.switch_theme"),
			icon: SunMoonIcon,
			onComplete: () => {
				toggleMode();
				popoverOpen = false;
			},
		},
		{
			name: get(_)("user.logout"),
			icon: LogoutIcon,
			onComplete: () => signOut(),
		},
	];
</script>
<WrapperPopover bind:open={popoverOpen}>
	{#snippet trigger(props)}
		<MotionButton {...props} whileTap={{scale:0.98}} class="p-1">
			{#if session}
				<div class="border border-border rounded-full border-2">
					<img
						src={$session.data?.user.image}
						class="rounded-full h-8 p-0.5"
						aria-label={userInitials}
						alt={userInitials}
					>
				</div>
			{:else}
				<UserCircleIcon height="1rem" />
			{/if}
		</MotionButton>
	{/snippet}
	{#snippet content()}
		<UserProfile {session} {userInitials} />
		<Separator.Root
			class="bg-border shrink-0 data-[orientation=horizontal]:h-px"
		/>
		{#each menus as menu}
			<UserMenu {menu} onComplete={menu.onComplete} />
		{/each}
	{/snippet}
</WrapperPopover>
