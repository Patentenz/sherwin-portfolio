<script lang="ts">
	import type { Snippet } from 'svelte';
	import Pill from '#lib/components/ui/Pill.svelte';

	interface Props {
		tag: string;
		title: string;
		aside?: Snippet;
	}

	let { tag, title, aside }: Props = $props();
</script>

<div class="sh">
	<div class="sh-t">
		<Pill label={tag} />
		<h2 class="sh-h">{title}</h2>
	</div>
	{#if aside}
		<div class="sh-a">{@render aside()}</div>
	{/if}
</div>

<style>
	.sh {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 2.5rem;
		align-items: end;
		margin-bottom: 5rem;
	}

	.sh-t {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1.5rem;
	}

	.sh-h {
		color: var(--color-heading);
		font-size: 8rem;
		font-weight: var(--font-weight-normal);
		line-height: 1;
		letter-spacing: 0.1rem;
	}

	@media screen and (max-width: 62rem) {
		.sh-h {
			font-size: 5rem;
		}

		.sh {
			margin-bottom: 3rem;
		}
	}

	@media screen and (max-width: 47.9375rem) {
		.sh-h {
			font-size: 4rem;
		}
	}

	@media screen and (max-width: 29.9375rem) {
		.sh-h {
			font-size: 3rem;
		}
	}
</style>
