export const useNav = () => {
	const navState = useState("navState", () => false);

	const nuxtApp = useNuxtApp();
	nuxtApp.hook("page:finish", (pageComponent) => {
		// Your code to run after page navigation and mounting
		navState.value = false;
	});

	return {
		navState,
	};
};
