<script lang="ts">
	import { resolve } from '$app/paths';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import ChevronUp from '@lucide/svelte/icons/chevron-up';
	import Pill from '#lib/components/ui/Pill.svelte';
	import { ROUTES } from '#lib/constants/routes.ts';

	interface FaqItem {
		question: string;
		answer: string;
	}

	interface Props {
		items: FaqItem[];
	}

	let { items }: Props = $props();
	let active = $state(-1);

	const toggle = (index: number): void => {
		active = active === index ? -1 : index;
	};
</script>

<div class="fq">
	<div class="fq-l">
		<div class="fq-tag"><Pill label="FAQ" /></div>
		<h2 class="fq-t">Frequently Asked <span class="fq-hl">Questions</span></h2>
		<div class="fq-cta">
			<a href={resolve(ROUTES.contact)} class="fq-btn">
				<span class="fq-bt">
					<span class="fq-bt-a">Contact Me</span>
					<span class="fq-bt-b" aria-hidden="true">Contact Me</span>
				</span>
				<span class="fq-bi">
					<span class="fq-bi-a">
						<ArrowRight size={20} strokeWidth={2} aria-hidden="true" />
					</span>
					<span class="fq-bi-b">
						<ArrowRight size={20} strokeWidth={2} aria-hidden="true" />
					</span>
				</span>
			</a>
		</div>
	</div>
	<ul class="fq-r">
		{#each items as item, i (item.question)}
			<li class="fq-i" data-open={active === i}>
				<h3 class="fq-h">
					<button
						type="button"
						class="fq-q"
						aria-expanded={active === i}
						aria-controls="fq-p-{i}"
						id="fq-b-{i}"
						onclick={() => toggle(i)}
					>
						<span class="fq-qt">{item.question}</span>
						<span class="fq-ar">
							<span class="fq-ar-d"
								><ChevronDown size={20} strokeWidth={2} aria-hidden="true" /></span
							>
							<span class="fq-ar-u"><ChevronUp size={20} strokeWidth={2} aria-hidden="true" /></span
							>
						</span>
					</button>
				</h3>
				<div
					class="fq-p"
					id="fq-p-{i}"
					role="region"
					aria-labelledby="fq-b-{i}"
					inert={active !== i}
				>
					<div class="fq-pi">
						<div class="fq-pd">
							<p class="fq-a">{item.answer}</p>
						</div>
					</div>
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	.fq {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3.125rem;
		align-items: start;
	}

	.fq-l {
		max-width: 32.1875rem;
	}

	.fq-tag {
		margin-bottom: 0.9375rem;
	}

	.fq-t {
		margin-bottom: 0.9375rem;
		color: var(--color-heading);
		font-size: 5rem;
		font-weight: var(--font-weight-normal);
		line-height: 1;
		letter-spacing: 0.1rem;
	}

	.fq-hl {
		color: var(--color-primary);
	}

	.fq-cta {
		margin-top: 3.125rem;
	}

	.fq-btn {
		position: relative;
		z-index: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.875rem;
		padding: 0.25rem 0.25rem 0.25rem 2.1875rem;
		overflow: hidden;
		border-radius: var(--radius-full);
		background-color: var(--color-primary);
		color: var(--color-on-primary);
		font-weight: var(--font-weight-bold);
		line-height: 1;
		transition: background-color 0.3s;
	}

	.fq-btn:hover {
		background-color: var(--color-primary-hover);
		color: var(--color-on-primary);
	}

	.fq-bt {
		position: relative;
		overflow: hidden;
	}

	.fq-bt-a,
	.fq-bt-b {
		display: block;
		transition: transform 0.4s ease;
	}

	.fq-bt-b {
		position: absolute;
		inset: 0;
		transform: translateY(100%);
	}

	.fq-btn:hover .fq-bt-a {
		transform: translateY(-100%);
	}

	.fq-btn:hover .fq-bt-b {
		transform: translateY(0);
	}

	.fq-bi {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
		overflow: hidden;
		border-radius: var(--radius-full);
		background-color: var(--color-surface);
		color: var(--color-primary);
	}

	.fq-bi-a,
	.fq-bi-b {
		display: flex;
		transition: transform 0.5s ease;
	}

	.fq-bi-b {
		position: absolute;
		transform: translateX(-1.875rem);
	}

	.fq-btn:hover .fq-bi-a {
		transform: translateX(1.875rem);
	}

	.fq-btn:hover .fq-bi-b {
		transform: translateX(0);
	}

	.fq-r {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.fq-i {
		overflow: hidden;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background-color: var(--color-surface);
	}

	.fq-h {
		margin: 0;
		font-size: inherit;
		font-weight: inherit;
		letter-spacing: normal;
		line-height: inherit;
	}

	.fq-q {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
		width: 100%;
		padding: 1rem;
		border: 0;
		background: none;
		color: var(--color-heading);
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-medium);
		line-height: 1.5;
		letter-spacing: -0.03em;
		text-align: left;
	}

	.fq-ar {
		position: relative;
		display: flex;
		flex: none;
		align-items: center;
		justify-content: center;
		width: 3.5rem;
		height: 2.5rem;
		border-radius: var(--radius-full);
		background-color: color-mix(in srgb, var(--color-dark) 5%, transparent);
		color: var(--color-heading);
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	.fq-ar-d,
	.fq-ar-u {
		position: absolute;
		display: flex;
		transition: opacity 0.3s ease;
	}

	.fq-ar-u {
		opacity: 0;
	}

	.fq-i[data-open='true'] .fq-ar {
		background-color: var(--color-primary);
		color: var(--color-on-primary);
	}

	.fq-i[data-open='true'] .fq-ar-d {
		opacity: 0;
	}

	.fq-i[data-open='true'] .fq-ar-u {
		opacity: 1;
	}

	.fq-p {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 0.35s ease;
	}

	.fq-i[data-open='true'] .fq-p {
		grid-template-rows: 1fr;
	}

	.fq-pi {
		min-height: 0;
		overflow: hidden;
	}

	.fq-pd {
		padding: 0.5rem 1.5rem 0;
		color: var(--color-text);
	}

	.fq-a {
		padding-bottom: 1.5rem;
		opacity: 0;
		transform: translateY(50%);
		transition:
			transform 0.35s ease,
			opacity 0.35s ease;
	}

	.fq-i[data-open='true'] .fq-a {
		opacity: 1;
		transform: translateY(0);
	}

	@media screen and (max-width: 62rem) {
		.fq {
			grid-template-columns: 1fr;
		}

		.fq-t {
			font-size: 4rem;
		}
	}

	@media screen and (max-width: 47.9375rem) {
		.fq-t {
			font-size: 3rem;
		}
	}

	@media screen and (max-width: 29.9375rem) {
		.fq-t {
			font-size: 3rem;
		}
	}
</style>
