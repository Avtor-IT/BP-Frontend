import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

const getUserServices = async () => {
	try {
		return await api.Get(apiEndpoints.USER_SERVICES);
	} catch (e) {
		throw Error('Ошибка загрузки услуг: ' + e.message);
	}
};

export default getUserServices;
