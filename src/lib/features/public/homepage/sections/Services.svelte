<script lang="ts">
	import SectionHead from '#lib/components/ui/SectionHead.svelte';
	import type { Attachment } from 'svelte/attachments';
	import { SERVICES } from '#lib/features/public/homepage/content.ts';

	type Frame = readonly [number, number];

	const CUBE: Frame[] = [
		[0, 1],
		[0.25, 90],
		[0.5, 180],
		[0.75, 270],
		[1, 360]
	];
	const LIFT: Frame[] = [
		[0, 0],
		[0.25, -50],
		[0.5, 0],
		[0.75, 50],
		[1, 0]
	];
	const FACES: Frame[][] = [
		[
			[0, 1],
			[0.12, 0],
			[1, 0]
		],
		[
			[0, 0],
			[0.12, 0],
			[0.25, 1],
			[0.37, 0],
			[1, 0]
		],
		[
			[0, 0],
			[0.37, 0],
			[0.5, 1],
			[0.62, 0],
			[1, 0]
		],
		[
			[0, 0],
			[0.62, 0],
			[0.75, 1],
			[1, 1]
		]
	];

	const LAST = 0.75;

	const clamp = (value: number): number => Math.min(1, Math.max(0, value));

	const sample = (frames: Frame[], t: number): number => {
		for (let i = 1; i < frames.length; i++) {
			const [t1, v1] = frames[i];
			if (t <= t1) {
				const [t0, v0] = frames[i - 1];
				return v0 + (v1 - v0) * clamp((t - t0) / (t1 - t0));
			}
		}
		return frames[frames.length - 1][1];
	};

	const mission: Attachment<HTMLElement> = (el) => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		let q = 0;
		let targetQ = 0;
		let frame = 0;

		const measure = (): void => {
			const container = el.querySelector<HTMLElement>('.sv-c');
			const block = el.querySelector<HTMLElement>('.sv-b');
			if (!container || !block) return;
			const pin = parseFloat(getComputedStyle(block).top) || 0;
			const range = container.offsetHeight - block.offsetHeight;
			const progress = range > 0 ? (pin - container.getBoundingClientRect().top) / range : 0;
			targetQ = clamp(progress / 0.9) * LAST;
		};

		const apply = (): void => {
			el.style.setProperty('--rx', `${sample(CUBE, q)}deg`);
			el.style.setProperty('--ty', `${sample(LIFT, q)}%`);
			FACES.forEach((frames, i) => el.style.setProperty(`--b${i + 1}`, String(sample(frames, q))));
		};

		const tick = (): void => {
			q += (targetQ - q) * 0.1;
			apply();
			const settled = Math.abs(targetQ - q) < 0.0005;
			frame = settled ? 0 : requestAnimationFrame(tick);
		};

		const schedule = (): void => {
			measure();
			if (!frame) frame = requestAnimationFrame(tick);
		};

		measure();
		q = targetQ;
		apply();

		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
		};
	};
</script>

<section class="sv" id="services" {@attach mission}>
	<div class="wrap sv-c">
		<div class="sv-b">
			<SectionHead tag="What I do" title="Services" />
			<div class="sv-cube">
				{#each SERVICES as service, i (service.title)}
					<div class="sv-f">
						<div class="sv-ip" style:--fb="var(--b{i + 1})">
							<service.icon size={64} strokeWidth={1.25} aria-hidden="true" />
						</div>
						<div class="sv-cp">
							<div class="sv-cl">
								<span class="sv-n">[ 0{i + 1} ]</span>
								<h3 class="sv-t">{service.title}</h3>
							</div>
							<div class="sv-cl">
								<p class="sv-p">{service.text}</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.sv {
		--h: 17.875rem;
		--rx: 1deg;
		--ty: 0%;
		--b1: 1;
		--b2: 0;
		--b3: 0;
		--b4: 0;
		padding-block: 8.75rem;
	}

	.sv-c {
		height: 93.75rem;
	}

	.sv-b {
		position: sticky;
		top: 6.25rem;
		display: flex;
		flex-direction: column;
	}

	.sv-cube {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: var(--h);
		transform-style: preserve-3d;
		transform: translateY(var(--ty)) rotateX(var(--rx));
	}

	.sv-f {
		position: relative;
		display: flex;
		width: 100%;
		height: var(--h);
		overflow: hidden;
		background-color: var(--color-surface);
	}

	.sv-f:nth-child(n + 2) {
		position: absolute;
		inset: 0 auto auto 0;
		transform-style: preserve-3d;
	}

	.sv-f:nth-child(2) {
		transform: translate3d(0, 50%, calc(var(--h) / -2)) rotateX(-90deg);
	}

	.sv-f:nth-child(3) {
		transform: translate3d(0, 0, calc(var(--h) * -1)) rotateX(-180deg);
	}

	.sv-f:nth-child(4) {
		transform: translate3d(0, -50%, calc(var(--h) / -2)) rotateX(90deg);
	}

	.sv-ip {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 35%;
		border: 1px solid var(--color-dark);
		border-right: 0;
		background-color: color-mix(in srgb, var(--color-primary) calc(var(--fb) * 100%), transparent);
		color: var(--color-dark);
	}

	.sv-cp {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: 2.125rem;
		width: 65%;
		padding: 2.5rem 2.5rem 2.5rem 6.25rem;
		border: 1px solid var(--color-dark);
		border-left: 0;
		background-color: var(--color-bg);
	}

	.sv-cl {
		display: flex;
		width: 100%;
	}

	.sv-n {
		flex: none;
		width: 9.375rem;
		color: var(--color-dark);
		font-family: var(--font-heading);
		font-size: 1.75rem;
		line-height: 1.5;
	}

	.sv-t {
		width: 90%;
		color: var(--color-dark);
		font-size: 1.75rem;
		font-weight: var(--font-weight-bold);
		line-height: 1.5;
		letter-spacing: normal;
		text-transform: uppercase;
	}

	.sv-p {
		width: 80%;
		max-width: none;
		color: var(--color-text);
		font-size: var(--font-size-lg);
		font-weight: 300;
	}

	@media screen and (max-width: 62rem) {
		.sv {
			--h: 14.375rem;
			padding-block: 6.25rem;
		}

		.sv-cp {
			padding-left: 2.5rem;
		}

		.sv-ip :global(svg) {
			width: 3.75rem;
			height: 3.75rem;
		}

		.sv-n,
		.sv-t {
			font-size: var(--font-size-lg);
		}

		.sv-n {
			width: auto;
			margin-right: 1.25rem;
			line-height: 1.7;
		}

		.sv-t {
			width: 100%;
		}

		.sv-p {
			width: 100%;
			font-size: var(--font-size-sm);
		}
	}

	@media screen and (max-width: 47.9375rem) {
		.sv {
			--h: 10.625rem;
			padding-block: 3.75rem;
		}

		.sv-ip {
			width: 20%;
		}

		.sv-ip :global(svg) {
			width: 2.5rem;
			height: 2.5rem;
		}

		.sv-cp {
			gap: 1.25rem;
			width: 80%;
			padding-left: 1.875rem;
		}

		.sv-n,
		.sv-t {
			font-size: var(--font-size-body);
		}

		.sv-t {
			display: flex;
			align-items: center;
			line-height: 1.4;
		}
	}

	@media screen and (max-width: 29.9375rem) {
		.sv-c {
			height: auto;
		}

		.sv-b {
			position: static;
		}

		.sv-cube {
			height: auto;
			gap: 1.875rem;
			transform: none;
		}

		.sv-f,
		.sv-f:nth-child(n + 2) {
			position: static;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 0.75rem;
			height: auto;
			padding-top: 1.25rem;
			background-color: var(--color-primary);
			transform: none;
		}

		.sv-ip {
			width: auto;
			border: 0;
			background-color: transparent;
			color: var(--color-on-primary);
		}

		.sv-ip :global(svg) {
			width: 2rem;
			height: 2rem;
		}

		.sv-cp {
			align-items: center;
			gap: 0.5rem;
			width: 100%;
			margin-top: 0.625rem;
			padding: 1.25rem;
			border: 0;
		}

		.sv-cl {
			flex-direction: column;
			gap: 0.75rem;
			text-align: center;
		}

		.sv-n {
			margin-right: 0;
			font-size: var(--font-size-xs);
		}

		.sv-t {
			justify-content: center;
			font-size: var(--font-size-xs);
		}

		.sv-p {
			font-size: var(--font-size-xs);
		}
	}
</style>
