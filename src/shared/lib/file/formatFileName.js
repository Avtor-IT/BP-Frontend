export const formatFileName = (name, maxBaseLength = 50) => {
	if (typeof name !== 'string') return '';

	const trimmedName = name.trim();
	if (!trimmedName) return '';

	const lastDotIndex = trimmedName.lastIndexOf('.');
	const hasExtension =
		lastDotIndex > 0 && lastDotIndex < trimmedName.length - 1;
	const baseName = hasExtension
		? trimmedName.slice(0, lastDotIndex)
		: trimmedName;
	const extension = hasExtension ? trimmedName.slice(lastDotIndex + 1) : '';

	if (baseName.length <= maxBaseLength) return trimmedName;

	return hasExtension
		? `${baseName.slice(0, maxBaseLength)}...${extension}`
		: `${baseName.slice(0, maxBaseLength)}...`;
};
