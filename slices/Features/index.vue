<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { Calendar, Bargraph, Clover, Hourglass } from "#components";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
	getSliceComponentProps<Content.FeaturesSlice>([
		"slice",
		"index",
		"slices",
		"context",
	]),
);

const getIconComponent = (name: string) => {
	if (name === "Calendar") return Calendar;
	else if (name === "Bargraph") return Bargraph;
	else if (name === "Clover") return Clover;
	else return Hourglass;
};
</script>

<template>
	<Bounded
		:data-slice-type="slice.slice_type"
		:data-slice-variation="slice.variation">
		<PrismicRichText
			:field="slice.primary.heading"
			class="heading heading--h2 text-center mb-10 lg:mb-16" />
		<div>
			<ul class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
				<li v-for="item in slice.primary.features" class="space-y-4">
					<Component :is="getIconComponent(item.icon)" />
					<PrismicRichText :field="item.title" class="heading heading--h3" />
					<PrismicRichText :field="item.description" class="leading-loose" />
				</li>
			</ul>
		</div>
	</Bounded>
</template>
