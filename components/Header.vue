<template>
	<Bounded as="header">
		<div class="flex items-center justify-between flex-col sm:flex-row">
			<nuxt-link to="/">
				<Logo />
			</nuxt-link>
			<nav>
				<ul class="flex space-x-5">
					<li v-for="link in settings.data.navigation[0].link" :key="link.key">
						<PrismicLink :field="link" />
					</li>
					<li>
						<NuxtLink to="/products">Products</NuxtLink>
					</li>
				</ul>
			</nav>
		</div>
	</Bounded>
</template>

<script setup>
const settings = await useSettings();
</script>

<style lang="scss" scoped></style>
