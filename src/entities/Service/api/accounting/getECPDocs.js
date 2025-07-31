import { useQuery } from '@tanstack/react-query';

const getECPDocs = async () => {
	return [
		{
			id: 1,
			name: 'Документ 1',
			status: 'Ожидает подписания',
		},
		{
			id: 2,
			name: 'Документ 1',
			status: 'Подписан',
		},
		{
			id: 3,
			name: 'Документ 1',
			status: 'В обработке',
		},
	];
};

const useECPDocs = () =>
	useQuery({
		queryFn: getECPDocs,
		queryKey: ['accounting', 'ECP docs'],
	});

export default useECPDocs;
