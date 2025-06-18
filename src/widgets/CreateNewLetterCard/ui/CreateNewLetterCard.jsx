import { Card, CardHeader, IconButton, Modal } from '@mui/material';
import { useState } from 'react';
import AddSquareIcon from 'shared/icons/AddSquare';
import { useMaxWidth } from 'shared/model';
import { CircledTitle } from 'shared/ui/CircledTitle';
import CreateNewLetterModal from './CreateNewLetterModal';

const CreateNewLetterCard = ({ ...props }) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);
	const breakpoints = useMaxWidth();

	return (
		<>
			<Card
				{...props}
				sx={{
					position: 'relative',
					paddingBottom: breakpoints.xxl ? 4 : undefined,
					...props.sx,
				}}
			>
				<CardHeader
					sx={{ maxWidth: breakpoints.xxxl ? 223 : undefined }}
					title={
						<CircledTitle
							title="Создать новое письмо"
							color="secondary.main"
							sx={{ marginBottom: 0 }}
							slotProps={
								breakpoints.md && {
									circle: {
										sx: {
											right: '-30%',
										},
									},
								}
							}
						/>
					}
					slotProps={{
						title: {
							variant: breakpoints.md ? 'M20' : 'M24',
						},
					}}
				/>

				<IconButton
					onClick={handleOpen}
					sx={{
						position: 'absolute',
						right: 24,
						top: breakpoints.xxl ? 16 : 44,
					}}
				>
					<AddSquareIcon
						strokeWidth={0.5}
						color="secondary"
						sx={{ fontSize: breakpoints.xxl ? '72px' : '164px' }}
					/>
				</IconButton>
			</Card>

			<Modal
				open={open}
				onClose={handleClose}
			>
				{/* div wrapper instead of using forwardRef */}
				<div>
					<CreateNewLetterModal />
				</div>
			</Modal>
		</>
	);
};

export default CreateNewLetterCard;
