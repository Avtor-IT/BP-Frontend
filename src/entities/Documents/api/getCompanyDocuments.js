import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

const getCompanyDocuments = async () => {
	try {
		return await api.Get(apiEndpoints.DOCUMENTS);
	} catch (e) {
		if (
			e?.message === 'No documents found in the company folder.' ||
			e?.message === 'Folder ID not found in company data.'
		) {
			return { documents: [] };
		}
		throw Error('Ошибка получения документов: ' + e.message);
	}
};

export default getCompanyDocuments;
