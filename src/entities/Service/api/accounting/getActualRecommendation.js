import { useQuery } from '@tanstack/react-query';

const getActualRecommendation = async () => {
	return {
		description:
			'Не забудьте уплатить НДФЛ за сотрудников до 15-го числа следующего месяца. Несвоевременная уплата налога влечет за собой начисление пеней. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper posuere tristique. Quisque pretium eros nisl, sit amet consequat justo hendrerit a. Donec venenatis eros a mollis euismod. Nam aliquet ipsum dui, et pellentesque libero placerat sed. Phasellus vel urna sit amet ante commodo euismod ac semper erat. Aenean vitae elementum magna. Cras vitae orci dignissim, egestas justo id, sagittis nisi. Fusce non molestie lacus. Donec eu rutrum arcu. Duis viverra mauris et dui accumsan, vel lacinia nisl aliquam. Aenean non sollicitudin tortor. Integer ut ipsum eu enim mollis varius. Aenean pulvinar, odio in rhoncus sagittis, lacus velit lobortis turpis, at tristique ex elit placerat metus. Proin egestas non enim eu auctor. Maecenas pulvinar aliquam ex ac consequat. Maecenas ut eros sodales, malesuada erat quis, auctor erat. Duis finibus neque molestie, finibus neque at, tristique lorem. Proin elementum condimentum auctor. Vivamus laoreet urna molestie tempus ullamcorper. Fusce ligula dolor, suscipit et sem ac, ultricies mattis augue.',
	};
};

export const useActualRecommendation = () =>
	useQuery({
		queryFn: getActualRecommendation,
		queryKey: ['actual rec acc'],
		staleTime: Infinity,
	});
