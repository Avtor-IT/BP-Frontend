import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Skeleton,
	Stack,
	Typography,
} from '@mui/material';

import { Box } from '@mui/system';
import { DownloadFile } from 'shared/icons/DownloadFile';
import { useMaxWidth } from 'shared/model';

const BillActionCard = ({ loading, ...props }) => {
	const breakpoints = useMaxWidth();

	if (loading) {
		return (
			<Skeleton
				height={248}
				variant="rounded"
				{...props}
			/>
		);
	}

	if (breakpoints.lg) {
		return (
			<Stack
				{...props}
				alignItems="center"
				marginTop={3}
				gap={2}
			>
				<Typography
					variant="M16"
					color="tertiary"
				>
					Услуга завершена
				</Typography>

				<Stack
					direction={breakpoints.md ? 'column' : 'row'}
					justifyContent="space-between"
					width="100%"
					gap={breakpoints.md ? 3 : 0}
				>
					<Typography
						variant="R16"
						sx={{
							maxWidth: 176,
							borderLeft: '2px solid',
							borderColor: 'tertiary.main',
							color: 'tertiary.main',
							paddingLeft: 1,
						}}
					>
						Все этапы успешно завершены.
					</Typography>

					<Button
						color="secondary"
						variant="card"
						startIcon={<DownloadFile color="secondary" />}
						sx={{
							borderRadius: 2,
							paddingBlock: 1,
						}}
					>
						<Typography
							variant="M16"
							whiteSpace="nowrap"
							color="secondary"
						>
							Оставить отзыв
						</Typography>
					</Button>
				</Stack>
			</Stack>
		);
	}

	return (
		<Card
			sx={{
				flexDirection: breakpoints.xxl ? 'row' : 'column',
				justifyContent: 'space-between',
				paddingBlock: 2,
				marginTop: breakpoints.xxl ? 2 : undefined,
				...props.sx,
			}}
		>
			<CardHeader
				title="Услуга завершена"
				slotProps={{
					title: {
						color: 'tertiary.main',
						variant: 'M24',
					},
				}}
				sx={{
					paddingBottom: 0,
					whiteSpace: breakpoints.xxl ? 'nowrap' : undefined,
					paddingRight: 0,
				}}
			/>
			<CardContent
				sx={{
					paddingTop: 2,
					paddingBottom: breakpoints.xxl ? 2 : 3,
					padding: breakpoints.xl ? 0 : undefined,
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<Box
					sx={{
						paddingLeft: 1,
						borderLeft: '2px solid',
						borderColor: 'tertiary.main',
					}}
				>
					Все этапы успешно завершены.
				</Box>
			</CardContent>
			<CardActions
				sx={{
					paddingTop: 0,
					paddingLeft: breakpoints.xxl ? 0 : undefined,
				}}
			>
				<Button
					fullWidth
					color="secondary"
					variant="card"
					startIcon={<DownloadFile color="secondary" />}
					sx={{ borderRadius: 2 }}
				>
					<Typography
						variant={breakpoints.xxxl ? 'M16' : 'M20'}
						whiteSpace={breakpoints.xl ? 'nowrap' : undefined}
						color="secondary"
					>
						Оставить отзыв
					</Typography>
				</Button>
			</CardActions>
		</Card>
	);
};

export default BillActionCard;
