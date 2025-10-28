import { Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import CheckCircleIcon from 'shared/icons/CheckCircle';
import cls from '../Input.module.scss';
import FormSection from './FormSection';
// eslint-disable-next-line no-restricted-imports
import { useSignsList } from 'entities/Letter/api/getSigns';
// eslint-disable-next-line no-restricted-imports
import { useFacsimileList } from 'entities/Letter/api/getFacsimile';
import { Controller, useFormContext } from 'react-hook-form';
import { ListLoader } from './ListLoader';
import { VirtualizedList } from 'shared/ui/VirtualizedList';

const PersonalList = ({ query, name }) => {
	const { control } = useFormContext();

	return (
		<ListLoader
			query={query}
			render={(list) => {
				return (
					<Controller
						name={name}
						control={control}
						render={({ field }) => (
							<VirtualizedList
								list={list}
								itemHeight={60}
								renderItem={(item) => {
									const selected = field.value === item.id;
									const select = () => {
										field.onChange(selected ? '' : item.id);
									};

									return (
										<Stack
											key={item.id}
											direction="row"
											justifyContent="space-between"
											alignItems="center"
											gap={3}
										>
											<Button
												className={cls.letterInput}
												variant="card"
											>
												<Typography
													variant="R16"
													color="#000"
													overflow="hidden"
													textOverflow="ellipsis"
													whiteSpace="nowrap"
												>
													{item.name}
												</Typography>
											</Button>

											<IconButton onClick={select}>
												<CheckCircleIcon
													color={
														selected
															? 'primary'
															: undefined
													}
												/>
											</IconButton>
										</Stack>
									);
								}}
							/>
						)}
					/>
				);
			}}
		/>
	);
};

const PersonalStep = ({ config, ...props }) => {
	return (
		<Grid
			{...props}
			container
			columns={2}
			columnSpacing={3}
		>
			<Grid size={1}>
				<FormSection
					section="personal"
					config={config}
				/>
			</Grid>
			<Grid size={1}>
				<Stack
					gap={2}
					height="100%"
				>
					<Stack
						gap={3}
						flexGrow={1}
					>
						<Typography variant="M20">Печать</Typography>
						<PersonalList
							query={useSignsList}
							name="personal.signature"
						/>
					</Stack>

					<Stack
						gap={3}
						flexGrow={1}
					>
						<Typography variant="M20">Факсимиле</Typography>
						<PersonalList
							query={useFacsimileList}
							name="personal.facsimile"
						/>
					</Stack>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default PersonalStep;
