<template>
	<Component :is="as" :class="[paddingClass]">
		<div class="container">
			<slot />
		</div>
	</Component>
</template>

<script setup>
const props = defineProps({
	as: {
		type: String,
		default: "section",
	},
});

const paddingClass = computed(() => {
	return props.as === "header" || props.as === "footer"
		? "py-4 sm:py-6 lg:py-8"
		: "py-10 md:py-14 lg:py-16";
});
</script>

<style lang="scss" scoped></style>
