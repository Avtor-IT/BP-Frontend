import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

export const KEY = apiEndpoints.GET_DEPARTMENT;

const getDepartment = async (id) => {
	return api.Get(apiEndpoints.GET_DEPARTMENT, { params: { id } });
};

export const useDepartmentById = (id) =>
	useQuery({
		queryFn: () => getDepartment(id),
		queryKey: [KEY, id],
		staleTime: Infinity,
		enabled: Boolean(id),
	});
