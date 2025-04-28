import { useQuery } from '@tanstack/react-query';

export const useBills = () =>
	useQuery({
		queryFn: async () => [
			{
				id: 1,
				serviceName: 'Название услуги',
				sum: 25500,
				date: '26.11.2024',
				status: 'needToPay',
				category: 'Бухгалтерия',
			},
			{
				id: 2,
				serviceName: 'Название услуги',
				sum: 25500,
				date: '26.11.2024',
				status: 'paid',
				category: 'Бухгалтерия',
			},
			{
				id: 4,
				serviceName: 'Название услуги',
				sum: 25500,
				date: '26.11.2024',
				status: 'completed',
				category: 'Бухгалтерия',
			},
			{
				id: 3,
				serviceName: 'Название услуги',
				sum: 25500,
				date: '26.11.2024',
				status: 'proccessing',
				category: 'Бухгалтерия',
			},
		],
		queryKey: ['bills'],
	});
