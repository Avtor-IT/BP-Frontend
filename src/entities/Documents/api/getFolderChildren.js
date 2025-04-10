import { api } from 'shared/api';

const getFolderChildren = async (url) => {
	return await api.Get(url);
};
export default getFolderChildren;
