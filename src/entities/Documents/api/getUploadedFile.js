import { useQueries } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

const getUploadedFile = async (id) => {
	return api.Get(apiEndpoints.GET_UPLOADED_FILE, {
		urlParams: { file_id: id },
	});
};

export const useUploadedFiles = (ids) =>
	useQueries({
		queries: ids.map((id) => ({
			queryKey: ['uploadedFile', id],
			queryFn: () => getUploadedFile(id),
			staleTime: Infinity,
			retry: false,
			retryOnMount: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		})),
	});
