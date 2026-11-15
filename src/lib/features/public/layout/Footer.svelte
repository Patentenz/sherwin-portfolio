<script lang="ts">
	import { resolve } from '$app/paths';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { APP_NAME, CONTACT_EMAIL } from '#lib/constants/app.ts';
	import { FOOTER_LINKS } from '#lib/constants/navigation.ts';
	import { SOCIAL_LINKS } from '#lib/constants/social.ts';

	const year = new Date().getFullYear();
</script>

<footer class="ft" id="contact">
	<div class="wrap">
		<div class="ft-cta">
			<h2 class="ft-t">let's<br />connect</h2>
			<div class="ft-em">
				<a href="mailto:{CONTACT_EMAIL}" class="ft-mail">
					<span class="ft-roll">
						<span>{CONTACT_EMAIL}</span>
						<span aria-hidden="true">{CONTACT_EMAIL}</span>
					</span>
					<span class="ft-ar">
						<span class="ft-a1"><ArrowUpRight size={12} strokeWidth={2} aria-hidden="true" /></span>
						<span class="ft-a2"><ArrowUpRight size={12} strokeWidth={2} aria-hidden="true" /></span>
					</span>
				</a>
			</div>
			<ul class="ft-so">
				{#each SOCIAL_LINKS as social (social.label)}
					<li>
						<a
							href={social.href}
							class="ft-sl"
							target="_blank"
							rel="external noopener noreferrer"
							aria-label={social.label}
						>
							<social.icon size={16} />
						</a>
					</li>
				{/each}
			</ul>
		</div>
		<div class="ft-b">
			<ul class="ft-m">
				{#each FOOTER_LINKS as link (link.label)}
					<li>
						<a href={resolve(link.href)} class="ft-lk">
							<span class="ft-roll ft-roll-l">
								<span>{link.label}</span>
								<span class="ft-hv" aria-hidden="true">{link.label}</span>
							</span>
						</a>
					</li>
				{/each}
			</ul>
			<div class="ft-line"></div>
			<p class="ft-c">&copy; {year} {APP_NAME}. All rights reserved</p>
		</div>
	</div>
</footer>

<style>
	.ft {
		background-color: var(--color-dark);
		color: var(--color-surface);
		text-transform: uppercase;
	}

	.ft-cta {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		padding-block: 8rem;
	}

	.ft-t {
		color: var(--color-surface);
		font-size: 10rem;
		font-weight: var(--font-weight-normal);
		line-height: 0.9;
		letter-spacing: normal;
		text-align: center;
		text-transform: uppercase;
	}

	.ft-em {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.ft-mail {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		max-width: 100%;
		color: var(--color-surface);
	}

	.ft-mail:hover {
		color: var(--color-surface);
	}

	.ft-roll {
		display: flex;
		flex-direction: column;
		height: 0.875rem;
		overflow: hidden;
		font-size: var(--font-size-sm);
		line-height: 1;
	}

	.ft-roll > span {
		display: block;
		white-space: nowrap;
		transition: transform 0.4s ease;
	}

	.ft-mail:hover .ft-roll > span,
	.ft-lk:hover .ft-roll > span {
		transform: translateY(-100%);
	}

	.ft-ar {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.25rem;
		height: 1.25rem;
		overflow: hidden;
		background-color: var(--color-primary);
		color: var(--color-dark);
	}

	.ft-a1,
	.ft-a2 {
		position: absolute;
		display: flex;
		transition: transform 0.4s ease;
	}

	.ft-a2 {
		transform: translate(-150%, 150%);
	}

	.ft-mail:hover .ft-a1 {
		transform: translate(150%, -150%);
	}

	.ft-mail:hover .ft-a2 {
		transform: translate(0, 0);
	}

	.ft-so {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	.ft-sl {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border: 1px solid var(--on-dark-line);
		color: var(--color-surface);
		transition: border-color 0.35s;
	}

	.ft-sl:hover {
		border-color: var(--color-primary);
		color: var(--color-surface);
	}

	.ft-b {
		display: grid;
		justify-items: center;
		gap: 2.5rem;
		padding-block: 4rem;
		border-top: 1px solid var(--on-dark-line);
	}

	.ft-m {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
	}

	.ft-lk {
		display: inline-block;
		max-width: 100%;
		overflow: hidden;
		color: var(--color-surface);
	}

	.ft-lk:hover {
		color: var(--color-surface);
	}

	.ft-hv {
		color: var(--color-primary);
	}

	.ft-line {
		width: 100%;
		height: 1px;
		background-color: var(--on-dark-line);
	}

	.ft-c {
		max-width: none;
		font-size: var(--font-size-sm);
		text-align: center;
	}

	@media screen and (max-width: 62rem) {
		.ft-cta {
			padding-block: 6rem;
		}
	}

	@media screen and (max-width: 47.9375rem) {
		.ft-t {
			font-size: 5rem;
		}

		.ft-cta {
			gap: 1.25rem;
		}
	}

	@media screen and (max-width: 29.9375rem) {
		.ft-t {
			font-size: 4rem;
		}

		.ft-cta {
			padding-block: 5rem;
		}
	}
</style>
