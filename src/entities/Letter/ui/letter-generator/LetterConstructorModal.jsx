import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ModalActionButton, SteppedModal } from 'shared/ui/SteppedModal';
import { useGenerateDocx, useGeneratePdf } from '../../lib/useGenerateDocument';
import {
	getDefaultValues,
	letterFormConfig,
} from '../../model/generator-config/letterFormConfig';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateLeter } from '../../api/saveLetter';
import { KEY as LETTERS_KEY } from '../../api/getLetters';
import { useLetterStore } from '../../store/letterStore';
import {
	letterToFields,
	letterToServer,
} from '../../model/generator-config/formLetter';
import { useLeterModalStore } from '../../store/letterModalStore';

const LetterConstructorModal = () => {
	const queryClient = useQueryClient();
	const { letter } = useLetterStore();
	const { handleClose } = useLeterModalStore();

	const form = useForm({
		defaultValues: getDefaultValues(letter),
		mode: 'onChange',
	});

	const steps = useMemo(
		() =>
			Object.values(letterFormConfig).map((config) => (
				<config.component
					key={config.title}
					config={config}
					sx={{ minHeight: '500px' }}
				/>
			)),
		[letterFormConfig]
	);

	const generateDocxMutation = useGenerateDocx();
	const generatePdfMutatoin = useGeneratePdf();
	const createLetterMutation = useCreateLeter({
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: [LETTERS_KEY] });
			handleClose();
		},
	});

	const handlePdfGeneration = (data) => {
		handleFormSubmit(letterToFields(data), generatePdfMutatoin.mutate);
	};
	const handleDocxGeneration = (data) => {
		handleFormSubmit(letterToFields(data), generateDocxMutation.mutate);
	};
	const handleSaveLetter = (data) => {
		letterToServer(data);
		// handleFormSubmit(letterToServer(data), createLetterMutation.mutate);
	};

	const handleFormSubmit = (data, action) => {
		try {
			action(data);
		} catch (e) {
			console.error('error while submit:', e);
		}
	};

	const validateStep = async (currentStep) => {
		const stepSections = Object.keys(letterFormConfig);
		const currentSection = stepSections[currentStep];
		await form.trigger();

		if (!form.formState.errors[currentSection]) {
			return true;
		}
	};

	return (
		<FormProvider {...form}>
			<SteppedModal
				beforeNextStep={validateStep}
				header="Форма конструктора письма"
				steps={steps}
				slots={{
					finalButton: (
						<>
							<ModalActionButton
								text="Сохранить"
								color="secondary"
								onClick={form.handleSubmit(handleSaveLetter)}
								loading={createLetterMutation.isPending}
								disabled={Boolean(
									Object.values(form.formState.errors).length
								)}
							/>
							<ModalActionButton
								text="PDF"
								loading={generatePdfMutatoin.isPending}
								color="primary"
								onClick={form.handleSubmit(handlePdfGeneration)}
								disabled={Boolean(
									Object.values(form.formState.errors).length
								)}
							/>
							<ModalActionButton
								text="DOCX"
								loading={generateDocxMutation.isPending}
								color="primary"
								onClick={form.handleSubmit(
									handleDocxGeneration
								)}
								disabled={Boolean(
									Object.values(form.formState.errors).length
								)}
							/>
						</>
					),
				}}
			/>
		</FormProvider>
	);
};

export default LetterConstructorModal;
