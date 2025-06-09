import { Card, CardHeader, IconButton } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/system';
import { useState } from 'react';
import AddSquareIcon from 'shared/icons/AddSquare';
import { CircledTitle } from 'shared/ui/CircledTitle';
import CreateNewLetterModal from './CreateNewLetterModal';

const CreateNewLetterCard = ({ ...props }) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);
	const theme = useTheme();
	const downXxxl = useMediaQuery(theme.breakpoints.down('xxxl'));
	const downXxl = useMediaQuery(theme.breakpoints.down('xxl'));

	return (
		<>
			<Card
				{...props}
				sx={{ position: 'relative', ...props.sx }}
			>
				<CardHeader
					sx={{ maxWidth: downXxxl ? 223 : undefined }}
					title={
						<CircledTitle
							title="Создать новое письмо"
							color="secondary.main"
							sx={{ marginBottom: 0 }}
						/>
					}
				/>

				<IconButton
					onClick={handleOpen}
					sx={{
						position: 'absolute',
						right: 24,
						top: downXxl ? 16 : 44,
					}}
				>
					<AddSquareIcon
						strokeWidth={0.5}
						color="secondary"
						sx={{ fontSize: downXxl ? '72px' : '164px' }}
					/>
				</IconButton>
			</Card>

			<CreateNewLetterModal
				open={open}
				onClose={handleClose}
			/>
		</>
	);
};

export default CreateNewLetterCard;
