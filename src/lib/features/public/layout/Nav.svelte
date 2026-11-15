<script lang="ts">
	import { resolve } from '$app/paths';
	import Menu from '@lucide/svelte/icons/menu';
	import X from '@lucide/svelte/icons/x';
	import Buttons from '#lib/components/ui/Buttons.svelte';
	import { APP_NAME } from '#lib/constants/app.ts';
	import { NAV_LINKS } from '#lib/constants/navigation.ts';
	import { ROUTES } from '#lib/constants/routes.ts';

	let open = $state(false);
</script>

<header class="nv">
	<div class="wrap nv-in">
		<a href={resolve('/(public)')} class="nv-logo">{APP_NAME}<span>.</span></a>
		<nav class="nv-m" data-open={open} aria-label="Primary">
			<ul class="nv-ul">
				{#each NAV_LINKS as link (link.href)}
					<li>
						<a href={resolve(link.href)} class="nv-a" onclick={() => (open = false)}>{link.label}</a
						>
					</li>
				{/each}
			</ul>
			<Buttons href={ROUTES.contact}>Contact me</Buttons>
		</nav>
		<button
			type="button"
			class="nv-t"
			aria-label={open ? 'Close menu' : 'Open menu'}
			aria-expanded={open}
			onclick={() => (open = !open)}
		>
			{#if open}
				<X size={24} strokeWidth={2} aria-hidden="true" />
			{:else}
				<Menu size={24} strokeWidth={2} aria-hidden="true" />
			{/if}
		</button>
	</div>
</header>

<style>
	.nv {
		position: fixed;
		inset: 0 0 auto;
		z-index: var(--z-sticky);
		background-color: #fafafacc;
		-webkit-backdrop-filter: blur(16px);
		backdrop-filter: blur(16px);
		border-bottom: 1px solid var(--color-border);
	}

	.nv-in {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-lg);
		min-height: 4.5rem;
	}

	.nv-logo {
		font-size: var(--font-size-h3);
		font-weight: var(--font-weight-bold);
		letter-spacing: var(--letter-spacing-heading);
		color: var(--color-dark);
	}

	.nv-logo span {
		color: var(--color-primary);
	}

	.nv-logo:hover {
		color: var(--color-dark);
	}

	.nv-m {
		display: flex;
		align-items: center;
		gap: var(--space-2xl);
	}

	.nv-ul {
		display: flex;
		align-items: center;
		gap: var(--space-xl);
	}

	.nv-a {
		color: var(--color-dark);
		font-weight: var(--font-weight-medium);
	}

	.nv-a:hover {
		color: var(--color-primary);
	}

	.nv-t {
		display: none;
		padding: var(--space-sm);
		border: 0;
		background: none;
		color: var(--color-dark);
	}

	@media screen and (max-width: 48rem) {
		.nv-t {
			display: grid;
			place-items: center;
		}

		.nv-m {
			position: absolute;
			inset: 100% 0 auto;
			flex-direction: column;
			align-items: stretch;
			gap: var(--space-lg);
			padding: var(--space-lg) var(--container-padding) var(--space-xl);
			background-color: var(--color-bg);
			border-bottom: 1px solid var(--color-border);
			visibility: hidden;
			opacity: 0;
			transform: translateY(-0.5rem);
			transition:
				opacity var(--transition-base),
				transform var(--transition-base),
				visibility var(--transition-base);
		}

		.nv-m[data-open='true'] {
			visibility: visible;
			opacity: 1;
			transform: none;
		}

		.nv-ul {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-md);
		}
	}
</style>
