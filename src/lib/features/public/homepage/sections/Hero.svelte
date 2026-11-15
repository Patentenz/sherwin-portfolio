<script lang="ts">
	import { resolve } from '$app/paths';
	import ArrowDown from '@lucide/svelte/icons/arrow-down';
	import Buttons from '#lib/components/ui/Buttons.svelte';
	import Pill from '#lib/components/ui/Pill.svelte';
	import { ROUTES } from '#lib/constants/routes.ts';
</script>

<section class="hr" id="home">
	<div class="wrap">
		<div class="hr-row">
			<div class="hr-l">
				<div class="hr-tag"><Pill label="Creative Agency" /></div>
				<h1 class="hr-t">Creative Digital Solution Agency</h1>
				<p class="hr-p">
					We follow your needs, specify your requirements, and work for your success. Your vision,
					our expertise.
				</p>
				<div class="hr-cta">
					<Buttons href={ROUTES.contact} variant="primary">Let's Work Together ?</Buttons>
					<Buttons href={ROUTES.projects} variant="dark">View Projects</Buttons>
				</div>
			</div>
		</div>
		<a href={resolve(ROUTES.about)} class="hr-down">
			Scroll down
			<ArrowDown size={22} strokeWidth={2} aria-hidden="true" />
		</a>
	</div>
</section>

<style>
	.hr {
		padding-top: 9.625rem;
		padding-bottom: 6.875rem;
		background-image: var(--img-flower), var(--img-effect), var(--img-bg);
		background-position:
			100% 0,
			100% 0,
			50%;
		background-repeat: no-repeat, no-repeat, repeat;
		background-size:
			auto 90%,
			auto 90%,
			cover;
	}

	.hr-row {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		margin-bottom: var(--space-2xl);
	}

	.hr-l {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.hr-tag {
		margin-bottom: var(--space-lg);
	}

	.hr-t {
		max-width: 8ch;
		margin-bottom: var(--space-md);
		font-size: clamp(3.25rem, 7vw, 5.75rem);
	}

	.hr-p {
		max-width: 31rem;
		margin-bottom: 3.75rem;
	}

	.hr-cta {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--space-lg);
	}

	.hr-down {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-sm);
		width: fit-content;
		margin-inline: auto;
	}

	@media screen and (min-width: 120rem) {
		.hr {
			padding-top: 12.125rem;
			padding-bottom: 10.625rem;
		}
	}

	@media screen and (max-width: 62rem) {
		.hr {
			padding-top: 7.875rem;
			background-size:
				auto 40%,
				auto 40%,
				cover;
		}
	}

	@media screen and (max-width: 47.9375rem) {
		.hr {
			padding-bottom: 4.5rem;
			background-size:
				auto 35%,
				auto 35%,
				cover;
		}
	}

	@media screen and (max-width: 30rem) {
		.hr {
			background-size:
				auto 20%,
				auto 20%,
				cover;
		}

		.hr-cta {
			flex-direction: column;
			align-items: stretch;
			width: 100%;
			gap: var(--space-md);
		}
	}
</style>
