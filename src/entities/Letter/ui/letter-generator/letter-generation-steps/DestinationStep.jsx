import { Button, Grid, Stack, Typography } from '@mui/material';
import cls from '../Input.module.scss';
import FormSection from './FormSection';
import { ListLoader } from './ListLoader';
// eslint-disable-next-line no-restricted-imports
import useLetters from 'entities/Letter/api/getLetters';
import { useFormContext } from 'react-hook-form';
import { VirtualizedList } from 'shared/ui/VirtualizedList';

const AutocompleteList = () => {
	const { setValue, trigger } = useFormContext();

	return (
		<ListLoader
			query={useLetters}
			render={(letters) => {
				return (
					<VirtualizedList
						list={letters}
						itemHeight={60}
						renderItem={(letter) => {
							const destination = letter.content.destination;
							const renderedText = Object.values(destination)
								.filter(Boolean)
								.join(', ');

							const apply = async () => {
								setValue(
									'destination.documentName',
									destination.documentName || ''
								);
								setValue(
									'destination.accountingNo',
									destination.accountingNo || ''
								);
								setValue(
									'destination.answerNo',
									destination.answerNo || ''
								);
								setValue(
									'destination.destinationJob',
									destination.destinationJob || ''
								);
								setValue(
									'destination.destinationInitials',
									destination.destinationInitials || ''
								);

								await trigger();
							};

							return (
								<Stack
									key={letter.id}
									direction="row"
									justifyContent="space-between"
									alignItems="center"
									gap={3}
								>
									<Button
										className={cls.letterInput}
										variant="card"
										onClick={apply}
									>
										<Typography
											variant="R16"
											color="#000"
											overflow="hidden"
											textOverflow="ellipsis"
											whiteSpace="nowrap"
										>
											{renderedText}
										</Typography>
									</Button>
								</Stack>
							);
						}}
					/>
				);
			}}
		/>
	);
};

const DestinationStep = ({ config, ...props }) => {
	return (
		<Grid
			{...props}
			container
			columns={2}
			columnSpacing={3}
		>
			<Grid size={1}>
				<FormSection
					section={'destination'}
					config={config}
				/>
			</Grid>
			<Grid size={1}>
				<Stack
					gap={3}
					height="100%"
				>
					<Typography variant="M20">
						Автозаполнение адресата
					</Typography>
					<AutocompleteList />
				</Stack>
			</Grid>
		</Grid>
	);
};

export default DestinationStep;
