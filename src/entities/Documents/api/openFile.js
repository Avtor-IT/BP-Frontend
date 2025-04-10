import { api } from 'shared/api';

const OpenFile = async (url, params) => {
	try {
		const object = await api.GetBlob(url, params);

		const objectUrl = URL.createObjectURL(object);
		window.open(objectUrl);
		return;
	} catch (e) {
		throw Error(e.message);
	}
};
export default OpenFile;
