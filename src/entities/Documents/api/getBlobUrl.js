import { api } from 'shared/api';

const getBlobUrl = async (url, params) => {
	try {
		const blob = await api.GetBlob(url, params);

		return URL.createObjectURL(blob);
	} catch (e) {
		throw Error(e.message);
	}
};
export default getBlobUrl;
