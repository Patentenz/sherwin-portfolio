import type { Component } from 'svelte';
import Palette from '@lucide/svelte/icons/palette';
import Megaphone from '@lucide/svelte/icons/megaphone';
import CodeXml from '@lucide/svelte/icons/code-xml';
import PenTool from '@lucide/svelte/icons/pen-tool';
import { ROUTES } from '#lib/constants/routes.ts';

export interface Service {
	title: string;
	text: string;
	icon: Component;
}

export interface Project {
	name: string;
	year: string;
	href: `#${string}`;
	image: string;
}

export interface Stat {
	value: string;
	label: string;
}

export interface FaqEntry {
	question: string;
	answer: string;
}

export const SERVICES: Service[] = [
	{
		title: 'UI/UX Design',
		text: 'Research-led interfaces that are intuitive, accessible and a pleasure to use on every screen.',
		icon: Palette
	},
	{
		title: 'Development',
		text: 'Fast, scalable and maintainable websites and web apps built with modern frameworks.',
		icon: CodeXml
	},
	{
		title: 'Branding',
		text: 'Distinct identities, logos and visual systems that make your business easy to remember.',
		icon: PenTool
	},
	{
		title: 'Marketing',
		text: 'Content and campaigns that bring the right audience to your product and keep them engaged.',
		icon: Megaphone
	}
];

export const STATS: Stat[] = [
	{ value: '5+', label: 'Years of experience' },
	{ value: '40+', label: 'Projects delivered' },
	{ value: '25+', label: 'Happy clients' }
];

export const PROJECTS: Project[] = [
	{
		name: 'Fusion',
		year: '2025',
		href: ROUTES.contact,
		image:
			'https://cdn.prod.website-files.com/6927066ecdab8dcb9f8cab77/692a0c1597ffef22ce752fbe_project-01-img-01'
	},
	{
		name: 'Prime',
		year: '2024',
		href: ROUTES.contact,
		image:
			'https://cdn.prod.website-files.com/6927066ecdab8dcb9f8cab77/692a0dbf33f777f7195deed6_project-02-img-01'
	},
	{
		name: 'Horizon',
		year: '2025',
		href: ROUTES.contact,
		image:
			'https://cdn.prod.website-files.com/6927066ecdab8dcb9f8cab77/692a0737de4d1191905dea46_project-03-img-01'
	},
	{
		name: 'Orbit',
		year: '2022',
		href: ROUTES.contact,
		image:
			'https://cdn.prod.website-files.com/6927066ecdab8dcb9f8cab77/692a072e7e641aefa2bdd713_project-04-img-01'
	}
];

export const FAQS: FaqEntry[] = [
	{
		question: 'What services do you offer?',
		answer:
			'I cover the full journey: UI/UX design, front-end and full-stack development, branding and digital marketing, so you only need one partner.'
	},
	{
		question: 'How long does a typical project take?',
		answer:
			'Most websites take between 3 and 6 weeks depending on scope. Larger products are planned in phases with clear milestones.'
	},
	{
		question: 'How does the process work?',
		answer:
			'We start with a discovery call, then move through strategy, design, development and launch, with regular check-ins at every step.'
	},
	{
		question: 'Do you offer support after launch?',
		answer:
			'Yes. I provide maintenance, updates and improvements after launch so your product keeps performing as you grow.'
	},
	{
		question: 'How can we start working together?',
		answer:
			'Send a message with a few details about your project and I will reply within one business day to schedule a quick call.'
	}
];
