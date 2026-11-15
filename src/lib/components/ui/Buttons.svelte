<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Snippet } from 'svelte';

	interface Props {
		href: `#${string}`;
		variant?: 'glass' | 'dark' | 'primary';
		children: Snippet;
	}

	let { href, variant = 'primary', children }: Props = $props();
</script>

<a href={resolve(href)} class="btn {variant}">{@render children()}</a>

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-sm);
		padding: 0.75rem 1.75rem;
		border: 1px solid transparent;
		border-radius: var(--radius-full);
		font-weight: var(--font-weight-medium);
		letter-spacing: 0.01em;
		white-space: nowrap;
		transition:
			color var(--transition-base),
			background-color var(--transition-base),
			border-color var(--transition-base);
	}

	.dark {
		background-color: var(--color-dark);
		border-color: var(--color-dark);
		color: var(--color-on-primary);
	}

	.dark:hover {
		background-color: var(--color-primary);
		border-color: var(--color-primary);
		color: var(--color-on-primary);
	}

	.primary {
		background-color: var(--color-primary);
		border-color: var(--color-primary);
		color: var(--color-on-primary);
	}

	.primary:hover {
		background-color: var(--color-dark);
		border-color: var(--color-dark);
		color: var(--color-on-primary);
	}

	.glass {
		background-color: var(--color-glass);
		background-image: var(--img-glass);
		background-position: 50%;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		-webkit-backdrop-filter: blur(30px);
		backdrop-filter: blur(30px);
		color: var(--color-dark);
		border-color: var(--color-dark);
	}

	.glass:hover {
		background-color: var(--color-surface);
		color: var(--color-primary);
	}
</style>
