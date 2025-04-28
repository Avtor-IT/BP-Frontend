import { Button, Stack, Typography } from '@mui/material';
import AddSquareIcon from 'shared/icons/AddSquare';
import { TitledCard } from 'shared/ui/Card';
const CreateNewLetterCard = ({ ...props }) => {
	return (
		<TitledCard
			{...props}
			circleSx={{
				width: '407px',
				height: '407px',
				top: '-297px',
				left: '-115px',
				backgroundColor: 'var(--secondary)',
			}}
		>
			<Stack
				direction="row"
				justifyContent="space-between"
				height="100%"
			>
				<Typography
					variant="M20"
					color="var(--color-light-secondary)"
					position="relative"
					zIndex={2}
				>
					Создать новое
					<br />
					письмо
				</Typography>

				<Stack
					height="100%"
					justifyContent="center"
					alignItems="center"
				>
					<Button variant="unstyled">
						<AddSquareIcon
							color="secondary"
							sx={{ fontSize: '164px' }}
						/>
					</Button>
				</Stack>
			</Stack>
		</TitledCard>
	);
};

export default CreateNewLetterCard;
