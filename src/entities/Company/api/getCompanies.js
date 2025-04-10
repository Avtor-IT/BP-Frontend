import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

const getCompanies = async () => {
	return await api.Get(apiEndpoints.COMPANIES);
};

export default getCompanies;
