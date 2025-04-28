import { Box, Card, Stack, Typography } from '@mui/material';
import { CheckSquareIcon } from 'shared/icons/CheckSquare';
import { EditSquareIcon } from 'shared/icons/EditSqueare';
import ExportIcon from 'shared/icons/Export';
import ImportIcon from 'shared/icons/Import';

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
	return (
		<Box {...props}>
			<Card
				sx={{
					color: 'tertiary.dark',
					padding: '32px 24px 16px',
					position: 'relative',
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

				<Stack
					direction="row"
					justifyContent="space-between"
				>
					<Typography variant="M20">{letter.num}</Typography>
					<Typography variant="M20">{letter.date}</Typography>
				</Stack>

				<Stack
					mt={2}
					direction="row"
					justifyContent="space-between"
				>
					<Typography variant="R16">Тема:</Typography>
					<Typography variant="M16">{letter.topic}</Typography>
				</Stack>

				<Stack
					mt={1}
					direction="row"
					justifyContent="space-between"
				>
					<Typography variant="R16">Адресат:</Typography>
					<Typography variant="M16">{letter.destination}</Typography>
				</Stack>

				<Stack
					mt={3}
					direction="row"
					justifyContent="space-between"
				>
					<Stack
						direction="row"
						gap={1}
					>
						<ImportIcon />
						<ExportIcon />
					</Stack>
					{getTypeTitle(letter.type)}
				</Stack>
			</Card>
		</Box>
	);
};

export default LetterCard;
