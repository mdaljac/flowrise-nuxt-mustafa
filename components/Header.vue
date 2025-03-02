<template>
	<Bounded as="header">
		<div class="flex items-center justify-between flex-col sm:flex-row">
			<div
				class="flex items-center justify-between w-full md:w-auto z-50 md:z-auto">
				<nuxt-link to="/">
					<Logo />
				</nuxt-link>
				<div class="md:hidden" @click="navState = !navState">
					<span>nav</span>
				</div>
			</div>
			<div
				class="fixed top-0 left-0 right-0 w-dvw h-dvh z-40 bg-white flex items-center justify-center transition-transform md:relative md:top-auto md:right-auto md:w-auto md:h-auto md:bg-transparent md:z-auto md:translate-x-0"
				:class="{ 'translate-x-full': !navState }">
				<nav>
					<ul
						class="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">
						<li
							v-for="link in settings?.data.navigation[0]?.link"
							:key="link.key">
							<PrismicLink :field="link" />
						</li>
						<li>
							<NuxtLink to="/products">Products</NuxtLink>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</Bounded>
</template>

<script setup lang="ts">
const settings = await useSettings();
const { navState } = useNav();
</script>

<style lang="scss" scoped></style>
