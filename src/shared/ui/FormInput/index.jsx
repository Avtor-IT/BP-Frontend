import { FormControlLabel, FormGroup, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

export const FormInput = ({
	name,
	control,
	rules,
	config,
	helperText,
	error,
}) => {
	return (
		<FormGroup>
			<FormControlLabel
				control={
					<Controller
						name={name}
						control={control}
						rules={rules}
						render={({ field: fieldProps }) => {
							return (
								<TextField
									{...fieldProps}
									variant="filled"
									fullWidth
									type={config.type}
									multiline={config.multiline}
									rows={config.rows}
									helperText={helperText}
									error={error}
								/>
							);
						}}
					/>
				}
				sx={{
					alignItems: 'start',
				}}
				slotProps={{
					typography: {
						variant: 'R16',
					},
				}}
				labelPlacement="top"
				label={config.label}
			/>
		</FormGroup>
	);
};
