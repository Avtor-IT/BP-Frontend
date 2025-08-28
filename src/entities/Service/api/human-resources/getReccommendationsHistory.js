import { useQuery } from '@tanstack/react-query';

const getRecommendationsHistory = async () => {
	return [
		{
			description:
				'Не забудьте уплатить НДФЛ за сотрудников до 15-го числа следующего месяца. Несвоевременная уплата налога влечет за собой начисление пеней',
			date: Date.now(),
		},
		{
			description:
				'Не забудьте уплатить НДФЛ за сотрудников до 15-го числа следующего месяца. Несвоевременная уплата налога влечет за собой начисление пеней',
			date: Date.now(),
		},
		{
			description:
				'Не забудьте уплатить НДФЛ за сотрудников до 15-го числа следующего месяца. Несвоевременная уплата налога влечет за собой начисление пеней',
			date: Date.now(),
		},
		{
			description:
				'Не забудьте уплатить НДФЛ за сотрудников до 15-го числа следующего месяца. Несвоевременная уплата налога влечет за собой начисление пеней',
			date: Date.now(),
		},
	];
};

export const useRecommendationsHistory = () =>
	useQuery({
		queryFn: getRecommendationsHistory,
		queryKey: ['rec history hr'],
		staleTime: Infinity,
	});
