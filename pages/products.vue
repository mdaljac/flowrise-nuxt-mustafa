<template>
	<Bounded>
		<div class="space-y-6 lg:space-y-16">
			<h1 class="heading heading--h1">Apartments</h1>

			<!-- filters -->
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<!-- search products by name -->
				<div class="flex flex-col space-y-2">
					<label for="search">Search apartments by location</label>
					<input
						type="text"
						name="search"
						id="search"
						class="border-gray border outline-none rounded-md p-2"
						v-model="filters.searchName"
						placeholder="enter location" />
				</div>
				<!-- search by price min/max -->
				<div class="space-y-2">
					<span>Price</span>
					<div class="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-6">
						<input
							v-model="filters.priceMin"
							type="number"
							min="1000"
							step="100"
							placeholder="Minimum price"
							class="border-gray border outline-none rounded-md p-2" />
						<input
							v-model="filters.priceMax"
							type="number"
							min="1000"
							step="100"
							placeholder="Maximum price"
							class="border-gray border outline-none rounded-md p-2" />
					</div>
				</div>
			</div>
			<div class="pt-6">
				<ul class="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
					<li v-for="product in filteredProducts" :key="product.id">
						<article>
							<span>{{ product.data.address }}</span>
							<h3 class="heading heading--h3">{{ product.data.title }}</h3>
							<p>{{ product.data.description[0].text }}</p>
							<div class="mt-3">
								<span>{{ product.data.price }}</span>
							</div>
						</article>
					</li>
				</ul>
			</div>
		</div>
	</Bounded>
</template>

<script setup lang="ts">
import debounce from "lodash.debounce";

const prismic = usePrismic();

// 1st version: Add product category and select products for that category
// categories and corresponding products
const { data: categories } = await useAsyncData("product_category", () =>
	prismic.client.getAllByType("product_category", {
		fetch: ["product_category.title", "product_category.products"],
		fetchLinks: "product.title",
	}),
);

console.log(categories.value);

// 2nd version: Add product and select category for each added product
const { data: products } = await useAsyncData("products", () =>
	prismic.client.getAllByType("product", {
		fetchLinks: "product_category.title",
	}),
);
// const { data: tags } = useAsyncData("tags", () => prismic.client.getTags());

const filters = reactive({
	// tag: "",
	searchName: "",
	priceMin: null,
	priceMax: null,
});
const filteredProducts = ref(products.value);

watch(
	filters,
	debounce(async (newFilters: object, oldFilters: object) => {
		const { searchName, priceMin, priceMax } = newFilters;

		if (searchName === "" && priceMin === null && priceMax === null) {
			filteredProducts.value = products.value;
		} else {
			const { results } = await prismic.client.get({
				filters: [
					// prismic.filter.at("document.tags", [tag]),
					prismic.filter.fulltext("my.product.address", searchName),
					prismic.filter.numberGreaterThan(
						"my.product.price",
						priceMin ? priceMin - 1 : 1000,
					),
					prismic.filter.numberLessThan(
						"my.product.price",
						priceMax ? priceMax + 1 : 100000000,
					),
				],
			});

			filteredProducts.value = results;
		}
	}, 500),
);
</script>

<style lang="scss" scoped></style>
