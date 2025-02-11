module.exports = {
	content: ["./slices/**/*.{js,ts,vue}"],
	theme: {
		container: {
			center: true,
			padding: "1rem",
		},
		fontFamily: {
			body: ["Nunito Sans Variable", "sans-serif"],
			heading: ["Nunito Variable", "sans-serif"],
		},
		extend: {
			colors: {
				primary: "#0E7490",
				"primary-hover": "#0c6179",
				body: "#334155",
				gray: "#D2D6DC",
				blue: {
					light: "#6AA6D7",
					dark: "#39539E",
				},
			},
		},
	},
};
