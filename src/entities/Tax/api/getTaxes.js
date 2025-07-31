import { useQuery } from '@tanstack/react-query';

const getTaxes = async () => {
	return [
		{
			id: 1,
			name: 'НДФЛ',
			amount: 100000,
			dueDate: '10.12.2024',
		},
		{
			id: 2,
			name: 'Страховые взносы',
			amount: 110111,
			dueDate: '10.12.2024',
		},
		{
			id: 3,
			name: 'УСН',
			amount: 110111,
			dueDate: '10.12.2024',
		},
		{
			id: 4,
			name: 'Страхование от несчатных случаев',
			amount: 110111,
			dueDate: '10.12.2024',
		},
		{
			id: 5,
			name: 'УСН',
			amount: 110111,
			dueDate: '10.12.2024',
		},
		{
			id: 6,
			name: 'УСН',
			amount: 110111,
			dueDate: '10.12.2024',
		},
		{
			id: 7,
			name: 'УСН',
			amount: 110111,
			dueDate: '10.12.2024',
		},
		{
			id: 8,
			name: 'УСН',
			amount: 110111,
			dueDate: '10.12.2024',
		},
		{
			id: 9,
			name: 'УСН',
			amount: 110111,
			dueDate: '10.12.2024',
		},
		{
			id: 10,
			name: 'УСН',
			amount: 110111,
			dueDate: '10.12.2024',
		},
		{
			id: 11,
			name: 'УСН',
			amount: 110111,
			dueDate: '10.12.2024',
		},
	];
};

const useTaxes = () => useQuery({ queryKey: ['taxes'], queryFn: getTaxes });

export default useTaxes;
