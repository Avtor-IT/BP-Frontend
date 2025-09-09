import { useQuery } from '@tanstack/react-query';
import getCompanyDocuments from '../api/getCompanyDocuments';
import { apiEndpoints } from 'shared/model';

const useCompanyDocuments = () =>
	useQuery({
		queryKey: [apiEndpoints.DOCUMENTS, 'company'],
		queryFn: getCompanyDocuments,
		select: (data) => data.documents,
		retry: false,
	});

export default useCompanyDocuments;
