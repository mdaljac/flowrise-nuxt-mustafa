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
		<div class="grid grid-cols-1 place-items-center">
			<div
				class="flex flex-col items-center text-center space-y-4 md:space-y-8">
				<PrismicRichText
					:field="slice.primary.heading"
					class="font-bold text-5xl lg:text-7xl leading-tight" />
				<PrismicRichText
					:field="slice.primary.body"
					class="text-2xl leading-relaxed" />
				<PrismicLink
					:field="slice.primary.button"
					class="bg-primary text-white px-20 py-3 rounded-full font-heading" />
			</div>
			<PrismicImage
				:field="slice.primary.image"
				class="w-full max-w-4xl drop-shadow-xl mt-8 md:mt-10" />
		</div>
	</Bounded>
</template>
