<script setup lang="ts">
import { components } from "~/slices";

const prismic = usePrismic();
const route = useRoute();
const { data: page } = useAsyncData(route.params.uid as string, () =>
	prismic.client.getByUID("page", route.params.uid as string),
);

useSeoMeta({
	title: page.value?.data.meta_title ?? undefined,
	description: page.value?.data.meta_description ?? undefined,
	ogImage: prismic.asImageSrc(page.value?.data.meta_image) ?? undefined,
});
</script>

<template>
	<SliceZone
		wrapper="main"
		:slices="page?.data.slices ?? []"
		:components="components" />
</template>
