import { ROUTES } from '#lib/constants/routes.ts';

export interface NavLink {
	label: string;
	href: `#${string}`;
}

export const NAV_LINKS: NavLink[] = [
	{ label: 'About', href: ROUTES.about },
	{ label: 'Services', href: ROUTES.services },
	{ label: 'Projects', href: ROUTES.projects },
	{ label: 'FAQ', href: ROUTES.faq }
];

export const FOOTER_LINKS: NavLink[] = [
	{ label: 'Home', href: ROUTES.home },
	...NAV_LINKS,
	{ label: 'Contact', href: ROUTES.contact }
];
