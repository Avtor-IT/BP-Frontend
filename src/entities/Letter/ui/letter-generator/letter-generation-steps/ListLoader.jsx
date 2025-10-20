import { Skeleton, Typography } from '@mui/material';

export const ListLoader = ({ query, skeletonCount = 2, slotProps, render }) => {
	const { data: list, isLoading, isError } = query();

	if (isLoading) {
		return Array.from({ length: skeletonCount }).map((_, i) => (
			<Skeleton
				key={i}
				variant="rounded"
				height={50}
				{...slotProps?.skeleton}
			/>
		));
	}

	if (isError) {
		return <Typography variant="M16">Ошибка при загрузке</Typography>;
	}

	if (!list.length) {
		return (
			<Typography
				variant="M16"
				color="textSecondary"
			>
				Нет сохранённых
			</Typography>
		);
	}

	return render(list);
};
