<script setup lang="ts">
import { components } from "~/slices";

const prismic = usePrismic();
const { data: page } = await useAsyncData("index", () =>
	prismic.client.getSingle("homepage", {
		fetchLinks: [
			"product.title",
			"product.slug",
			"product.address",
			"product.price",
			"product.gallery",
			"product.description",
		],
	}),
);

console.log(page.value?.data);

useSeoMeta({
	title: page.value?.data.meta_title ?? undefined,
	description: page.value?.data.meta_description ?? undefined,
	ogImage: prismic.asImageSrc(page.value?.data.meta_image) ?? undefined,
});
</script>

<template>
	<!-- <SliceZone
		wrapper="main"
		:slices="page?.data.slices ?? []"
		:components="components" /> -->
	<section
		class="min-h-[75dvh] bg-blue-900 text-white flex items-center justify-center _has-pattern relative py-16">
		<div class="container">
			<!-- image -->
			<div class="h-1/2 max-h-[500px] lg:h-full lg:max-h-full overflow-hidden">
				<NuxtImg
					:src="page?.data.hero_image.url"
					:alt="page?.data.hero_image?.alt"
					fit="cover"
					class="w-full h-full lg:absolute lg:top-0 lg:right-0 lg:w-2/5" />
			</div>
			<!-- text -->
			<div class="max-w-xl space-y-6 mt-10 lg:mt-0">
				<h1 class="text-3xl lg:text-5xl">{{ page?.data.hero_title }}</h1>
				<p class="text-sm lg:text-xl">{{ page?.data.hero_description }}</p>
				<div
					class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
					<PrismicLink
						v-for="link in page?.data.hero_buttons"
						:key="link.key"
						:field="link"
						class="btn"
						:class="link.variant" />
				</div>
			</div>
		</div>
	</section>

	<!-- products -->
	<Bounded>
		<ul
			class="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-10">
			<li v-for="{ item } in page?.data.products" :key="item.id" class="group">
				<Product :item="item" />
			</li>
		</ul>
	</Bounded>
</template>
