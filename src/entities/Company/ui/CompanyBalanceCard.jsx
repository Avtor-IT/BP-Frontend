import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import AddSquareIcon from 'shared/icons/AddSquare';
import { HistoryIcon } from 'shared/icons/History';
import { useMaxWidth } from 'shared/model';
import { createAdditioinalSx } from 'shared/mui';
import { IconButton } from 'shared/ui/Button';

const CompanyBalanceCard = (props) => {
	const breakpoints = useMaxWidth();

	return (
		<Card
			{...props}
			sx={createAdditioinalSx(
				{
					minWidth: breakpoints.xxl ? 212 : 244,
					paddingBlock: 2,
				},
				props.sx
			)}
		>
			<CardHeader
				title="Баланс"
				action={<IconButton icon={<AddSquareIcon />} />}
				slotProps={{ title: { variant: 'M20' } }}
				sx={{ paddingInline: 2 }}
			/>
			<CardContent
				sx={{
					height: '100%',
					display: 'flex',
					alignItems: 'end',
					paddingInline: 2,
				}}
			>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					flexGrow={1}
				>
					<HistoryIcon />
					<Typography variant="R20">7 112 002 ₽</Typography>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default CompanyBalanceCard;
