<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
	getSliceComponentProps<Content.HeroSlice>([
		"slice",
		"index",
		"slices",
		"context",
	]),
);
</script>

<template>
	<Bounded
		:data-slice-type="slice.slice_type"
		:data-slice-variation="slice.variation">
		<div
			class="grid grid-cols-1 place-items-center gap-y-8 md:gap-y-10"
			:class="{ 'md:grid-cols-2 gap-x-16': slice.variation === 'horizontal' }">
			<div
				class="flex flex-col space-y-4 md:space-y-8"
				:class="
					slice.variation === 'horizontal'
						? 'items-start order-2 md:order-none'
						: 'items-center text-center'
				">
				<PrismicRichText
					:field="slice.primary.heading"
					class="heading heading--h1" />
				<PrismicRichText
					:field="slice.primary.body"
					class="body-large max-w-xl" />
				<PrismicLink :field="slice.primary.button" class="btn btn--primary" />
			</div>
			<PrismicImage
				:field="slice.primary.image"
				class="w-full max-w-4xl drop-shadow-xl"
				:class="{ 'rounded-2xl': slice.variation === 'horizontal' }" />
		</div>
	</Bounded>
</template>
