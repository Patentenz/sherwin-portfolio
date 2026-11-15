<script lang="ts">
	import Faq from '#lib/components/shared/Faq.svelte';
	import { FAQS } from '#lib/features/public/homepage/content.ts';
</script>

<section class="sec-y" id="faq">
	<div class="wrap">
		<Faq items={FAQS} />
	</div>
</section>
