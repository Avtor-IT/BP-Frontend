import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Skeleton,
	Typography,
} from '@mui/material';

import { Box, useMediaQuery, useTheme } from '@mui/system';
import { DownloadFile } from 'shared/icons/DownloadFile';

const BillActionCard = ({ bill, loading, ...props }) => {
	const theme = useTheme();
	const downXxl = useMediaQuery(theme.breakpoints.down('xxl'));
	const downXxxl = useMediaQuery(theme.breakpoints.down('xxxl'));
	const downXl = useMediaQuery(theme.breakpoints.down('xl'));

	if (loading) {
		return (
			<Skeleton
				height={248}
				variant="rounded"
				{...props}
			/>
		);
	}

	return (
		<Card
			{...props}
			sx={{
				flexDirection: downXxl && 'row',
				justifyContent: 'space-between',
				paddingBlock: '16px',
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
					whiteSpace: downXxl ? 'nowrap' : undefined,
					paddingRight: 0,
				}}
			/>
			<CardContent
				sx={{
					paddingTop: 2,
					paddingBottom: downXxl ? 2 : 3,
					padding: downXl ? 0 : undefined,
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
				sx={{ paddingTop: 0, paddingLeft: downXxl ? 0 : undefined }}
			>
				<Button
					fullWidth
					color="secondary"
					variant="card"
					startIcon={<DownloadFile color="secondary" />}
					sx={{ borderRadius: 2 }}
				>
					<Typography
						variant={downXxxl ? 'M16' : 'M20'}
						whiteSpace={downXl && 'nowrap'}
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
