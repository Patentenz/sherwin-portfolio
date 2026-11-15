<script lang="ts">
	import Buttons from '#lib/components/ui/Buttons.svelte';
	import SectionHead from '#lib/components/ui/SectionHead.svelte';
	import { ROUTES } from '#lib/constants/routes.ts';
	import { STATS } from '#lib/features/public/homepage/content.ts';
</script>

<section class="ab sec-y" id="about">
	<div class="wrap">
		<SectionHead tag="About me" title="About" />
		<div class="ab-g">
			<div class="ab-c">
				<p>
					I'm Sherwin, a digital creative who blends design thinking with engineering. I help
					businesses and founders turn ideas into polished, high-performing digital products.
				</p>
				<p>
					Every project starts by understanding your goals and audience. From there I craft clear
					interfaces and reliable code, so what you launch looks great, loads fast and grows with
					you.
				</p>
			</div>
			<div class="ab-c">
				<ul class="ab-s">
					{#each STATS as stat (stat.label)}
						<li>
							<strong>{stat.value}</strong>
							<span>{stat.label}</span>
						</li>
					{/each}
				</ul>
				<Buttons href={ROUTES.contact} variant="dark">Get in touch</Buttons>
			</div>
		</div>
	</div>
</section>

<style>
	.ab-g {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-3xl);
		align-items: start;
	}

	.ab-c {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-lg);
	}

	.ab-s {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-lg);
		width: 100%;
		padding-block: var(--space-xl);
		border-block: 1px solid var(--color-border);
	}

	.ab-s li {
		display: flex;
		flex-direction: column;
	}

	.ab-s strong {
		font-size: 2.5rem;
		line-height: 1.1;
		letter-spacing: var(--letter-spacing-heading);
		color: var(--color-dark);
	}

	.ab-s span {
		font-size: var(--font-size-sm);
	}

	@media screen and (max-width: 62rem) {
		.ab-g {
			grid-template-columns: 1fr;
			gap: var(--space-xl);
		}
	}
</style>
