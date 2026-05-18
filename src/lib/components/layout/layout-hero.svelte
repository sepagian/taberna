<script lang="ts">
	import { _ } from "svelte-i18n";
</script>

<section class="pt-4 pb-8">
	<h1 class="font-serif font-bold heading-1 text-primary">
		{$_('hero.title')}
	</h1>
	<p class="font-serif text-xl paragraph-1 text-secondary-foreground">
		{$_('hero.subtitle')}
	</p>
</section>
