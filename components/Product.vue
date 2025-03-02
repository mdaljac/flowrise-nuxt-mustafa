<template>
	<NuxtLink :to="`/products/${item.uid}`">
		<article class="bg-white shadow-lg rounded-lg overflow-hidden h-full">
			<div class="overflow-hidden">
				<NuxtImg
					:src="item.data.gallery[0]?.image.url"
					class="w-full group-hover:scale-105 transition-transform duration-300"
					sizes="100vw md:50vw lg:33vw 2xl:25vw"
					loading="lazy">
				</NuxtImg>
			</div>
			<div class="p-4">
				<span>{{ item.data.address }}</span>
				<h3 class="heading heading--h3">{{ item.data.title }}</h3>
				<p>{{ item.data.description[0]?.text }}</p>
				<div class="mt-3">
					<span>{{ item.data.price }}</span>
				</div>
			</div>
		</article>
	</NuxtLink>
</template>

<script setup>
defineProps({
	item: Object,
});
</script>

<style lang="scss" scoped></style>
