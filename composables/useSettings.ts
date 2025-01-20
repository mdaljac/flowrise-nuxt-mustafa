export const useSettings = async () => {
	const prismic = usePrismic();

	const { data: settings } = await useAsyncData("$settings", () => {
		return prismic.client.getSingle("settings");
	});

	return settings;
};
