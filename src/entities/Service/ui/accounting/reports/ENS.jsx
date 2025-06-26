import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
	Card,
	CardContent,
	CardHeader,
	IconButton,
	Typography,
} from '@mui/material';
import useAccountingReportStore from '../../../model/accounting/accountingReportStore';

const ENS = ({ ...props }) => {
	const clearReport = useAccountingReportStore.use.clearReport();

	return (
		<Card
			{...props}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
				...props.sx,
			}}
		>
			<CardHeader
				title="Сальдо ЕНС"
				action={
					<IconButton onClick={() => clearReport()}>
						<CloseRoundedIcon />
					</IconButton>
				}
			/>

			<CardContent
				sx={{
					flexGrow: 1,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Typography
					color="textSecondary"
					variant="R20"
				>
					Нет ЕНС
				</Typography>
			</CardContent>
		</Card>
	);
};

export default ENS;
