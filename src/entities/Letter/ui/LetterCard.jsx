import {
	Card,
	CardContent,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import { CheckSquareIcon } from 'shared/icons/CheckSquare';
import { EditSquareIcon } from 'shared/icons/EditSqueare';
import ImportIcon from 'shared/icons/Import';
import { useMaxWidth } from 'shared/model';

const iconSx = {
	position: 'absolute',
	top: 8,
	right: '50%',
	transform: 'translateX(50%)',
};

const getTypeTitle = (type) => {
	switch (type) {
		case 'draft':
			return (
				<Typography
					variant="M20"
					color="warning.main"
				>
					Черновик
				</Typography>
			);
		case 'formed':
			return (
				<Typography
					variant="M20"
					color="success.main"
				>
					Сформировано
				</Typography>
			);
		case 'sent':
			return (
				<Typography
					variant="M20"
					color="success.main"
				>
					Отправлено
				</Typography>
			);
	}
};

const LetterCard = ({ letter, ...props }) => {
	const breakpoints = useMaxWidth();

	return (
		<Card
			{...props}
			sx={{
				color: 'tertiary.dark',
				position: 'relative',
				...props.sx,
			}}
		>
			{letter.type === 'draft' ? (
				<EditSquareIcon
					color="warning"
					sx={iconSx}
				/>
			) : (
				<CheckSquareIcon
					color="success"
					sx={iconSx}
				/>
			)}

			<CardContent
				sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
			>
				<Stack
					direction="row"
					justifyContent="space-between"
				>
					<Typography variant={breakpoints.xl ? 'M16' : 'M20'}>
						{letter.num}
					</Typography>
					<Typography variant={breakpoints.xl ? 'M16' : 'M20'}>
						{letter.date}
					</Typography>
				</Stack>

				<Stack gap={3}>
					<Stack gap={1}>
						<Stack
							direction="row"
							justifyContent="space-between"
						>
							<Typography variant="R16">Тема:</Typography>
							<Typography
								variant={breakpoints.xl ? 'M12' : 'M16'}
							>
								{letter.topic}
							</Typography>
						</Stack>

						<Stack
							direction="row"
							justifyContent="space-between"
						>
							<Typography variant="R16">Адресат:</Typography>
							<Typography
								variant={breakpoints.xl ? 'M12' : 'M16'}
							>
								{letter.destination}
							</Typography>
						</Stack>
					</Stack>

					<Stack
						direction="row"
						justifyContent="space-between"
					>
						<Stack
							direction="row"
							gap={1}
						>
							<IconButton sx={{ p: 0 }}>
								<ImportIcon strokeWidth={1.5} />
							</IconButton>
						</Stack>
						{getTypeTitle(letter.type)}
					</Stack>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default LetterCard;
