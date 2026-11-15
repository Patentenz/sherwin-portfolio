<script lang="ts">
	import { resolve } from '$app/paths';
	import CircleDot from '@lucide/svelte/icons/circle-dot';
	import SectionHead from '#lib/components/ui/SectionHead.svelte';
	import type { Attachment } from 'svelte/attachments';
	import { PROJECTS } from '#lib/features/public/homepage/content.ts';

	const SIZES = [500, 800, 1080];
	const ROWS = [PROJECTS.slice(0, 2), PROJECTS.slice(2)];

	const srcSet = (image: string): string =>
		[...SIZES.map((size) => `${image}-p-${size}.jpg ${size}w`), `${image}.jpg 1195w`].join(', ');

	const follow: Attachment<HTMLElement> = (el) => {
		const move = (e: PointerEvent): void => {
			const rect = el.getBoundingClientRect();
			const x = (e.clientX - rect.left) / rect.width;
			const y = (e.clientY - rect.top) / rect.height;
			el.style.setProperty('--mx', `${-20 + 40 * x}vw`);
			el.style.setProperty('--my', `${-20 + 40 * y}vh`);
		};
		const reset = (): void => {
			el.style.setProperty('--mx', '0px');
			el.style.setProperty('--my', '0px');
		};
		el.addEventListener('pointermove', move);
		el.addEventListener('pointerleave', reset);
		return () => {
			el.removeEventListener('pointermove', move);
			el.removeEventListener('pointerleave', reset);
		};
	};

	const stack: Attachment<HTMLElement> = (el) => {
		const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
		const first = el.querySelector<HTMLElement>('[data-row="0"]');
		const second = el.querySelector<HTMLElement>('[data-row="1"]');
		if (!first || !second || motion.matches) return;

		let frame = 0;
		const update = (): void => {
			frame = 0;
			const rect = second.getBoundingClientRect();
			const progress = Math.min(
				1,
				Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height))
			);
			const eased = progress >= 0.25 ? ((progress - 0.25) / 0.75) * 25 : 0;
			first.style.setProperty('--sy', String(eased));
			first.style.setProperty('--sz', String(-eased));
		};
		const schedule = (): void => {
			if (!frame) frame = requestAnimationFrame(update);
		};

		update();
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
		};
	};
</script>

<section class="pj" id="projects">
	<div class="wrap">
		<div class="pj-body">
			<SectionHead tag="Featured Work" title="Projects">
				{#snippet aside()}
					<p class="pj-copy">&copy; 2020/25</p>
				{/snippet}
			</SectionHead>
			<div class="pj-comp" {@attach stack}>
				{#each ROWS as row, r (r)}
					<div class="pj-w" data-row={r}>
						<div class="pj-g">
							{#each row as project (project.name)}
								<a href={resolve(project.href)} class="pj-a">
									<div class="pj-cs">
										<div class="pj-box">
											<div class="pj-bar">
												<div class="pj-meta">
													<span class="pj-name">{project.name}</span>
													<span class="pj-bul">&bull;</span>
													<span class="pj-yr">{project.year}</span>
												</div>
												<div class="pj-dots">
													<span class="pj-dot r"></span>
													<span class="pj-dot y"></span>
													<span class="pj-dot g"></span>
												</div>
											</div>
											<div class="pj-iw">
												<img
													class="pj-img"
													src="{project.image}.jpg"
													srcset={srcSet(project.image)}
													sizes="(max-width: 62rem) 100vw, 50vw"
													alt={project.name}
													loading="lazy"
												/>
												<div class="pj-view" {@attach follow}>
													<span class="pj-vb">
														<CircleDot size={48} strokeWidth={1.5} aria-hidden="true" />
													</span>
												</div>
											</div>
										</div>
										<div class="pj-glass"></div>
									</div>
								</a>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.pj {
		position: relative;
		overflow: clip;
		color: var(--color-heading);
	}

	.pj-body {
		padding-block: 8rem;
	}

	.pj-copy {
		color: var(--color-text);
		font-size: 1.25rem;
		line-height: 1.4;
	}

	.pj-comp {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		perspective: 1000px;
	}

	.pj-w {
		position: sticky;
		top: 6.5rem;
	}

	.pj-w[data-row='0'] {
		transform: translateY(calc(var(--sy, 0) * 1%)) translateZ(calc(var(--sz, 0) * 1vw));
	}

	.pj-g {
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		width: 100%;
	}

	.pj-a {
		display: block;
		width: 100%;
		color: var(--color-heading);
	}

	.pj-a:hover {
		color: var(--color-heading);
	}

	.pj-cs {
		position: relative;
		border-radius: 1.25rem;
	}

	.pj-box {
		position: relative;
		z-index: 2;
		padding: 1rem;
		background-color: var(--glass-bg);
	}

	.pj-bar {
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 100%;
		margin-bottom: 1rem;
		padding: 1rem;
		border: 1px solid var(--glass-line);
		border-radius: 1rem;
		background-color: var(--glass-panel);
	}

	.pj-meta {
		display: flex;
		align-items: center;
		justify-self: start;
		gap: 0.5rem;
	}

	.pj-name {
		color: var(--color-heading);
		font-size: 1rem;
		font-weight: var(--font-weight-medium);
		line-height: 1;
		letter-spacing: 0.05rem;
		text-transform: uppercase;
	}

	.pj-bul {
		font-size: 1rem;
		line-height: 1.5;
	}

	.pj-yr {
		color: var(--color-text);
		font-size: var(--font-size-sm);
		line-height: 1;
		text-transform: uppercase;
	}

	.pj-dots {
		display: flex;
		align-items: center;
		justify-self: end;
		gap: 5px;
	}

	.pj-dot {
		width: 8px;
		height: 8px;
		border-radius: var(--radius-full);
	}

	.pj-dot.r {
		background-color: var(--dot-red);
	}

	.pj-dot.y {
		background-color: var(--dot-yellow);
	}

	.pj-dot.g {
		background-color: var(--dot-green);
	}

	.pj-iw {
		position: relative;
		width: 100%;
		overflow: hidden;
		border-radius: 1rem;
	}

	.pj-img {
		width: 100%;
		transition: scale 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
	}

	.pj-a:hover .pj-img {
		scale: 1.1;
	}

	.pj-view {
		position: absolute;
		inset: 0;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		mix-blend-mode: difference;
	}

	.pj-vb {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 4rem;
		height: 4rem;
		border-radius: var(--radius-full);
		background-color: var(--invert-bg);
		color: var(--color-dark);
		translate: var(--mx, 0px) var(--my, 0px);
		scale: 0;
		transition:
			translate 0.3s linear,
			scale 0.5s linear;
	}

	.pj-a:hover .pj-vb {
		scale: 1;
		transition:
			translate 0.3s linear,
			scale 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
	}

	.pj-glass {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 1px solid var(--glass-line);
		border-radius: 1.5rem;
		background-color: var(--glass-bg);
		-webkit-backdrop-filter: blur(30px);
		backdrop-filter: blur(30px);
	}

	@media screen and (max-width: 62rem) {
		.pj-body {
			padding-block: 4rem;
		}

		.pj-g {
			grid-template-columns: 1fr;
		}

		.pj-w {
			position: static;
		}

		.pj-view {
			display: none;
		}
	}

	@media screen and (max-width: 47.9375rem) {
		.pj-copy {
			font-size: 1.125rem;
		}

		.pj-body {
			padding-block: 6rem;
		}
	}

	@media screen and (max-width: 29.9375rem) {
		.pj-body {
			padding-block: 5rem;
		}

		.pj-box {
			padding: 0.75rem;
		}

		.pj-bar {
			grid-template-columns: 1fr auto;
			margin-bottom: 0.75rem;
		}

		.pj-name {
			font-size: var(--font-size-sm);
		}

		.pj-yr {
			font-size: var(--font-size-xs);
		}

		.pj-glass {
			border-radius: 1.75rem;
		}
	}
</style>
