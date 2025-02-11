<template>
	<Bounded>
		<div class="space-y-6 lg:space-y-16">
			<h1 class="heading heading--h1">Apartments</h1>
			<!-- filters -->
			<div>
				<button
					class="w-full py-1.5 text-sm rounded-md lg:hidden outline outline-1 outline-blue-light"
					:class="
						filtersVisible
							? 'text-blue-light bg-white'
							: 'bg-blue-light text-white'
					"
					@click="filtersVisibleManual = !filtersVisibleManual">
					Filters
				</button>
				<div
					class="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-5"
					v-show="filtersVisible">
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
			</div>
			<div class="pt-6">
				<ul
					class="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-10">
					<li
						v-for="product in products?.results"
						:key="product.id"
						class="group">
						<NuxtLink :to="`/products/${product.uid}`">
							<article
								class="bg-white shadow-lg rounded-lg overflow-hidden h-full">
								<!-- <PrismicImage :field="product.data.gallery[0].image" /> -->
								<div class="overflow-hidden">
									<NuxtImg
										:src="product.data.gallery[0].image.url"
										class="w-full group-hover:scale-105 transition-transform duration-300"
										sizes="100vw md:50vw lg:33vw 2xl:25vw"
										loading="lazy">
									</NuxtImg>
								</div>
								<div class="p-4">
									<span>{{ product.data.address }}</span>
									<h3 class="heading heading--h3">{{ product.data.title }}</h3>
									<p>{{ product.data.description[0].text }}</p>
									<div class="mt-3">
										<span>{{ product.data.price }}</span>
									</div>
								</div>
							</article>
						</NuxtLink>
					</li>
				</ul>
			</div>

			<!-- pagination -->
			<div
				v-if="products?.next_page !== null || products?.prev_page !== null"
				class="flex justify-between border-t border-gray pt-5 lg:pt-0">
				<NuxtLink
					:to="`/products?page=${prevPageNumber}`"
					class="font-bold flex items-center gap-x-3"
					:class="products?.prev_page ? '' : 'pointer-events-none text-gray'"
					><LeftArrow class="w-5" /><span>Prev</span></NuxtLink
				>
				<ul class="hidden lg:flex justify-center gap-10 flex-1 pt-5 relative">
					<li
						v-for="page in products.total_pages"
						:key="page"
						class="before:absolute before:top-0 before:w-10 before:h-0.5 before:bg-blue-light before:opacity-0"
						:class="
							products.page === page ? 'text-blue-light before:opacity-100' : ''
						">
						<NuxtLink :to="`/products?page=${page}`">{{ page }}</NuxtLink>
					</li>
				</ul>
				<NuxtLink
					:to="`/products?page=${nextPageNumber}`"
					class="font-bold flex items-center gap-x-3"
					:class="products?.next_page ? '' : 'pointer-events-none text-gray'"
					><span>Next</span><RightArrow class="w-5"
				/></NuxtLink>
			</div>
		</div>
	</Bounded>
</template>

<script setup lang="ts">
import debounce from "lodash.debounce";
import isEqual from "lodash/isEqual"; // If using isEqual
import type { Filters } from "~~/types/custom-types";

const prismic = usePrismic();
const route = useRoute();

const filtersVisibleManual = ref(false);
const isLg = computed(() => useBreakpoint().greaterOrEqual("lg").value);
const filtersVisible = computed(() => filtersVisibleManual.value || isLg.value);

// 1st version: Add product category and select products for that category
// categories and corresponding products
const { data: categories } = await useAsyncData("product_category", () =>
	prismic.client.getAllByType("product_category", {
		fetch: ["product_category.title", "product_category.products"],
		fetchLinks: "product.title",
	}),
);

const pageNumber = computed<number>(() => {
	const pageQuery = route.query.page;

	if (pageQuery === undefined) {
		return 1; // Default to page 1 if not provided
	}

	const parsedPage = Number(pageQuery);

	if (isNaN(parsedPage) || parsedPage < 1) {
		return 1; // Default to page 1 if parsing fails or page is invalid
	}

	return parsedPage;
});
const pageSize = ref(2);

// 2nd version: Add product and select category for each added product
const { data: products } = await useAsyncData("products", () =>
	prismic.client.getByType("product", {
		fetchLinks: "product_category.title",
		page: pageNumber.value,
		pageSize: pageSize.value,
	}),
);

// const { data: tags } = useAsyncData("tags", () => prismic.client.getTags());

// set initially
const prevPageNumber = ref<number | null>(
	products.value?.page === 1 ? null : products.value?.page - 1,
);
const nextPageNumber = ref<number | null>(
	products.value?.page === products.value?.total_pages
		? null
		: products.value?.page + 1,
);

const filters = reactive({
	// tag: "",
	searchName: "",
	priceMin: null,
	priceMax: null,
});

let previousFilters = { ...filters }; // Initialize previousFilters
let resetPageNumber = false;

watch(
	[filters, pageNumber],
	debounce(async ([newFilters, newPageNumber]: [Filters, number]) => {
		const { searchName, priceMin, priceMax } = newFilters;

		// Compare newFilters with previousFilters
		if (!isEqual(newFilters, previousFilters)) {
			previousFilters = { ...filters };
			resetPageNumber = true;
		}

		const response = await prismic.client.get({
			filters: [
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
			page: resetPageNumber ? 1 : pageNumber.value, // Use the potentially reset pageNumber
			pageSize: pageSize.value,
		});

		products.value = response;
		resetPageNumber = false;

		prevPageNumber.value =
			products.value?.page === 1 ? null : products.value?.page - 1;
		nextPageNumber.value =
			products.value?.page === products.value?.total_pages
				? null
				: products.value?.page + 1;
	}, 500),
);
</script>

<style lang="scss" scoped></style>
