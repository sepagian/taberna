<script lang="ts">
	import { MotionButton } from "@humanspeak/svelte-motion";
	import { createForm } from "@tanstack/svelte-form";
	import { _ } from "svelte-i18n";
	import { WrapperDialog } from "$lib/components/wrapper";
	import { listCreateSchema } from "$lib/validators/list";

	let { action, onComplete, triggerClass = "" } = $props();
	let open = $state(false);

	const form = createForm(() => ({
		defaultValues: {
			name: "",
		},
		onSubmit: async ({ value }) => {
			open = false;
			await onComplete(value.name);
		},
		validators: {
			onSubmit: listCreateSchema,
		},
	}));
</script>

<WrapperDialog
	bind:open
	title={$_('list.rename')}
	description={$_('list.rename_description')}
	interactOutsideBehavior="ignore"
>
	{#snippet trigger(props)}
		<MotionButton
			{...props}
			class="text-left hover:bg-secondary text-secondary-foreground font-medium flex gap-2 items-center rounded-sm px-2 py-1 w-full {triggerClass}"
		>
			<action.icon height="1rem" />
			{action.name}
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
		>
			<div class="flex flex-col gap-4 h-fit justify-center">
				<form.Field name="name">
					{#snippet children(field)}
						<div class="space-y-2">
							<input
								id={field.name}
								name={field.name}
								type="text"
								class="w-full border border-border bg-input h-20 rounded-md"
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
				<div class="flex gap-2 w-full justify-end">
					<MotionButton
						type="button"
						class="rounded-md border border-border px-4 py-2"
						onclick={() => open = false}
						>{$_('list.cancel')}</MotionButton
					>
					<MotionButton
						type="submit"
						class="rounded-md bg-primary text-primary-foreground px-4 py-2"
						>{$_('list.save')}</MotionButton
					>
				</div>
			</div>
		</form>
	{/snippet}
</WrapperDialog>
