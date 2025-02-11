import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
const breakpoints = useBreakpoints(breakpointsTailwind);

// const current = breakpoints.current();
// const active = breakpoints.active();
// const lgAndLarger = breakpoints.greaterOrEqual("lg");
// const smAndLarger = breakpoints.greaterOrEqual("sm"); // sm and larger
// const largerThanSm = breakpoints.greater("sm"); // only larger than sm
// const lgAndSmaller = breakpoints.smallerOrEqual("lg"); // lg and smaller
// const smallerThanLg = breakpoints.smaller("lg"); // only smaller than lg

export const useBreakpoint = () => {
	return breakpoints;
};
