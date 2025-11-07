import getBlob from '../api/getBlob';
import { useQuery } from '@tanstack/react-query';

const useGetBlob = (documentUrl) =>
	useQuery({
		queryFn: async () => await getBlob(documentUrl),
		queryKey: ['blob', documentUrl],
		staleTime: Infinity,
		retry: false,
		enabled: Boolean(documentUrl),
	});

export default useGetBlob;
