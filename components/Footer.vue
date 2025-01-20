<template>
	<Bounded as="footer" class="bg-white">
		<div class="flex items-center justify-between flex-col sm:flex-row">
			<nuxt-link to="/">
				<Logo />
			</nuxt-link>
			<span
				>&copy; {{ new Date().getFullYear() }}
				{{ settings.data.site_title }}</span
			>
			<nav>
				<ul class="flex space-x-5">
					<li v-for="link in settings.data.navigation[0].link" :key="link.key">
						<a :href="link.url" :target="link.target">{{ link.text }}</a>
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
