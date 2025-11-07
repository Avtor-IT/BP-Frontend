import {
	Card,
	CardHeader,
	Grid,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import CheckCircleIcon from 'shared/icons/CheckCircle';
import { ExpandIcon } from 'shared/icons/Expand';
import cls from '../Input.module.scss';
import FormSection from './FormSection';
// eslint-disable-next-line no-restricted-imports
import { useLogoList } from 'entities/Letter/api/getLogos';
import { Controller, useFormContext } from 'react-hook-form';
import { ListLoader } from './ListLoader';
import { VirtualizedList } from 'shared/ui/VirtualizedList';
import { useState } from 'react';
// eslint-disable-next-line no-restricted-imports
import { DocumentModal } from 'entities/Documents/@X/Letter/DocumentModal';

const LogoList = ({ section }) => {
	const { control } = useFormContext();

	const [logo, setLogo] = useState(null);
	const handleOpen = (logo) => setLogo(logo);
	const handleClose = () => setLogo(null);

	return (
		<>
			{Boolean(logo) && (
				<DocumentModal
					open={Boolean(logo)}
					onClose={handleClose}
					downloadUrl={logo.file?.replace(/^http:/, 'https:')}
					fileName={logo.name}
				/>
			)}

			<ListLoader
				query={useLogoList}
				render={(logoList) => {
					return (
						<Controller
							name={`${section}.companyLogo`}
							control={control}
							render={({ field }) => (
								<VirtualizedList
									list={logoList}
									itemHeight={80}
									renderItem={(logo) => {
										const selected =
											field.value === logo.id;

										return (
											<Stack
												key={logo.id}
												direction="row"
												justifyContent="space-between"
												alignItems="center"
												gap={3}
											>
												<Card
													className={cls.letterInput}
													variant="card"
													sx={{
														borderRadius: 1,
														paddingBlock: 2,
														position: 'relative',
														minHeight: 70,
													}}
												>
													<CardHeader
														action={
															<IconButton
																onClick={() =>
																	handleOpen(
																		logo
																	)
																}
																sx={{
																	p: 0,
																}}
															>
																<ExpandIcon fontSize="small" />
															</IconButton>
														}
														title={logo.name}
														sx={{
															paddingInline: 2,
														}}
														slotProps={{
															title: {
																variant: 'M16',
																overflow:
																	'hidden',
																textOverflow:
																	'ellipsis',
																whiteSpace:
																	'nowrap',
															},
															action: {
																sx: {
																	position:
																		'absolute',
																	top: 8,
																	right: 8,
																},
															},
														}}
													/>
												</Card>

												<IconButton
													onClick={() =>
														field.onChange(
															selected
																? ''
																: logo.id
														)
													}
												>
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
		</>
	);
};

const SenderStep = ({ config, ...props }) => {
	return (
		<Grid
			{...props}
			container
			columns={2}
			columnSpacing={2}
		>
			<Grid size={1}>
				<FormSection
					section={'sender'}
					config={config}
				/>
			</Grid>
			<Grid size={1}>
				<Stack
					gap={3}
					height="100%"
				>
					<Typography variant="M20">Логотип компании</Typography>

					<LogoList
						section={'sender'}
						config={config}
					/>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default SenderStep;
