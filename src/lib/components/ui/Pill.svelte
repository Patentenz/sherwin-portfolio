<script lang="ts">
	interface Props {
		label: string;
	}

	let { label }: Props = $props();
</script>

<span class="pl">
	<span class="pl-dot"></span>
	{label}
</span>

<style>
	.pl {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.25rem 1rem 0.25rem 0.5rem;
		border-radius: var(--radius-full);
		background-image: linear-gradient(90deg, #ffffff, var(--color-dark));
		color: var(--color-on-primary);
		font-size: var(--font-size-sm);
	}

	.pl-dot {
		width: 0.625rem;
		height: 0.625rem;
		border-radius: var(--radius-full);
		background-color: var(--color-primary);
	}
</style>
