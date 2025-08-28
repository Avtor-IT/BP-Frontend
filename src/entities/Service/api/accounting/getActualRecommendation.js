import { useQuery } from '@tanstack/react-query';

const getActualRecommendation = async () => {
	return {
		description:
			'Не забудьте уплатить НДФЛ за сотрудников до 15-го числа следующего месяца. Несвоевременная уплата налога влечет за собой начисление пеней',
	};
};

export const useActualRecommendation = () =>
	useQuery({
		queryFn: getActualRecommendation,
		queryKey: ['actual rec acc'],
		staleTime: Infinity,
	});
