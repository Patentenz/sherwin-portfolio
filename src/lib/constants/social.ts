import type { Component } from 'svelte';
import FacebookIcon from '#lib/components/ui/icons/FacebookIcon.svelte';
import GithubIcon from '#lib/components/ui/icons/GithubIcon.svelte';
import InstagramIcon from '#lib/components/ui/icons/InstagramIcon.svelte';

export interface SocialLink {
	label: string;
	href: string;
	icon: Component<{ size?: number; title?: string }>;
}

export const SOCIAL_LINKS: SocialLink[] = [
	{ label: 'Facebook', href: 'https://www.facebook.com/', icon: FacebookIcon },
	{ label: 'GitHub', href: 'https://github.com/', icon: GithubIcon },
	{ label: 'Instagram', href: 'https://www.instagram.com/', icon: InstagramIcon }
];
