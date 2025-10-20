import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ModalActionButton, SteppedModal } from 'shared/ui/SteppedModal';
import { useGenerateDocx, useGeneratePdf } from '../../lib/useGenerateDocument';
import {
	getDefaultValues,
	letterFormConfig,
} from '../../model/generator-config/letterFormConfig';
// eslint-disable-next-line no-restricted-imports
import { useCreateLeter } from 'entities/Letter/api/saveLetter';
import { useQueryClient } from '@tanstack/react-query';
// eslint-disable-next-line no-restricted-imports
import { KEY as LETTERS_KEY } from 'entities/Letter/api/getLetters';

const initValues = {
	sender: {
		companyName: 'companyName',
		companyAddress: 'companyAddress',
		companyPhone: '+7 999 999 9999',
		companyEmail: 'avtorit@avtorit.ru',
		companyLogo: 1,
	},
	destination: {
		documentName: 'documentName',
		destinationInitials: 'destinationInitials',
		destinationJob: 'destinationJob',
	},
	letter: {
		subject: 'subject',
		text: 'text',
	},
	personal: {
		personalInitials: 'personalInitials',
		personalPosition: 'personalPosition',
		personalPhone: '+7 999 999 9999',
		date: '25.07.25',
		signature: 1,
		facsimile: 2,
	},
};

const LetterConstructorModal = () => {
	const queryClient = useQueryClient();

	const form = useForm({
		defaultValues: getDefaultValues(initValues),
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
		},
	});

	const handlePdfGeneration = (data) => {
		handleFormSubmit(data, generatePdfMutatoin.mutate);
	};
	const handleDocxGeneration = (data) => {
		handleFormSubmit(data, generateDocxMutation.mutate);
	};
	const handleSaveLetter = (data) => {
		const formedLetter = {
			title:
				data.destination.accountingNo || data.destination.documentName,
			subject: data.letter.subject,
			address: data.sender.companyAddress,
			content: data,
			is_draft: false,
			signature: data.personal.signature,
			facsimile: data.personal.facsimile,
			logo: data.sender.companyLogo,
		};

		handleFormSubmit(formedLetter, createLetterMutation.mutate);
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
