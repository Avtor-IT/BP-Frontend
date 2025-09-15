import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ModalActionButton, SteppedModal } from 'shared/ui/SteppedModal';
import { useGenerateDocx, useGeneratePdf } from '../../lib/useGenerateDocument';
import {
	getDefaultValues,
	letterFormConfig,
} from '../../model/generator-config/letterFormConfig';
import { defaultFields } from '../../model/generator-config/defaultFields';

const initValues = {
	sender: {
		companyName: 'companyName',
		companyAddress: 'companyAddress',
		companyPhone: '+7 999 999 9999',
		companyEmail: 'avtorit@avtorit.ru',
	},
	destination: {
		documentName: 'documentName',
		destinationInitials: 'destinationInitials',
		destinationJob: 'destinationJob',
	},
	letter: {
		topic: 'topic',
		text: 'text',
	},
	personal: {
		personalInitials: 'personalInitials',
		personalPosition: 'personalPosition',
		personalPhone: '+7 999 999 9999',
		date: '25.07.25',
	},
};

const LetterConstructorModal = () => {
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
	const handlePdfGeneration = (data) => {
		handleFormSubmit(data, generatePdfMutatoin.mutate);
	};
	const handleDocxGeneration = (data) => {
		handleFormSubmit(data, generateDocxMutation.mutate);
	};

	const handleFormSubmit = (data, action) => {
		try {
			const fields = Object.values(data).reduce(
				(acc, curr) => Object.assign(acc, curr),
				{}
			);
			action({ ...defaultFields, ...fields });
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
