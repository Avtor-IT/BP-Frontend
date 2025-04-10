import { api } from 'shared/api';

const getBlobUrl = async (url) => {
	try {
		return await api.GetBlob(url);
	} catch (e) {
		throw Error(e.message);
	}
};
export default getBlobUrl;
