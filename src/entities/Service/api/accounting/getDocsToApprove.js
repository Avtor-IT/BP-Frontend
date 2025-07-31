import { useQuery } from '@tanstack/react-query';

const getDocsToApprove = async () => {
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

const useDocsToApprove = () =>
	useQuery({
		queryFn: getDocsToApprove,
		queryKey: ['accounting', 'docs to approve'],
	});

export default useDocsToApprove;
