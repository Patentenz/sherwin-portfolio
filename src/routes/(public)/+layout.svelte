<script lang="ts">
	import Nav from '#lib/features/public/layout/Nav.svelte';
	import Footer from '#lib/features/public/layout/Footer.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<Nav />
<main>
	{@render children()}
</main>
<Footer />
