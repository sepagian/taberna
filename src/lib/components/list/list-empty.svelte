<script lang="ts">
	import { MotionButton } from "@humanspeak/svelte-motion";
	import ChevronRightFilledIcon from "@iconify-svelte/tabler/chevron-right-filled";
	import NotesOffIcon from "@iconify-svelte/tabler/notes-off";
	import ShoppingBagPlusIcon from "@iconify-svelte/tabler/shopping-bag-plus";
	import { createForm } from "@tanstack/svelte-form";
	import { get } from "svelte/store";
	import { _ } from "svelte-i18n";
	import { invalidateAll } from "$app/navigation";
	import { api, withToast } from "$lib/client/api";
	import { WrapperDrawer } from "$lib/components/wrapper";
	import { listCreateSchema } from "$lib/validators/list";

	let drawerOpen = $state(false);

	const form = createForm(() => ({
		defaultValues: {
			name: "",
		},
		onSubmit: async ({ value }) => {
			const promise = api.post("/api/list", { name: value.name });
			drawerOpen = false;
			await withToast(promise, {
				loading: get(_)("toast.loading"),
				success: get(_)("toast.list_created", { values: { name: value.name } }),
			});
			await invalidateAll();
		},
		validators: {
			onSubmit: listCreateSchema,
		},
	}));
</script>
<section
	class="flex flex-col gap-4 bg-secondary text-secondary-foreground px-4 py-8 rounded-md border-border border items-center border-dashed"
>
	<div class="text-center flex flex-col items-center gap-2">
		<NotesOffIcon height="2rem" />
		<div class="space-y-0">
			<h2 class="heading-2 text-lg text-primary">{$_('list.empty_title')}</h2>
			<p class="paragraph-1 text-">
				{$_('list.empty_subtitle')}
			</p>
		</div>
	</div>

	<WrapperDrawer
		title={$_('list.new')}
		description={$_('list.new_description')}
		bind:open={drawerOpen}
	>
		{#snippet trigger(props)}
			<MotionButton
				{...props}
				class="bg-primary text-primary-foreground rounded-md px-6 py-2 items-center flex gap-2 justify-center w-fit"
				whileTap={{scale:0.95 }}
			>
				<ShoppingBagPlusIcon height="1.5rem" />
				{$_('list.empty_button')}
			</MotionButton>
		{/snippet}

		{#snippet content()}
			<form
				method="POST"
				onsubmit={(e) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    }}
				class="flex flex-col gap-2 pb-8 h-fit"
			>
				<form.Field name="name">
					{#snippet children(field)}
						<div class="space-y-2">
							<input
								id={field.name}
								name={field.name}
								type="text"
								class="pl-2 w-full border h-20 rounded-md bg-input border-border text-primary"
								onblur={field.handleBlur}
								value={field.state.value}
								oninput={(e: Event) => {
              const target = e.target as HTMLInputElement;
              field.handleChange(target.value);
            }}
							>
							{#if field.state.meta.errors?.length}
								{#each field.state.meta.errors as error}
									<p class="text-sm text-red-500" role="alert">
										{error.message}
									</p>
								{/each}
							{/if}
						</div>
					{/snippet}
				</form.Field>
				<MotionButton
					type="submit"
					class="flex w-full justify-center h-12 rounded-md items-center font-semibold bg-primary text-primary-foreground"
					whileTap={{scale:0.95}}
				>
					{$_('list.continue')}
					<ChevronRightFilledIcon height="1.5rem" />
				</MotionButton>
			</form>
		{/snippet}
	</WrapperDrawer>
</section>
