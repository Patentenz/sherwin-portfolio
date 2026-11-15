<script lang="ts">
	import Homepage from '#lib/features/public/homepage/Homepage.svelte';
	import { APP_NAME, APP_TAGLINE } from '#lib/constants/app.ts';
</script>

<svelte:head>
	<title>{APP_NAME} | {APP_TAGLINE}</title>
	<meta
		name="description"
		content="Portfolio of {APP_NAME}: UI/UX design, development, branding and marketing for businesses that want to stand out."
	/>
</svelte:head>

<Homepage />
