import useMaxWidth from './useMaxWidth';

const BreakpointedComponent = ({ components, componentProps }) => {
	const breakpoints = useMaxWidth();

	for (let [breakpoint, isActive] of Object.entries(breakpoints)) {
		if (isActive && components[breakpoint]) {
			const Component = components[breakpoint];
			return <Component {...componentProps} />;
		}
	}

	const DefaultComponent = components.default;
	return DefaultComponent ? <DefaultComponent {...componentProps} /> : null;
};

export default BreakpointedComponent;
