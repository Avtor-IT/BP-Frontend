import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Modal,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import { ModalBody } from 'shared/mui';
import DestinationStep from './DestinationStep';
import LetterStep from './LetterStep';
import PersonalStep from './PersonalStep';
import SenderStep from './SenderStep';

const pages = [
	<SenderStep
		key="sender"
		sx={{ minHeight: '500px' }}
	/>,
	<DestinationStep
		key="destination"
		sx={{ minHeight: '500px' }}
	/>,
	<LetterStep
		key="letter"
		sx={{ minHeight: '500px' }}
	/>,
	<PersonalStep
		key="persinal"
		sx={{ minHeight: '500px' }}
	/>,
];

const CreateNewLetterModal = ({ open, onClose }) => {
	const [page, setPage] = useState(0);

	return (
		<Modal
			open={open}
			onClose={onClose}
		>
			<ModalBody minWidth="786px">
				<Card>
					<CardHeader
						title="Форма конструктора письма"
						action={
							<Typography variant="M20">
								{page + 1}/{pages.length}
							</Typography>
						}
					/>

					<CardContent>{pages[page]}</CardContent>

					<CardActions sx={{ justifyContent: 'end' }}>
						{page !== 0 && (
							<Button
								sx={{ padding: '16px 32px' }}
								color="secondary"
								variant="contained"
								onClick={() => setPage((prev) => prev - 1)}
							>
								<Typography
									variant="M20"
									lineHeight={1}
								>
									Назад
								</Typography>
							</Button>
						)}
						{page + 1 !== pages.length && (
							<Button
								sx={{ padding: '16px 32px' }}
								color="secondary"
								variant="contained"
								onClick={() => setPage((prev) => prev + 1)}
							>
								<Typography
									variant="M20"
									lineHeight={1}
								>
									Далее
								</Typography>
							</Button>
						)}
						{page + 1 === pages.length && (
							<Button
								sx={{ padding: '16px 32px' }}
								color="secondary"
								variant="contained"
							>
								<Typography
									variant="M20"
									lineHeight={1}
								>
									Отправить
								</Typography>
							</Button>
						)}
					</CardActions>
				</Card>
			</ModalBody>
		</Modal>
	);
};

export default CreateNewLetterModal;
