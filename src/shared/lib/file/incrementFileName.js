export const incrementFileName = (fileName) => {
	const dotIndex = fileName.lastIndexOf('.');
	const hasExtension = dotIndex > 0;

	const extension = hasExtension ? fileName.slice(dotIndex) : '';
	const fileBaseName = hasExtension ? fileName.slice(0, dotIndex) : fileName;

	const match = fileBaseName.match(/^(.*)\((\d+)\)$/);

	if (!match) {
		return `${fileBaseName}(1)${extension}`;
	}

	const [, baseName, index] = match;

	return `${baseName}(${Number(index) + 1})${extension}`;
};
