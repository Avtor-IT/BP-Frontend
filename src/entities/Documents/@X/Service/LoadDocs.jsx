import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useMaxWidth } from 'shared/model';
import { createAdditioinalSx } from 'shared/mui';
import { Skeleton } from 'shared/mui/Skeleton';

const LoadDocs = ({
	cardTitle,
	query,
	description,
	renderDocs,
	slotProps,
	...props
}) => {
	const { data, isLoading, isError } = query();
	const breakpoints = useMaxWidth();

	const cardSx = {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
	};

	const cardContentSx = {
		flexGrow: 1,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	};

	if (isLoading) {
		return (
			<Card
				{...props}
				sx={createAdditioinalSx(cardSx, props.sx)}
			>
				<CardHeader
					{...slotProps?.title}
					title={cardTitle}
				/>

				<CardContent
					{...slotProps?.content}
					sx={createAdditioinalSx(
						cardContentSx,
						slotProps?.content?.sx
					)}
				>
					<Skeleton
						width="100%"
						variant="rounded"
						height="90px"
					/>
				</CardContent>
			</Card>
		);
	}

	if (isError) {
		return (
			<Card
				{...props}
				sx={createAdditioinalSx(cardSx, props.sx)}
			>
				<CardHeader
					{...slotProps?.title}
					title={cardTitle}
				/>

				<CardContent
					{...slotProps?.content}
					sx={createAdditioinalSx(
						cardContentSx,
						slotProps?.content?.sx
					)}
				>
					<Typography
						color="tertiary"
						variant={breakpoints.md ? 'R16' : 'R20'}
						sx={{
							display: 'block',
						}}
					>
						{description?.error || 'Ошибка при загрузке документов'}
					</Typography>
				</CardContent>
			</Card>
		);
	}

	if (data?.lenght === 0) {
		return (
			<Card
				{...props}
				sx={createAdditioinalSx(cardSx, props.sx)}
			>
				<CardHeader
					{...slotProps?.title}
					title={cardTitle}
				/>

				<CardContent
					{...slotProps?.content}
					sx={createAdditioinalSx(
						cardContentSx,
						slotProps?.content?.sx
					)}
				>
					<Typography
						color="tertiary"
						variant={breakpoints.md ? 'R16' : 'R20'}
						sx={{
							display: 'block',
						}}
					>
						{description?.empty || 'Документов нет'}
					</Typography>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card
			{...props}
			sx={createAdditioinalSx(
				{ display: 'flex', flexDirection: 'column', height: '100%' },
				props.sx
			)}
		>
			<CardHeader
				{...slotProps?.title}
				title={cardTitle}
			/>

			<CardContent
				{...slotProps?.content}
				sx={createAdditioinalSx(cardContentSx, slotProps?.content?.sx)}
			>
				{renderDocs(data)}
			</CardContent>
		</Card>
	);
};

export default LoadDocs;
