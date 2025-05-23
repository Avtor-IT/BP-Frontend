import { Card, CardContent, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import AddSquareIcon from 'shared/icons/AddSquare';
import { HistoryIcon } from 'shared/icons/History';
import { IconButton } from 'shared/ui/Button';

const CompanyBalanceCard = () => {
	return (
		<Card sx={{ minWidth: '244px' }}>
			<CardContent sx={{ height: '100%', p: 2 }}>
				<Stack
					justifyContent="space-between"
					alignItems="stretch"
					height="100%"
				>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
					>
						<Typography variant="M20">Баланс</Typography>
						<IconButton icon={<AddSquareIcon />} />
					</Stack>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
					>
						<IconButton
							icon={<HistoryIcon stroke="var(--secondary)" />}
						/>
						<Typography variant="R20">7 112 002 ₽</Typography>
					</Stack>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default CompanyBalanceCard;
