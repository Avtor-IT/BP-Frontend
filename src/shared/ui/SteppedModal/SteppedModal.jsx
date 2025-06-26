import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import { ModalBody } from 'shared/mui';
import ModalActionButton from './ModalActionButton';

const SteppedModal = ({
	steps,
	slots,
	slotProps,
	action,
	titles,
	header,
	onStepChange,
	onNextStep,
	onPrevStep,
	beforeNextStep,
}) => {
	const [step, setStep] = useState(0);

	const handlePrevStep = () => {
		onStepChange?.(step - 1);
		onPrevStep?.(step - 1);
		setStep(step - 1);
	};

	const handleNextStep = async () => {
		const validationResult = beforeNextStep?.(step) || true;

		const isValid =
			validationResult instanceof Promise
				? await validationResult
				: validationResult;

		if (isValid) {
			onStepChange?.(step + 1);
			setStep(step + 1);
			onNextStep?.(step + 1);
		}
	};

	return (
		<ModalBody minWidth="786px">
			<Card>
				<CardHeader
					title={header || ''}
					action={
						<Typography variant="M20">
							{step + 1}/{steps.length}
						</Typography>
					}
				/>

				<CardContent>{steps[step]}</CardContent>

				<CardActions sx={{ justifyContent: 'end' }}>
					{step !== 0 &&
						(slots?.prevButton || (
							<ModalActionButton
								text={titles?.prev || 'Назад'}
								onClick={handlePrevStep}
								{...slotProps?.prevButton}
							/>
						))}

					{step + 1 !== steps.length &&
						(slots?.nextButton || (
							<ModalActionButton
								text={titles?.next || 'Далее'}
								onClick={handleNextStep}
								{...slotProps?.nextButton}
							/>
						))}

					{step + 1 === steps.length &&
						(slots?.finalButton || (
							<ModalActionButton
								text={titles?.final || 'Готово'}
								onClick={action}
								{...slotProps?.finalButton}
							/>
						))}
				</CardActions>
			</Card>
		</ModalBody>
	);
};

export default SteppedModal;
