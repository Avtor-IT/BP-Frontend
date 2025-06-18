import { Box, Button, IconButton, Typography } from '@mui/material';
import { RefreshIcon } from 'shared/icons/Refresh';
import { useMaxWidth } from 'shared/model';

const TaxRefreshButton = () => {
	const breakpoints = useMaxWidth();

	if (breakpoints.lg) {
		return (
			<IconButton color="primary">
				<RefreshIcon />
			</IconButton>
		);
	}

	if (breakpoints.xxxl) {
		return (
			<Button
				variant="unstyled"
				sx={{
					flexDirection: breakpoints.xxl ? 'row' : 'column-reverse',
					justifyContent: breakpoints.xxl ? 'start' : undefined,
					alignItems: 'end',
					gap: breakpoints.xxl ? 2 : 1,
					color: breakpoints.xl ? 'primary.main' : 'tertiary.main',
				}}
			>
				<Typography
					variant="M16"
					textAlign={breakpoints.xxl ? 'start' : 'end'}
					sx={{ maxWidth: 105 }}
				>
					Запрос на обновление
				</Typography>
				<RefreshIcon />
			</Button>
		);
	}

	return (
		<Button
			variant="unstyled"
			sx={{
				color: 'tertiary.main',
			}}
			endIcon={
				<Box sx={{ p: 0.5 }}>
					<RefreshIcon />
				</Box>
			}
		>
			<Typography variant="M16">Запрос на обновление</Typography>
		</Button>
	);
};

export default TaxRefreshButton;
