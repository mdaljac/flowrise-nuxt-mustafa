<template>
	<div class="font-body text-body">
		<Header />
		<slot />
		<Footer />
		<div
			class="fixed inset-0 bg-gradient-to-tr from-emerald-50 to-cyan-50 opacity-50 -z-10"></div>
	</div>
</template>

<script setup lang="ts">
const settings = await useSettings();
const { asImageSrc } = usePrismic();

useSeoMeta({
	title: settings.value?.data.site_title,
	description: settings.value?.data.meta_description,
	ogImage: asImageSrc(settings.value?.data.og_image),
});
</script>

<style lang="scss" scoped></style>
