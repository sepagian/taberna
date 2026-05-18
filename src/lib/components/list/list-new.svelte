<script lang="ts">
	import { MotionButton } from "@humanspeak/svelte-motion";
	import ChevronRightFilledIcon from "@iconify-svelte/tabler/chevron-right-filled";
	import CirclePlusIcon from "@iconify-svelte/tabler/circle-plus";
	import { createForm } from "@tanstack/svelte-form";
	import { get } from "svelte/store";
	import { _ } from "svelte-i18n";
	import { invalidateAll } from "$app/navigation";
	import { api, withToast } from "$lib/client/api";
	import { WrapperDrawer } from "$lib/components/wrapper";
	import { titleCase } from "$lib/utils/parse";
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
				success: get(_)("toast.list_created", {
					values: { name: titleCase(value.name) },
				}),
			});
			await invalidateAll();
			form.reset();
		},
		validators: {
			onSubmit: listCreateSchema,
		},
	}));
</script>

<WrapperDrawer
	title={$_('list.new')}
	description={$_('list.new_description')}
	bind:open={drawerOpen}
>
	{#snippet trigger(props)}
		<MotionButton
			{...props}
			class="border border-accent rounded-md bg-accent px-4 py-4 flex flex-col text-accent-foreground aspect-square justify-between w-full"
			whileTap={{scale:0.95}}
		>
			<div class="flex flex-col">
				<h3 class="text-left font-semibold heading-3 text-lg capitalize">
					{$_('list.new')}
				</h3>
				<h3 class="text-left paragraph-1 text-sm">{$_('list.new_subtitle')}</h3>
			</div>
			<CirclePlusIcon height="1.5rem" class="self-end" />
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
							class="pl-2 w-full border h-24 rounded-md bg-input border-border text-primary"
							onblur={field.handleBlur}
							value={field.state.value}
							oninput={(e: Event) => {
              const target = e.target as HTMLInputElement;
              field.handleChange(target.value);
            }}
						>
						{#if field.state.meta.errors?.length}
							{#each field.state.meta.errors as error}
								<p class="text-sm text-red-500" role="alert">{error.message}</p>
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
