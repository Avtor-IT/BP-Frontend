import { useQuery } from '@tanstack/react-query';

const useLetters = () =>
	useQuery({
		queryKey: ['letters'],
		queryFn: async () => [
			{
				num: '№123/А',
				date: '28.11.2024',
				topic: 'О подписании договора',
				destination: 'ООО "Пример"',
				type: 'formed',
			},
			{
				num: '№123/А',
				date: '28.11.2024',
				topic: 'О подписании договора',
				destination: 'ООО "Пример"',
				type: 'draft',
			},
			{
				num: '№123/А',
				date: '28.11.2024',
				topic: 'О подписании договора',
				destination: 'ООО "Пример"',
				type: 'sent',
			},
			{
				num: '№123/А',
				date: '28.11.2024',
				topic: 'О подписании договора',
				destination: 'ООО "Пример"',
				type: 'draft',
			},
		],
	});

export default useLetters;
