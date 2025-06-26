import { Stack, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { FormInput } from 'shared/ui/FormInput';
import { ScrollBox } from 'shared/ui/Scrollable';

const FormSection = ({ section, config }) => {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	return (
		<Stack
			gap={3}
			height="100%"
		>
			<Typography variant="M20">{config.title}</Typography>
			<ScrollBox>
				{Object.entries(config.fields).map(([name, fieldConfig]) => (
					<FormInput
						key={name}
						name={`${section}.${name}`}
						control={control}
						rules={fieldConfig.validation}
						config={fieldConfig}
						helperText={errors[section]?.[name]?.message}
						error={!!errors[section]?.[name]}
					/>
				))}
			</ScrollBox>
		</Stack>
	);
};

export default FormSection;
